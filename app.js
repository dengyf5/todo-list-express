import http from 'http'

http.createServer((req, res) => {
    res.end('HelloWorld!')
}).listen(8888);
console.log('listening to 8888');