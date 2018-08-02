var mysql = require('mysql');

var con = mysql.createConnection({ //Authorisation to connect to the database is given
  host: "127.0.0.1",
  user: "root",
  password: "atleastgo",
  database: "react"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
//Created a table form in react database
  var sql = "CREATE TABLE seller (owner_name VARCHAR(255),owner_mobile INT, house_address VARCHAR(255), area INT)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
