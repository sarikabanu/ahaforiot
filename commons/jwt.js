
const jwt = require('jsonwebtoken');
const secret = 'sarika';


exports.generate = (id,typeid,phoneNumber) => {

    let payload = {
        id: id,
        typeid: typeid,
        phoneNumber: phoneNumber,
    };
    
    var token = jwt.sign(payload, secret);
    return token
};

exports.validate =function (app) {

        app.use(function (req, res, next) {

            var token = req.body.token || req.param('token') || req.headers['x-access-token'];

            if (token) {
                jwt.verify(token,secret,function (err, decoded) {

                    if (err) {

                        res.status(401).json({ error:'Failed to authenticate token.'})
                } else {
                    
                        req.jwtToken = decoded;
                         next();
                    }
                });
             } else {
                    res.status(401).json({ error:'Failed to authenticate token.'})
            }
      });
};
