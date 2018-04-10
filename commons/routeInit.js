uuid = require('uuid');
db = require('../commons/mysqlConnection').pool;
jwt = require('jsonwebtoken');
setconfig = require('../config/setconfig');
setconfig.setConf(false);
Q = require('q');


_Routes = {

    login:require('../routes/loginRoute'),
    device:require('../routes/deviceRoute'),
    user:require('../routes/userRoute'),
    animal:require('../routes/animalRoute'),
    unit:require('../routes/unitRoute'),
    threshold:require('../routes/thresholdRoute'),
    role:require('../routes/roleRoute')

    };