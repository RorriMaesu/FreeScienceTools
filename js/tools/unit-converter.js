/**
 * Unit & Concentration Converter - Utility for lab unit conversions
 */

/**
 * Renders the Unit & Concentration Converter UI
 * @param {HTMLElement} root - The container element
 * @param {Object} helpers - Helper functions
 */
export function unitConverterUI(root, helpers) {
  root.innerHTML = `
  <h2 class="text-xl font-semibold mb-2">Unit & Concentration Converter</h2>
  <div class="max-w-2xl">
    <p class="mb-4 text-sm">Convert between different units and calculate concentrations for lab work.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Unit Converter -->
      <div class="bg-blue-50 p-4 rounded border border-blue-200">
        <h3 class="font-semibold mb-3">Unit Converter</h3>

        <div class="mb-4">
          <label class="block mb-2">Conversion type:</label>
          <select id="conversionType" class="border p-1 w-full">
            <option value="length">Length</option>
            <option value="volume">Volume</option>
            <option value="mass">Mass</option>
            <option value="temperature">Temperature</option>
            <option value="time">Time</option>
            <option value="pressure">Pressure</option>
            <option value="energy">Energy</option>
            <option value="centrifuge">Centrifuge (rpm ↔ rcf/g)</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block mb-1">From:</label>
            <div class="flex">
              <input type="number" id="fromValue" class="border p-1 w-3/5" value="1" step="any">
              <select id="fromUnit" class="border p-1 w-2/5"></select>
            </div>
          </div>

          <div>
            <label class="block mb-1">To:</label>
            <div class="flex">
              <input type="number" id="toValue" class="border p-1 w-3/5" readonly>
              <select id="toUnit" class="border p-1 w-2/5"></select>
            </div>
          </div>
        </div>

        <button id="convertUnits" class="bg-blue-600 text-white px-3 py-1 rounded">Convert</button>
        <button id="swapUnits" class="bg-gray-500 text-white px-3 py-1 rounded ml-2">Swap</button>
      </div>

      <!-- Concentration Calculator -->
      <div class="bg-blue-50 p-4 rounded border border-blue-200">
        <h3 class="font-semibold mb-3">Concentration Calculator</h3>

        <div class="mb-4">
          <label class="block mb-2">Calculation type:</label>
          <select id="calcType" class="border p-1 w-full">
            <option value="molarToMass">Molarity to Mass</option>
            <option value="massToMolar">Mass to Molarity</option>
            <option value="dilution">Dilution Calculator</option>
          </select>
        </div>

        <div id="molarToMassForm">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block mb-1">Molarity:</label>
              <div class="flex">
                <input type="number" id="molarityInput" class="border p-1 w-3/5" value="1" step="any">
                <select id="molarityUnit" class="border p-1 w-2/5">
                  <option value="1">M</option>
                  <option value="0.001">mM</option>
                  <option value="0.000001">µM</option>
                  <option value="0.000000001">nM</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block mb-1">Molecular Weight:</label>
              <div class="flex">
                <input type="number" id="mwInput" class="border p-1 w-3/5" value="58.44" step="any">
                <span class="border p-1 w-2/5 bg-gray-100 text-center">g/mol</span>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label class="block mb-1">Result:</label>
            <div class="flex">
              <input type="number" id="massConcentrationResult" class="border p-1 w-3/5" readonly>
              <select id="massConcentrationUnit" class="border p-1 w-2/5">
                <option value="g/L">g/L</option>
                <option value="mg/mL">mg/mL</option>
                <option value="µg/µL">µg/µL</option>
                <option value="mg/L">mg/L</option>
                <option value="µg/mL">µg/mL</option>
                <option value="ng/µL">ng/µL</option>
              </select>
            </div>
          </div>
        </div>

        <div id="massToMolarForm" class="hidden">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block mb-1">Concentration:</label>
              <div class="flex">
                <input type="number" id="massInput" class="border p-1 w-3/5" value="1" step="any">
                <select id="massUnit" class="border p-1 w-2/5">
                  <option value="g/L">g/L</option>
                  <option value="mg/mL">mg/mL</option>
                  <option value="µg/µL">µg/µL</option>
                  <option value="mg/L">mg/L</option>
                  <option value="µg/mL">µg/mL</option>
                  <option value="ng/µL">ng/µL</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block mb-1">Molecular Weight:</label>
              <div class="flex">
                <input type="number" id="mwInput2" class="border p-1 w-3/5" value="58.44" step="any">
                <span class="border p-1 w-2/5 bg-gray-100 text-center">g/mol</span>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label class="block mb-1">Result:</label>
            <div class="flex">
              <input type="number" id="molarityResult" class="border p-1 w-3/5" readonly>
              <select id="molarityResultUnit" class="border p-1 w-2/5">
                <option value="1">M</option>
                <option value="0.001">mM</option>
                <option value="0.000001">µM</option>
                <option value="0.000000001">nM</option>
              </select>
            </div>
          </div>
        </div>

        <div id="dilutionForm" class="hidden">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block mb-1">Stock Concentration:</label>
              <div class="flex">
                <input type="number" id="stockConc" class="border p-1 w-3/5" value="1" step="any">
                <select id="stockConcUnit" class="border p-1 w-2/5">
                  <option value="M">M</option>
                  <option value="mM">mM</option>
                  <option value="µM">µM</option>
                  <option value="nM">nM</option>
                  <option value="mg/mL">mg/mL</option>
                  <option value="µg/mL">µg/mL</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block mb-1">Desired Concentration:</label>
              <div class="flex">
                <input type="number" id="desiredConc" class="border p-1 w-3/5" value="0.1" step="any">
                <select id="desiredConcUnit" class="border p-1 w-2/5">
                  <option value="M">M</option>
                  <option value="mM">mM</option>
                  <option value="µM">µM</option>
                  <option value="nM">nM</option>
                  <option value="mg/mL">mg/mL</option>
                  <option value="µg/mL">µg/mL</option>
                </select>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label class="block mb-1">Final Volume:</label>
            <div class="flex">
              <input type="number" id="finalVolume" class="border p-1 w-3/5" value="10" step="any">
              <select id="finalVolumeUnit" class="border p-1 w-2/5">
                <option value="L">L</option>
                <option value="mL" selected>mL</option>
                <option value="µL">µL</option>
              </select>
            </div>
          </div>

          <div class="mb-4">
            <label class="block mb-1">Result:</label>
            <div id="dilutionResult" class="p-2 bg-white border rounded">
              Add <span id="stockVolume" class="font-semibold">-</span> of stock to <span id="diluentVolume" class="font-semibold">-</span> of diluent.
            </div>
          </div>
        </div>

        <button id="calculateConcentration" class="bg-blue-600 text-white px-3 py-1 rounded">Calculate</button>
      </div>
    </div>

    <div class="mt-6 text-sm text-gray-600">
      <p class="font-semibold">Common Molecular Weights:</p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
        <button class="mw-btn border p-1 hover:bg-blue-100" data-mw="58.44">NaCl: 58.44 g/mol</button>
        <button class="mw-btn border p-1 hover:bg-blue-100" data-mw="342.3">Sucrose: 342.3 g/mol</button>
        <button class="mw-btn border p-1 hover:bg-blue-100" data-mw="180.16">Glucose: 180.16 g/mol</button>
        <button class="mw-btn border p-1 hover:bg-blue-100" data-mw="74.55">KCl: 74.55 g/mol</button>
      </div>
    </div>
  </div>`;

  // Unit conversion data
  const unitData = {
    length: {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      µm: 0.000001,
      nm: 0.000000001,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.344
    },
    volume: {
      L: 1,
      mL: 0.001,
      µL: 0.000001,
      nL: 0.000000001,
      'cm³': 0.001,
      'm³': 1000,
      'gal (US)': 0.003785411784,
      'qt (US)': 0.000946352946,
      'pt (US)': 0.000473176473,
      'fl oz (US)': 0.0000295735296
    },
    mass: {
      g: 1,
      kg: 1000,
      mg: 0.001,
      µg: 0.000001,
      ng: 0.000000001,
      lb: 453.59237,
      oz: 28.349523125
    },
    temperature: {
      '°C': 'C',
      '°F': 'F',
      K: 'K'
    },
    time: {
      s: 1,
      min: 60,
      h: 3600,
      day: 86400,
      ms: 0.001,
      µs: 0.000001,
      ns: 0.000000001
    },
    pressure: {
      Pa: 1,
      kPa: 1000,
      MPa: 1000000,
      bar: 100000,
      atm: 101325,
      mmHg: 133.322,
      torr: 133.322,
      psi: 6894.76
    },
    energy: {
      J: 1,
      kJ: 1000,
      cal: 4.184,
      kcal: 4184,
      eV: 1.602176634e-19,
      kWh: 3600000
    }
  };

  // Populate unit selectors
  function populateUnitSelectors() {
    const conversionType = document.getElementById('conversionType').value;
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');

    // Clear existing options
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';

    if (conversionType === 'centrifuge') {
      // Special case for centrifuge
      fromUnitSelect.innerHTML = '<option value="rpm">rpm</option><option value="rcf">rcf (× g)</option>';
      toUnitSelect.innerHTML = '<option value="rcf">rcf (× g)</option><option value="rpm">rpm</option>';
    } else {
      // Regular unit conversion
      const units = unitData[conversionType];

      for (const unit in units) {
        fromUnitSelect.add(new Option(unit, unit));
        toUnitSelect.add(new Option(unit, unit));
      }

      // Set default "to" unit to something different than "from" unit
      if (toUnitSelect.options.length > 1) {
        toUnitSelect.selectedIndex = 1;
      }
    }
  }

  // Handle conversion type change
  document.getElementById('conversionType').addEventListener('change', populateUnitSelectors);

  // Initialize unit selectors
  populateUnitSelectors();

  // Handle unit conversion
  document.getElementById('convertUnits').addEventListener('click', () => {
    const conversionType = document.getElementById('conversionType').value;
    const fromValue = parseFloat(document.getElementById('fromValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    if (isNaN(fromValue)) {
      if (helpers && helpers.toast) {
        helpers.toast('Please enter a valid number');
      } else {
        alert('Please enter a valid number');
      }
      return;
    }

    let result;

    if (conversionType === 'centrifuge') {
      // Special case for centrifuge conversion (rpm ↔ rcf)
      // rcf = 1.118 × 10^-5 × r × rpm²
      // where r is the radius in cm (default to 10 cm if not specified)
      const radius = 10; // cm

      if (fromUnit === 'rpm' && toUnit === 'rcf') {
        result = 1.118e-5 * radius * Math.pow(fromValue, 2);
      } else if (fromUnit === 'rcf' && toUnit === 'rpm') {
        result = Math.sqrt(fromValue / (1.118e-5 * radius));
      }
    } else if (conversionType === 'temperature') {
      // Special case for temperature conversion
      if (fromUnit === '°C' && toUnit === '°F') {
        result = (fromValue * 9/5) + 32;
      } else if (fromUnit === '°F' && toUnit === '°C') {
        result = (fromValue - 32) * 5/9;
      } else if (fromUnit === '°C' && toUnit === 'K') {
        result = fromValue + 273.15;
      } else if (fromUnit === 'K' && toUnit === '°C') {
        result = fromValue - 273.15;
      } else if (fromUnit === '°F' && toUnit === 'K') {
        result = (fromValue - 32) * 5/9 + 273.15;
      } else if (fromUnit === 'K' && toUnit === '°F') {
        result = (fromValue - 273.15) * 9/5 + 32;
      } else {
        result = fromValue; // Same unit
      }
    } else {
      // Regular unit conversion
      const units = unitData[conversionType];
      const baseValue = fromValue * units[fromUnit];
      result = baseValue / units[toUnit];
    }

    document.getElementById('toValue').value = result.toPrecision(6);
    
    if (helpers && helpers.bumpCounter) {
      helpers.bumpCounter('unitConverter');
    }
  });

  // Handle unit swap
  document.getElementById('swapUnits').addEventListener('click', () => {
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');

    // Swap units
    const tempUnit = fromUnitSelect.value;
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = tempUnit;

    // Swap values if toValue has a value
    if (toValue.value) {
      const tempValue = fromValue.value;
      fromValue.value = toValue.value;
      toValue.value = tempValue;
    }
  });

  // Handle calculation type change
  document.getElementById('calcType').addEventListener('change', () => {
    const calcType = document.getElementById('calcType').value;

    // Hide all forms
    document.getElementById('molarToMassForm').classList.add('hidden');
    document.getElementById('massToMolarForm').classList.add('hidden');
    document.getElementById('dilutionForm').classList.add('hidden');

    // Show selected form
    document.getElementById(calcType + 'Form').classList.remove('hidden');
  });

  // Handle molecular weight buttons
  document.querySelectorAll('.mw-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mw = btn.getAttribute('data-mw');
      document.getElementById('mwInput').value = mw;
      document.getElementById('mwInput2').value = mw;
    });
  });

  // Handle concentration calculations
  document.getElementById('calculateConcentration').addEventListener('click', () => {
    const calcType = document.getElementById('calcType').value;

    try {
      if (calcType === 'molarToMass') {
        // Molarity to mass concentration
        const molarity = parseFloat(document.getElementById('molarityInput').value);
        const molarityUnit = parseFloat(document.getElementById('molarityUnit').value);
        const mw = parseFloat(document.getElementById('mwInput').value);
        const massUnit = document.getElementById('massConcentrationUnit').value;

        if (isNaN(molarity) || isNaN(mw)) {
          throw new Error('Please enter valid numbers');
        }

        // Calculate mass concentration in g/L
        const massConcentration = molarity * molarityUnit * mw;

        // Convert to selected unit
        let result;
        switch (massUnit) {
          case 'g/L': result = massConcentration; break;
          case 'mg/mL': result = massConcentration; break; // Same as g/L
          case 'µg/µL': result = massConcentration; break; // Same as g/L
          case 'mg/L': result = massConcentration * 1000; break;
          case 'µg/mL': result = massConcentration; break; // Same as mg/mL
          case 'ng/µL': result = massConcentration; break; // Same as µg/mL
          default: result = massConcentration;
        }

        document.getElementById('massConcentrationResult').value = result.toPrecision(6);
      }
      else if (calcType === 'massToMolar') {
        // Mass concentration to molarity
        const massConc = parseFloat(document.getElementById('massInput').value);
        const massUnit = document.getElementById('massUnit').value;
        const mw = parseFloat(document.getElementById('mwInput2').value);
        const molarityUnit = parseFloat(document.getElementById('molarityResultUnit').value);

        if (isNaN(massConc) || isNaN(mw)) {
          throw new Error('Please enter valid numbers');
        }

        // Convert to g/L
        let massInGPerL;
        switch (massUnit) {
          case 'g/L': massInGPerL = massConc; break;
          case 'mg/mL': massInGPerL = massConc; break; // Same as g/L
          case 'µg/µL': massInGPerL = massConc; break; // Same as g/L
          case 'mg/L': massInGPerL = massConc / 1000; break;
          case 'µg/mL': massInGPerL = massConc / 1000; break; // Same as mg/L
          case 'ng/µL': massInGPerL = massConc / 1000; break; // Same as µg/mL
          default: massInGPerL = massConc;
        }

        // Calculate molarity in M
        const molarity = massInGPerL / mw;

        // Convert to selected unit
        const result = molarity / molarityUnit;

        document.getElementById('molarityResult').value = result.toPrecision(6);
      }
      else if (calcType === 'dilution') {
        // Dilution calculator (C1V1 = C2V2)
        const stockConc = parseFloat(document.getElementById('stockConc').value);
        const stockConcUnit = document.getElementById('stockConcUnit').value;
        const desiredConc = parseFloat(document.getElementById('desiredConc').value);
        const desiredConcUnit = document.getElementById('desiredConcUnit').value;
        const finalVolume = parseFloat(document.getElementById('finalVolume').value);
        const finalVolumeUnit = document.getElementById('finalVolumeUnit').value;

        if (isNaN(stockConc) || isNaN(desiredConc) || isNaN(finalVolume)) {
          throw new Error('Please enter valid numbers');
        }

        // Check if units are compatible
        if (stockConcUnit !== desiredConcUnit) {
          throw new Error('Stock and desired concentration units must be the same');
        }

        // Calculate stock volume (V1 = C2V2/C1)
        const stockVolume = (desiredConc * finalVolume) / stockConc;
        const diluentVolume = finalVolume - stockVolume;

        if (stockVolume > finalVolume) {
          throw new Error('Stock concentration is too low to achieve desired concentration');
        }

        // Display result
        document.getElementById('stockVolume').textContent = `${stockVolume.toFixed(3)} ${finalVolumeUnit}`;
        document.getElementById('diluentVolume').textContent = `${diluentVolume.toFixed(3)} ${finalVolumeUnit}`;
      }
      
      if (helpers && helpers.bumpCounter) {
        helpers.bumpCounter('concentrationCalc');
      }
    } catch (error) {
      if (helpers && helpers.toast) {
        helpers.toast(error.message || 'Calculation error');
      } else {
        alert(error.message || 'Calculation error');
      }
    }
  });
}