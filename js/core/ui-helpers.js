/**
 * UI helper functions for Sci Mini-Suite
 */

/**
 * Create tooltips for elements with data-tooltip attribute
 */
export function createTooltips() {
  try {
    // Check if tippy is loaded
    if (typeof tippy === 'undefined') {
      console.warn('Tippy.js is not loaded, tooltips will not be created');
      return;
    }

    // Find all elements with data-tooltip attribute
    document.querySelectorAll('[data-tooltip]').forEach(el => {
      try {
        tippy(el, {
          content: el.getAttribute('data-tooltip'),
          placement: 'top',
          arrow: true,
          animation: 'scale'
        });
      } catch (error) {
        console.error('Error creating tooltip for element:', el, error);
      }
    });

    // Create tooltips for help icons
    document.querySelectorAll('.help-icon').forEach(el => {
      try {
        tippy(el, {
          content: el.getAttribute('data-help'),
          placement: 'top',
          arrow: true,
          animation: 'scale',
          maxWidth: 300
        });
      } catch (error) {
        console.error('Error creating tooltip for help icon:', el, error);
      }
    });
  } catch (error) {
    console.error('Error creating tooltips:', error);
  }
}

/**
 * Add a help icon to an element
 * @param {HTMLElement} element - Element to add help icon to
 * @param {string} helpText - Help text to display
 * @returns {HTMLElement|null} - The created help icon element or null if failed
 */
export function addHelpIcon(element, helpText) {
  if (!element) {
    console.warn('Attempted to add help icon to non-existent element');
    return null;
  }

  try {
    const helpIcon = document.createElement('span');
    helpIcon.className = 'help-icon';
    helpIcon.textContent = '?';
    helpIcon.setAttribute('data-help', helpText);
    element.appendChild(helpIcon);
    return helpIcon;
  } catch (error) {
    console.error('Error adding help icon:', error);
    return null;
  }
}

/**
 * Show an error message for an element
 * @param {HTMLElement} element - Element to show error for
 * @param {string} message - Error message
 * @returns {HTMLElement} - The created error message element
 */
export function showError(element, message) {
  // Clear any existing error
  clearError(element);

  // Create error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;

  // Add error class to input
  element.classList.add('border-red-500');

  // Insert error message after element
  element.parentNode.insertBefore(errorDiv, element.nextSibling);

  return errorDiv;
}

/**
 * Clear error message for an element
 * @param {HTMLElement} element - Element to clear error for
 */
export function clearError(element) {
  // Remove error class
  element.classList.remove('border-red-500');

  // Remove any existing error message
  const nextSibling = element.nextSibling;
  if (nextSibling && nextSibling.classList && nextSibling.classList.contains('error-message')) {
    nextSibling.remove();
  }
}

/**
 * Show a success message for an element
 * @param {HTMLElement} element - Element to show success for
 * @param {string} message - Success message
 * @returns {HTMLElement} - The created success message element
 */
export function showSuccess(element, message) {
  // Create success message
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;

  // Insert success message after element
  element.parentNode.insertBefore(successDiv, element.nextSibling);

  // Remove after 3 seconds
  setTimeout(() => {
    successDiv.remove();
  }, 3000);

  return successDiv;
}

/**
 * Show help content for a specific tool
 * @param {string} toolKey - Key of the tool to show help for
 * @param {Object} tools - Tools registry
 * @param {Object} helpContent - Help content for each tool
 */
export function showToolHelp(toolKey, tools, helpContent) {
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">${tools[toolKey].name} - Help</h3>
        <button class="text-gray-500 hover:text-gray-700" id="closeHelpModal">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="prose">
        ${helpContent[toolKey] || '<p>No help content available for this tool.</p>'}
      </div>
      <div class="mt-6 text-right">
        <button class="bg-blue-600 text-white px-4 py-2 rounded" id="closeHelpButton">Close</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Add event listeners to close buttons
  document.getElementById('closeHelpModal').addEventListener('click', () => {
    modal.remove();
  });

  document.getElementById('closeHelpButton').addEventListener('click', () => {
    modal.remove();
  });

  // Close on click outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}
