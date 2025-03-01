import subprocess

def generate_source_map(input_file, output_file):
    try:
        # Run Terser to minify and generate source maps
        subprocess.run(['terser', input_file, '--source-map', '-o', output_file],
                       check=True)
        print(f"Source map generated for {input_file} at {output_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error generating source map: {e}")

# Usage
input_file = 'input.js'  # Your original JS file
output_file = 'output.min.js'  # The minified output file
generate_source_map(input_file, output_file)
