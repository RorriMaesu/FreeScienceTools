/**
 * Curve Fitting Toolbox
 * A premium tool for fitting various mathematical models to experimental data
 */

import { generateUUID } from '../core/utils.js';

// Define the models we support
const CURVE_MODELS = {
  linear: {
    name: 'Linear (y = mx + b)',
    formula: 'y = ax + b',
    initialParams: [1, 0],
    paramNames: ['a (slope)', 'b (intercept)'],
    func: (x, params) => params[0] * x + params[1],
    text: x => `${x[0]} * x + ${x[1]}`
  },
  quadratic: {
    name: 'Quadratic (y = ax² + bx + c)',
    formula: 'y = ax² + bx + c',
    initialParams: [1, 1, 0],
    paramNames: ['a', 'b', 'c'],
    func: (x, params) => params[0] * x * x + params[1] * x + params[2],
    text: x => `${x[0]} * x² + ${x[1]} * x + ${x[2]}`
  },
  exponential: {
    name: 'Exponential Growth/Decay (y = a*e^(bx))',
    formula: 'y = a*e^(bx)',
    initialParams: [1, 0.1],
    paramNames: ['a (amplitude)', 'b (rate)'],
    func: (x, params) => params[0] * Math.exp(params[1] * x),
    text: x => `${x[0]} * e^(${x[1]} * x)`
  },
  power: {
    name: 'Power Law (y = a*x^b)',
    formula: 'y = a*x^b',
    initialParams: [1, 1],
    paramNames: ['a (coefficient)', 'b (exponent)'],
    func: (x, params) => params[0] * Math.pow(x, params[1]),
    text: x => `${x[0]} * x^${x[1]}`
  },
  michaelisMenten: {
    name: 'Michaelis-Menten (y = Vmax*x/(Km + x))',
    formula: 'y = Vmax*x/(Km + x)',
    initialParams: [100, 10],
    paramNames: ['Vmax', 'Km'],
    func: (x, params) => (params[0] * x) / (params[1] + x),
    text: x => `${x[0]} * x / (${x[1]} + x)`
  },
  hill: {
    name: 'Hill Equation (y = Vmax*x^n/(K^n + x^n))',
    formula: 'y = Vmax*x^n/(K^n + x^n)',
    initialParams: [100, 10, 1],
    paramNames: ['Vmax', 'K', 'n (Hill coefficient)'],
    func: (x, params) => (params[0] * Math.pow(x, params[2])) / (Math.pow(params[1], params[2]) + Math.pow(x, params[2])),
    text: x => `${x[0]} * x^${x[2]} / (${x[1]}^${x[2]} + x^${x[2]})`
  },
  logistic: {
    name: 'Logistic/Sigmoid (y = a/(1 + e^(-b*(x-c))))',
    formula: 'y = a/(1 + e^(-b*(x-c)))',
    initialParams: [1, 1, 0],
    paramNames: ['a (max)', 'b (steepness)', 'c (midpoint)'],
    func: (x, params) => params[0] / (1 + Math.exp(-params[1] * (x - params[2]))),
    text: x => `${x[0]} / (1 + e^(-${x[1]} * (x - ${x[2]})))`
  },
  doseResponse: {
    name: 'Dose-Response (IC50/EC50) (y = min + (max-min)/(1 + (x/EC50)^Hill))',
    formula: 'y = min + (max-min)/(1 + (x/EC50)^Hill)',
    initialParams: [0, 100, 10, 1],
    paramNames: ['min', 'max', 'EC50/IC50', 'Hill slope'],
    func: (x, params) => params[0] + (params[1] - params[0]) / (1 + Math.pow(x / params[2], params[3])),
    text: x => `${x[0]} + (${x[1]} - ${x[0]}) / (1 + (x / ${x[2]})^${x[3]})`
  },
  gaussian: {
    name: 'Gaussian (y = a*e^(-(x-b)²/(2*c²)))',
    formula: 'y = a*e^(-(x-b)²/(2*c²))',
    initialParams: [1, 0, 1],
    paramNames: ['a (amplitude)', 'b (center)', 'c (width)'],
    func: (x, params) => params[0] * Math.exp(-Math.pow(x - params[1], 2) / (2 * Math.pow(params[2], 2))),
    text: x => `${x[0]} * e^(-(x-${x[1]})²/(2*${x[2]}²))`
  }
};

