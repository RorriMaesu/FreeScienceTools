/**
 * Help content for each tool
 */

export const helpContent = {
  welcome: `
    <h4>About Sci Mini-Suite</h4>
    <p>Welcome to Sci Mini-Suite, a collection of lightweight, browser-based scientific tools designed for researchers, scientists, and students.</p>
    
    <h5>Features:</h5>
    <ul>
      <li><strong>Privacy-focused:</strong> All calculations run in your browser - no data is sent to any server</li>
      <li><strong>Free to use:</strong> Core tools are free for everyone</li>
      <li><strong>Premium tools:</strong> Advanced features available in our premium tools</li>
      <li><strong>No installation:</strong> Works directly in your browser</li>
    </ul>
    
    <p>Currently featuring our premium tools while we restore our complete toolkit:</p>
    <ul>
      <li><strong>Curve Fitting Toolbox:</strong> Fit experimental data to mathematical models</li>
      <li><strong>Experimental Design Planner:</strong> Create statistically rigorous experimental designs</li>
    </ul>
    
    <p>Support this project by clicking the "Buy Me a Coffee" button if you find these tools useful!</p>
  `,
  
  curveFitter: `
    <h4>How to Use the Curve Fitting Toolbox</h4>
    <p>This premium tool helps you fit experimental data to a variety of mathematical models for data analysis, parameter extraction, and visualization.</p>

    <h5>Key Features:</h5>
    <ul>
      <li>9+ built-in mathematical models including linear, exponential, Michaelis-Menten, Hill equation, dose-response, etc.</li>
      <li>Non-linear regression using the Levenberg-Marquardt algorithm</li>
      <li>R² goodness-of-fit statistics</li>
      <li>Interactive visualization of data and fitted curves</li>
      <li>Export of results to CSV for further analysis</li>
    </ul>

    <h5>Getting Started:</h5>
    <ol>
      <li><strong>Select Model:</strong> Choose the appropriate mathematical model for your data from the dropdown menu.</li>
      <li><strong>Enter Data:</strong> Input your X,Y data pairs (one pair per line) in CSV (comma-separated) or tab-separated format.</li>
      <li><strong>Set Initial Parameters:</strong> Optionally adjust the initial parameter guesses to improve fitting.</li>
      <li><strong>Fit Curve:</strong> Click the "Fit Curve" button to perform the regression analysis.</li>
    </ol>

    <h5>Understanding Results:</h5>
    <ul>
      <li><strong>Fitted Parameters:</strong> The optimized parameter values that provide the best fit to your data.</li>
      <li><strong>R² Value:</strong> Coefficient of determination (R²) indicating how well the model fits your data (0-1, higher is better).</li>
      <li><strong>Fitted Equation:</strong> The mathematical equation with the derived parameter values.</li>
      <li><strong>Plot:</strong> Visual representation of your data (blue points) and the fitted curve (red line).</li>
    </ul>

    <h5>Tips for Best Results:</h5>
    <ul>
      <li>Choose the appropriate model based on theoretical understanding of your data.</li>
      <li>Provide good initial parameter guesses if the default values don't yield good fits.</li>
      <li>For enzymatic data, use Michaelis-Menten or Hill equation models.</li>
      <li>For growth/decay data, use exponential or logistic models.</li>
      <li>For ligand binding or dose-response data, use the dose-response model.</li>
      <li>The "Load Sample Data" button provides examples for different model types.</li>
    </ul>

    <p>This tool is ideal for researchers working with experimental data in biochemistry, pharmacology, cell biology, physical chemistry, and many other scientific disciplines.</p>
  `,
  
  expDesigner: `
    <h4>How to Use the Experimental Design Planner</h4>
    <p>This premium tool helps you create statistically rigorous experimental designs with appropriate sample sizes, randomization, and power analysis.</p>

    <h5>Key Features:</h5>
    <ul>
      <li>Multiple experimental design types (completely randomized, randomized block, factorial, Latin square, repeated measures)</li>
      <li>Automated sample size calculation based on power analysis</li>
      <li>Randomization schemes to minimize bias</li>
      <li>Recommended statistical analysis methods</li>
      <li>Exportable experimental plans</li>
    </ul>

    <h5>Getting Started:</h5>
    <ol>
      <li><strong>Select Design Type:</strong> Choose the experimental design that best suits your research question.</li>
      <li><strong>Define Design Parameters:</strong> Set specific parameters for your chosen design type (groups, blocks, factors, etc.).</li>
      <li><strong>Set Statistical Parameters:</strong> Adjust power, significance level, and effect size based on your research needs.</li>
      <li><strong>Generate Design:</strong> Click "Generate Optimal Design" to create your experimental plan.</li>
    </ol>

    <h5>Understanding Design Types:</h5>
    <ul>
      <li><strong>Completely Randomized Design:</strong> Simplest design where subjects are randomly assigned to treatment groups.</li>
      <li><strong>Randomized Block Design:</strong> Groups subjects into blocks based on a known source of variation, then randomizes treatments within each block.</li>
      <li><strong>Factorial Design:</strong> Tests multiple factors simultaneously and evaluates their interactions.</li>
      <li><strong>Latin Square Design:</strong> Controls for two sources of variation (rows and columns) simultaneously.</li>
      <li><strong>Repeated Measures Design:</strong> Each subject receives multiple treatments, with randomized order to control for sequence effects.</li>
    </ul>

    <h5>Tips for Effective Experimental Design:</h5>
    <ul>
      <li>Choose your design type based on your research question and practical constraints.</li>
      <li>Consider sources of variation in your experimental system that can be controlled through blocking.</li>
      <li>Aim for a statistical power of at least 0.8 (80%) to have a good chance of detecting effects if they exist.</li>
      <li>For exploratory research, smaller effect sizes may require larger sample sizes.</li>
      <li>Use the recommended statistical analysis plan as a guide for data analysis after experiment completion.</li>
      <li>Export your design for documentation and protocol development.</li>
    </ul>

    <p>This tool is invaluable for researchers in all scientific disciplines who want to ensure their experiments are designed with statistical rigor to maximize the chance of meaningful results.</p>
  `,
  
  calculator: `
    <h4>Scientific Calculator</h4>
    <p>The Scientific Calculator is being rebuilt with exciting new features.</p>
    
    <h5>Coming Soon:</h5>
    <ul>
      <li>Advanced mathematical functions</li>
      <li>Unit-aware calculations</li>
      <li>Formula memory and history</li>
      <li>Graphing capabilities</li>
      <li>Variable support</li>
    </ul>
    
    <p>Check back soon for this upgraded tool!</p>
  `,
  
  dataViewer: `
    <h4>Data Visualization Tool</h4>
    <p>The Data Visualization Tool is being rebuilt with exciting new features.</p>
    
    <h5>Coming Soon:</h5>
    <ul>
      <li>Multiple chart types (scatter, bar, line, pie)</li>
      <li>Interactive data exploration</li>
      <li>Statistical overlays</li>
      <li>CSV/Excel data import</li>
      <li>High-resolution export options</li>
    </ul>
    
    <p>Check back soon for this upgraded tool!</p>
  `,
  
  statisticsCalculator: `
    <h4>Statistics Calculator</h4>
    <p>The Statistics Calculator is being rebuilt with exciting new features.</p>
    
    <h5>Coming Soon:</h5>
    <ul>
      <li>Descriptive statistics</li>
      <li>Hypothesis testing</li>
      <li>ANOVA and regression analysis</li>
      <li>Non-parametric tests</li>
      <li>Distribution fitting</li>
    </ul>
    
    <p>Check back soon for this upgraded tool!</p>
  `,
  
  unitConverter: `
    <h4>How to Use the Unit & Concentration Converter</h4>
    <p>This tool helps you convert between scientific units and calculate concentrations for laboratory work.</p>
    
    <h5>Key Features:</h5>
    <ul>
      <li>Unit converter for common scientific measurements (length, volume, mass, temperature, time, pressure, energy)</li>
      <li>Specialized centrifuge conversion between rpm and rcf/g-force</li>
      <li>Concentration calculator for molarity/mass concentration conversions</li>
      <li>Dilution calculator (C₁V₁ = C₂V₂) for preparing solutions</li>
      <li>Common molecular weight references</li>
    </ul>
    
    <h5>Unit Converter:</h5>
    <ol>
      <li><strong>Select Conversion Type:</strong> Choose the category of units you want to convert (e.g., length, volume, mass).</li>
      <li><strong>Enter Value:</strong> Input the value you want to convert in the "From" field.</li>
      <li><strong>Select Units:</strong> Choose the original and target units from the dropdown menus.</li>
      <li><strong>Convert:</strong> Click the "Convert" button to calculate the conversion.</li>
      <li><strong>Swap:</strong> Use the "Swap" button to reverse the conversion direction.</li>
    </ol>
    
    <h5>Concentration Calculator:</h5>
    <ul>
      <li><strong>Molarity to Mass:</strong> Convert from molar concentration to mass concentration.</li>
      <li><strong>Mass to Molarity:</strong> Convert from mass concentration to molar concentration.</li>
      <li><strong>Dilution Calculator:</strong> Calculate volumes needed for diluting stock solutions.</li>
    </ul>
    
    <h5>Tips for Laboratory Calculations:</h5>
    <ul>
      <li>For molarity conversions, ensure you have the correct molecular weight of your compound.</li>
      <li>Use the molecular weight reference buttons for quick access to common chemicals.</li>
      <li>For centrifuge conversions, the calculation assumes a 10 cm rotor radius.</li>
      <li>In the dilution calculator, ensure you're using the same concentration units for both stock and desired solutions.</li>
      <li>Mass concentration units (g/L, mg/mL, and µg/µL) are mathematically equivalent; the tool helps you express the result in your preferred unit.</li>
    </ul>
    
    <p>This tool is especially useful for researchers, lab technicians, and students who need to perform quick unit conversions and concentration calculations for experimental protocols.</p>
  `,
  
  molCalc: `
    <h4>Molecular Weight Calculator</h4>
    <p>The Molecular Weight Calculator is being rebuilt with exciting new features.</p>
    
    <h5>Coming Soon:</h5>
    <ul>
      <li>Chemical formula parsing</li>
      <li>Isotope distribution</li>
      <li>Elemental composition</li>
      <li>Protein sequence analysis</li>
      <li>Solution preparation calculator</li>
    </ul>
    
    <p>Check back soon for this upgraded tool!</p>
  `,
  
  imageAnalysis: `
    <h4>Scientific Image Analysis</h4>
    <p>The Scientific Image Analysis tool is being rebuilt with exciting new features.</p>
    
    <h5>Coming Soon:</h5>
    <ul>
      <li>Particle counting and measurement</li>
      <li>Cell counting and morphology</li>
      <li>Intensity profile analysis</li>
      <li>Gel and western blot quantification</li>
      <li>Image calibration and scale bar tools</li>
    </ul>
    
    <p>Check back soon for this upgraded tool!</p>
  `,
  
  statGenie: `
    <h4>How to Use the Statistical Test Genie</h4>
    <p>This tool helps you select and run appropriate statistical tests on your experimental or observational data.</p>
    
    <h5>Key Features:</h5>
    <ul>
      <li>Multiple test categories: parametric tests, non-parametric tests, correlation/regression, and descriptive statistics</li>
      <li>Automated calculations and result interpretation</li>
      <li>Interactive data visualization with box plots</li>
      <li>Assumption checking and guidance</li>
      <li>Built-in example datasets for each test type</li>
    </ul>
    
    <h5>Getting Started:</h5>
    <ol>
      <li><strong>Select Test Type:</strong> Choose from parametric tests, non-parametric tests, correlation/regression, or descriptive statistics.</li>
      <li><strong>Select Specific Test:</strong> Choose the appropriate statistical test based on your research question and data characteristics.</li>
      <li><strong>Enter Data:</strong> Input your data with one group per line, using comma or space separation between values.</li>
      <li><strong>Set Test Parameters:</strong> Adjust significance level (α) and any test-specific options.</li>
      <li><strong>Run Analysis:</strong> Click "Run Analysis" to perform the statistical test.</li>
    </ol>
    
    <h5>Available Tests:</h5>
    <ul>
      <li><strong>Parametric Tests:</strong> t-tests (independent, paired, one-sample), one-way ANOVA, two-way ANOVA</li>
      <li><strong>Non-parametric Tests:</strong> Mann-Whitney U, Wilcoxon signed-rank, Kruskal-Wallis, Friedman, Chi-square</li>
      <li><strong>Correlation & Regression:</strong> Pearson correlation, Spearman rank correlation, Linear regression</li>
      <li><strong>Descriptive Statistics:</strong> Summary statistics, normality tests, outlier detection</li>
    </ul>
    
    <h5>Understanding Results:</h5>
    <ul>
      <li><strong>Results Table:</strong> Shows test statistics, p-values, and key metrics specific to the chosen test.</li>
      <li><strong>Interpretation:</strong> Provides a plain-language explanation of what the results mean in the context of your research question.</li>
      <li><strong>Visualization:</strong> Displays your data graphically to help you understand the distribution and relationships.</li>
      <li><strong>Assumptions & Notes:</strong> Lists the key assumptions of the test and whether your data appears to meet them.</li>
    </ul>
    
    <h5>Tips for Effective Statistical Analysis:</h5>
    <ul>
      <li>Always check if your data meets the assumptions of the statistical test you're using.</li>
      <li>For small sample sizes, consider using non-parametric tests which make fewer assumptions about your data.</li>
      <li>The "Load Example" button provides sample data for each test to help you understand how to format your input.</li>
      <li>Statistical significance (p < α) indicates that your results are unlikely to occur by chance, but always consider practical significance too.</li>
      <li>Use the box plots to visually assess the distribution of your data and identify potential outliers.</li>
    </ul>
    
    <p>This tool is valuable for researchers, students, and data analysts who need to perform statistical tests without specialized software.</p>
  `,
};
