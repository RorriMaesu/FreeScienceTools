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
  `
};
