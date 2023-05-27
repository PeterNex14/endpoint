const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  const pathName = reqUrl.pathname;
  const queryObject = reqUrl.query;

  if (pathName === '/') {
    // Serve index.html
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (pathName === '/calculate') {
    const radius = queryObject.radius;

    if (radius === undefined) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Error: Please provide a radius parameter in your query string.\n');
    } else {
      const area = Math.PI * radius ** 2;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`The area of a circle with radius ${radius} is ${area}.\n`);
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Error: Not found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});