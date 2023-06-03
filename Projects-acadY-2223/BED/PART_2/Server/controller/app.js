var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var user = require('../model/user.js');
var verifyToken = require('../auth/verifyToken.js');

// These 3 lines important and must be inserted into CA1 app.js
// Remember to use "npm i cors" in backend terminal
// This part allows request from a different domain to be accepted
var cors = require('cors');
app.options('*', cors());
app.use(cors());

var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use(bodyParser.json());
app.use(urlencodedParser);

app.use('/image', express.static('public/image'));


// Endpoint login 
app.post('/user/login', function (req, res) {
	var email = req.body.email;
	var password = req.body.password;

	user.loginUser(email, password, function (err, token, result) {
		if (!err) {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			delete result[0]['password'];//clear the password in json data, do not send back to client
			console.log(result);
			res.json({ success: true, UserData: JSON.stringify(result), token: token, status: 'You are successfully logged in!' });
			res.send();
		} else {
			res.status(500);
			res.send(err.statusCode);
		}
	});
});




// // Endpoint Homepage
// app.get('/user/', function (req, res) {
// 	var title = req.body.title;
// 	var category = req.body.category;
// 	user.getFilm(title, category, function (err, result) {
// 		if (!err) {
// 			res.send(result);
// 		} else {
// 			res.status(500).send("Some error");
// 		}
// 	});


// });




// Endpoint dropdown results
app.get('/user/searchcat', function (req, res) {
	// var category_id = req.params.category_id
	
	user.getCatorgories( function (err, result) {
		if (!err) {
			res.send(result);
		} else {
			res.status(500).send("Some error");
		}
	});


});
// Endpoint SP DVD

app.get('/user/searchfilm', function (req, res) {
	var title = req.query.title+"";
	var rental_rate = req.query.rental_rate+"";

	user.getFilm(title, rental_rate, function (err, result) {
		if (!err) {
			
			res.status(200).json(result);
			
		} else {
			console.log(err)
			res.status(500).send("Some error");
		}
	});


});

app.get('/user/searchfilmbycat/:category_id', function (req, res) {
	var category_id = req.params.category_id;
	

	user.getFilmByCategory(category_id, function (err, result) {
		if (!err) {
			console.log(result)
			res.send(result);
			
		} else {
			console.log(err)
			res.status(500).send("Some error");
		}
	});


});



// view details
app.get('/user/searchdetails', function (req, res) {
	var film_id = req.query.film_id;


	user.getDetails(film_id, function (err, result) {
		if (!err) {
			console.log(result)
			res.send(result);
			
		} else {
			console.log(err)
			res.status(500).send("Some error");
		}
	});


});

app.get('/user/searchdetails/actors', function (req, res) {
    var film_id = req.query.film_id;
	console.log(film_id);
	console.log(typeof film_id)
    user.getFilmActor(film_id, function (err, result) {
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("No Film Found");
            } else {
                res.send(result);
            }
        } else {
            res.status(500).send("Some error");
        }
    });

});











// Endpoint Add new Actor (Admin only)

app.post('/user/addactor',verifyToken, function (req, res) {

	var first_name = req.body.first_name;
	var last_name = req.body.last_name;


	user.addActor(first_name, last_name, function (err, result) {
		if (!err) {
			res.status(200);
			res.send(result);
		} else {
			res.status(500);
			res.send("{\"message\":\"Some error!\"}");
		}
	});
});

// Endpoint Add new customer (Admin only)
app.post('/user/addcustomer',verifyToken, function (req, res) {

	var store_id = req.body.store_id;
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var email = req.body.email;
	var address_line1 = req.body.address_line1;
	var address_line2 = req.body.address_line2;
	var district = req.body.district;
	var city_id = req.body.city_id;
	var postal_code = req.body.postal_code;
	var phone = req.body.phone;

	user.addCustomer(address_line1, address_line2, district, city_id, postal_code, phone, store_id, first_name, last_name, email, function (err, result) {
		if (!err) {
			res.status(200);
			res.sendStatus(result);
		} else {
			res.status(500);
			res.send("{\"message\":\"Some error!\"}");
		}
	});
});

















app.post('/user/logout', verifyToken, function(req,res){
	console.log("..logging out.");
	//res.clearCookie('session-id'); //clears the cookie in the response
	//res.setHeader('Content-Type', 'application/json');
  	res.json({success: true, status: 'Log out successful!'});
});

// app.put('/user',verifyToken,function(req,res){
// 	var username = req.body.username;
// 	var email = req.body.email;
// 	var role = req.body.role;

// 	// user.updateUser(username,email,role,function(err,result){
// 	user.updateUser(username,email,role,req.userid,function(err,result){
// 	if(!err){
// 			console.log("Update successful");
// 			res.statusCode = 200;
//   			res.setHeader('Content-Type', 'application/json');
//   			res.json({success: true, result: result, status: 'Record updated successfully!'});
// 		}else{
// 			res.status(500);
// 			res.send(err.statuscode);
// 		}
// 	})
// });



// app.get('/user', verifyToken, function(req, res){

// 	if (req.role == 'admin') {
// 		user.getUsers(function(err, result){
// 			if(!err){
// 				res.send(result);
// 			}else{
// 				res.status(500).send(null);
// 			}
// 		});
// 	} else {
// 		res.sendStatus(403);
// 	}

// }); 

module.exports = app;