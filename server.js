var express = require('express');
var app = express();
var PORT = 3000;

var middleware = {
	requireAuthentication: function (req, res, next) {
		console.log('private route hit!');
		next();
	},
	logger: function (req, res, next) {
		console.log('Request: ' + new Date().toString() + ' ' + req.method + ' ' + req.originalUrl);
		next();
	}
};
//app.use(middleware.requireAuthentication);
app.use(middleware.logger);

/*app.get('/', function (req, res) {
	res.send('Hello express');
});
*/
app.get('/about', middleware.requireAuthentication, function (req, res) {
	res.send('<h1>About us page!</h1>');
});

app.use(express.static(__dirname + '/public'));
//console.log(__dirname);

app.listen(PORT, function () {
	console.log('express server started: ' + PORT);
});