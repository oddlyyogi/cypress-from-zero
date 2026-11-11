// A tiny web server for the practice pages in this folder.
const http = require('http')
const fs = require('fs')
const path = require('path')
const types = { '.html': 'text/html', '.txt': 'text/plain' }

http.createServer((req, res) => {
  const file = path.join(__dirname, req.url === '/' ? 'tricky.html' : req.url)
  fs.readFile(file, (err, body) => {
    if (err) { res.writeHead(404); return res.end('not found') }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'text/plain' })
    res.end(body)
  })
}).listen(4321, () => console.log('Practice pages on http://localhost:4321'))