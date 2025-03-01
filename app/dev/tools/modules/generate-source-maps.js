import terser from 'terser';
import fs from 'fs';
import path from 'path';

// Function to recursively find all .js files in a directory
function getAllJavaScriptFiles(dirPath) {
  let jsFiles = [];

  // Read the directory contents
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively go through subdirectories
      jsFiles = jsFiles.concat(getAllJavaScriptFiles(filePath));
    } else if (filePath.endsWith('.js')) {
      jsFiles.push(filePath);
    }
  });

  return jsFiles;
}

// Function to minify a file and generate a source map
function minifyFile(inputFile) {
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    // Use Terser to minify the JavaScript file and generate the source map
    terser.minify(data, {
      sourceMap: {
        filename: path.basename(inputFile),  // The minified output file name
        url: path.basename(inputFile) + '.map'  // The source map file name
      }
    }).then(result => {
      const outputFile = inputFile.replace('.js', '.min.js');
      const outputMapFile = outputFile + '.map';

      // Write the minified code to the output file
      fs.writeFile(outputFile, result.code, (err) => {
        if (err) {
          console.error('Error writing minified file:', err);
        } else {
          console.log(`Minified file saved as ${outputFile}`);
        }
      });

      // Write the source map to the output map file
      fs.writeFile(outputMapFile, result.map, (err) => {
        if (err) {
          console.error('Error writing source map:', err);
        } else {
          console.log(`Source map saved as ${outputMapFile}`);
        }
      });
    }).catch(error => {
      console.error('Error minifying the file:', error);
    });
  });
}

// Main execution
const directoryToScan = './your-directory';  // Path to the directory you want to scan

// Get all JavaScript files in the directory
const jsFiles = getAllJavaScriptFiles(directoryToScan);

// Minify and generate source maps for each file
jsFiles.forEach(file => {
  minifyFile(file);
});