// Least squares fitting function
function fitCurve(xData, yData, model, initialParams) {
  // Simple implementation of Levenberg-Marquardt algorithm
  const maxIterations = 100;
  const lambda = 0.01;
  let params = [...initialParams];
  let bestParams = [...params];
  let bestError = Number.MAX_VALUE;
  
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    // Calculate error with current parameters
    let sumSquaredError = 0;
    for (let i = 0; i < xData.length; i++) {
      const predicted = model.func(xData[i], params);
      sumSquaredError += Math.pow(predicted - yData[i], 2);
    }
    
    // If this is better than our best so far, save these parameters
    if (sumSquaredError < bestError) {
      bestError = sumSquaredError;
      bestParams = [...params];
    }
    
    // Calculate Jacobian matrix for each parameter
    const jacobian = [];
    for (let i = 0; i < xData.length; i++) {
      const row = [];
      const h = 0.0001; // small step for numerical derivative
      
      for (let j = 0; j < params.length; j++) {
        // Forward difference approximation of derivative
        const paramsCopy = [...params];
        paramsCopy[j] += h;
        const derivative = (model.func(xData[i], paramsCopy) - model.func(xData[i], params)) / h;
        row.push(derivative);
      }
      jacobian.push(row);
    }
    
    // Calculate residuals
    const residuals = yData.map((y, i) => y - model.func(xData[i], params));
    
    // Calculate gradient (J^T * residuals)
    const gradient = Array(params.length).fill(0);
    for (let j = 0; j < params.length; j++) {
      for (let i = 0; i < xData.length; i++) {
        gradient[j] += jacobian[i][j] * residuals[i];
      }
    }
    
    // Calculate approximate Hessian (J^T * J)
    const hessian = Array(params.length).fill().map(() => Array(params.length).fill(0));
    for (let j = 0; j < params.length; j++) {
      for (let k = 0; k < params.length; k++) {
        for (let i = 0; i < xData.length; i++) {
          hessian[j][k] += jacobian[i][j] * jacobian[i][k];
        }
        // Add Levenberg-Marquardt damping
        if (j === k) {
          hessian[j][k] *= (1 + lambda);
        }
      }
    }
    
    // Solve linear system (hessian * delta = gradient) using simplified Gaussian elimination
    const delta = solveLinearSystem(hessian, gradient);
    
    // Update parameters
    for (let j = 0; j < params.length; j++) {
      params[j] += delta[j];
    }
  }
  
  return bestParams;
}

// Simple linear system solver for the fitting algorithm
function solveLinearSystem(A, b) {
  const n = b.length;
  const x = Array(n).fill(0);
  
  // Simple Gaussian elimination with pivoting
  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxIndex = i;
    let maxVal = Math.abs(A[i][i]);
    for (let j = i + 1; j < n; j++) {
      const absValue = Math.abs(A[j][i]);
      if (absValue > maxVal) {
        maxVal = absValue;
        maxIndex = j;
      }
    }
    
    // Swap rows if needed
    if (maxIndex !== i) {
      [A[i], A[maxIndex]] = [A[maxIndex], A[i]];
      [b[i], b[maxIndex]] = [b[maxIndex], b[i]];
    }
    
    // Eliminate
    for (let j = i + 1; j < n; j++) {
      const factor = A[j][i] / A[i][i];
      b[j] -= factor * b[i];
      for (let k = i; k < n; k++) {
        A[j][k] -= factor * A[i][k];
      }
    }
  }
  
  // Back-substitution
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += A[i][j] * x[j];
    }
    x[i] = (b[i] - sum) / A[i][i];
  }
  
  return x;
}

// Calculate R-squared for goodness of fit
function calculateRSquared(xData, yData, model, params) {
  const yMean = yData.reduce((a, b) => a + b, 0) / yData.length;
  
  let ssTotal = 0;
  let ssResidual = 0;
  
  for (let i = 0; i < xData.length; i++) {
    ssTotal += Math.pow(yData[i] - yMean, 2);
    ssResidual += Math.pow(yData[i] - model.func(xData[i], params), 2);
  }
  
  return 1 - (ssResidual / ssTotal);
}

// Generate predicted values for plotting
function generatePredictions(xData, model, params) {
  // Create a more dense x array for smoother curves
  const min = Math.min(...xData);
  const max = Math.max(...xData);
  const step = (max - min) / 100;
  
  const xPred = [];
  const yPred = [];
  
  for (let x = min; x <= max; x += step) {
    xPred.push(x);
    yPred.push(model.func(x, params));
  }
  
  return { xPred, yPred };
}

