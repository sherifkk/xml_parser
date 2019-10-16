const DBConnection = require("./DBConnection");
const dbConnection = new DBConnection();

var http = require('http');
var fs = require('fs');

var con;

module.exports = class DBFunctions{
  async saveEntity(entity) {
    con = await dbConnection.getConnection();
    let runQuery = await con.query("DROP DATABASE IF EXISTS task1;");
    runQuery = await con.query("CREATE DATABASE task1;");
    runQuery = await con.query("USE task1;");
    runQuery = await con.query("DROP TABLE IF EXISTS persons;");
    runQuery = await con.query("CREATE TABLE persons (id int, name VARCHAR(255), email VARCHAR(255), time int);");
    runQuery = await con.query("INSERT INTO persons(id, name, email , time) VALUES ?;", [entity]);
    console.log("Parsed XML into database completed!");
    return entity;
  }

  async readEntity() {
    let fn = await con.query("select * from persons;", function (err, result, fields) {
      if (err) throw err;
      http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<h1>Result<h1>")
        res.write("<table border='1'><tr><th>ID</th><th>Name</th><th>Email</th><th>Timestamp</th></tr>")
        let i;
        for(i of result){
          res.write("</tr><td>"+i.id+"</td><td>"+i.name+"</td><td>"+i.email+"</td><td>"+i.time+"</td></tr>")
        }
        res.write("</table>")
        res.end();
      }).listen(8080);
      console.log("Retrive data from database completed! ")
      console.log('Server running at http://127.0.0.1:8080/');
    });
    return fn;
  }
}