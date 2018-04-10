const User = require('../models/user_model').User;
var logging  = require('../commons/logging');
var paging = require('../commons/pagination');
var jwt = require('../commons/jwt');
var querydao = require('../commons/dao');


function userDataAccess() {

this.userInsert = function(request,id,callback) {

         const userModel = new User();
         let userInstance = userModel.userInsert(request,id);

  db.getConnection(function (err, con) {

    if (err) {

        logging.LoggingFunction('userInsert',err);
        callback(new Error("error in connecting to database"));
    }
    else {
        var queryobj = 'insert into users set ?';
        var data = userInstance
        querydao.insert(queryobj,data,con)

            var queryobj1 = 'Select id,typeid from users where phone = ? ';
            var data1 = [request.phone]
            querydao.select(queryobj1,data1,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                // let token = jwt.generate(result1[0].id,result1[0].typeid,request.phone)
                // var response = userModel.userResponse(result1,token);
                callback(null, true);
            }
            else{
                 logging.LoggingFunction('userInsert',err);
                 callback(new Error("no rows found after insertion"));
              }
            })

            .catch((err)=>{

                logging.LoggingFunction('userInsert',err);
                callback(new Error("err  while inserting"));
             })

            .catch((err1)=>{

                logging.LoggingFunction('userInsert',err1);
                callback(new Error("err while retrieving data"));

           })
        }
    });
 }

 this.userUpdate = function(request,id,callback) {

         const userModel = new User();
         let ans = userModel.userUpdate(request);

  db.getConnection(function (err, con) {

    if (err) {

        logging.LoggingFunction('userUpdate',err);
        callback(new Error("error in connecting to database"));
    }
    else {
        var queryobj = 'select * from users where id = ?';
        var data = id
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                 var queryobj1 = 'update users set name =?,phone = ?,mailid = ?,password = ?,modifiedon=?, modifiedBy=? where id = ?';
                var data1 = [ans.name,ans.phone,ans.mailid,ans.password,new Date(),id,request.id]
                querydao.update(queryobj1,data1,con)

                // var response = userModel.userResponse(result1,user_id);
                // callback(null, response);
            }
            else{
                 logging.LoggingFunction('userUpdate',err);
                 callback(new Error("err no data present"));
              }
            })

             .then((rows) =>{
               result2 = rows;
              callback(null, true);

              })
             .catch((err1)=>{

                logging.LoggingFunction('userUpdate',err1);
                callback(new Error("err while retrieving data"));

             })
            .catch((err2)=>{

                logging.LoggingFunction('userUpdate',err2);
                callback(new Error("no rows found after update"));

            })
        }
    });
 }

 this.userUpdateByAdmin = function(request,id,callback) {

         const userModel = new User();
         let ans = userModel.userUpdateByAdmin(request);

  db.getConnection(function (err, con) {

    if (err) {

        logging.LoggingFunction('userUpdateByAdmin',err);
        callback(new Error("error in connecting to database"));
    }
    else {
        var queryobj = 'select * from users where id = ?';
        var data = request.id
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                 var queryobj1 = 'update users set typeid =?,unit = ?,modifiedon=?, modifiedBy=? where id = ?';
                var data1 = [ans.typeid,ans.unit,new Date(),id,request.id]
                querydao.update(queryobj1,data1,con)

                // var response = userModel.userResponse(result1,user_id);
                // callback(null, response);
            }
            else{
                 logging.LoggingFunction('userUpdateByAdmin',err);
                 callback(new Error("err no data present"));
              }
            })

             .then((rows) =>{
               result2 = rows;
              callback(null, true);

              })
             .catch((err1)=>{

                logging.LoggingFunction('userUpdateByAdmin',err1);
                callback(new Error("err while retrieving data"));

             })
            .catch((err2)=>{

                logging.LoggingFunction('userUpdateByAdmin',err2);
                callback(new Error("no rows found after update"));

            })
        }
    });
 }
 
 this.getUser = function(page,reqitem,callback) {

  db.getConnection(function (err, con) {

            if (err) {

               logging.LoggingFunction('getUser',err);
               callback(new Error("error in connecting to database"));
            }
            else {

                var queryobj = 'select id from users where status = ? or status = 0';
                var data = 1
                 querydao.select(queryobj,data,con)

                .then((rows) => {
                  result1 = rows;

                 if (result1.length > 0) {
                    const total_items = result1.length;
                    let ans = paging.pagination(page,reqitem,total_items)

                    var queryobj1 = 'select * from users where status = ? or status = 0 LIMIT '+[ans.Start_index,ans.Items_per_page];
                    var data1 = 1
                    querydao.select(queryobj1,data1,con)

                  .then((rows) =>  {
                    result = rows;

                        if (result.length > 0) {
                            let response = {
                                total_items,
                                total_pages,
                                result
                            }
                                callback(null, response);
                        }
                        else{
                                logging.LoggingFunction('getUser',"data is not present");
                                callback(new Error("data is not present"));
                        } 
                    })

                 .catch((err1) => {
                    
                        logging.LoggingFunction('getUser',err1);
                        callback(new Error("error in retrieving details"));
                     }) 
                  }
                else{
                     
                     logging.LoggingFunction('getUser',"no rows to retreive details");
                     callback(new Error("no rows to retreive details"));
                   }
                 })

              .catch((err1) => {
               
                logging.LoggingFunction('getUser',err1);
                callback(new Error("error in retrieving details"));
            })      
         }
     });
  }

 
 this.getUserByUnit = function(unit,page,reqitem,callback) {

  db.getConnection(function (err, con) {

            if (err) {

               logging.LoggingFunction('getUserByUnit',err);
               callback(new Error("error in connecting to database"));
            }
            else {

                var queryobj = 'select id from users where status = 1 or status = 0 and unit = ?';
                var data = unit
                 querydao.select(queryobj,data,con)

                .then((rows) => {
                  result1 = rows;

                 if (result1.length > 0) {
                    const total_items = result1.length;
                    let ans = paging.pagination(page,reqitem,total_items)

                    var queryobj1 = 'select * from users where status = 1 or status = 0 and unit = ? LIMIT '+[ans.Start_index,ans.Items_per_page];
                    var data1 = unit
                    querydao.select(queryobj1,data1,con)

                  .then((rows) =>  {
                    result = rows;

                        if (result.length > 0) {
                            let response = {
                                total_items,
                                total_pages,
                                result
                            }
                                callback(null, response);
                        }
                        else{
                                logging.LoggingFunction('getUserByUnit',"data is not present");
                                callback(new Error("data is not present"));
                        } 
                    })

                 .catch((err1) => {
                    
                        logging.LoggingFunction('getUserByUnit',err1);
                        callback(new Error("error in retrieving details"));
                     }) 
                  }
                else{
                     
                     logging.LoggingFunction('getUserByUnit',"no rows to retreive details");
                     callback(new Error("no rows to retreive details"));
                   }
                 })

              .catch((err1) => {
               
                logging.LoggingFunction('getUserByUnit',err1);
                callback(new Error("error in retrieving details"));
            })      
         }
     });
  }

