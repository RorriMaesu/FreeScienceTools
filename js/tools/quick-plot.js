/**
 * Quick-Plot Lab - Create simple plots from data
 */

/**
 * Renders the Quick-Plot Lab UI
 * @param {HTMLElement} root - The container element
 * @param {Object} helpers - Helper functions
 */
export function quickPlotUI(root, helpers) {
  root.innerHTML = `
  <h2 class="text-xl font-semibold mb-2">Quick-Plot Lab</h2>
  <textarea id="plotData" rows="6" class="w-full border p-2" placeholder="Paste two-column CSV: x,y (one pair per line)"></textarea>
  <div class="flex gap-2 my-2 items-end">
    <label class="block">Plot type
      <select id="plotType" class="border p-1">
        <option value="scatter">Scatter</option>
        <option value="bar">Bar</option>
        <option value="line">Line</option>
      </select>
    </label>
    <button id="makePlot" class="bg-blue-600 text-white px-3 py-1 rounded">Plot</button>
  </div>
  <div id="plotArea" class="bg-white shadow w-full h-96"></div>`;

  document.getElementById('makePlot').onclick = () => {
    const csv = document.getElementById('plotData').value.trim();
    const rows = csv.split(/\r?\n/).map(r => r.split(','));

    if (rows.length === 0 || rows[0].length < 2) {
      if (helpers && helpers.toast) {
        helpers.toast('Need two columns of data');
      } else {
        alert('Need two columns of data');
      }
      return;
    }

    const x = rows.map(r => r[0]);
    const y = rows.map(r => parseFloat(r[1]));
    const type = document.getElementById('plotType').value;
    const trace = {
      x,
      y,
      mode: type === 'scatter' ? 'markers' : undefined,
      type: type === 'scatter' ? 'scatter' : type
    };

    Plotly.newPlot('plotArea', [trace], {margin: {t: 20}});
    
    if (helpers && helpers.bumpCounter) {
      helpers.bumpCounter('quickPlot');
    }
  };
}