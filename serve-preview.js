const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' };

http.createServer((request, response) => {
  const pathname = request.url === '/' ? '/index.html' : decodeURIComponent(request.url.split('?')[0]);
  const target = path.resolve(root, `.${pathname}`);
  if (!target.startsWith(root)) return response.writeHead(403).end('Forbidden');
  fs.readFile(target, (error, data) => {
    if (error) return response.writeHead(error.code === 'ENOENT' ? 404 : 500).end('Not found');
    response.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' });
    response.end(data);
  });
}).listen(5500, '127.0.0.1', () => console.log('AFF Studio preview: http://127.0.0.1:5500'));
