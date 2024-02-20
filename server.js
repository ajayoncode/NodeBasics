const http = require('http');
const fs = require('fs');
const { getData, setData } = require('./test');

const server = http.createServer(async (req, res) => {
    if (req.url === '/getData') {
        getData(req, res).then(output => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(output, null, 2));
        }).catch(error => {
            console.error('Error in getData:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        });
    } else if (req.url === '/') {
        // Read the index.html file
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
