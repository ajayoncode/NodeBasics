const mysql = require('mysql2');

var http = require('http');
const os = require('os');


var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "ajaymangal",
    password: "ajey@123",
    database: "testDB",
    port: 3306
});

var show = "AA"
con.connect(function (err) {
    if (err)
        console.log('Error: ', err)
    else {
        console.log("Connected!");
        con.query("SELECT * FROM person", function (err, result, fields) {
            if (err) {
                console.log('Error retrieving data from the table:', err);
                return;
            }

            console.log(result);
            show = result

            // Close the connection
            // con.query("INSERT INTO person (name, age) VALUES ('Kush', 24);", function (err, result) {
            //     console.log(`@@ res`, '>>> ', result)
            // })
            // con.end(function (err) {
            //     if (err) {
            //         console.log('Error closing the connection:', err);
            //         return;
            //     }
            //     console.log("Connection closed");
            // });
        });
    }
});

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Response:' + JSON.stringify(show, null, 2));
}).listen(3000);

