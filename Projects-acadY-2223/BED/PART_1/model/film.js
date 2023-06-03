// P2222910 Loh Jun Hao DIT 1B05
var db = require('./databaseConfig.js');
module.exports ={
    getFilm: function (category_id,callback) { // usually used by admin 
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected to furniture db in user.js getUsers function");
                var sql = ` SELECT  film_category.film_id , film.title,category.name, film.rating, film.release_year , film.length
                            FROM category
                            INNER JOIN film_category ON  category.category_id = film_category.category_id 
                            INNER JOIN film ON film_category.film_id  = film.film_id 
                            WHERE category.category_id = ?`;
                conn.query(sql,[category_id], function (err, result) {
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
    }
}