export function curveFitterUI(container, helpers) {
  const { toast, createTooltips, addHelpIcon } = helpers;
  const chartId = 'curve-fitting-chart-' + generateUUID();
  
  // Load required libraries
  const loadScriptPromise = function(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };
  
  Promise.all([
    loadScriptPromise('https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js')
  ]).then(() => {
    renderUI();
  }).catch(err => {
    container.innerHTML = `<div class="p-4 bg-red-100 text-red-700">Failed to load required libraries: ${err.message}</div>`;
  });
  
  function renderUI() {
    container.innerHTML = `
      <div class="p-4">
        <h2 class="text-xl font-bold mb-4">Curve Fitting Toolbox</h2>
        
        <div class="mb-6 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-800">This tool fits mathematical models to your experimental data using nonlinear regression. 
          Ideal for enzyme kinetics, dose-response curves, growth models, and more.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="md:col-span-1 bg-white p-4 rounded shadow">
            <h3 class="font-semibold mb-2">Data Input</h3>
            
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Select Model</label>
              <select id="modelSelect" class="w-full border rounded px-2 py-1">
                ${Object.entries(CURVE_MODELS).map(([key, model]) => 
                  `<option value="${key}">${model.name}</option>`
                ).join('')}
              </select>
              <div class="mt-2 text-sm text-gray-600" id="modelFormula"></div>
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Input Data (CSV or tab-separated)</label>
              <p class="text-xs text-gray-500 mb-1">Two columns: X values, Y values. One pair per line.</p>
              <textarea id="dataInput" class="w-full border rounded px-2 py-1 h-40 font-mono text-sm" 
                placeholder="x1,y1&#10;x2,y2&#10;..."></textarea>
            </div>
            
            <div class="mb-3">
              <label class="block text-sm font-medium mb-1">Initial Parameter Guesses (Optional)</label>
              <div id="paramInputs" class="space-y-2"></div>
            </div>
            
            <button id="fitButton" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Fit Curve
            </button>
            
            <div class="mt-3">
              <button id="loadSampleButton" class="text-sm text-blue-600 hover:underline">
                Load Sample Data
              </button>
            </div>
          </div>
          
          <div class="md:col-span-2 bg-white p-4 rounded shadow">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-semibold">Results</h3>
              <button id="exportButton" class="text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
                Export Results
              </button>
            </div>
            
            <div class="mb-4 h-64">
              <canvas id="${chartId}"></canvas>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-50 p-3 rounded">
                <h4 class="font-medium text-sm mb-2">Fitted Parameters</h4>
                <div id="fittedParams" class="text-sm"></div>
              </div>
              
              <div class="bg-gray-50 p-3 rounded">
                <h4 class="font-medium text-sm mb-2">Goodness of Fit</h4>
                <div id="goodnessOfFit" class="text-sm"></div>
              </div>
            </div>
            
            <div id="equationDisplay" class="mt-4 p-3 bg-gray-50 rounded">
              <h4 class="font-medium text-sm mb-2">Fitted Equation</h4>
              <div id="equation" class="text-center py-2"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Chart object
    let chart = null;
    
    // Current model and data
    let currentModel = CURVE_MODELS.linear;
    let xData = [];
    let yData = [];
    
    // Render parameter inputs for the selected model
    function updateParameterInputs() {
      const paramInputsDiv = document.getElementById('paramInputs');
      const modelKey = document.getElementById('modelSelect').value;
      currentModel = CURVE_MODELS[modelKey];
      
      document.getElementById('modelFormula').textContent = currentModel.formula;
      
      // Generate input fields for each parameter
      paramInputsDiv.innerHTML = currentModel.paramNames.map((name, index) => `
        <div class="flex items-center">
          <label class="w-1/2 text-xs">${name}:</label>
          <input type="number" step="any" id="param-${index}" 
            class="w-1/2 border rounded px-2 py-1 text-sm" 
            value="${currentModel.initialParams[index]}">
        </div>
      `).join('');
    }
    
    // Parse user input data
    function parseInputData() {
      const input = document.getElementById('dataInput').value.trim();
      
      // Reset data arrays
      xData = [];
      yData = [];
      
      // Split by lines
      const lines = input.split('\n');
      
      for (const line of lines) {
        if (!line.trim()) continue;
        
        // Try to split by comma first, then by tab
        let parts = line.includes(',') ? line.split(',') : line.split('\t');
        
        // Clean and parse
        if (parts.length >= 2) {
          const x = parseFloat(parts[0].trim());
          const y = parseFloat(parts[1].trim());
          
          if (!isNaN(x) && !isNaN(y)) {
            xData.push(x);
            yData.push(y);
          }
        }
      }
      
      return xData.length > 0;
    }
    
    // Get parameter values from input fields
    function getParameterValues() {
      return currentModel.paramNames.map((_, index) => {
        const input = document.getElementById(`param-${index}`);
        return parseFloat(input.value);
      });
    }
    
    // Sample data for different models
    const sampleData = {
      linear: "1,3\n2,5\n3,7\n4,9\n5,11",
      exponential: "0,1\n1,2.7\n2,7.4\n3,20.1\n4,54.6",
      michaelisMenten: "0.5,8.5\n1,15.5\n2,25.1\n4,35.8\n8,42.2\n16,46.8",
      doseResponse: "0.01,95\n0.1,92\n1,80\n10,50\n100,20\n1000,5",
      gaussian: "-3,0.1\n-2,0.5\n-1,0.9\n0,1\n1,0.9\n2,0.5\n3,0.1"
    };
    
    // Load appropriate sample data for the selected model
    function loadSampleData() {
      const modelKey = document.getElementById('modelSelect').value;
      const sample = sampleData[modelKey] || sampleData.linear;
      document.getElementById('dataInput').value = sample;
    }
    
    // Perform curve fitting
    function performFit() {
      if (!parseInputData()) {
        toast('Please enter valid data with at least 3 points', 'error');
        return;
      }
      
      if (xData.length < 3) {
        toast('At least 3 data points are required for fitting', 'error');
        return;
      }
      
      try {
        // Get initial parameter values from inputs
        const initialParams = getParameterValues();
        
        // Perform the fitting
        const fittedParams = fitCurve(xData, yData, currentModel, initialParams);
        
        // Calculate R-squared
        const rSquared = calculateRSquared(xData, yData, currentModel, fittedParams);
        
        // Generate predicted values for plotting
        const { xPred, yPred } = generatePredictions(xData, currentModel, fittedParams);
        
        // Update results display
        updateResults(fittedParams, rSquared);
        
        // Plot the data and fitted curve
        plotResults(xData, yData, xPred, yPred);
        
        // Bump the counter when a fit is completed
        helpers.bumpCounter();
        
      } catch (err) {
        toast(`Fitting error: ${err.message}. Try different initial parameters.`, 'error');
      }
    }
    
    // Update the results display
    function updateResults(params, rSquared) {
      const paramDisplay = document.getElementById('fittedParams');
      const goodnessDisplay = document.getElementById('goodnessOfFit');
      const equationDisplay = document.getElementById('equation');
      
      // Format parameters
      paramDisplay.innerHTML = currentModel.paramNames.map((name, i) => 
        `<div><span class="font-medium">${name}:</span> ${params[i].toFixed(4)}</div>`
      ).join('');
      
      // Format goodness of fit statistics
      goodnessDisplay.innerHTML = `
        <div><span class="font-medium">R²:</span> ${rSquared.toFixed(4)}</div>
        <div><span class="font-medium">R:</span> ${Math.sqrt(rSquared).toFixed(4)}</div>
      `;
      
      // Display the equation with fitted parameters
      try {
        equationDisplay.textContent = 'y = ' + currentModel.text(params.map(p => p.toFixed(3)));
      } catch (e) {
        equationDisplay.textContent = 'Error displaying equation';
      }
    }
    
    // Plot the results
    function plotResults(xData, yData, xPred, yPred) {
      const ctx = document.getElementById(chartId).getContext('2d');
      
      // Destroy existing chart if it exists
      if (chart) {
        chart.destroy();
      }
      
      // Create new chart
      chart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Data Points',
              data: xData.map((x, i) => ({ x, y: yData[i] })),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              pointRadius: 6,
              pointHoverRadius: 8
            },
            {
              label: 'Fitted Curve',
              data: xPred.map((x, i) => ({ x, y: yPred[i] })),
              type: 'line',
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.1)',
              borderWidth: 2,
              fill: false,
              tension: 0.1,
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'X'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Y'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  if (context.datasetIndex === 0) {
                    return `(${context.parsed.x.toFixed(2)}, ${context.parsed.y.toFixed(2)})`;
                  }
                  return `y = ${context.parsed.y.toFixed(2)}`;
                }
              }
            }
          }
        }
      });
    }
    
    // Export results
    function exportResults() {
      if (!xData.length || !chart) {
        toast('No data to export', 'error');
        return;
      }
      
      const modelKey = document.getElementById('modelSelect').value;
      const params = getParameterValues();
      const rSquared = calculateRSquared(xData, yData, currentModel, params);
      
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Curve Fitting Results\n";
      csvContent += `Model: ${currentModel.name}\n`;
      csvContent += `Formula: ${currentModel.formula}\n\n`;
      
      // Add parameters
      csvContent += "Fitted Parameters:\n";
      currentModel.paramNames.forEach((name, i) => {
        csvContent += `${name},${params[i]}\n`;
      });
      
      csvContent += `\nR-squared,${rSquared}\n\n`;
      
      // Add data
      csvContent += "X,Y,Y_fit\n";
      xData.forEach((x, i) => {
        const y_fit = currentModel.func(x, params);
        csvContent += `${x},${yData[i]},${y_fit}\n`;
      });
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `curve_fit_${modelKey}_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    // Initialize the UI
    updateParameterInputs();
    
    // Set up event listeners
    document.getElementById('modelSelect').addEventListener('change', updateParameterInputs);
    document.getElementById('fitButton').addEventListener('click', performFit);
    document.getElementById('loadSampleButton').addEventListener('click', loadSampleData);
    document.getElementById('exportButton').addEventListener('click', exportResults);
    
    createTooltips();
  }
}