const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const radius = queryObject.radius;

  if (radius === undefined) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Error: Tolong masukkan nilai ke dalam parameter radius di url.\n');
  } else {
    const area = Math.PI * radius ** 2;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Luas lingkaran dengan radius ${radius} adalah ${area}.\n`);
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});