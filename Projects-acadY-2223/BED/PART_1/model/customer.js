// P2222910 Loh Jun Hao DIT 1B05

var db = require('./databaseConfig.js');
module.exports ={
    // Endpoint 7	GET /customer/:customer_id/payment
    getCustomer: function (customer_id,start_date,end_date,callback) { 
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected to sp_dvd_db in customer.js getCustomer function");
                var sql = ` SELECT film.title,payment.amount,payment.payment_date 
                            FROM payment,rental,inventory,film 
                            WHERE payment.rental_id=rental.rental_id 
                            AND rental.inventory_id=inventory.inventory_id 
                            AND inventory.film_id=film.film_id 
                            AND payment.customer_id=? 
                            AND payment.payment_date BETWEEN ? AND ?
                            ORDER BY payment.payment_date;`;
                conn.query(sql,[customer_id,start_date,end_date], function (err, result) {
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

    // Endpoint 8	POST /customers
    addCustomer: function (address_line1,address_line2,district,city_id,postal_code,phone,store_id, first_name, last_name, email, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            } else {
                console.log("Connected to sp_dvd_db in customer.js addCustomer function");
                var sql = ` INSERT INTO address(address, address2, district, city_id, postal_code, phone) values(?,?,?,?,?,?);`

                conn.query(sql, [address_line1,address_line2,district,city_id,postal_code,phone], function (err, result) {
                    
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        var sql1 = ` Insert into customer(store_id, first_name, last_name, email, address_id) values(?,?,?,?,?);`
                        
                        conn.query(sql1, [store_id, first_name, last_name, email,result.insertId], function (err1, result1) {
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
}