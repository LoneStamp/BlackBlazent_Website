import http from 'http';
import path from 'path';
import fs from 'fs';
import mime from 'mime';

// Create a new __dirname equivalent in ES Modules
const __dirname = new URL('.', import.meta.url).pathname; // Equivalent of __dirname in ES Modules

// Create HTTP server
const server = http.createServer((req, res) => {
  // Use path.join with the new __dirname and correct relative path to index.html
  const filePath = path.join(__dirname, '..', '..', '..', 'src', req.url === '/' ? 'index.html' : req.url); // Correct relative path

  const extname = path.extname(filePath);
  const contentType = mime.getType(extname) || 'text/html';

  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.statusCode = 404;
      res.end('File not found');
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

// Set the server port (you can change this to any port you want)
const port = 3000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
