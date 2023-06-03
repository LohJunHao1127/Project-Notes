// P2222910 Loh Jun Hao DIT 1B05

var app = require('./controller/App.js');
var port=8081
var server = app.listen(port, function () {
    console.log('Web App Hosted at http://localhost:%s',port);
});
