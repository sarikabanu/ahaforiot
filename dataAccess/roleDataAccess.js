const Role = require('../models/role_model').Role;
var logging  = require('../commons/logging');
var paging = require('../commons/pagination');
var jwt = require('../commons/jwt');
var querydao = require('../commons/dao');


function roleDataAccess() {

this.roleInsert = function(request,id,callback) {

         const roleModel = new Role();
         let roleInstance = roleModel.roleInsert(request,id);

  db.getConnection(function (err, con) {

    if (err) {

        logging.LoggingFunction('roleInsert',err);
        callback(new Error("error in connecting to database"));
    }
    else {
        var queryobj = 'insert into rolemanagement set ?';
        var data = roleInstance
        querydao.insert(queryobj,data,con)

            var queryobj1 = 'select * from rolemanagement where name = ?';
            var data1 = [request.name]
            querydao.select(queryobj1,data1,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                var response = roleModel.roleInsertResponse(result1);
                callback(null, response);
            }
            else{
                 logging.LoggingFunction('roleInsert',err);
                 callback(new Error("no rows found after insertion"));
              }
            })

            .catch((err)=>{
                console.log('err'+err)
                logging.LoggingFunction('roleInsert',err);
                callback(new Error("err  while inserting"));
             })

            .catch((err1)=>{
                console.log('err1'+err1)

                logging.LoggingFunction('roleInsert',err1);
                callback(new Error("err while retrieving data"));

           })
        }
    });
 }

 this.roleUpdate = function(request,id,callback) {

         const roleModel = new Role();
         let ans = roleModel.roleUpdate(request);

  db.getConnection(function (err, con) {

    if (err) {

        logging.LoggingFunction('roleUpdate',err);
        callback(new Error("error in connecting to database"));
    }
    else {
        var queryobj = 'select * from rolemanagement where id = ?';
        var data = request.id
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                 var queryobj1 = 'update rolemanagement set name =?,usertype = ?,modifiedon=?, modifiedBy=? where id = ?';
                var data1 = [ans.name,ans.usertype,new Date(),id,request.id]
                querydao.update(queryobj1,data1,con)

                // var response = roleModel.roleResponse(result1,role_id);
                // callback(null, response);
            }
            else{
                 logging.LoggingFunction('roleUpdate',err);
                 callback(new Error("err no data present"));
              }
            })

             .then((rows) =>{
               result2 = rows;
              callback(null, true);

              })
             .catch((err1)=>{

                logging.LoggingFunction('roleUpdate',err1);
                callback(new Error("err while retrieving data"));

             })
            .catch((err2)=>{

                logging.LoggingFunction('roleUpdate',err2);
                callback(new Error("no rows found after update"));

            })
        }
    });
 }

 this.getRole = function(page,reqitem,callback) {

  db.getConnection(function (err, con) {

            if (err) {

               logging.LoggingFunction('getRole',err);
               callback(new Error("error in connecting to database"));
            }
            else {

                var queryobj = 'select id from rolemanagement where status = ?';
                var data = 1
                 querydao.select(queryobj,data,con)

                .then((rows) => {
                  result1 = rows;

                 if (result1.length > 0) {
                    const total_items = result1.length;
                    let ans = paging.pagination(page,reqitem,total_items)

                    var queryobj1 = 'select * from rolemanagement where status = ? LIMIT '+[ans.Start_index,ans.Items_per_page];
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
                                logging.LoggingFunction('getRole',"data is not present");
                                callback(new Error("data is not present"));
                        } 
                    })

                 .catch((err1) => {
                    
                        logging.LoggingFunction('getRole',err1);
                        callback(new Error("error in retrieving details"));
                     }) 
                  }
                else{
                     
                     logging.LoggingFunction('getRole',"no rows to retreive details");
                     callback(new Error("no rows to retreive details"));
                   }
                 })

              .catch((err1) => {
               
                logging.LoggingFunction('getRole',err1);
                callback(new Error("error in retrieving details"));
            })      
         }
     });
  }

this.deleteRole = function(id,role_id,callback) {

  db.getConnection(function (err, con) {

      if (err) {

               logging.LoggingFunction('deleteRole',err);
               callback(new Error("error in connecting to database"));
            }
     else {

        var queryobj = 'select * from rolemanagement where id = ?';
        var data = role_id
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                 var queryobj1 = 'update rolemanagement set status = -1,modifiedon = ?, modifiedBy = ? where id = ?';
                var data1 = [new Date(),id,role_id]
                querydao.update(queryobj1,data1,con)

                // var response = roleModel.roleResponse(result1,role_id);
                // callback(null, response);
            }
            else{
                 logging.LoggingFunction('deleteRole',err);
                 callback(new Error("err no data present"));
              }
            })

             .then((rows) =>{
               result2 = rows;
              callback(null, true);

              })
             .catch((err1)=>{

                logging.LoggingFunction('deleteRole',err1);
                callback(new Error("err while retrieving data"));

             })
            .catch((err2)=>{

                logging.LoggingFunction('deleteRole',err2);
                callback(new Error("no rows found after update"));

            }) 
         }
     });
  
  }

 this.getRoleByName = function(name,callback) {

  const roleModel = new Role();

  db.getConnection(function (err, con) {

      if (err) {

               logging.LoggingFunction('getRoleByName',err);
               callback(new Error("error in connecting to database"));
            }
     else {

        var queryobj = 'select * from rolemanagement where name = ?';
        var data = name
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result = rows;

             if (result.length > 0) {

                // var response = roleModel.roleResponse(result);
                callback(null, result);
            }
            else{
                 logging.LoggingFunction('getRoleByName',err);
                 callback(new Error("err no data present"));
                }
             })

             .catch((err1)=>{

                logging.LoggingFunction('getRoleByName',err1);//query err returned by promise
                callback(new Error("err while retrieving data"));

            })
         }
     });
   }
   
 this.getRoleByUserType = function(usertype,callback) {

  const roleModel = new Role();

  db.getConnection(function (err, con) {

      if (err) {

               logging.LoggingFunction('getRoleByUserType',err);
               callback(new Error("error in connecting to database"));
            }
     else {

        var queryobj = 'select * from rolemanagement where usertype = ?';
        var data = usertype
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result = rows;

             if (result.length > 0) {

                // var response = roleModel.roleResponse(result);
                callback(null, result);
            }
            else{
                 logging.LoggingFunction('getRoleByUserType',err);
                 callback(new Error("err no data present"));
                }
             })

             .catch((err1)=>{

                logging.LoggingFunction('getRoleByUserType',err1);//query err returned by promise
                callback(new Error("err while retrieving data"));

            })
         }
     });
   }
}

module.exports = new roleDataAccess();
