var express = require('express');
var bodyparser = require('body-parser');
require('./commons/routeInit');
var jwt = require('./commons/jwt');
var cors = require('cors')


var app = express();
app.use(bodyparser.urlencoded({limit: '50mb',extended: true}));
app.use(bodyparser.json({ limit: '50mb' }));

app.use(cors())

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'access-control-allow-methods,access-control-allow-origin,x-access-token,content-type,Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    
});

_Routes.login.configure(app);
jwt.validate(app);
_Routes.device.configure(app);
_Routes.user.configure(app);
_Routes.animal.configure(app);
_Routes.unit.configure(app);
_Routes.threshold.configure(app);
_Routes.role.configure(app);





var server = app.listen(process.env.PORT || 6003, function() {
    console.log('Server listening on port ' + server.address().port);
});

