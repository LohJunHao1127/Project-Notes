// P2222910 Loh Jun Hao DIT 1B05


var express = require('express');
var app = express();
var actor = require('../model/actor.js');
var customer = require('../model/customer.js');
var payment = require('../model/payment.js');
var film = require('../model/film.js');


app.use(express.json());// parse application/json
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

// Endpoint 1	GET /actors/:actor_id 
app.get('/actors/:actor_id', function (req, res) {
    var actor_id = parseInt(req.params.actor_id);

    if (isNaN(actor_id)) {
        res.status(404).json({ message: `Unacceptable record ID` });
    } else {
        actor.getActor(actor_id, function (err, result) {
            if (!err) {
                if (result.length == 0) {
                    res.status(204).json({ message: `Record not found` });
                } else {

                    res.status(200).json(result);
                }
            } else {
                res.status(500).json({ error_msg: `Internal server error` });
            }
        });
    }
});

// Endpoint 2	GET /actors	
app.get('/actors', function (req, res) {

    actor.getActors(req.query.limit, req.query.offset, function (err, result) {
        if (!err) {
            if (result.length == 0) {
                res.status(200).json([]);
            } else {
                
                res.status(200).json(result);
            }
        } else {
            res.status(500).json({ error_msg: `Internal server error` });
        }
    });
});

// Endpoint 3	POST /actors
app.post('/actors', function (req, res) {
    
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    actor.addActor(first_name, last_name, function (err, result) {
        if (!err) {
            res.status(201).json({ actor_id: `${result}` });
        } else if (first_name == null || last_name == null) {
            res.status(400).json({ error_msg: `missing data` })
        } else {
            res.status(500).json({ error_msg: `Internal server error` });
        }


    });

});

// Endpoint 4	PUT /actors/:actor_id
app.put('/actors/:actor_id', function (req, res) {
    var actor_id = parseInt(req.params.actor_id);
    console.log(actor_id)
    var { first_name, last_name } = req.body;
    if (isNaN(actor_id)) {
        res.status(400).json({error_msg: `missing data`});
    } else {
        actor.updateActor(first_name, last_name, actor_id, function (err, result) {
            if (!err) {
                if (result.length == 0) {
                    res.status(204);
                }else{
                    res.status(200).json({success_message: `${result} record updated`});
                }
            }else{
                res.status(500).json({error_msg: `Internal server error`});
            }
        });
    }
});

// Endpoint 5	DELETE /actors/:actor_id
app.delete('/actors/:actor_id', function (req, res) {
    var actor_id = parseInt(req.params.actor_id);
    console.log(actor_id)
    if (isNaN(actor_id)) {
        res.status(404).json({message: `Unacceptable record ID`});
    } else {
        actor.deleteActor(actor_id, function (err, result) {
            if (!err) {
                if (result.length == 0) {
                    res.status(204);
                }else{
                    res.status(200).json({success_message: `${result} record deleted`});
                }
            }else{
                res.status(500).json({error_msg: `Internal server error`});
            }
        });
    }
});

// Endpoint 6	GET /film_categories/:category_id/films
app.get('/film_categories/:category_id/films', function (req, res) { 

    var category_id = parseInt(req.params.category_id);

    if (isNaN(category_id)) {
        res.status(404).json({message: `Unacceptable record ID`});
    } else {
        film.getFilm(category_id, function (err, result) {
            if (!err) {
                if (result.length == 0) {
                    res.status(200).json([]);
                } else {
                    res.status(200).json(result);
                }
            }else{
                res.status(500).json({error_msg: `Internal server error`});
            }
        });
    }
});

// Endpoint 7	GET /customer/:customer_id/payment
app.get('/customer/:customer_id/payment', function (req, res) { 
    var customer_id = parseInt(req.params.customer_id);
    var start_date = req.query.start_date;
    var end_date = req.query.end_date;
    console.log(start_date)
    console.log(end_date)
    if (isNaN(customer_id)) {
        res.status(404).json({message: `Unacceptable record ID`});
    } else {
        customer.getCustomer(customer_id,start_date,end_date, function (err, result) {
            if (!err) {
                if (result.length == 0) {
                    res.status(200).json({message: `Record not found`});
                } else {
                    // res.send(result); // BED usually use JSON
                    res.status(200).json(result);
                }
            }else{
                res.status(500).json({message: `Some error`});
            }
        });
    }
 
});

// Endpoint 8	POST /customers
app.post('/customers', function (req, res) {
    
    var store_id = req.body.store_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var address = req.body.address;
    var address_line1 = req.body.address.address_line1;
    var address_line2 = req.body.address.address_line2;
    var district = req.body.address.district;
    var city_id = req.body.address.city_id;
    var postal_code = req.body.address.postal_code;
    var phone = req.body.address.phone;
    
    console.log(address)
    console.log(store_id)
    console.log(address_line1)
    customer.addCustomer(address_line1,address_line2,district,city_id,postal_code,phone,store_id, first_name, last_name, email,  function (err, result) {
        if (!err) {
            res.status(201).json({ customer_id: `${result}` });
        } else if (store_id == null ||first_name == null || last_name == null|| email == null|| address_line1 == null|| district == null|| city_id == null|| postal_code == null|| phone == null) {
            res.status(400).json({ error_msg: `missing data` })
        } else {
            res.status(500).json({ error_msg: `Internal server error` });
        }
// {
//     "store_id": "1",
//     "first_name":"MARTIN",
//     "last_name": "SIM",
//     "email":"martin_sim@gmail.com",
//     "address": {
//         "address_line1": "77 elm street",
//         "address_line2": "",
//         "district": "California",
//         "city_id": "449",
//         "postal_code": "17886",
//         "phone": "6325-8596"
//     }
// }


    });

});

module.exports = app

