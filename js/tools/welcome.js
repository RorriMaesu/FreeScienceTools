/**
 * Welcome Screen for Sci Mini-Suite
 */

/**
 * Render the welcome screen
 * @param {HTMLElement} root - Container element
 */
export function welcomeScreenUI(root) {
  root.innerHTML = `
  <div class="max-w-4xl mx-auto">
    <h2 class="text-xl font-semibold mb-4">Welcome to Sci Mini-Suite</h2>

    <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
      <h3 class="font-semibold text-lg mb-3">Your All-in-One Scientific Toolkit</h3>
      <p class="mb-4">Sci Mini-Suite is a collection of lightweight, browser-based scientific tools for everyday lab and data analysis tasks. All tools run entirely in your browser - no data is sent to any server.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 class="font-semibold mb-2">Statistical Tools</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li><span class="font-medium">Stat Test Genie</span> - Find the right statistical test</li>
            <li><span class="font-medium">Power & Sample-Size Wizard</span> - Calculate required sample sizes</li>
            <li><span class="font-medium">Normality & Outlier Checker</span> - Test data distribution</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-2">Lab Tools</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li><span class="font-medium">Lab Math Calc</span> - Dilution calculations</li>
            <li><span class="font-medium">Unit & Concentration Converter</span> - Convert between units</li>
            <li><span class="font-medium">Quick Cell-Counter</span> - Count cells in images</li>
          </ul>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 class="font-semibold mb-2">Data Tools</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li><span class="font-medium">CSV ↔ JSON Converter</span> - Convert between formats</li>
            <li><span class="font-medium">Quick-Plot Lab</span> - Create plots from data</li>
            <li><span class="font-medium">Heat-Mapper</span> - Create heatmaps from matrices</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-2">Sequence Tools</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li><span class="font-medium">FAST-Viewer</span> - View and analyze DNA/RNA sequences</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-6">
      <h3 class="font-semibold text-lg mb-3">Getting Started</h3>
      <ol class="list-decimal pl-5 space-y-2">
        <li>Select a tool from the navigation bar above</li>
        <li>Each tool has specific instructions and tooltips (hover over inputs for help)</li>
        <li>All calculations happen in your browser - your data never leaves your computer</li>
        <li>If you encounter any issues, try refreshing the page</li>
      </ol>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 class="font-semibold mb-2">Most Popular Tools</h3>
        <div class="space-y-2">
          <button onclick="loadTool('powerWizard')" class="w-full text-left px-3 py-2 bg-white rounded border hover:bg-blue-50">Power & Sample-Size Wizard</button>
          <button onclick="loadTool('labCalc')" class="w-full text-left px-3 py-2 bg-white rounded border hover:bg-blue-50">Lab Math Calc</button>
          <button onclick="loadTool('quickPlot')" class="w-full text-left px-3 py-2 bg-white rounded border hover:bg-blue-50">Quick-Plot Lab</button>
        </div>
      </div>

      <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h3 class="font-semibold mb-2">New Tools</h3>
        <div class="space-y-2">
          <button onclick="loadTool('heatMapper')" class="w-full text-left px-3 py-2 bg-white rounded border hover:bg-blue-50">Heat-Mapper</button>
          <button onclick="loadTool('unitConverter')" class="w-full text-left px-3 py-2 bg-white rounded border hover:bg-blue-50">Unit & Concentration Converter</button>
          <button onclick="loadTool('cellCounter')" class="w-full text-left px-3 py-2 bg-white rounded border hover:bg-blue-50">Quick Cell-Counter (Beta)</button>
        </div>
      </div>

      <div class="bg-red-50 p-4 rounded-lg border border-red-200">
        <h3 class="font-semibold mb-2">Support This Project</h3>
        <p class="text-sm mb-3">Sci Mini-Suite is free to use and developed by scientists for scientists. Your support helps keep it running and growing.</p>
        <a href="https://buymeacoffee.com/rorrimaesu" target="_blank" class="block bg-yellow-400 text-black px-3 py-2 rounded text-center hover:bg-yellow-500">☕ Buy Me a Coffee</a>
      </div>
    </div>

    <!-- New Premium Tools Section -->
    <div class="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-lg border border-blue-300 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg text-indigo-800">Premium Tools Now Available!</h3>
        <span class="bg-yellow-400 text-indigo-900 font-bold px-2 py-1 rounded-full text-sm">PRO</span>
      </div>
      
      <p class="mb-4 text-indigo-800">Experience our advanced scientific tools designed for professional research and analysis.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white bg-opacity-60 p-4 rounded-lg border border-indigo-200 shadow-sm">
          <h4 class="font-semibold text-indigo-800 mb-2">Curve Fitting Toolbox</h4>
          <p class="text-sm mb-3">Fit experimental data to mathematical models including linear, exponential, sigmoidal, Michaelis-Menten, Hill equation, and more.</p>
          <ul class="text-sm text-indigo-700 mb-3">
            <li>• 9+ built-in mathematical models</li>
            <li>• Interactive parameter optimization</li>
            <li>• R² goodness-of-fit statistics</li>
            <li>• Publication-ready plots and exports</li>
          </ul>
          <button onclick="loadTool('curveFitter')" class="w-full bg-indigo-600 text-white px-3 py-2 rounded text-center hover:bg-indigo-700">Open Curve Fitter</button>
        </div>
        
        <div class="bg-white bg-opacity-60 p-4 rounded-lg border border-indigo-200 shadow-sm">
          <h4 class="font-semibold text-indigo-800 mb-2">Experimental Design Planner</h4>
          <p class="text-sm mb-3">Create statistically rigorous experimental designs with optimized sample sizes, randomization plans, and power analysis.</p>
          <ul class="text-sm text-indigo-700 mb-3">
            <li>• Completely randomized designs</li>
            <li>• Randomized block designs</li>
            <li>• Factorial and Latin square designs</li>
            <li>• Recommended statistical analysis</li>
          </ul>
          <button onclick="loadTool('expDesigner')" class="w-full bg-indigo-600 text-white px-3 py-2 rounded text-center hover:bg-indigo-700">Open Design Planner</button>
        </div>
      </div>
    </div>
  </div>`;
}
