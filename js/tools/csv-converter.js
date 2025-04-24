/**
 * CSV to JSON Converter - Convert between CSV and JSON formats
 */

/**
 * Renders the CSV to JSON Converter UI
 * @param {HTMLElement} root - The container element
 * @param {Object} helpers - Helper functions
 */
export function csvConverterUI(root, helpers) {
  root.innerHTML = `
  <h2 class="text-xl font-semibold mb-2">CSV to JSON Converter</h2>
  <textarea id="dataInput" rows="8" class="w-full border p-2" placeholder="Paste CSV or JSON here..."></textarea>
  <div class="flex gap-2 my-2">
    <button id="toJson" class="bg-blue-600 text-white px-2 py-1 rounded">To JSON</button>
    <button id="toCsv" class="bg-green-600 text-white px-2 py-1 rounded">To CSV</button>
  </div>
  <textarea id="dataOutput" rows="8" class="w-full border p-2" placeholder="Output will appear here" readonly></textarea>`;

  const input = document.getElementById('dataInput');
  const output = document.getElementById('dataOutput');

  document.getElementById('toJson').onclick = () => {
    try {
      const parsed = Papa.parse(input.value.trim(), {header: true});
      output.value = JSON.stringify(parsed.data, null, 2);
      
      if (helpers && helpers.bumpCounter) {
        helpers.bumpCounter('csvToJson');
      }
    } catch(err) {
      if (helpers && helpers.toast) {
        helpers.toast('Conversion error');
      } else {
        alert('Conversion error');
      }
    }
  };

  document.getElementById('toCsv').onclick = () => {
    try {
      const obj = JSON.parse(input.value);
      output.value = Papa.unparse(obj);
      
      if (helpers && helpers.bumpCounter) {
        helpers.bumpCounter('jsonToCsv');
      }
    } catch(err) {
      if (helpers && helpers.toast) {
        helpers.toast('Conversion error: ensure valid JSON');
      } else {
        alert('Conversion error: ensure valid JSON');
      }
    }
  };
}