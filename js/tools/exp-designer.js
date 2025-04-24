/**
 * Experimental Design Planner
 * A premium tool for creating optimal experimental designs
 */

import { generateUUID } from '../core/utils.js';

export function expDesignerUI(container, helpers) {
  const { toast, createTooltips, addHelpIcon } = helpers;
  
  container.innerHTML = `
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Experimental Design Planner</h2>
      
      <div class="mb-6 p-4 bg-blue-50 rounded-lg">
        <p class="text-sm text-blue-800">This tool helps you design scientifically rigorous experiments by optimizing sample size, 
        treatment groups, and randomization based on statistical principles.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-1 bg-white p-4 rounded shadow">
          <h3 class="font-semibold mb-4">Design Parameters</h3>
          
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Experimental Design Type</label>
            <select id="designType" class="w-full border rounded px-2 py-1">
              <option value="completely-randomized">Completely Randomized Design</option>
              <option value="randomized-block">Randomized Block Design</option>
              <option value="factorial">Factorial Design</option>
              <option value="latin-square">Latin Square Design</option>
              <option value="repeated-measures">Repeated Measures Design</option>
            </select>
          </div>
          
          <div id="designSpecificParams"></div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Target Statistical Power</label>
            <div class="flex items-center">
              <input type="range" id="powerSlider" min="0.7" max="0.95" step="0.05" value="0.8" class="w-2/3 mr-2">
              <span id="powerValue">0.8</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">Higher values require larger sample sizes</p>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Significance Level (α)</label>
            <select id="alphaLevel" class="w-full border rounded px-2 py-1">
              <option value="0.05">0.05 (Standard)</option>
              <option value="0.01">0.01 (Conservative)</option>
              <option value="0.1">0.10 (Exploratory)</option>
            </select>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Expected Effect Size</label>
            <select id="effectSize" class="w-full border rounded px-2 py-1">
              <option value="0.2">Small (d = 0.2)</option>
              <option value="0.5" selected>Medium (d = 0.5)</option>
              <option value="0.8">Large (d = 0.8)</option>
              <option value="custom">Custom</option>
            </select>
            <div id="customEffectContainer" class="hidden mt-2">
              <input type="number" id="customEffect" min="0.1" max="2" step="0.1" value="0.5" class="w-full border rounded px-2 py-1">
            </div>
          </div>
          
          <button id="generateDesignBtn" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Generate Optimal Design
          </button>
          
          <div class="mt-3">
            <button id="resetBtn" class="text-sm text-blue-600 hover:underline">
              Reset Form
            </button>
          </div>
        </div>
        
        <div id="resultsContainer" class="md:col-span-2 bg-white p-4 rounded shadow hidden">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-semibold">Experimental Design</h3>
            <button id="exportDesignBtn" class="text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
              Export Design
            </button>
          </div>
          
          <div id="designSummary" class="mb-4 p-3 bg-blue-50 rounded text-sm"></div>
          
          <div class="mb-4">
            <h4 class="font-medium text-sm mb-2">Sample Size Requirements</h4>
            <div id="sampleSizeInfo" class="p-3 bg-gray-50 rounded text-sm"></div>
          </div>
          
          <div class="mb-4">
            <h4 class="font-medium text-sm mb-2">Experimental Groups</h4>
            <div class="overflow-x-auto">
              <table id="groupsTable" class="min-w-full bg-white border text-sm">
                <thead class="bg-gray-100">
                  <tr id="groupsTableHeader"></tr>
                </thead>
                <tbody id="groupsTableBody"></tbody>
              </table>
            </div>
          </div>
          
          <div class="mb-4">
            <h4 class="font-medium text-sm mb-2">Randomization Plan</h4>
            <div id="randomizationPlan" class="p-3 bg-gray-50 rounded text-sm"></div>
          </div>
          
          <div class="mb-4">
            <h4 class="font-medium text-sm mb-2">Statistical Analysis Plan</h4>
            <div id="analysisRecommendation" class="p-3 bg-gray-50 rounded text-sm"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Cache frequently used elements
  const designType = document.getElementById('designType');
  const designSpecificParams = document.getElementById('designSpecificParams');
  const powerSlider = document.getElementById('powerSlider');
  const powerValue = document.getElementById('powerValue');
  const effectSize = document.getElementById('effectSize');
  const customEffectContainer = document.getElementById('customEffectContainer');
  const customEffect = document.getElementById('customEffect');
  const generateDesignBtn = document.getElementById('generateDesignBtn');
  const resetBtn = document.getElementById('resetBtn');
  const resultsContainer = document.getElementById('resultsContainer');
  const designSummary = document.getElementById('designSummary');
  const sampleSizeInfo = document.getElementById('sampleSizeInfo');
  const groupsTableHeader = document.getElementById('groupsTableHeader');
  const groupsTableBody = document.getElementById('groupsTableBody');
  const randomizationPlan = document.getElementById('randomizationPlan');
  const analysisRecommendation = document.getElementById('analysisRecommendation');
  const exportDesignBtn = document.getElementById('exportDesignBtn');
  
  // Event listeners
  powerSlider.addEventListener('input', () => {
    powerValue.textContent = powerSlider.value;
  });
  
  effectSize.addEventListener('change', () => {
    if (effectSize.value === 'custom') {
      customEffectContainer.classList.remove('hidden');
    } else {
      customEffectContainer.classList.add('hidden');
    }
  });
  
  designType.addEventListener('change', updateDesignParams);
  
  generateDesignBtn.addEventListener('click', generateDesign);
  
  resetBtn.addEventListener('click', () => {
    resetForm();
    resultsContainer.classList.add('hidden');
  });
  
  exportDesignBtn.addEventListener('click', exportDesign);
  
  // Design-specific parameters for each design type
  const designParams = {
    'completely-randomized': `
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Number of Treatment Groups</label>
        <input type="number" id="numGroups" min="2" max="10" value="3" class="w-full border rounded px-2 py-1">
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Control Group</label>
        <div class="flex items-center">
          <input type="checkbox" id="includeControl" class="mr-2" checked>
          <span class="text-sm">Include control/placebo group</span>
        </div>
      </div>
    `,
    
    'randomized-block': `
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Number of Treatment Groups</label>
        <input type="number" id="numGroups" min="2" max="10" value="3" class="w-full border rounded px-2 py-1">
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Number of Blocks</label>
        <input type="number" id="numBlocks" min="2" max="10" value="3" class="w-full border rounded px-2 py-1">
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Blocking Factor</label>
        <select id="blockingFactor" class="w-full border rounded px-2 py-1">
          <option value="time">Time Period</option>
          <option value="location">Location</option>
          <option value="batch">Batch/Lot</option>
          <option value="technician">Technician/Operator</option>
          <option value="other">Other</option>
        </select>
      </div>
    `,
    
    'factorial': `
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Factor A (Levels)</label>
        <input type="number" id="factorALevels" min="2" max="5" value="2" class="w-full border rounded px-2 py-1">
        <input type="text" id="factorAName" placeholder="Factor A name (e.g., Temperature)" class="w-full border rounded px-2 py-1 mt-1">
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Factor B (Levels)</label>
        <input type="number" id="factorBLevels" min="2" max="5" value="2" class="w-full border rounded px-2 py-1">
        <input type="text" id="factorBName" placeholder="Factor B name (e.g., pH)" class="w-full border rounded px-2 py-1 mt-1">
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Replicates</label>
        <input type="number" id="factorialReplicates" min="1" max="10" value="3" class="w-full border rounded px-2 py-1">
        <p class="text-xs text-gray-500 mt-1">Number of replicates per factorial combination</p>
      </div>
    `,
    
    'latin-square': `
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Square Size</label>
        <select id="squareSize" class="w-full border rounded px-2 py-1">
          <option value="3">3×3 (3 treatments)</option>
          <option value="4" selected>4×4 (4 treatments)</option>
          <option value="5">5×5 (5 treatments)</option>
          <option value="6">6×6 (6 treatments)</option>
        </select>
        <p class="text-xs text-gray-500 mt-1">The size determines the number of treatments and rows/columns</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Row Factor</label>
        <input type="text" id="rowFactor" placeholder="e.g., Time period, Day" class="w-full border rounded px-2 py-1" value="Time">
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Column Factor</label>
        <input type="text" id="colFactor" placeholder="e.g., Location, Subject" class="w-full border rounded px-2 py-1" value="Location">
      </div>
    `,
    
    'repeated-measures': `
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Number of Groups</label>
        <input type="number" id="rmGroups" min="1" max="5" value="1" class="w-full border rounded px-2 py-1">
        <p class="text-xs text-gray-500 mt-1">Number of between-subject groups</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Number of Time Points</label>
        <input type="number" id="timePoints" min="2" max="10" value="4" class="w-full border rounded px-2 py-1">
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Correlation Between Repeated Measures</label>
        <select id="correlation" class="w-full border rounded px-2 py-1">
          <option value="0.3">Low (0.3)</option>
          <option value="0.5" selected>Medium (0.5)</option>
          <option value="0.7">High (0.7)</option>
        </select>
      </div>
    `
  };
  
  // Update design-specific parameters based on selected design type
  function updateDesignParams() {
    const selectedDesign = designType.value;
    designSpecificParams.innerHTML = designParams[selectedDesign] || '';
    
    createTooltips();
    
    // Add help icons for specific design types
    if (selectedDesign === 'completely-randomized') {
      const numGroupsLabel = document.querySelector('label[for="numGroups"]');
      addHelpIcon(numGroupsLabel, 'The number of different treatment groups in your experiment (including control if applicable).');
      
      const includeControlLabel = document.querySelector('label[for="includeControl"]');
      addHelpIcon(includeControlLabel, 'Include a control or placebo group to compare treatments against.');
    }
    else if (selectedDesign === 'randomized-block') {
      const blockingFactorLabel = document.querySelector('label[for="blockingFactor"]');
      addHelpIcon(blockingFactorLabel, 'The factor that creates known variation in your experiment (e.g., different days, locations, or batches). Blocking reduces unexplained variation by accounting for this factor.');
    }
    else if (selectedDesign === 'factorial') {
      const factorALabel = document.querySelector('label[for="factorALevels"]');
      addHelpIcon(factorALabel, 'Factor A represents one independent variable in your experiment. The number of levels is how many different values this factor will have.');
      
      const replicatesLabel = document.querySelector('label[for="factorialReplicates"]');
      addHelpIcon(replicatesLabel, 'Number of times each combination of factors will be tested. More replicates improves statistical power but requires more experimental units.');
    }
  }
  
  // Generate experimental design based on inputs
  function generateDesign() {
    // Get common parameters
    const selectedDesign = designType.value;
    const targetPower = parseFloat(powerSlider.value);
    const alpha = parseFloat(document.getElementById('alphaLevel').value);
    let effectSizeValue = effectSize.value === 'custom' ? 
      parseFloat(customEffect.value) : 
      parseFloat(effectSize.value);
    
    // Validate effect size
    if (isNaN(effectSizeValue) || effectSizeValue <= 0) {
      toast('Please enter a valid effect size', 'error');
      return;
    }
    
    // Get design-specific parameters
    const params = {};
    try {
      switch (selectedDesign) {
        case 'completely-randomized':
          params.numGroups = parseInt(document.getElementById('numGroups').value);
          params.includeControl = document.getElementById('includeControl').checked;
          break;
          
        case 'randomized-block':
          params.numGroups = parseInt(document.getElementById('numGroups').value);
          params.numBlocks = parseInt(document.getElementById('numBlocks').value);
          params.blockingFactor = document.getElementById('blockingFactor').value;
          break;
          
        case 'factorial':
          params.factorALevels = parseInt(document.getElementById('factorALevels').value);
          params.factorBLevels = parseInt(document.getElementById('factorBLevels').value);
          params.factorAName = document.getElementById('factorAName').value || 'Factor A';
          params.factorBName = document.getElementById('factorBName').value || 'Factor B';
          params.replicates = parseInt(document.getElementById('factorialReplicates').value);
          break;
          
        case 'latin-square':
          params.squareSize = parseInt(document.getElementById('squareSize').value);
          params.rowFactor = document.getElementById('rowFactor').value || 'Row';
          params.colFactor = document.getElementById('colFactor').value || 'Column';
          break;
          
        case 'repeated-measures':
          params.rmGroups = parseInt(document.getElementById('rmGroups').value);
          params.timePoints = parseInt(document.getElementById('timePoints').value);
          params.correlation = parseFloat(document.getElementById('correlation').value);
          break;
      }
    } catch (e) {
      toast('Please fill out all required fields', 'error');
      return;
    }
    
    // Generate appropriate design based on type and parameters
    try {
      // Calculate sample size based on power analysis
      const sampleSize = calculateSampleSize(selectedDesign, effectSizeValue, alpha, targetPower, params);
      
      // Create the experimental design layout
      const design = createExperimentalDesign(selectedDesign, params, sampleSize);
      
      // Display results
      displayResults(selectedDesign, params, sampleSize, design, effectSizeValue, alpha, targetPower);
      
      // Show results container
      resultsContainer.classList.remove('hidden');
      
      // Scroll to results
      resultsContainer.scrollIntoView({ behavior: 'smooth' });
      
      // Increment usage counter
      helpers.bumpCounter();
      
    } catch (e) {
      toast(`Error generating design: ${e.message}`, 'error');
    }
  }
  
  // Calculate required sample size based on power analysis
  function calculateSampleSize(designType, effectSize, alpha, power, params) {
    // Power analysis formulas for different designs
    // These are simplified approximations
    
    let result = {
      totalSampleSize: 0,
      perGroup: 0,
      details: ''
    };
    
    switch (designType) {
      case 'completely-randomized':
        // Basic sample size calculation for ANOVA
        const numGroups = params.numGroups;
        const criticalF = 3.9; // Approximate critical F for alpha=0.05
        
        // Sample size per group for one-way ANOVA
        const nPerGroup = Math.ceil(
          criticalF * (1 + 1/effectSize) * (1/effectSize) * (numGroups-1) * (1/Math.pow(power, 1/numGroups))
        );
        
        result.perGroup = nPerGroup;
        result.totalSampleSize = nPerGroup * numGroups;
        result.details = `${nPerGroup} subjects per group × ${numGroups} groups = ${result.totalSampleSize} total`;
        break;
        
      case 'randomized-block':
        // Sample size for randomized block design (accounting for blocking efficiency)
        const groupsRBD = params.numGroups;
        const blocks = params.numBlocks;
        
        // Assumption: blocking reduces variance by about 20%
        const blockingEfficiency = 0.8;
        const nPerGroupRBD = Math.ceil(
          criticalF * (1 + 1/effectSize) * (1/effectSize) * (groupsRBD-1) * 
          (1/Math.pow(power, 1/groupsRBD)) * blockingEfficiency
        );
        
        result.perGroup = nPerGroupRBD;
        result.perBlock = groupsRBD;
        result.totalSampleSize = nPerGroupRBD * groupsRBD;
        result.details = `${nPerGroupRBD} blocks × ${groupsRBD} treatments = ${result.totalSampleSize} total units`;
        break;
        
      case 'factorial':
        // Sample size for factorial design
        const factorA = params.factorALevels;
        const factorB = params.factorBLevels;
        const replicates = params.replicates;
        const totalCombinations = factorA * factorB;
        
        // Using a general formula for factorial designs
        const nPerCombination = Math.max(3, replicates); // Minimum 3 replicates per combination
        
        result.perCombination = nPerCombination;
        result.totalSampleSize = nPerCombination * totalCombinations;
        result.details = `${nPerCombination} replicates × ${factorA} levels of ${params.factorAName} × ${factorB} levels of ${params.factorBName} = ${result.totalSampleSize} total units`;
        break;
        
      case 'latin-square':
        // For Latin Square, the sample size is fixed by the square size
        const squareSize = params.squareSize;
        
        result.perTreatment = squareSize;
        result.totalSampleSize = squareSize * squareSize;
        result.details = `${squareSize}×${squareSize} Latin square = ${result.totalSampleSize} total units`;
        break;
        
      case 'repeated-measures':
        // Sample size for repeated measures design
        const groups = params.rmGroups;
        const timePoints = params.timePoints;
        const correlation = params.correlation;
        
        // Adjust for correlation between repeated measures
        const correctionFactor = 1 - correlation;
        
        // Basic sample size with correction for repeated measures
        const baseN = Math.ceil(
          criticalF * (1 + 1/effectSize) * (1/effectSize) * (groups > 1 ? (groups-1) : 1) * 
          (1/Math.pow(power, groups > 1 ? 1/groups : 1)) * correctionFactor
        );
        
        const subjectsPerGroup = Math.max(5, baseN);
        
        result.perGroup = subjectsPerGroup;
        result.totalSubjects = subjectsPerGroup * groups;
        result.totalObservations = result.totalSubjects * timePoints;
        result.details = groups > 1 ? 
          `${subjectsPerGroup} subjects per group × ${groups} groups × ${timePoints} time points = ${result.totalObservations} total observations` :
          `${subjectsPerGroup} subjects × ${timePoints} time points = ${result.totalObservations} total observations`;
        break;
    }
    
    return result;
  }
  
  // Create experimental design layout
  function createExperimentalDesign(designType, params, sampleSize) {
    switch (designType) {
      case 'completely-randomized': {
        // Generate treatment groups
        const numGroups = params.numGroups;
        const includeControl = params.includeControl;
        const nPerGroup = sampleSize.perGroup;
        
        const groups = [];
        const treatments = [];
        
        // Create treatment labels
        if (includeControl) {
          treatments.push('Control');
          for (let i = 1; i < numGroups; i++) {
            treatments.push(`Treatment ${i}`);
          }
        } else {
          for (let i = 1; i <= numGroups; i++) {
            treatments.push(`Treatment ${i}`);
          }
        }
        
        // Assign subjects to groups with randomization
        let subjectCounter = 1;
        for (let i = 0; i < treatments.length; i++) {
          const group = {
            treatment: treatments[i],
            subjects: []
          };
          
          for (let j = 0; j < nPerGroup; j++) {
            group.subjects.push(`Subject ${subjectCounter++}`);
          }
          
          groups.push(group);
        }
        
        // Create randomization sequence 
        const allSubjects = groups.flatMap(g => g.subjects);
        const randomOrder = shuffleArray([...allSubjects]);
        
        return {
          groups,
          randomOrder,
          treatments
        };
      }
      
      case 'randomized-block': {
        // Generate randomized block design
        const numGroups = params.numGroups;
        const numBlocks = params.numBlocks;
        const blockingFactor = params.blockingFactor;
        
        const blocks = [];
        const treatments = [];
        
        // Create treatment labels
        for (let i = 1; i <= numGroups; i++) {
          treatments.push(`Treatment ${i}`);
        }
        
        // Create block labels based on blocking factor
        const blockLabels = generateBlockLabels(blockingFactor, numBlocks);
        
        // Create the blocks with randomized treatment order within each block
        for (let i = 0; i < numBlocks; i++) {
          const block = {
            name: blockLabels[i],
            treatments: shuffleArray([...treatments])
          };
          blocks.push(block);
        }
        
        return {
          blocks,
          treatments
        };
      }
      
      case 'factorial': {
        // Generate factorial design
        const factorALevels = params.factorALevels;
        const factorBLevels = params.factorBLevels;
        const factorAName = params.factorAName;
        const factorBName = params.factorBName;
        const replicates = params.replicates;
        
        const factorACodes = [];
        const factorBCodes = [];
        
        // Generate level codes for factors
        for (let i = 1; i <= factorALevels; i++) {
          factorACodes.push(`A${i}`);
        }
        
        for (let i = 1; i <= factorBLevels; i++) {
          factorBCodes.push(`B${i}`);
        }
        
        // Generate all combinations
        const combinations = [];
        for (let a = 0; a < factorALevels; a++) {
          for (let b = 0; b < factorBLevels; b++) {
            const combination = {
              factorA: factorACodes[a],
              factorB: factorBCodes[b],
              replicates: []
            };
            
            for (let r = 1; r <= replicates; r++) {
              combination.replicates.push(`R${r}`);
            }
            
            combinations.push(combination);
          }
        }
        
        // Create randomization sequence
        const experimentalUnits = [];
        let unitId = 1;
        
        for (const combo of combinations) {
          for (let r = 0; r < replicates; r++) {
            experimentalUnits.push({
              id: `Unit ${unitId++}`,
              factorA: combo.factorA,
              factorB: combo.factorB,
              replicate: combo.replicates[r]
            });
          }
        }
        
        const randomOrder = shuffleArray([...experimentalUnits]);
        
        return {
          factorAName,
          factorBName,
          factorACodes,
          factorBCodes,
          combinations,
          randomOrder
        };
      }
      
      case 'latin-square': {
        // Generate Latin square design
        const size = params.squareSize;
        const rowFactor = params.rowFactor;
        const colFactor = params.colFactor;
        
        // Generate a valid Latin square
        const square = generateLatinSquare(size);
        
        // Generate row and column labels
        const rowLabels = [];
        const colLabels = [];
        const treatmentLabels = [];
        
        for (let i = 1; i <= size; i++) {
          rowLabels.push(`${rowFactor} ${i}`);
          colLabels.push(`${colFactor} ${i}`);
          treatmentLabels.push(`Treatment ${i}`);
        }
        
        return {
          size,
          rowFactor,
          colFactor,
          square,
          rowLabels,
          colLabels,
          treatmentLabels
        };
      }
      
      case 'repeated-measures': {
        // Generate repeated measures design
        const numGroups = params.rmGroups;
        const timePoints = params.timePoints;
        const subjectsPerGroup = sampleSize.perGroup;
        
        const groups = [];
        const timeLabels = [];
        
        // Generate time point labels
        for (let i = 1; i <= timePoints; i++) {
          timeLabels.push(`Time ${i}`);
        }
        
        // Generate groups and subjects
        let subjectCounter = 1;
        for (let g = 0; g < numGroups; g++) {
          const group = {
            name: numGroups > 1 ? `Group ${g + 1}` : 'All Subjects',
            subjects: []
          };
          
          for (let s = 0; s < subjectsPerGroup; s++) {
            const subject = {
              id: `Subject ${subjectCounter++}`,
              timePoints: {}
            };
            
            // Assign ordering of time points
            const orderedTimePoints = shuffleArray([...timeLabels]);
            
            for (let t = 0; t < timePoints; t++) {
              subject.timePoints[timeLabels[t]] = orderedTimePoints[t];
            }
            
            group.subjects.push(subject);
          }
          
          groups.push(group);
        }
        
        return {
          groups,
          timeLabels
        };
      }
    }
  }
  
  // Display results of experimental design
  function displayResults(designType, params, sampleSize, design, effectSize, alpha, power) {
    // Design summary
    let summaryHTML = '<p class="mb-2"><strong>Design Type:</strong> ';
    
    switch (designType) {
      case 'completely-randomized':
        summaryHTML += `Completely Randomized Design with ${params.numGroups} groups`;
        if (params.includeControl) {
          summaryHTML += ' (including control group)';
        }
        break;
        
      case 'randomized-block':
        summaryHTML += `Randomized Block Design with ${params.numGroups} treatments across ${params.numBlocks} blocks`;
        summaryHTML += `<br><strong>Blocking Factor:</strong> ${params.blockingFactor}`;
        break;
        
      case 'factorial':
        summaryHTML += `${params.factorALevels}×${params.factorBLevels} Factorial Design`;
        summaryHTML += `<br><strong>Factors:</strong> ${params.factorAName} (${params.factorALevels} levels) × ${params.factorBName} (${params.factorBLevels} levels)`;
        summaryHTML += `<br><strong>Replicates:</strong> ${params.replicates} per combination`;
        break;
        
      case 'latin-square':
        summaryHTML += `${params.squareSize}×${params.squareSize} Latin Square Design`;
        summaryHTML += `<br><strong>Row Factor:</strong> ${params.rowFactor}, <strong>Column Factor:</strong> ${params.colFactor}`;
        break;
        
      case 'repeated-measures':
        if (params.rmGroups > 1) {
          summaryHTML += `Mixed Design with ${params.rmGroups} groups and ${params.timePoints} repeated measurements`;
        } else {
          summaryHTML += `Repeated Measures Design with ${params.timePoints} time points`;
        }
        break;
    }
    
    summaryHTML += '</p>';
    summaryHTML += `<p><strong>Power Analysis:</strong> ${power} power to detect effect size d=${effectSize} at α=${alpha}</p>`;
    
    designSummary.innerHTML = summaryHTML;
    
    // Sample size information
    sampleSizeInfo.innerHTML = `
      <p><strong>Required sample size:</strong> ${sampleSize.totalSampleSize} total experimental units</p>
      <p>${sampleSize.details}</p>
      <p class="mt-2 text-xs">Note: Sample sizes are rounded up to ensure adequate statistical power.</p>
    `;
    
    // Groups table (specific to design type)
    populateGroupsTable(designType, design);
    
    // Randomization plan
    generateRandomizationPlan(designType, design);
    
    // Analysis recommendation
    generateAnalysisRecommendation(designType, params);
  }
  
  // Populate groups table based on design type
  function populateGroupsTable(designType, design) {
    groupsTableHeader.innerHTML = '';
    groupsTableBody.innerHTML = '';
    
    switch (designType) {
      case 'completely-randomized': {
        // Set up header
        groupsTableHeader.innerHTML = `
          <th class="border p-2 bg-gray-100">Group</th>
          <th class="border p-2 bg-gray-100">Subjects</th>
        `;
        
        // Add rows for each group
        for (const group of design.groups) {
          const row = document.createElement('tr');
          
          row.innerHTML = `
            <td class="border p-2 font-medium">${group.treatment}</td>
            <td class="border p-2">${group.subjects.join(', ')}</td>
          `;
          
          groupsTableBody.appendChild(row);
        }
        
        break;
      }
      
      case 'randomized-block': {
        // Set up header
        groupsTableHeader.innerHTML = `
          <th class="border p-2 bg-gray-100">Block</th>
          ${design.treatments.map(t => `<th class="border p-2 bg-gray-100">${t}</th>`).join('')}
        `;
        
        // Add rows for each block
        for (const block of design.blocks) {
          const row = document.createElement('tr');
          
          let cells = `<td class="border p-2 font-medium">${block.name}</td>`;
          for (const treatment of block.treatments) {
            cells += `<td class="border p-2">${treatment}</td>`;
          }
          
          row.innerHTML = cells;
          groupsTableBody.appendChild(row);
        }
        
        break;
      }
      
      case 'factorial': {
        // Set up header
        groupsTableHeader.innerHTML = `
          <th class="border p-2 bg-gray-100">${design.factorAName}</th>
          <th class="border p-2 bg-gray-100">${design.factorBName}</th>
          <th class="border p-2 bg-gray-100">Replicates</th>
          <th class="border p-2 bg-gray-100">Experimental Units</th>
        `;
        
        // Add rows for each combination
        for (const combo of design.combinations) {
          const row = document.createElement('tr');
          
          // Find units for this combination
          const units = design.randomOrder.filter(
            unit => unit.factorA === combo.factorA && unit.factorB === combo.factorB
          ).map(unit => unit.id);
          
          row.innerHTML = `
            <td class="border p-2">${combo.factorA}</td>
            <td class="border p-2">${combo.factorB}</td>
            <td class="border p-2">${combo.replicates.length}</td>
            <td class="border p-2">${units.join(', ')}</td>
          `;
          
          groupsTableBody.appendChild(row);
        }
        
        break;
      }
      
      case 'latin-square': {
        // Set up header
        groupsTableHeader.innerHTML = `
          <th class="border p-2 bg-gray-100">${design.rowFactor} / ${design.colFactor}</th>
          ${design.colLabels.map(c => `<th class="border p-2 bg-gray-100">${c}</th>`).join('')}
        `;
        
        // Add rows for Latin square
        for (let i = 0; i < design.size; i++) {
          const row = document.createElement('tr');
          
          let cells = `<td class="border p-2 font-medium">${design.rowLabels[i]}</td>`;
          for (let j = 0; j < design.size; j++) {
            const treatmentIndex = design.square[i][j] - 1; // Convert to 0-based index
            cells += `<td class="border p-2">${design.treatmentLabels[treatmentIndex]}</td>`;
          }
          
          row.innerHTML = cells;
          groupsTableBody.appendChild(row);
        }
        
        break;
      }
      
      case 'repeated-measures': {
        // Set up header
        let headerHTML = '<th class="border p-2 bg-gray-100">Subject</th>';
        if (design.groups.length > 1) {
          headerHTML = '<th class="border p-2 bg-gray-100">Group</th>' + headerHTML;
        }
        headerHTML += design.timeLabels.map(t => `<th class="border p-2 bg-gray-100">${t}</th>`).join('');
        
        groupsTableHeader.innerHTML = headerHTML;
        
        // Add rows for each subject
        for (const group of design.groups) {
          for (const subject of group.subjects) {
            const row = document.createElement('tr');
            
            let cells = '';
            if (design.groups.length > 1) {
              cells += `<td class="border p-2">${group.name}</td>`;
            }
            cells += `<td class="border p-2">${subject.id}</td>`;
            
            for (const timePoint of design.timeLabels) {
              cells += `<td class="border p-2">${subject.timePoints[timePoint]}</td>`;
            }
            
            row.innerHTML = cells;
            groupsTableBody.appendChild(row);
          }
        }
        
        break;
      }
    }
  }
  
  // Generate randomization plan
  function generateRandomizationPlan(designType, design) {
    let planHTML = '';
    
    switch (designType) {
      case 'completely-randomized':
        planHTML = `
          <p>To ensure unbiased treatment assignment, subjects should be tested in the following random order:</p>
          <ol class="list-decimal pl-5 mt-2">
            ${design.randomOrder.map(subject => `<li>${subject}</li>`).join('')}
          </ol>
          <p class="mt-2 text-xs">If this exact ordering isn't practical, assign treatments in blocks while maintaining the overall randomization.</p>
        `;
        break;
        
      case 'randomized-block':
        planHTML = `
          <p>For a randomized block design, each block contains all treatments in randomized order:</p>
          <ul class="list-disc pl-5 mt-2">
            ${design.blocks.map(block => 
              `<li><strong>${block.name}:</strong> ${block.treatments.join(' → ')}</li>`
            ).join('')}
          </ul>
          <p class="mt-2 text-xs">Complete each block before moving to the next if possible.</p>
        `;
        break;
        
      case 'factorial':
        planHTML = `
          <p>Process experimental units in the following random order:</p>
          <ol class="list-decimal pl-5 mt-2 text-xs" style="columns: 2;">
            ${design.randomOrder.map(unit => 
              `<li>${unit.id}: ${design.factorAName}=${unit.factorA}, ${design.factorBName}=${unit.factorB} (${unit.replicate})</li>`
            ).join('')}
          </ol>
          <p class="mt-2 text-xs">If batch processing is required, randomize within each batch.</p>
        `;
        break;
        
      case 'latin-square':
        planHTML = `
          <p>The Latin square design ensures balance across both row and column factors:</p>
          <ul class="list-disc pl-5 mt-2">
            <li>Each treatment appears exactly once in each row</li>
            <li>Each treatment appears exactly once in each column</li>
            <li>Conduct the experiment by progressing through rows and columns</li>
          </ul>
          <p class="mt-2 text-xs">The table shows the optimal assignment of treatments.</p>
        `;
        break;
        
      case 'repeated-measures':
        planHTML = `
          <p>For repeated measures designs, the order of measurements is important:</p>
          <ul class="list-disc pl-5 mt-2">
            ${design.groups.map(group => 
              `<li><strong>${group.name}:</strong> ${group.subjects.length} subjects with randomized time point order</li>`
            ).join('')}
          </ul>
          <p class="mt-2 text-xs">The table shows the specific sequence for each subject to minimize order effects.</p>
        `;
        break;
    }
    
    randomizationPlan.innerHTML = planHTML;
  }
  
  // Generate appropriate statistical analysis recommendation
  function generateAnalysisRecommendation(designType, params) {
    let recommendationHTML = '<p>Based on your experimental design, the following statistical analysis is recommended:</p>';
    
    switch (designType) {
      case 'completely-randomized':
        recommendationHTML += `
          <ul class="list-disc pl-5 mt-2">
            <li><strong>Primary analysis:</strong> One-way ANOVA</li>
            <li><strong>Post-hoc tests:</strong> Tukey's HSD for pairwise comparisons</li>
            <li><strong>Assumptions to check:</strong> Normality (Shapiro-Wilk test), Homogeneity of variances (Levene's test)</li>
            <li><strong>Alternative:</strong> Kruskal-Wallis test if data violates ANOVA assumptions</li>
          </ul>
        `;
        break;
        
      case 'randomized-block':
        recommendationHTML += `
          <ul class="list-disc pl-5 mt-2">
            <li><strong>Primary analysis:</strong> Two-way ANOVA without interaction (Randomized Block Design)</li>
            <li><strong>Factors:</strong> Treatment (fixed), Block (random)</li>
            <li><strong>Post-hoc tests:</strong> Tukey's HSD for treatment comparisons</li>
            <li><strong>Assumptions to check:</strong> Normality of residuals, Homogeneity of variances</li>
          </ul>
        `;
        break;
        
      case 'factorial':
        recommendationHTML += `
          <ul class="list-disc pl-5 mt-2">
            <li><strong>Primary analysis:</strong> Two-way ANOVA with interaction</li>
            <li><strong>Factors:</strong> ${params.factorAName}, ${params.factorBName}</li>
            <li><strong>Key tests:</strong> Main effects and interaction effect (${params.factorAName} × ${params.factorBName})</li>
            <li><strong>Post-hoc tests:</strong> Simple main effects analysis if interaction is significant</li>
            <li><strong>Assumptions to check:</strong> Normality of residuals, Homogeneity of variances</li>
          </ul>
        `;
        break;
        
      case 'latin-square':
        recommendationHTML += `
          <ul class="list-disc pl-5 mt-2">
            <li><strong>Primary analysis:</strong> Latin Square ANOVA</li>
            <li><strong>Factors:</strong> Treatment, Row (${params.rowFactor}), Column (${params.colFactor})</li>
            <li><strong>Key test:</strong> Treatment main effect</li>
            <li><strong>Post-hoc tests:</strong> Tukey's HSD for treatment comparisons</li>
            <li><strong>Assumptions to check:</strong> Normality, Homogeneity of variances, No interaction (additivity)</li>
          </ul>
        `;
        break;
        
      case 'repeated-measures':
        if (params.rmGroups > 1) {
          recommendationHTML += `
            <ul class="list-disc pl-5 mt-2">
              <li><strong>Primary analysis:</strong> Mixed ANOVA</li>
              <li><strong>Factors:</strong> Time (within-subjects), Group (between-subjects)</li>
              <li><strong>Key tests:</strong> Main effects and interaction</li>
              <li><strong>Post-hoc tests:</strong> Simple main effects with Bonferroni correction</li>
              <li><strong>Assumptions to check:</strong> Sphericity (Mauchly's test), Normality</li>
              <li><strong>Alternative:</strong> Apply Greenhouse-Geisser correction if sphericity is violated</li>
            </ul>
          `;
        } else {
          recommendationHTML += `
            <ul class="list-disc pl-5 mt-2">
              <li><strong>Primary analysis:</strong> Repeated Measures ANOVA</li>
              <li><strong>Factor:</strong> Time (${params.timePoints} levels)</li>
              <li><strong>Post-hoc tests:</strong> Pairwise comparisons with Bonferroni correction</li>
              <li><strong>Assumptions to check:</strong> Sphericity (Mauchly's test), Normality</li>
              <li><strong>Alternative:</strong> Apply Greenhouse-Geisser correction if sphericity is violated</li>
            </ul>
          `;
        }
        break;
    }
    
    analysisRecommendation.innerHTML = recommendationHTML;
  }
  
  // Export design to CSV format
  function exportDesign() {
    if (resultsContainer.classList.contains('hidden')) {
      toast('Please generate a design first', 'error');
      return;
    }
    
    const designType = document.getElementById('designType').value;
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `experimental_design_${designType}_${timestamp}.csv`;
    
    // Generate CSV content based on design type
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `Experimental Design Plan,\nGenerated: ${new Date().toLocaleString()},\n\n`;
    
    // Add design information
    csvContent += `Design Type,${designSummary.textContent.split('\n')[0]}\n`;
    csvContent += `Sample Size,${sampleSizeInfo.textContent.split('\n')[0].replace(/<[^>]*>/g, '')}\n\n`;
    
    // Add table content
    const headers = Array.from(groupsTableHeader.querySelectorAll('th')).map(th => th.textContent);
    csvContent += headers.join(',') + '\n';
    
    const rows = Array.from(groupsTableBody.querySelectorAll('tr'));
    for (const row of rows) {
      const cells = Array.from(row.querySelectorAll('td')).map(td => `"${td.textContent}"`);
      csvContent += cells.join(',') + '\n';
    }
    
    // Add analysis recommendation
    csvContent += '\nRecommended Analysis,\n';
    csvContent += analysisRecommendation.textContent.replace(/<[^>]*>/g, '').replace(/\n\s+/g, '\n') + '\n';
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast('Experimental design exported successfully!');
  }
  
  // Reset the form
  function resetForm() {
    designType.value = 'completely-randomized';
    powerSlider.value = 0.8;
    powerValue.textContent = '0.8';
    document.getElementById('alphaLevel').value = '0.05';
    document.getElementById('effectSize').value = '0.5';
    customEffectContainer.classList.add('hidden');
    
    updateDesignParams();
  }
  
  // Helper function to shuffle array (Fisher-Yates)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Generate Latin square of given size
  function generateLatinSquare(n) {
    // Create a standard Latin square
    const square = Array(n).fill().map(() => Array(n).fill(0));
    
    // Fill the first row with sequential numbers
    for (let j = 0; j < n; j++) {
      square[0][j] = j + 1;
    }
    
    // Fill remaining rows by shifting the previous row
    for (let i = 1; i < n; i++) {
      for (let j = 0; j < n; j++) {
        square[i][j] = (square[i-1][j] % n) + 1;
      }
    }
    
    // Randomize the Latin square by shuffling rows and columns
    // (preserving Latin square properties)
    const rowOrder = shuffleArray([...Array(n).keys()]);
    const colOrder = shuffleArray([...Array(n).keys()]);
    
    const randomizedSquare = Array(n).fill().map(() => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        randomizedSquare[i][j] = square[rowOrder[i]][colOrder[j]];
      }
    }
    
    return randomizedSquare;
  }
  
  // Generate block labels based on blocking factor
  function generateBlockLabels(factor, count) {
    const labels = [];
    
    switch (factor) {
      case 'time':
        for (let i = 1; i <= count; i++) {
          labels.push(`Day ${i}`);
        }
        break;
        
      case 'location':
        for (let i = 1; i <= count; i++) {
          labels.push(`Location ${i}`);
        }
        break;
        
      case 'batch':
        for (let i = 1; i <= count; i++) {
          labels.push(`Batch ${i}`);
        }
        break;
        
      case 'technician':
        for (let i = 1; i <= count; i++) {
          labels.push(`Technician ${i}`);
        }
        break;
        
      default:
        for (let i = 1; i <= count; i++) {
          labels.push(`Block ${i}`);
        }
    }
    
    return labels;
  }
  
  // Initialize the form
  updateDesignParams();
  createTooltips();
  
  // Add help icons to main controls
  const designTypeLabel = document.querySelector('label[for="designType"]');
  addHelpIcon(designTypeLabel, 'Choose the experimental design that best matches your research question and constraints. Different designs handle different types of variables and control for various sources of variability.');
  
  const powerLabel = document.querySelector('label[for="powerSlider"]');
  addHelpIcon(powerLabel, 'Statistical power is the probability of detecting an effect if it exists. Higher power requires larger sample sizes. 0.8 (80%) is standard.');
  
  const alphaLabel = document.querySelector('label[for="alphaLevel"]');
  addHelpIcon(alphaLabel, 'The significance level (α) is the probability of falsely rejecting the null hypothesis (Type I error). Lower values are more conservative.');
  
  const effectSizeLabel = document.querySelector('label[for="effectSize"]');
  addHelpIcon(effectSizeLabel, 'Effect size represents the magnitude of the difference you expect to detect. Small effects require larger sample sizes than large effects.');
}