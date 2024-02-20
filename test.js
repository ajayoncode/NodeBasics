const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "ajaymangal",
    password: "ajey@123",
    database: "testDB",
    port: 3306
});

async function getData(req, res) {
    con.connect()
    const output = await new Promise((resolve, reject) => {
        con.query("SELECT * FROM person", function (err, result, fields) {
            if (err) {
                console.log('Error retrieving data from the table:', err);
                res.status(500).json({ error: 'Internal server error' });
                reject(err);
            } else {
                console.log('Data fetched successfully:', result);
                resolve(result); // Resolve the Promise with the result
            }
        });
    });
    return output
}

async function setData(req, res) {
    con.connect()
    const output = await new Promise((resolve, reject) => {

        con.query("INSERT INTO person (name, age) VALUES ('Ajay', 28);", function (err, result, fields) {
            if (err) {
                console.log('Error retrieving data from the table:', err);
                res.status(500).json({ error: 'Internal server error' });
                reject(err);
            } else {
                console.log('Data fetched successfully:', result);
                resolve(result); // Resolve the Promise with the result
            }
        });
    });
    return output
}

module.exports = { getData, setData };
