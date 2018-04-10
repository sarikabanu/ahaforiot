var logindataaccess = require('../dataAccess/loginDataAccess'); 
var logging  = require('../commons/logging');

function Contollers() {

this.userLogin = function (req,res) {

    let mailid = req.body.mailid
    let password = req.body.password

        if (req.body.mailid ==''||req.body.mailid == null||req.body.password ==''||req.body.password == null) {

           res.status(400).json({ error:'Missing mailid and password in request'})
      //  return serverResponse.sendInvalidRequest(res,{statusDescription: 'Missing mailid in request'});

        }else{
        logindataaccess.userLogin(mailid,password,function(error,response) {

        if (error) {

             logging.LoggingFunction('userLogin',error);
            //   return serverResponse.sendInvalidRequest(res,{statusDescription: error.toString()});
              res.status(400).json(error.toString())
        }else {

            //   return serverResponse.sendOk(res, {statusDescription: 'login successfull',result:response});
             res.status(200).json({ message:'login successfull', content: response })
         }
     });
   }
}
this.userRegistration = function (req,res) {

    if (req.body==''||req.body== null) {

           res.status(400).json({ error:'Missing parameters in request'})

        }else{
        logindataaccess.userRegistration(req.body,function(error,response) {

        if (error) {

             logging.LoggingFunction('userRegistration',error);
              res.status(400).json(error.toString())
        }else {

              res.status(200).json({ message:'Registered successfully'})
         }
     });
   }
}
this.getUserType = function (req,res) {

        logindataaccess.getUserType(function(error,response) {

        if (error) {

             logging.LoggingFunction('getUserType',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'Retrieved details', content: response })
         }
     });
 }
}

module.exports = new Contollers();

