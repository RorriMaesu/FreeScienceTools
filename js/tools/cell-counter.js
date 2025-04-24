/**
 * Quick Cell-Counter - Simple tool for counting cells in images
 */

/**
 * Renders the Quick Cell-Counter UI
 * @param {HTMLElement} root - The container element
 * @param {Object} helpers - Helper functions
 */
export function cellCounterUI(root, helpers) {
  root.innerHTML = `
  <h2 class="text-xl font-semibold mb-2">Quick Cell-Counter (Beta)</h2>
  <div class="max-w-2xl">
    <p class="mb-4 text-sm">Count cells in microscopy images. This tool uses OpenCV.js for image analysis.</p>
    <div class="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
      <p>This tool is in beta. For best results:</p>
      <ul class="list-disc list-inside">
        <li>Use images with good contrast between cells and background</li>
        <li>Adjust parameters as needed for your specific images</li>
        <li>For complex or crowded images, consider using specialized software</li>
      </ul>
    </div>

    <div class="mb-4">
      <label class="block mb-2">Upload image:</label>
      <input type="file" id="imageInput" accept="image/*" class="w-full border p-2">
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block mb-2">Threshold mode:</label>
        <select id="thresholdMode" class="border p-1 w-full">
          <option value="binary">Binary</option>
          <option value="otsu">Otsu</option>
          <option value="adaptive">Adaptive</option>
        </select>
      </div>
      
      <div>
        <label class="block mb-2">Threshold value (0-255):</label>
        <input type="range" id="thresholdValue" min="0" max="255" value="128" class="w-full">
        <p id="thresholdValueDisplay" class="text-center">128</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block mb-2">Min cell size (pixels):</label>
        <input type="range" id="minCellSize" min="10" max="500" value="50" class="w-full">
        <p id="minCellSizeDisplay" class="text-center">50</p>
      </div>
      
      <div>
        <label class="block mb-2">Max cell size (pixels):</label>
        <input type="range" id="maxCellSize" min="100" max="5000" value="1000" class="w-full">
        <p id="maxCellSizeDisplay" class="text-center">1000</p>
      </div>
    </div>

    <div class="mb-4">
      <button id="processImage" class="bg-blue-600 text-white px-3 py-1 rounded" disabled>Process Image</button>
      <button id="toggleOverlay" class="bg-gray-500 text-white px-3 py-1 rounded ml-2" disabled>Toggle Overlay</button>
      <button id="loadSample" class="bg-green-500 text-white px-3 py-1 rounded ml-2">Load Sample</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p class="font-semibold">Original Image:</p>
        <div class="bg-gray-100 border rounded h-64 flex items-center justify-center" id="originalImageContainer">
          <p class="text-gray-500">No image loaded</p>
        </div>
      </div>
      
      <div>
        <p class="font-semibold">Processed Image:</p>
        <div class="bg-gray-100 border rounded h-64 flex items-center justify-center" id="processedImageContainer">
          <p class="text-gray-500">No image processed</p>
        </div>
      </div>
    </div>

    <div id="resultContainer" class="mt-4 hidden">
      <div class="bg-blue-50 p-4 border border-blue-200 rounded">
        <h3 class="font-semibold mb-2">Results:</h3>
        <p>Cell count: <span id="cellCount" class="font-bold text-lg">0</span></p>
        <p class="text-sm text-gray-600 mt-2">Note: This is an approximation. Manual verification is recommended.</p>
      </div>
    </div>
  </div>`;

  // Show threshold value
  document.getElementById('thresholdValue').addEventListener('input', (e) => {
    document.getElementById('thresholdValueDisplay').textContent = e.target.value;
  });

  // Show min cell size
  document.getElementById('minCellSize').addEventListener('input', (e) => {
    document.getElementById('minCellSizeDisplay').textContent = e.target.value;
  });

  // Show max cell size
  document.getElementById('maxCellSize').addEventListener('input', (e) => {
    document.getElementById('maxCellSizeDisplay').textContent = e.target.value;
  });

  // Handle image upload
  let originalImage = null;
  let processedCanvas = null;
  let overlayCanvas = null;
  let showOverlay = true;

  document.getElementById('imageInput').addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
          // Display original image
          const container = document.getElementById('originalImageContainer');
          container.innerHTML = '';
          container.appendChild(img);
          
          // Enable process button
          document.getElementById('processImage').disabled = false;
          
          // Store reference to original image
          originalImage = img;
        };
        
        img.src = event.target.result;
      };
      
      reader.readAsDataURL(e.target.files[0]);
    }
  });

  // Load sample image
  document.getElementById('loadSample').addEventListener('click', () => {
    const img = new Image();
    img.onload = function() {
      // Display original image
      const container = document.getElementById('originalImageContainer');
      container.innerHTML = '';
      container.appendChild(img);
      
      // Enable process button
      document.getElementById('processImage').disabled = false;
      
      // Store reference to original image
      originalImage = img;
    };
    
    img.src = 'sample-cells.jpg'; // Assuming this file exists in your workspace
  });

  // Process image
  document.getElementById('processImage').addEventListener('click', () => {
    if (!originalImage) return;
    
    // Load OpenCV.js
    loadOpenCV(() => {
      processImageWithOpenCV();
      document.getElementById('toggleOverlay').disabled = false;
      document.getElementById('resultContainer').classList.remove('hidden');
      
      if (helpers && helpers.bumpCounter) {
        helpers.bumpCounter('cellCounter');
      }
    });
  });

  // Toggle overlay
  document.getElementById('toggleOverlay').addEventListener('click', () => {
    if (!processedCanvas || !overlayCanvas) return;
    
    showOverlay = !showOverlay;
    
    const container = document.getElementById('processedImageContainer');
    container.innerHTML = '';
    container.appendChild(showOverlay ? overlayCanvas : processedCanvas);
  });

  // Process image with OpenCV
  function processImageWithOpenCV() {
    const thresholdMode = document.getElementById('thresholdMode').value;
    const thresholdValue = parseInt(document.getElementById('thresholdValue').value);
    const minCellSize = parseInt(document.getElementById('minCellSize').value);
    const maxCellSize = parseInt(document.getElementById('maxCellSize').value);
    
    try {
      // Create canvas from image
      const canvas = document.createElement('canvas');
      canvas.width = originalImage.width;
      canvas.height = originalImage.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
      
      // Get image data
      let src = cv.imread(canvas);
      let dst = new cv.Mat();
      let gray = new cv.Mat();
      
      // Convert to grayscale
      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
      
      // Apply threshold based on selected mode
      if (thresholdMode === 'binary') {
        cv.threshold(gray, dst, thresholdValue, 255, cv.THRESH_BINARY_INV);
      } else if (thresholdMode === 'otsu') {
        cv.threshold(gray, dst, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);
      } else if (thresholdMode === 'adaptive') {
        cv.adaptiveThreshold(gray, dst, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY_INV, 11, 2);
      }
      
      // Find contours
      let contours = new cv.MatVector();
      let hierarchy = new cv.Mat();
      cv.findContours(dst, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
      
      // Filter contours by size
      let filteredContours = [];
      for (let i = 0; i < contours.size(); i++) {
        const contour = contours.get(i);
        const area = cv.contourArea(contour);
        
        if (area >= minCellSize && area <= maxCellSize) {
          filteredContours.push(contour);
        }
      }
      
      // Create output image for visualization
      let processedImg = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
      
      // Draw binary result
      for (let i = 0; i < dst.rows; i++) {
        for (let j = 0; j < dst.cols; j++) {
          if (dst.ucharPtr(i, j)[0] === 255) {
            processedImg.ucharPtr(i, j)[0] = 255; // B
            processedImg.ucharPtr(i, j)[1] = 255; // G
            processedImg.ucharPtr(i, j)[2] = 255; // R
          }
        }
      }
      
      // Create overlay image
      let overlayImg = src.clone();
      
      // Draw contours on overlay
      for (let i = 0; i < filteredContours.length; i++) {
        let color = new cv.Scalar(0, 255, 0); // Green
        cv.drawContours(overlayImg, filteredContours, i, color, 2);
      }
      
      // Display processed image
      processedCanvas = document.createElement('canvas');
      cv.imshow(processedCanvas, processedImg);
      
      // Display overlay image
      overlayCanvas = document.createElement('canvas');
      cv.imshow(overlayCanvas, overlayImg);
      
      // Add processed image to DOM
      const container = document.getElementById('processedImageContainer');
      container.innerHTML = '';
      container.appendChild(overlayCanvas);
      
      // Update cell count display
      document.getElementById('cellCount').textContent = filteredContours.length;
      
      // Free memory
      src.delete();
      dst.delete();
      gray.delete();
      hierarchy.delete();
      contours.delete();
      processedImg.delete();
      overlayImg.delete();
      
    } catch (err) {
      console.error(err);
      if (helpers && helpers.toast) {
        helpers.toast('Error processing image: ' + err.message);
      } else {
        alert('Error processing image: ' + err.message);
      }
    }
  }

  // Function to load OpenCV (defined in the HTML head)
  function loadOpenCV(callback) {
    if (window.cv) {
      callback();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://docs.opencv.org/4.7.0/opencv.js';
    script.async = true;
    script.onload = () => {
      console.log('OpenCV.js loaded');
      callback();
    };
    script.onerror = () => {
      console.error('Failed to load OpenCV.js');
      if (helpers && helpers.toast) {
        helpers.toast('Failed to load OpenCV.js. Please check your internet connection and try again.');
      } else {
        alert('Failed to load OpenCV.js. Please check your internet connection and try again.');
      }
    };
    document.head.appendChild(script);
  }
}