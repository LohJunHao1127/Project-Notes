var mysql = require('mysql');

var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "bed_dvd_root",
            password: "pa$$woRD123",
            database: "sakila",
            dateStrings: true
        });
        return conn;
    }
};

module.exports = dbconnect