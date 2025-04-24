/**
 * Main application module for Sci Mini-Suite
 */

import { bumpCounter, toast, createFloatingActionButton, showOnboardingModal } from './core/utils.js';
import { createTooltips, addHelpIcon, showToolHelp } from './core/ui-helpers.js';
import { helpContent } from './core/help-content.js';

// Import only the tool modules that exist
import { welcomeScreenUI } from './tools/welcome.js';
import { curveFitterUI } from './tools/curve-fitter.js';
import { expDesignerUI } from './tools/exp-designer.js';

// Tool registry with all available tools
const tools = {
  // Free tools
  welcome: {
    name: 'Welcome',
    render: welcomeScreenUI
  },
  // Placeholder tools that will be implemented later
  calculator: {
    name: 'Scientific Calculator',
    render: function(container, helpers) {
      container.innerHTML = `
        <div class="p-6">
          <h2 class="text-xl font-bold mb-4">Scientific Calculator</h2>
          <div class="p-4 bg-yellow-100 rounded-lg">
            <p>🚧 This tool is currently being rebuilt with exciting new features!</p>
            <p class="mt-2">Please check back soon.</p>
          </div>
        </div>
      `;
    }
  },
  dataViewer: {
    name: 'Data Viewer',
    render: function(container, helpers) {
      container.innerHTML = `
        <div class="p-6">
          <h2 class="text-xl font-bold mb-4">Data Visualization Tool</h2>
          <div class="p-4 bg-yellow-100 rounded-lg">
            <p>🚧 This tool is currently being rebuilt with exciting new features!</p>
            <p class="mt-2">Please check back soon.</p>
          </div>
        </div>
      `;
    }
  },
  statisticsCalculator: {
    name: 'Statistics Calculator',
    render: function(container, helpers) {
      container.innerHTML = `
        <div class="p-6">
          <h2 class="text-xl font-bold mb-4">Statistics Calculator</h2>
          <div class="p-4 bg-yellow-100 rounded-lg">
            <p>🚧 This tool is currently being rebuilt with exciting new features!</p>
            <p class="mt-2">Please check back soon.</p>
          </div>
        </div>
      `;
    }
  },
  unitConverter: {
    name: 'Unit Converter',
    render: function(container, helpers) {
      container.innerHTML = `
        <div class="p-6">
          <h2 class="text-xl font-bold mb-4">Scientific Unit Converter</h2>
          <div class="p-4 bg-yellow-100 rounded-lg">
            <p>🚧 This tool is currently being rebuilt with exciting new features!</p>
            <p class="mt-2">Please check back soon.</p>
          </div>
        </div>
      `;
    }
  },
  molCalc: {
    name: 'Molecular Calculator',
    render: function(container, helpers) {
      container.innerHTML = `
        <div class="p-6">
          <h2 class="text-xl font-bold mb-4">Molecular Weight Calculator</h2>
          <div class="p-4 bg-yellow-100 rounded-lg">
            <p>🚧 This tool is currently being rebuilt with exciting new features!</p>
            <p class="mt-2">Please check back soon.</p>
          </div>
        </div>
      `;
    }
  },
  imageAnalysis: {
    name: 'Image Analysis',
    render: function(container, helpers) {
      container.innerHTML = `
        <div class="p-6">
          <h2 class="text-xl font-bold mb-4">Scientific Image Analysis</h2>
          <div class="p-4 bg-yellow-100 rounded-lg">
            <p>🚧 This tool is currently being rebuilt with exciting new features!</p>
            <p class="mt-2">Please check back soon.</p>
          </div>
        </div>
      `;
    }
  },
  // Premium tools (implemented)
  curveFitter: {
    name: 'Curve Fitting Toolbox',
    render: curveFitterUI,
    premium: true
  },
  expDesigner: {
    name: 'Experimental Design Planner',
    render: expDesignerUI,
    premium: true
  }
};

/**
 * Load a tool and render it in the container
 * @param {string} key - Key of the tool to load
 */
function loadTool(key) {
  // Check if the tool exists
  if (!tools[key]) {
    console.warn(`Tool '${key}' not found. Available tools: ${Object.keys(tools).join(', ')}`);
    toast(`Sorry, this tool is currently unavailable. We're working on restoring it soon!`);
    
    // Default to welcome screen if tool not found
    key = 'welcome';
  }

  // Update active state in navigation
  document.querySelectorAll('#navBar button').forEach(btn => {
    btn.classList.remove('bg-blue-200', 'font-semibold');
    btn.classList.add('bg-white');
  });

  // Find the button for this tool and highlight it
  const activeButton = Array.from(document.querySelectorAll('#navBar button')).find(
    btn => btn.dataset.key === key
  );
  if (activeButton) {
    activeButton.classList.remove('bg-white');
    activeButton.classList.add('bg-blue-200', 'font-semibold');
  }

  // Clear container and render tool
  const container = document.getElementById('toolContainer');
  container.innerHTML = '';
  tools[key].render(container, { 
    bumpCounter, 
    toast, 
    createTooltips, 
    addHelpIcon,
    showToolHelp: (toolKey) => showToolHelp(toolKey, tools, helpContent)
  });

  // Initialize tooltips after rendering
  setTimeout(() => {
    createTooltips();
  }, 100);

  // Add help button if not welcome screen
  if (key !== 'welcome') {
    const helpButton = document.createElement('button');
    helpButton.className = 'absolute top-4 right-4 text-blue-600 flex items-center';
    helpButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg> Help';

    helpButton.addEventListener('click', () => {
      showToolHelp(key, tools, helpContent);
    });

    // Find a good place to insert the help button
    const heading = container.querySelector('h2');
    if (heading) {
      heading.style.position = 'relative';
      heading.appendChild(helpButton);
    } else {
      container.insertBefore(helpButton, container.firstChild);
    }
  }
}

/**
 * Initialize the application
 */
function initApp() {
  // Create floating action button
  createFloatingActionButton();

  // Show onboarding modal for first-time visitors
  showOnboardingModal();
  
  // Build navigation buttons
  const nav = document.getElementById('navBar');
  Object.entries(tools).forEach(([key, tool]) => {
    const btn = document.createElement('button');
    
    // Add premium indicator for premium tools
    if (tool.premium) {
      btn.className = 'relative px-3 py-1 bg-white border border-blue-300 rounded shadow hover:bg-blue-100';
      
      // Add premium badge
      const badge = document.createElement('span');
      badge.className = 'absolute -top-2 -right-2 bg-yellow-400 text-xs px-1 rounded-full text-blue-800 font-bold';
      badge.textContent = 'PRO';
      btn.appendChild(badge);
    } else {
      btn.className = 'px-3 py-1 bg-white border rounded shadow hover:bg-blue-200';
    }
    
    btn.textContent = tool.name;
    btn.dataset.key = key;
    btn.onclick = () => loadTool(key);
    nav.appendChild(btn);
  });

  // Load welcome screen by default
  loadTool('welcome');
}

// Make loadTool available globally
window.loadTool = loadTool;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
