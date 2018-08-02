var express = require('express');
var app = express();
var mysql = require('mysql')
var bodyParser = require('body-parser');
var path = require('path')
var fs = require('fs');
app.use(express.static("./app/public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

var con = mysql.createConnection({ //Providing authorisation for Node to Mysql
  host: '127.0.0.1',
  user: 'root',
  password: 'atleastgo',
  database: 'react'
});
app.use(express.static(path.join(__dirname, 'public')));

con.connect(function(err) {
  app.get('/register', function(req, res) { //Once the Page of index.htm is called
    res.sendFile(__dirname + "/" + "project" + "/" + "register.html");
    // res.sendFile(__dirname + "/" + "form" + "/" + "src" + "/" + "App.htm");
  })

  app.get('/user_details', function(req, res) {

    response = { //Initializing the Responses to each text field
      user_name: req.query.user_name,
      user_email: req.query.user_email,
      password: req.query.password,
      mobile: req.query.user_mobile,
      address: req.query.user_address
    };
    console.log(response); //Consoliing each responses to the porcess_get page
    res.end(JSON.stringify(response)); //Response from the server
    if (err) throw err;
    console.log("connected"); //Consoles in terminal if the database is connected
    var sql = "INSERT INTO user_details (user_name,password,user_mobile,user_address,user_email) VALUES ('" + req.query.user_name + "','" + req.query.password + "','" + req.query.user_mobile + "','" + req.query.user_address + "', '" + req.query.user_email + "')";
    //The above code inserts the data to the Form table according to each text field
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("table created"); //Consoles in Terminal once after the Table in the form is created.
    });
  });

  con.connect(function(err) {
    app.use(express.static('public'));
    app.get('/search', function(req, res) {
      res.sendFile(__dirname + "/" + "project" + "/" + "search.html");
    })
    app.post('/proc_post', function(req, res) {

      var sql = "SELECT user_name,user_mobile,user_address,user_email FROM user_details WHERE user_name = '" + req.body.user_name + "' OR user_mobile = '" + req.body.user_mobile + "' OR user_address = '" + req.body.user_address + "' ";

      con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.end(JSON.stringify(result));
      });
    });
  });

  app.get('/login', function(req, res) { //Once the Page of index.htm is called
    res.sendFile(__dirname + "/" + "project" + "/" + "login.html"); // res.sendFile(__dirname + "/" + "form" + "/" + "src" + "/" + "App.htm");
  })

app.get('/sell_a_house', function(req, res) { //Once the Page of index.htm is called
  res.sendFile(__dirname + "/" + "project" + "/" + "sell.html"); // res.sendFile(__dirname + "/" + "form" + "/" + "src" + "/" + "App.htm");
})

app.get('/seller_details', function(req, res) {

  response = { //Initializing the Responses to each text field
    owner_name: req.query.owner_name,
    owner_email: req.query.owner_email,
    password: req.query.owner_password,
    mobile: req.query.owner_mobile,
    address: req.query.house_address,
    area: req.query.house_area
  };
  console.log(response); //Consoliing each responses to the porcess_get page
  res.end(JSON.stringify(response)); //Response from the server
  if (err) throw err;
  console.log("connected"); //Consoles in terminal if the database is connected
  var sql = "INSERT INTO seller (owner_name,owner_mobile,house_address,house_area,owner_password,owner_email) VALUES ('" + req.query.owner_name + "','" + req.query.owner_mobile + "','" + req.query.house_address + "','" + req.query.house_area + "','" + req.query.owner_email + "','" + req.query.owner_password + "')";
  //The above code inserts the data to the Form table according to each text field
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("table created"); //Consoles in Terminal once after the Table in the form is created.
  });
});
con.connect(function(err) {
  app.use(express.static('public'));
  app.get('/search', function(req, res){
    res.sendFile(__dirname + "/" + "project" + "/" +  "search.html");
  })
  app.post('/sell_post', function(req, res) {
    var sql = "SELECT owner_name,owner_mobile,house_address,house_area,owner_email FROM seller WHERE owner_name = '" + req.body.owner_name + "' OR owner_mobile = '" + req.body.owner_mobile + "' OR house_address = '" + req.body.house_address + "'OR house_area = '" + req.query.house_area + "' OR owner_email = '" + req.query.owner_email + "'";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.end(JSON.stringify(result));
    });
  });
});

app.get('/designs', function(req, res) { //Once the Page of index.htm is called
  res.sendFile(__dirname + "/" + "project" + "/" + "design.html"); // res.sendFile(__dirname + "/" + "form" + "/" + "src" + "/" + "App.htm");
})
})

var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
