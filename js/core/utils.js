/**
 * Core utility functions for Sci Mini-Suite
 */

// Usage counter
let useCount = parseInt(localStorage.getItem('ubs_use') || '0');

/**
 * Increment usage counter and show toast for milestone counts
 */
export function bumpCounter() {
  useCount++; 
  localStorage.setItem('ubs_use', useCount);
  if ([10, 50, 100].includes(useCount)) {
    toast(`🏅 You've used Sci Mini-Suite ${useCount} times! Consider buying a coffee?`);
  }
}

/**
 * Display a toast notification
 * @param {string} msg - Message to display
 */
export function toast(msg) {
  let t = document.querySelector('.toast'); 
  if (!t) { 
    t = document.createElement('div'); 
    t.className = 'toast'; 
    document.body.appendChild(t); 
  }
  t.textContent = msg; 
  t.classList.add('show'); 
  setTimeout(() => t.classList.remove('show'), 4000);
}

/**
 * Create a floating action button
 */
export function createFloatingActionButton() {
  const fab = document.createElement('div');
  fab.innerHTML = `<span class="fab-label text-sm font-medium">Support</span><span>☕</span>`;
  fab.className = 'fab cursor-pointer';
  fab.onclick = () => window.open('https://buymeacoffee.com/rorrimaesu', '_blank');
  document.body.appendChild(fab);
}

/**
 * Show first-visit onboarding modal
 */
export function showOnboardingModal() {
  if (!localStorage.getItem('ubs_seen')) {
    const m = document.createElement('div');
    m.className = 'fixed inset-0 bg-black/50 flex items-center justify-center';
    m.innerHTML = `<div class="bg-white p-6 rounded shadow max-w-sm text-center">
        <h2 class="text-xl font-bold mb-2">Welcome to Sci Mini-Suite!</h2>
        <p class="mb-4">Free scientific tools, no login, no tracking. If they help, please support with a coffee.</p>
        <button id="ubsClose" class="bg-blue-600 text-white px-4 py-2 rounded mr-2">Explore</button>
        <a href="https://buymeacoffee.com/rorrimaesu" target="_blank" class="bg-yellow-400 px-4 py-2 rounded">☕ Support</a>
      </div>`;
    document.body.appendChild(m);
    document.getElementById('ubsClose').onclick = () => m.remove();
    localStorage.setItem('ubs_seen', '1');
  }
}

/**
 * Load OpenCV.js dynamically
 * @param {Function} callback - Function to call when OpenCV is loaded
 */
export function loadOpenCV(callback) {
  if (window.cv && window.cv.Mat) {
    console.log('OpenCV.js already loaded');
    callback();
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://docs.opencv.org/4.7.0/opencv.js';
  script.async = true;

  script.onload = () => {
    console.log('OpenCV.js loaded');

    // Wait for OpenCV to be fully initialized
    const checkOpenCV = () => {
      if (window.cv && window.cv.Mat) {
        console.log('OpenCV.js initialized');
        callback();
      } else {
        console.log('Waiting for OpenCV.js to initialize...');
        setTimeout(checkOpenCV, 100);
      }
    };

    // Start checking for OpenCV initialization
    checkOpenCV();
  };

  script.onerror = () => {
    console.error('Failed to load OpenCV.js');
    alert('Failed to load OpenCV.js. Please check your internet connection and try again.');
  };

  document.head.appendChild(script);
}

/**
 * Validate a numeric input
 * @param {HTMLInputElement} input - Input element to validate
 * @param {number|null} min - Minimum allowed value (null for no minimum)
 * @param {number|null} max - Maximum allowed value (null for no maximum)
 * @returns {boolean} - Whether the input is valid
 */
export function validateNumericInput(input, min = null, max = null) {
  const value = parseFloat(input.value);

  if (isNaN(value)) {
    showError(input, 'Please enter a valid number');
    return false;
  }

  if (min !== null && value < min) {
    showError(input, `Value must be at least ${min}`);
    return false;
  }

  if (max !== null && value > max) {
    showError(input, `Value must be at most ${max}`);
    return false;
  }

  clearError(input);
  return true;
}
