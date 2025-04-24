/**
 * Help content for each tool
 */

export const helpContent = {
  testGenie: `
    <h4>How to Use the Stat Test Genie</h4>
    <p>This tool helps you select the appropriate statistical test for your data.</p>
    <ol>
      <li><strong>Type of data:</strong> Select whether your data is numeric (continuous measurements) or categorical (counts, categories).</li>
      <li><strong>Number of groups:</strong> Indicate if you're comparing 2 groups or more than 2 groups.</li>
      <li><strong>Independence:</strong> Specify if your groups are independent (different subjects) or paired/repeated (same subjects measured multiple times).</li>
      <li>Click <strong>Suggest Test</strong> to get a recommendation.</li>
    </ol>
    <p>The tool will suggest the most appropriate statistical test based on your selections, along with important assumptions to verify.</p>
  `,
  powerWizard: `
    <h4>How to Use the Power & Sample-Size Wizard</h4>
    <p>This tool helps you calculate either:</p>
    <ul>
      <li>The sample size needed to achieve a desired statistical power</li>
      <li>The statistical power of a study with a given sample size</li>
    </ul>

    <h5>Key Parameters:</h5>
    <ul>
      <li><strong>Test type:</strong> Select t-test (for means), z-test (for proportions), or correlation test.</li>
      <li><strong>What to calculate:</strong> Choose whether to calculate sample size or power.</li>
      <li><strong>Effect size:</strong> The magnitude of the effect you expect to detect.
        <ul>
          <li>Small: 0.2 (subtle effect)</li>
          <li>Medium: 0.5 (moderate effect)</li>
          <li>Large: 0.8 (substantial effect)</li>
        </ul>
      </li>
      <li><strong>Significance level (α):</strong> The probability of Type I error (false positive). Typically 0.05.</li>
      <li><strong>Power (1-β):</strong> The probability of detecting an effect if it exists. Typically 0.8 (80%).</li>
      <li><strong>Test direction:</strong> One-tailed tests have more power but only detect effects in one direction.</li>
      <li><strong>Groups:</strong> Specify if you're comparing one group to a known value or two groups to each other.</li>
    </ul>

    <p>After calculation, you'll see a power curve showing the relationship between effect size and power/sample size.</p>
  `,
  normalityChecker: `
    <h4>How to Use the Normality & Outlier Checker</h4>
    <p>This tool helps you check if your data follows a normal distribution and identifies potential outliers.</p>

    <h5>Input Data:</h5>
    <p>Enter your data with one value per line or as comma-separated values. You can also click "Generate Example Data" to see how the tool works.</p>

    <h5>Results Explained:</h5>
    <ul>
      <li><strong>Descriptive Statistics:</strong> Basic summary statistics of your data.</li>
      <li><strong>Shapiro-Wilk Test:</strong> Tests if your data follows a normal distribution.
        <ul>
          <li>p-value > 0.05: Data appears to be normally distributed</li>
          <li>p-value ≤ 0.05: Data does not appear to be normally distributed</li>
        </ul>
      </li>
      <li><strong>Outlier Detection:</strong> Uses Grubbs' test to identify potential outliers.
        <ul>
          <li>p-value > 0.05: No significant outliers detected</li>
          <li>p-value ≤ 0.05: Potential outlier detected</li>
        </ul>
      </li>
      <li><strong>Q-Q Plot:</strong> Visual assessment of normality. Points should follow the diagonal line for normally distributed data.</li>
    </ul>
  `,
  csvConverter: `
    <h4>How to Use the CSV to JSON Converter</h4>
    <p>This tool helps you convert between CSV and JSON data formats.</p>

    <h5>CSV to JSON:</h5>
    <ol>
      <li>Paste your CSV data in the left box.</li>
      <li>Click "Convert to JSON" to see the result in the right box.</li>
      <li>Use the "Copy JSON" button to copy the result to your clipboard.</li>
    </ol>

    <h5>JSON to CSV:</h5>
    <ol>
      <li>Paste your JSON data in the right box.</li>
      <li>Click "Convert to CSV" to see the result in the left box.</li>
      <li>Use the "Copy CSV" button to copy the result to your clipboard.</li>
    </ol>

    <p>The tool automatically handles headers and different JSON structures.</p>
  `,
  quickPlot: `
    <h4>How to Use the Quick-Plot Lab</h4>
    <p>This tool helps you create simple plots from your data.</p>

    <h5>Creating a Plot:</h5>
    <ol>
      <li>Enter your data in the text area, with each row containing x,y values separated by a comma.</li>
      <li>Select the plot type (scatter, line, or bar).</li>
      <li>Click "Generate Plot" to create your visualization.</li>
    </ol>

    <h5>Example Data:</h5>
    <pre>Category A,10
Category B,15
Category C,7
Category D,22</pre>

    <p>You can interact with the plot (zoom, pan, etc.) using the toolbar that appears when you hover over it.</p>
  `,
  heatMapper: `
    <h4>How to Use the Heat-Mapper</h4>
    <p>This tool helps you create heatmaps from matrix data.</p>

    <h5>Creating a Heatmap:</h5>
    <ol>
      <li>Enter your matrix data in the text area, with values separated by commas and rows by new lines.</li>
      <li>Optionally, add row and column labels.</li>
      <li>Select a color scheme.</li>
      <li>Choose whether to cluster rows and columns.</li>
      <li>Click "Generate Heatmap" to create your visualization.</li>
    </ol>

    <h5>Tips:</h5>
    <ul>
      <li>Use the "Example Data" button to see a sample format.</li>
      <li>Hover over cells to see exact values.</li>
      <li>Use the "Download PNG" button to save your heatmap.</li>
      <li>Clustering helps identify patterns in your data.</li>
    </ul>
  `,
  labCalc: `
    <h4>How to Use the Lab Math Calculator</h4>
    <p>This tool helps you calculate dilutions for laboratory work.</p>

    <h5>Calculating Dilutions:</h5>
    <ol>
      <li>Enter the stock concentration (in molar units).</li>
      <li>Enter the desired concentration (must be less than stock).</li>
      <li>Enter the final volume you need.</li>
      <li>Click "Calculate" to get the results.</li>
    </ol>

    <h5>Understanding the Results:</h5>
    <ul>
      <li><strong>Volume of stock solution:</strong> How much of your stock solution to use.</li>
      <li><strong>Volume of diluent:</strong> How much diluent (water, buffer, etc.) to add.</li>
    </ul>

    <p>The calculator uses the formula: C₁V₁ = C₂V₂</p>
  `,
  unitConverter: `
    <h4>How to Use the Unit & Concentration Converter</h4>
    <p>This tool helps you convert between different units and concentration formats commonly used in the lab.</p>

    <h5>Converting Units:</h5>
    <ol>
      <li>Select the conversion type (volume, mass, or concentration).</li>
      <li>Enter the value you want to convert.</li>
      <li>Select the source and target units.</li>
      <li>Click "Convert" to see the result.</li>
    </ol>

    <h5>Concentration Conversions:</h5>
    <p>For concentration conversions, you'll need to provide additional information such as molecular weight or density depending on the conversion type.</p>

    <p>Common conversions include:</p>
    <ul>
      <li>Molarity to mg/mL (requires molecular weight)</li>
      <li>Percentage to molarity (requires molecular weight and density)</li>
      <li>ppm to molarity (requires molecular weight)</li>
    </ul>
  `,
  fastViewer: `
    <h4>How to Use the FAST-Viewer</h4>
    <p>This tool helps you view and analyze DNA/RNA sequences.</p>

    <h5>Viewing Sequences:</h5>
    <ol>
      <li>Paste your sequence in FASTA format or as plain text.</li>
      <li>Optionally, enter a motif or regular expression to highlight.</li>
      <li>Click "Highlight" to process the sequence.</li>
    </ol>

    <h5>Example Motifs:</h5>
    <ul>
      <li><code>GAATTC</code> - Find exact sequence (EcoRI site)</li>
      <li><code>ATG[ATGC]{3}TAA</code> - Find start codon, any 3 bases, stop codon</li>
      <li><code>GC[AT]{4}GC</code> - Find GC followed by 4 A or T, then GC</li>
    </ul>
  `,
  cellCounter: `
    <h4>How to Use the Quick Cell-Counter (Beta)</h4>
    <p>This tool helps you count cells in microscopy images using computer vision.</p>

    <h5>Counting Cells:</h5>
    <ol>
      <li>Upload an image containing cells, or use the sample image.</li>
      <li>Adjust the threshold to improve detection (higher values detect fewer cells).</li>
      <li>Set minimum and maximum cell size to filter out noise and clumps.</li>
      <li>Click "Count Cells" to process the image.</li>
    </ol>

    <h5>Advanced Options:</h5>
    <ul>
      <li><strong>Invert Image:</strong> Use if cells are dark on a light background.</li>
      <li><strong>Adaptive Threshold:</strong> Better for images with uneven lighting.</li>
      <li><strong>Circularity:</strong> Higher values require more circular shapes.</li>
      <li><strong>Watershed:</strong> Helps separate touching cells.</li>
    </ul>

    <h5>Tips for Best Results:</h5>
    <ul>
      <li>Use high-contrast, well-focused images.</li>
      <li>Adjust the threshold to improve detection accuracy.</li>
      <li>Use the min/max size settings to filter out noise and cell clumps.</li>
      <li>The processed image shows detected cells with green outlines and numbers.</li>
      <li>You can download the result image for your records.</li>
    </ul>

    <p><strong>Note:</strong> This is a beta feature and works best with high-contrast images. Results should be verified manually for critical applications.</p>
  `,
  imageAnalysis: `
    <h4>How to Use the Image Analysis Tool</h4>
    <p>This powerful tool helps scientists analyze microscopy and other scientific images with precise measurements.</p>

    <h5>Getting Started:</h5>
    <ol>
      <li>Upload an image or use the sample image.</li>
      <li>Calibrate the scale if you know the physical size of a feature in your image.</li>
      <li>Select a measurement tool from the toolbar.</li>
      <li>Make measurements by clicking and dragging on the image.</li>
    </ol>

    <h5>Available Tools:</h5>
    <ul>
      <li><strong>Distance:</strong> Measure straight-line distances between points.</li>
      <li><strong>Angle:</strong> Measure angles between three points.</li>
      <li><strong>Area:</strong> Measure areas by drawing polygons.</li>
      <li><strong>Intensity Profile:</strong> Analyze pixel intensity along a line.</li>
    </ul>

    <h5>Tips for Accurate Measurements:</h5>
    <ul>
      <li>Always calibrate your image with a known reference (scale bar, ruler, etc.).</li>
      <li>Use the zoom tools to place measurement points precisely.</li>
      <li>For area measurements, ensure your polygon is completely closed.</li>
      <li>The intensity profile tool works best on grayscale or single-channel images.</li>
      <li>You can save your annotated image with all measurements for documentation.</li>
    </ul>

    <p>This tool is invaluable for research requiring precise measurements from microscopy, radiography, gel images, and other scientific imagery.</p>
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
