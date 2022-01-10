console.log('Hello Node!');
console.log('Goodbye');

const http = require('http');
http.createServer((http.request, Response) => {
    response.writehead(200, {'Content-Type: 'text/plain'});
    response.end('Hello Node!\n');
}).listen(8080);

console.log('My first Node test server is running on port 8080.');