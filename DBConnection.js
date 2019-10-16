const mysql = require('mysql');
const dbConfig = {
    // Set your MySQL host, username and password here.
    host    : "localhost",
    user    : "root",
    password: ""
}
module.exports = class DBConnection {
    async getConnection() {
        let con = mysql.createConnection(dbConfig);  
        con.connect(function(error) {
            if (error) throw error
        });
        return con;
    } 
}
