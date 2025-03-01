module.exports = {
    mode: 'production',
    devtool: 'source-map', // This enables source map generation
    entry: './src/app.js',
    output: {
      filename: 'app.min.js',
    },
  };
  