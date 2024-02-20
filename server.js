const http = require('http');
const { getData, setData } = require('./test');

const server = http.createServer(async (req, res) => {
    let k = "NA"
    if (req.url === '/getData') {
        getData(req, res).then(output => {
            res.end('GetData: \n' + JSON.stringify(output, null, 2))
        }).catch(error => {
            console.error('Error in getData:', error);
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