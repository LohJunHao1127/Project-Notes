var db = require('./databaseConfig.js');
var config = require('../config.js');
var jwt = require('jsonwebtoken');

var userDB = {

	loginUser: function (email, password, callback) {

		var conn = db.getConnection();

		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			}
			else {
				console.log("Connected!");

				var sql = 'select * from staff where email=? and password=?';

				conn.query(sql, [email, password], function (err, result) {
					conn.end();

					if (err) {
						console.log("Err: " + err);
						return callback(err, null, null);
					} else {
						var token = "";
						var i;
						if (result.length == 1) {

							token = jwt.sign({ id: result[0].staff_id }, config.key, {
								expiresIn: 86400 //expires in 24 hrs
							});
							console.log("@@token " + token);
							return callback(null, token, result);


						} else {
							var err2 = new Error("Email/Password does not match.");
							err2.statusCode = 500;
							return callback(err2, null, null);
						}
					}  //else
				});
			}
		});
	},


	addActor: function (first_name, last_name, callback) {

		var conn = db.getConnection();

		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			} else {

				console.log("Connected!");
				sqlStr = "INSERT INTO actor(first_name,last_name) values(?,?)";
				conn.query(sqlStr, [first_name, last_name], function (err, result) {
					conn.end();

					if (err) {
						console.log(err);
						return callback(err, null);
					} else {
						return callback(null, result);
					}
				});

			}
		});
	},
	addCustomer: function (address_line1, address_line2, district, city_id, postal_code, phone, store_id, first_name, last_name, email, callback) {
		var conn = db.getConnection();
		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			} else {
				console.log("Connected to sp_dvd_db in customer.js addCustomer function");
				var sql = ` INSERT INTO address(address, address2, district, city_id, postal_code, phone) values(?,?,?,?,?,?);`

				conn.query(sql, [address_line1, address_line2, district, city_id, postal_code, phone], function (err, result) {

					if (err) {
						console.log(err);
						return callback(err, null);
					} else {
						var sql1 = ` Insert into customer(store_id, first_name, last_name, email, address_id) values(?,?,?,?,?);`

						conn.query(sql1, [store_id, first_name, last_name, email, result.insertId], function (err1, result1) {
							conn.end();
							if (err1) {
								console.log(err1);
								return callback(err1, null);
							} else {
								console.log(result1.insertId);
								return callback(null, result1.insertId);
							}
						});


					}
				});
			}
		});
	},

	getFilm: function (title, rental_rate, callback) {

		const conn = db.getConnection();
		conn.connect((err) => {
			if (err) { // connect to db failed
				return callback(err, null);
			} else { // connect to db successful
				if (title.length == 0 && rental_rate.length == 0) { //has nothing
					console.log("Connected to sp_dvd_db in user.js getFilm1 function");
					
					const sql = `SELECT film.film_id, film.title, film.release_year, film.rating FROM film`;

					conn.query(sql, (err, result) => {
						conn.end();
						
						if (err) {

							return callback(err, null);
						} else {
							if (result.length == 0) {
								return callback(null, null);
							} else {
								return callback(null, result);
							}
						}
					})
				} else if(title.length == 0){//only when has rental_rate
					console.log("Connected to sp_dvd_db in user.js getFilm2 function");
					const sql2 = `SELECT film.film_id, film.title, film.release_year, film.rating FROM film where film.rental_rate < ${rental_rate}
                    `;
					conn.query(sql2, [rental_rate], (err, result) => {
						conn.end(); //end connection
						// console.log(result)
						if (err) {

							return callback(err, null);
						} else {
							if (result.length == 0) {
								return callback(null, null);
							} else {
								return callback(null, result);
							}
						}
					});
				} else if(rental_rate.length == 0){//when only has title
					console.log("Connected to sp_dvd_db in user.js getFilm3 function");
					const sql3 = `SELECT film.film_id, film.title, film.release_year, film.rating FROM film where film.title LIKE '% ${title}%'
                    `;
					conn.query(sql3, [title], (err, result) => {
						conn.end(); //end connection
						// console.log(result)
						if (err) {

							return callback(err, null);
						} else {
							if (result.length == 0) {
								return callback(null, null);
							} else {
								return callback(null, result);
							}
						}
					});
				} else {//only when has eveyt
					console.log("Connected to sp_dvd_db in user.js getFilm4 function");
					title = `%${title}%`;
					const sql4 = `SELECT f.title, c.name, f.rental_rate price, f.release_year, f.rating, f.film_id
					FROM film AS f, category AS c, film_category AS fc
					WHERE f.film_id = fc.film_id
					AND fc.category_id = c.category_id
					AND f.title LIKE ?
					AND f.rental_rate < ?`;
					conn.query(sql4, [title,rental_rate], (err, result) => {
						conn.end(); //end connection
						// console.log(result)
						if (err) {

							return callback(err, null);
						} else {
							if (result.length == 0) {
								return callback(null, null);
							} else {
								return callback(null, result);
							}
						}
					});
				}
			}
		});
	},

	getFilmByCategory: function (category_id, callback) {
		const conn = db.getConnection();
		conn.connect((err) => {
			if (err) { // connect to db failed
				return callback(err, null);
			} else { // connect to db successful

				console.log("Connected to sp_dvd_db in user.js getFilmByCategory function");
				const sql2 = `SELECT f.title, c.name, f.release_year, f.rating, f.film_id
				FROM film AS f, film_category AS fc, category AS c
				WHERE f.film_id = fc.film_id
				AND fc.category_id = c.category_id
				AND c.category_id = ${category_id}
				`;
				conn.query(sql2, [category_id], (err, result) => {
					conn.end(); //end connection
					if (err) {

						return callback(err, null);
					} else {
						if (result.length == 0) {
							return callback(null, null);
						} else {
							return callback(null, result);
						}
					}
				});
			
			}
		});
	},

	getCatorgories: function (callback) {

		var conn = db.getConnection();
		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			}
			else {
				console.log("Connected to sp_dvd_db in user.js getCatorgories function");


				var sql = `SELECT * FROM category`;

				conn.query(sql, [], function (err, result) {
					conn.end();
					if (err) {
						console.log(err);
						return callback(err, null);
					} else {
						return callback(null, result);
					}
				});
			}
		});
	},

	getDetails: function (film_id, callback) { //film details
        var conn = db.getConnection();
        conn.connect(function (err) { 
            if (err) { 
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `	SELECT f.*, c.*, a.*
				FROM film f, film_category fc, category c, film_actor fa, actor a
				WHERE f.film_id = fc.film_id
				AND fc.category_id = c.category_id
				AND f.film_id = fa.film_id
				AND fa.actor_id = a.actor_id
				AND f.film_id = ?
				`;
                conn.query(sql, [film_id], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err); 
                        return callback(err, null);
                    }
                    else {
						console.log(result)
                        return callback(null, result);
                    }
                });
            }
        });
    },

    getFilmActor: function (film_id, callback) {//get film's actor
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `select a.first_name, a.last_name from film_actor f, actor a where f.film_id=? and f.actor_id = a.actor_id;`;
                conn.query(sql, [film_id], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    },

};

module.exports = userDB;

