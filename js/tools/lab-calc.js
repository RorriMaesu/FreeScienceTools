/**
 * Lab Math Calculator - Calculate dilutions and concentrations
 */

/**
 * Renders the Lab Math Calculator UI
 * @param {HTMLElement} root - The container element
 * @param {Object} helpers - Helper functions
 */
export function labCalcUI(root, helpers) {
  root.innerHTML = `
  <h2 class="text-xl font-semibold mb-2">Dilution & Molarity Calculator</h2>
  <form id="calcForm" class="space-y-2 max-w-md">
    <label class="block">Stock concentration (M)
      <input type="number" step="any" name="stock" class="border p-1 w-full" required>
    </label>
    <label class="block">Desired concentration (M)
      <input type="number" step="any" name="desired" class="border p-1 w-full" required>
    </label>
    <label class="block">Final volume (mL)
      <input type="number" step="any" name="vol" class="border p-1 w-full" required>
    </label>
    <button class="bg-blue-600 text-white px-3 py-1 rounded">Calculate</button>
  </form>
  <div id="calcResult" class="mt-4"></div>`;

  document.getElementById('calcForm').onsubmit = e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const C1 = parseFloat(fd.get('stock'));
    const C2 = parseFloat(fd.get('desired'));
    const V2 = parseFloat(fd.get('vol'));

    if (C2 > C1) {
      if (helpers && helpers.toast) {
        helpers.toast('Desired concentration cannot exceed stock');
      } else {
        alert('Desired concentration cannot exceed stock');
      }
      return;
    }

    const V1 = (C2 * V2) / C1; // in mL
    const diluent = V2 - V1;

    document.getElementById('calcResult').innerHTML = `<p>Pipette <span class="font-semibold">${V1.toFixed(3)} mL</span> of stock solution and add <span class="font-semibold">${diluent.toFixed(3)} mL</span> diluent.</p>`;
    
    if (helpers && helpers.bumpCounter) {
      helpers.bumpCounter('labCalc');
    }
  };
}