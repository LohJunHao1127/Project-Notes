// P2222910 Loh Jun Hao DIT 1B05
var db = require('./databaseConfig.js');
module.exports ={
    // Endpoint 1	GET /actors/:actor_id
    getActor: function (actor_id, callback) { 
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {

                console.log("Connected to sp_dvd_db in actor.js getActor function");
                var sql = `SELECT actor_id, first_name, last_name FROM actor WHERE actor_id = ?`;
                conn.query(sql, [actor_id], function (err, result) {
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
    // Endpoint 2	GET /actors
    getActors: function (limit=20,offset=0,callback) {

        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected to sp_dvd_db in actor.js getActor function");
                var sql = `SELECT actor_id, first_name, last_name FROM actor ORDER BY first_name LIMIT ? offset ?`;
                conn.query(sql,[parseInt(limit),parseInt(offset)], function (err, result) {
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
    
    // Endpoint 3	POST /actors
    addActor: function (first_name, last_name, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            } else {
                console.log("Connected to sp_dvd_db in actor.js addActor function");
                var sql = 'Insert into actor(first_name, last_name) values(?,?)';

                conn.query(sql, [first_name, last_name], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result.insertId); 
                        return callback(null, result.insertId);
                    }
                });
            }
        });
    },

    // Endpoint 4	PUT /actors/:actor_id
    updateActor: function (first_name, last_name, actor_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected to sp_dvd_db in actor.js updateActor function");
                var sql = 'Update actor set first_name=IfNull(?,actor.first_name),last_name=IfNull(?,actor.last_name) where actor_id=?';
                conn.query(sql, [first_name, last_name, actor_id], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result.affectedRows);
                    }
                });
            }
        });
    },

    // Endpoint 5	DELETE /actors/:actor_id
    deleteActor: function (actor_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected to sp_dvd_db in actor.js deleteActor function");
                var sql = 'DELETE FROM actor WHERE actor_id = ?';
                conn.query(sql, [actor_id], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result.affectedRows);
                    }
                });
            }
        });
    }


}

