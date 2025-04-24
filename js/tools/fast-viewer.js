/**
 * FAST-Viewer - Interactive visualization tool for genomic/scientific data
 */

/**
 * Renders the FAST-Viewer UI
 * @param {HTMLElement} root - The container element
 * @param {Object} helpers - Helper functions
 */
export function fastViewerUI(root, helpers) {
  root.innerHTML = `
  <h2 class="text-xl font-semibold mb-2">FAST-Viewer</h2>
  <div class="max-w-2xl">
    <p class="mb-4 text-sm">Fast And Simple Tracks Viewer for genomic and scientific data visualization.</p>

    <div class="mb-4">
      <label class="block mb-2">Data format:</label>
      <select id="dataFormat" class="border p-1 w-full">
        <option value="bed">BED (Browser Extensible Data)</option>
        <option value="wig">WIG (Wiggle)</option>
        <option value="vcf">VCF (Variant Call Format)</option>
        <option value="custom">Custom format (tab-separated)</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block mb-2">Paste your data or upload a file:</label>
      <textarea id="dataInput" rows="8" class="w-full border p-2" placeholder=""></textarea>
      <div class="mt-2">
        <input type="file" id="fileInput" class="w-full border p-2">
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block mb-2">Reference genome (optional):</label>
        <select id="refGenome" class="border p-1 w-full">
          <option value="none">None</option>
          <option value="hg19">Human (hg19/GRCh37)</option>
          <option value="hg38">Human (hg38/GRCh38)</option>
          <option value="mm10">Mouse (mm10)</option>
          <option value="mm39">Mouse (mm39)</option>
        </select>
      </div>
      
      <div>
        <label class="block mb-2">Display mode:</label>
        <select id="displayMode" class="border p-1 w-full">
          <option value="linear">Linear</option>
          <option value="compact">Compact</option>
          <option value="heatmap">Heatmap (for numerical data)</option>
        </select>
      </div>
    </div>

    <div class="mb-4">
      <div class="flex gap-2">
        <button id="visualizeData" class="bg-blue-600 text-white px-3 py-1 rounded">Visualize Data</button>
        <button id="clearData" class="bg-gray-500 text-white px-3 py-1 rounded">Clear</button>
        <button id="loadExample" class="bg-green-500 text-white px-3 py-1 rounded">Load Example</button>
      </div>
    </div>

    <div id="visualizationContainer" class="mb-4 bg-white border rounded p-4 hidden">
      <div class="mb-4">
        <div class="flex justify-between items-center">
          <h3 class="font-semibold">Visualization</h3>
          <div class="flex gap-2">
            <button id="zoomIn" class="bg-blue-100 px-2 py-1 rounded">Zoom In</button>
            <button id="zoomOut" class="bg-blue-100 px-2 py-1 rounded">Zoom Out</button>
            <button id="panLeft" class="bg-blue-100 px-2 py-1 rounded">←</button>
            <button id="panRight" class="bg-blue-100 px-2 py-1 rounded">→</button>
          </div>
        </div>
      </div>
      
      <div id="viewer" class="h-64 border bg-gray-50"></div>
      
      <div class="mt-4">
        <p class="text-xs text-gray-600">Navigation: Use buttons to zoom and pan. You can also drag to pan and use mouse wheel to zoom.</p>
      </div>
    </div>

    <div id="trackInfoContainer" class="hidden">
      <h3 class="font-semibold mb-2">Track Information</h3>
      <div id="trackInfo" class="bg-blue-50 p-3 border border-blue-200 rounded"></div>
    </div>
  </div>`;

  // Handle file input
  document.getElementById('fileInput').addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = function(event) {
        document.getElementById('dataInput').value = event.target.result;
      };
      
      reader.readAsText(file);
    }
  });

  // Load example data based on selected format
  document.getElementById('loadExample').addEventListener('click', () => {
    const format = document.getElementById('dataFormat').value;
    let exampleData = '';
    
    switch (format) {
      case 'bed':
        exampleData = 
`chr1\t1000\t5000\tfeature1\t0\t+
chr1\t7000\t9000\tfeature2\t0\t-
chr2\t1000\t3000\tfeature3\t0\t+
chr2\t5000\t7000\tfeature4\t0\t-`;
        break;
      case 'wig':
        exampleData = 
`variableStep chrom=chr1
1000 5.0
1100 6.2
1200 7.5
1300 8.0
1400 7.2
1500 6.5
variableStep chrom=chr2
1000 3.0
1100 3.5
1200 4.0
1300 4.5
1400 5.0`;
        break;
      case 'vcf':
        exampleData = 
`##fileformat=VCFv4.2
#CHROM\tPOS\tID\tREF\tALT\tQUAL\tFILTER\tINFO
chr1\t1000\trs123\tA\tG\t60\tPASS\tAF=0.5
chr1\t2000\trs456\tT\tC\t80\tPASS\tAF=0.3
chr2\t1500\trs789\tG\tA\t90\tPASS\tAF=0.7`;
        break;
      case 'custom':
        exampleData = 
`#Track type: numeric
#chromosome\tstart\tend\tvalue
chr1\t1000\t2000\t5.6
chr1\t2000\t3000\t7.8
chr1\t3000\t4000\t9.2
chr2\t1000\t2000\t3.4
chr2\t2000\t3000\t4.5`;
        break;
    }
    
    document.getElementById('dataInput').value = exampleData;
  });

  // Set up the data format change event
  document.getElementById('dataFormat').addEventListener('change', () => {
    // Clear current data
    document.getElementById('dataInput').value = '';
    document.getElementById('fileInput').value = '';
  });

  // Visualize data
  document.getElementById('visualizeData').addEventListener('click', () => {
    const data = document.getElementById('dataInput').value.trim();
    if (!data) {
      if (helpers && helpers.toast) {
        helpers.toast('Please enter data or upload a file');
      } else {
        alert('Please enter data or upload a file');
      }
      return;
    }

    // Get visualization options
    const format = document.getElementById('dataFormat').value;
    const refGenome = document.getElementById('refGenome').value;
    const displayMode = document.getElementById('displayMode').value;
    
    // Show visualization container
    document.getElementById('visualizationContainer').classList.remove('hidden');
    document.getElementById('trackInfoContainer').classList.remove('hidden');
    
    // Parse and visualize the data
    visualizeData(data, format, refGenome, displayMode);
    
    if (helpers && helpers.bumpCounter) {
      helpers.bumpCounter('fastViewer');
    }
  });

  // Clear data
  document.getElementById('clearData').addEventListener('click', () => {
    document.getElementById('dataInput').value = '';
    document.getElementById('fileInput').value = '';
    document.getElementById('visualizationContainer').classList.add('hidden');
    document.getElementById('trackInfoContainer').classList.add('hidden');
  });

  // Add event listeners for zoom and pan buttons
  document.getElementById('zoomIn').addEventListener('click', () => {
    zoomVisualization(1.2); // Zoom in by 20%
  });
  
  document.getElementById('zoomOut').addEventListener('click', () => {
    zoomVisualization(0.8); // Zoom out by 20%
  });
  
  document.getElementById('panLeft').addEventListener('click', () => {
    panVisualization(-100); // Pan left by 100px
  });
  
  document.getElementById('panRight').addEventListener('click', () => {
    panVisualization(100); // Pan right by 100px
  });

  // Visualization state
  let currentData = [];
  let currentScale = 1;
  let currentOffset = 0;

  // Main visualization function
  function visualizeData(rawData, format, refGenome, displayMode) {
    try {
      // Parse the data based on format
      currentData = parseData(rawData, format);
      
      // Display visualization
      renderVisualization(currentData, displayMode);
      
      // Display track info
      updateTrackInfo(currentData);
      
    } catch (error) {
      console.error('Visualization error:', error);
      if (helpers && helpers.toast) {
        helpers.toast('Error visualizing data: ' + error.message);
      } else {
        alert('Error visualizing data: ' + error.message);
      }
    }
  }

  // Parse different data formats
  function parseData(rawData, format) {
    const lines = rawData.split(/\r?\n/).filter(line => line.trim() !== '' && !line.startsWith('#'));
    const parsed = [];
    
    switch (format) {
      case 'bed':
        // BED format: chrom, start, end, name, score, strand, ...
        for (const line of lines) {
          const fields = line.split('\t');
          if (fields.length >= 3) {
            parsed.push({
              chrom: fields[0],
              start: parseInt(fields[1]),
              end: parseInt(fields[2]),
              name: fields.length > 3 ? fields[3] : '',
              score: fields.length > 4 ? parseFloat(fields[4]) : 0,
              strand: fields.length > 5 ? fields[5] : '.'
            });
          }
        }
        break;
        
      case 'wig':
        // Simple WIG parser - handles only variableStep format
        let currentChrom = '';
        for (const line of lines) {
          if (line.startsWith('variableStep')) {
            const match = line.match(/chrom=(\w+)/);
            if (match) currentChrom = match[1];
          } else {
            const fields = line.split(/\s+/);
            if (fields.length >= 2 && currentChrom) {
              const position = parseInt(fields[0]);
              const value = parseFloat(fields[1]);
              parsed.push({
                chrom: currentChrom,
                start: position,
                end: position + 1, // WIG positions are 1-based
                score: value
              });
            }
          }
        }
        break;
        
      case 'vcf':
        // VCF format: CHROM, POS, ID, REF, ALT, QUAL, FILTER, INFO
        for (const line of lines) {
          const fields = line.split('\t');
          if (fields.length >= 8) {
            parsed.push({
              chrom: fields[0],
              start: parseInt(fields[1]),
              end: parseInt(fields[1]) + fields[3].length, // End position is start + length of REF
              name: fields[2],
              ref: fields[3],
              alt: fields[4],
              qual: parseFloat(fields[5]),
              filter: fields[6],
              info: fields[7]
            });
          }
        }
        break;
        
      case 'custom':
        // Custom tab-separated format
        for (const line of lines) {
          const fields = line.split('\t');
          if (fields.length >= 4) {
            parsed.push({
              chrom: fields[0],
              start: parseInt(fields[1]),
              end: parseInt(fields[2]),
              value: parseFloat(fields[3])
            });
          }
        }
        break;
    }
    
    return parsed;
  }

  // Render visualization
  function renderVisualization(data, mode) {
    const container = document.getElementById('viewer');
    container.innerHTML = '';
    
    // Get container dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Find data range for scaling
    let minStart = Infinity;
    let maxEnd = 0;
    for (const item of data) {
      minStart = Math.min(minStart, item.start);
      maxEnd = Math.max(maxEnd, item.end);
    }
    
    // Set base scale - how many bp per pixel
    const baseScale = (maxEnd - minStart) / width;
    
    // Create SVG for visualization
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    container.appendChild(svg);
    
    // Group chromosomes
    const chromGroups = {};
    for (const item of data) {
      if (!chromGroups[item.chrom]) {
        chromGroups[item.chrom] = [];
      }
      chromGroups[item.chrom].push(item);
    }
    
    // Track height
    const trackHeight = 30;
    const trackGap = 10;
    
    // Draw chromosome tracks
    let yOffset = 10;
    for (const chrom in chromGroups) {
      // Create group for chromosome
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('transform', `translate(0, ${yOffset})`);
      svg.appendChild(g);
      
      // Add chromosome label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.textContent = chrom;
      text.setAttribute('x', '5');
      text.setAttribute('y', '15');
      text.setAttribute('font-size', '12px');
      text.setAttribute('font-weight', 'bold');
      g.appendChild(text);
      
      // Draw features for this chromosome
      const items = chromGroups[chrom];
      
      if (mode === 'linear' || mode === 'compact') {
        // Linear/compact mode - draw boxes
        for (const item of items) {
          const x = (item.start - minStart) / baseScale * currentScale + currentOffset;
          const width = Math.max(2, (item.end - item.start) / baseScale * currentScale);
          
          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', x);
          rect.setAttribute('y', 20);
          rect.setAttribute('width', width);
          rect.setAttribute('height', trackHeight);
          rect.setAttribute('fill', item.strand === '-' ? '#8DA0CB' : '#66C2A5');
          rect.setAttribute('stroke', '#333');
          rect.setAttribute('stroke-width', '0.5');
          
          // Add data attributes for tooltip
          rect.dataset.chrom = item.chrom;
          rect.dataset.start = item.start;
          rect.dataset.end = item.end;
          rect.dataset.name = item.name || '';
          
          // Add hover tooltip
          rect.addEventListener('mouseover', (e) => {
            showTooltip(item, e.clientX, e.clientY);
          });
          
          rect.addEventListener('mouseout', () => {
            hideTooltip();
          });
          
          g.appendChild(rect);
        }
      } else if (mode === 'heatmap') {
        // Heatmap mode - draw colored squares based on score/value
        const cellWidth = 10;
        let xPos = 50; // Start after chromosome label
        
        // Find max value for color scaling
        let maxValue = 0;
        for (const item of items) {
          maxValue = Math.max(maxValue, item.score || item.value || 0);
        }
        
        for (const item of items) {
          const value = item.score || item.value || 0;
          const intensity = maxValue > 0 ? (value / maxValue) : 0;
          
          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', xPos);
          rect.setAttribute('y', 20);
          rect.setAttribute('width', cellWidth);
          rect.setAttribute('height', trackHeight);
          
          // Use a color gradient from blue to red
          const red = Math.floor(intensity * 255);
          const blue = Math.floor((1 - intensity) * 255);
          rect.setAttribute('fill', `rgb(${red}, 0, ${blue})`);
          
          // Add data attributes for tooltip
          rect.dataset.chrom = item.chrom;
          rect.dataset.start = item.start;
          rect.dataset.end = item.end;
          rect.dataset.value = value;
          
          // Add hover tooltip
          rect.addEventListener('mouseover', (e) => {
            showTooltip(item, e.clientX, e.clientY);
          });
          
          rect.addEventListener('mouseout', () => {
            hideTooltip();
          });
          
          g.appendChild(rect);
          xPos += cellWidth + 2;
        }
      }
      
      yOffset += trackHeight + trackGap + 20;
    }
    
    // Make the SVG interactive
    setupInteractivity(svg);
  }

  // Update track info panel
  function updateTrackInfo(data) {
    const infoContainer = document.getElementById('trackInfo');
    
    // Count features by chromosome
    const chromCounts = {};
    for (const item of data) {
      if (!chromCounts[item.chrom]) {
        chromCounts[item.chrom] = 0;
      }
      chromCounts[item.chrom]++;
    }
    
    // Create info HTML
    let html = `<p><strong>Total features:</strong> ${data.length}</p>`;
    html += '<ul class="list-disc list-inside mt-2">';
    for (const chrom in chromCounts) {
      html += `<li>${chrom}: ${chromCounts[chrom]} features</li>`;
    }
    html += '</ul>';
    
    infoContainer.innerHTML = html;
  }

  // Set up interactivity (pan, zoom)
  function setupInteractivity(svg) {
    let isDragging = false;
    let lastX = 0;
    
    svg.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastX = e.clientX;
      svg.style.cursor = 'grabbing';
    });
    
    svg.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - lastX;
        currentOffset += dx;
        lastX = e.clientX;
        
        // Update visualization with new offset
        const displayMode = document.getElementById('displayMode').value;
        renderVisualization(currentData, displayMode);
      }
    });
    
    svg.addEventListener('mouseup', () => {
      isDragging = false;
      svg.style.cursor = 'default';
    });
    
    svg.addEventListener('mouseleave', () => {
      isDragging = false;
      svg.style.cursor = 'default';
    });
    
    // Zoom with mouse wheel
    svg.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      // Zoom factor based on scroll direction
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      zoomVisualization(factor);
    });
  }

  // Function to zoom visualization
  function zoomVisualization(factor) {
    currentScale *= factor;
    
    // Limit zoom range
    currentScale = Math.max(0.1, Math.min(10, currentScale));
    
    // Update visualization with new scale
    const displayMode = document.getElementById('displayMode').value;
    renderVisualization(currentData, displayMode);
  }

  // Function to pan visualization
  function panVisualization(dx) {
    currentOffset += dx;
    
    // Update visualization with new offset
    const displayMode = document.getElementById('displayMode').value;
    renderVisualization(currentData, displayMode);
  }

  // Tooltip for feature information
  let tooltip = null;

  function showTooltip(item, x, y) {
    // Remove existing tooltip if any
    hideTooltip();
    
    // Create tooltip element
    tooltip = document.createElement('div');
    tooltip.style.position = 'fixed';
    tooltip.style.left = `${x + 10}px`;
    tooltip.style.top = `${y + 10}px`;
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '1000';
    
    // Create tooltip content based on data type
    let content = `<div><strong>${item.chrom}:${item.start}-${item.end}</strong></div>`;
    
    if (item.name) {
      content += `<div>Name: ${item.name}</div>`;
    }
    
    if (item.score !== undefined) {
      content += `<div>Score: ${item.score}</div>`;
    }
    
    if (item.value !== undefined) {
      content += `<div>Value: ${item.value}</div>`;
    }
    
    if (item.strand) {
      content += `<div>Strand: ${item.strand}</div>`;
    }
    
    if (item.ref && item.alt) {
      content += `<div>Variant: ${item.ref} → ${item.alt}</div>`;
      if (item.qual) {
        content += `<div>Quality: ${item.qual}</div>`;
      }
    }
    
    tooltip.innerHTML = content;
    
    // Add to document
    document.body.appendChild(tooltip);
  }

  function hideTooltip() {
    if (tooltip) {
      document.body.removeChild(tooltip);
      tooltip = null;
    }
  }
}