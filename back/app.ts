const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.end('Hello Node');
});
server.listen(3010);
