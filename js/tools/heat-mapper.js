/**
 * Heat-Mapper - Generate heatmaps from numeric data
 */

/**
 * Renders the Heat-Mapper UI
 * @param {HTMLElement} root - The container element
 * @param {Object} helpers - Helper functions
 */
export function heatMapperUI(root, helpers) {
  root.innerHTML = `
  <h2 class="text-xl font-semibold mb-2">Heat-Mapper</h2>
  <div class="max-w-2xl">
    <p class="mb-4 text-sm">Generate heatmaps from your numeric data.</p>

    <div class="mb-4">
      <label class="block mb-2">Data input format:</label>
      <select id="inputFormat" class="border p-1 w-full">
        <option value="csv">CSV (comma-separated values)</option>
        <option value="tsv">TSV (tab-separated values)</option>
        <option value="matrix">Matrix (space-separated)</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block mb-2">Paste your data (columns as variables, rows as samples):</label>
      <textarea id="heatmapData" rows="8" class="w-full border p-2" placeholder="Example (CSV):
sample1,10.2,5.3,8.7
sample2,12.4,7.1,6.2
sample3,8.9,9.5,11.3"></textarea>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block mb-2">Color scale:</label>
        <select id="colorScale" class="border p-1 w-full">
          <option value="Viridis">Viridis</option>
          <option value="Plasma">Plasma</option>
          <option value="RdBu">Red-Blue</option>
          <option value="Spectral">Spectral</option>
          <option value="YlGnBu">Yellow-Green-Blue</option>
          <option value="YlOrRd">Yellow-Orange-Red</option>
        </select>
      </div>
      
      <div>
        <label class="block mb-2">Normalization:</label>
        <select id="normalization" class="border p-1 w-full">
          <option value="none">None</option>
          <option value="row">Row normalization (z-score)</option>
          <option value="column">Column normalization (z-score)</option>
        </select>
      </div>
    </div>

    <div class="flex gap-2 mb-4">
      <button id="generateHeatmap" class="bg-blue-600 text-white px-3 py-1 rounded">Generate Heatmap</button>
      <button id="generateExample" class="bg-gray-500 text-white px-3 py-1 rounded">Load Example</button>
    </div>

    <div id="heatmapContainer" class="mb-4 bg-white border rounded h-96 hidden"></div>
    
    <div id="downloadContainer" class="hidden">
      <button id="downloadHeatmap" class="bg-green-600 text-white px-3 py-1 rounded">Download as PNG</button>
    </div>
  </div>`;

  // Load example data
  document.getElementById('generateExample').addEventListener('click', () => {
    const exampleData = 
`Gene_A,Sample1,Sample2,Sample3,Sample4,Sample5
Gene1,5.2,3.8,4.5,7.2,6.1
Gene2,6.8,7.1,5.5,4.2,3.9
Gene3,8.4,8.9,7.6,5.3,4.8
Gene4,3.2,2.9,5.2,6.7,7.3
Gene5,2.5,3.1,5.8,6.9,7.5
Gene6,7.8,6.9,5.5,4.1,3.2
Gene7,9.2,8.5,6.3,4.6,3.1
Gene8,4.5,4.8,5.2,5.6,5.9`;
    
    document.getElementById('heatmapData').value = exampleData;
    document.getElementById('inputFormat').value = 'csv';
  });

  // Generate heatmap
  document.getElementById('generateHeatmap').addEventListener('click', () => {
    const rawData = document.getElementById('heatmapData').value.trim();
    if (!rawData) {
      if (helpers && helpers.toast) {
        helpers.toast('Please enter data');
      } else {
        alert('Please enter data');
      }
      return;
    }

    try {
      // Get input format
      const format = document.getElementById('inputFormat').value;
      
      // Parse data based on format
      let separator;
      switch (format) {
        case 'csv': separator = ','; break;
        case 'tsv': separator = '\t'; break;
        case 'matrix': separator = /\s+/; break;
        default: separator = ',';
      }
      
      const lines = rawData.split(/\r?\n/).filter(line => line.trim() !== '');
      
      // Extract labels and data
      let xLabels = [];
      let yLabels = [];
      let zValues = [];
      
      // Parse header row for x-labels
      const header = lines[0].split(separator);
      xLabels = header.slice(1); // First column might be row labels
      
      // Parse data rows
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(separator);
        yLabels.push(row[0]); // First column as y-label
        
        // Convert string values to numbers
        const dataRow = row.slice(1).map(val => isNaN(parseFloat(val)) ? 0 : parseFloat(val));
        zValues.push(dataRow);
      }
      
      // Apply normalization if selected
      const normalization = document.getElementById('normalization').value;
      if (normalization !== 'none') {
        zValues = normalizeData(zValues, normalization);
      }
      
      // Create heatmap
      const colorScale = document.getElementById('colorScale').value;
      const data = [{
        z: zValues,
        x: xLabels,
        y: yLabels,
        type: 'heatmap',
        colorscale: colorScale,
        hoverongaps: false
      }];
      
      const layout = {
        title: 'Heatmap',
        margin: {
          l: 100, // Adjust based on y-label length
          r: 50,
          b: 100, // Adjust based on x-label length
          t: 50,
          pad: 4
        }
      };
      
      // Show the container
      const container = document.getElementById('heatmapContainer');
      container.classList.remove('hidden');
      document.getElementById('downloadContainer').classList.remove('hidden');
      
      // Create the plot
      Plotly.newPlot('heatmapContainer', data, layout);
      
      if (helpers && helpers.bumpCounter) {
        helpers.bumpCounter('heatmapper');
      }
      
    } catch (error) {
      if (helpers && helpers.toast) {
        helpers.toast('Error generating heatmap: ' + error.message);
      } else {
        alert('Error generating heatmap: ' + error.message);
      }
    }
  });
  
  // Download heatmap as PNG
  document.getElementById('downloadHeatmap').addEventListener('click', () => {
    Plotly.downloadImage('heatmapContainer', {
      format: 'png',
      width: 1200,
      height: 800,
      filename: 'heatmap'
    });
    
    if (helpers && helpers.bumpCounter) {
      helpers.bumpCounter('downloadHeatmap');
    }
  });
  
  // Function to normalize data (z-score)
  function normalizeData(data, method) {
    const normalized = JSON.parse(JSON.stringify(data)); // Deep clone
    
    if (method === 'row') {
      // Row normalization (z-score)
      for (let i = 0; i < normalized.length; i++) {
        const row = normalized[i];
        const mean = row.reduce((sum, val) => sum + val, 0) / row.length;
        const stdDev = Math.sqrt(row.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / row.length);
        
        // Avoid division by zero
        if (stdDev === 0) continue;
        
        for (let j = 0; j < row.length; j++) {
          normalized[i][j] = (row[j] - mean) / stdDev;
        }
      }
    } else if (method === 'column') {
      // Column normalization (z-score)
      // First, transpose the data for easier column access
      const transposed = [];
      for (let j = 0; j < normalized[0].length; j++) {
        const col = [];
        for (let i = 0; i < normalized.length; i++) {
          col.push(normalized[i][j]);
        }
        transposed.push(col);
      }
      
      // Normalize each column
      for (let j = 0; j < transposed.length; j++) {
        const col = transposed[j];
        const mean = col.reduce((sum, val) => sum + val, 0) / col.length;
        const stdDev = Math.sqrt(col.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / col.length);
        
        // Avoid division by zero
        if (stdDev === 0) continue;
        
        for (let i = 0; i < col.length; i++) {
          transposed[j][i] = (col[i] - mean) / stdDev;
        }
      }
      
      // Transpose back to original format
      for (let i = 0; i < normalized.length; i++) {
        for (let j = 0; j < normalized[0].length; j++) {
          normalized[i][j] = transposed[j][i];
        }
      }
    }
    
    return normalized;
  }
}