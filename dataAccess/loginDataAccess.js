const User = require('../models/user_model').User;
var logging  = require('../commons/logging');
// const azurepath = "https://vsplitstorage.blob.core.windows.net/vsplitcontainer/";
var paging = require('../commons/pagination');
var jwt = require('../commons/jwt');
var querydao = require('../commons/dao');


function loginDataAccess() {

 this.userLogin = function(mailid,password,callback) {
       
 db.getConnection(function (err, con) {

 if (err) {

        logging.LoggingFunction('loginUser',err);
        callback(new Error("error in connecting to database"));
   }
   else {
     var queryobj = 'Select id,name,phone,typeid,unit from users where mailid = ? and password = ?';
     var data = [mailid,password]
     var prom = querydao.select(queryobj,data,con)
     
       prom.then((rows) => {
          result = rows;

       if (result.length > 0) {

            let token = jwt.generate(result[0].id,result[0].typeid,result[0].phone)
            //  let response = userModel.loginResponse(token,result[0].name,mailid,result[0].phone,result[0].unit);
            let response = {
                token : token,
                name :result[0].name,
                mailid:mailid,
                phone:result[0].phone,
                unit : result[0].unit
            }
            console.log(response)

            callback(null, response);
         }
        else{
              logging.LoggingFunction('loginUser','you need to register');
              callback(new Error("you need to register"));
          }
       })

       prom.catch((err) => {

            logging.LoggingFunction('loginUser',err);
            callback(new Error("error in retrieving details"));
         })              
       }    
    });
 }

 this.userRegistration = function(request,callback) {

         const userModel = new User();
         let userInstance = userModel.loginUser(request);

  db.getConnection(function (err, con) {

    if (err) {

        logging.LoggingFunction('userRegistration',err);
        callback(new Error("error in connecting to database"));
    }
    else {
        var queryobj = 'insert into users set ?';
        var data = userInstance
        querydao.insert(queryobj,data,con)

            var queryobj1 = 'Select id,typeid from users where phone = ? and password = ?';
            var data1 = [request.phone,request.password]
            querydao.select(queryobj1,data1,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                // let token = jwt.generate(result1[0].id,result1[0].typeid,request.phone)
                // var response = userModel.userResponse(result1,token);
                callback(null, true);
            }
            else{
                 logging.LoggingFunction('userRegistration',err);
                 callback(new Error("no rows found after insertion"));
              }
            })

            .catch((err)=>{

                logging.LoggingFunction('userRegistration',err);
                callback(new Error("err  while inserting"));
             })

            .catch((err1)=>{

                logging.LoggingFunction('userRegistration',err1);
                callback(new Error("err while retrieving data"));

           })
        }
    });
 }

 this.getUserType = function(callback) {

  db.getConnection(function (err, con) {

            if (err) {

               logging.LoggingFunction('getUserType',err);
               callback(new Error("error in connecting to database"));
            }
            else {
                var queryobj = 'select * from usertype where status = ?';
                var data = 1
                 querydao.select(queryobj,data,con)

                .then((rows) => {
                  result = rows;

                 if (result.length > 0) {

                  callback(null, result);
                 }
                else{
                     logging.LoggingFunction('getUserType',err);
                     callback(new Error("no rows to retreive details"));
                }
            })

           .catch((err1) => {
               
                logging.LoggingFunction('getUserType',err);
                callback(new Error("error in retrieving details"));
            })      
         }
     });
  }
}

module.exports = new loginDataAccess();