this.deleteUser = function(id,user_id,callback) {

  db.getConnection(function (err, con) {

      if (err) {

               logging.LoggingFunction('deleteUser',err);
               callback(new Error("error in connecting to database"));
            }
     else {

        var queryobj = 'select * from users where id = ?';
        var data = user_id
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                 var queryobj1 = 'update users set status = -1,modifiedon = ?, modifiedBy = ? where id = ?';
                var data1 = [new Date(),id,user_id]
                querydao.update(queryobj1,data1,con)

                // var response = userModel.userResponse(result1,user_id);
                // callback(null, response);
            }
            else{
                 logging.LoggingFunction('deleteUser',err);
                 callback(new Error("err no data present"));
              }
            })

             .then((rows) =>{
               result2 = rows;
              callback(null, true);

              })
             .catch((err1)=>{

                logging.LoggingFunction('deleteUser',err1);
                callback(new Error("err while retrieving data"));

             })
            .catch((err2)=>{

                logging.LoggingFunction('deleteUser',err2);
                callback(new Error("no rows found after update"));

            }) 
         }
     });
  
  }

 this.getUserById = function(user_id,callback) {

  const userModel = new User();

  db.getConnection(function (err, con) {

      if (err) {

               logging.LoggingFunction('getUserById',err);
               callback(new Error("error in connecting to database"));
            }
     else {

        var queryobj = 'select * from users where id = ?';
        var data = user_id
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result = rows;

             if (result.length > 0) {

                var response = userModel.userResponse(result);
                callback(null, response);
            }
            else{
                 logging.LoggingFunction('getUserById',err);
                 callback(new Error("err no data present"));
                }
             })

             .catch((err1)=>{

                logging.LoggingFunction('getUserById',err1);//query err returned by promise
                callback(new Error("err while retrieving data"));

            })
         }
     });
   }
   
 this.getUserByTypeId = function(type_id,callback) {

  const userModel = new User();

  db.getConnection(function (err, con) {

      if (err) {

               logging.LoggingFunction('getUserByTypeId',err);
               callback(new Error("error in connecting to database"));
            }
     else {

        var queryobj = 'select * from users where typeid = ?';
        var data = type_id
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result = rows;

             if (result.length > 0) {

                // var response = userModel.userResponse(result);
                callback(null, result);
            }
            else{
                 logging.LoggingFunction('getUserByTypeId',err);
                 callback(new Error("err no data present"));
                }
             })

             .catch((err1)=>{

                logging.LoggingFunction('getUserByTypeId',err1);//query err returned by promise
                callback(new Error("err while retrieving data"));

            })
         }
     });
   }
}

module.exports = new userDataAccess();
