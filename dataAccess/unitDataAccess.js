const Unit = require('../models/unit_model').Unit;
var logging  = require('../commons/logging');
var paging = require('../commons/pagination');
var jwt = require('../commons/jwt');
var querydao = require('../commons/dao');


function unitDataAccess() {

this.unitInsert = function(request,unit_id,callback) {

         const unitModel = new Unit();
         let unitInstance = unitModel.unitInsert(request,unit_id);

  db.getConnection(function (err, con) {

    if (err) {

        logging.LoggingFunction('unitInsert',err);
        callback(new Error("error in connecting to database"));
    }
    else {
        var queryobj = 'insert into unit set ?';
        var data = unitInstance
        querydao.insert(queryobj,data,con)

            var queryobj1 = 'select * from unit where name = ?';
            var data1 = [request.name]
            querydao.select(queryobj1,data1,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                var response = unitModel.unitInsertResponse(result1);
                callback(null, response);
            }
            else{
                 logging.LoggingFunction('unitInsert',err);
                 callback(new Error("no rows found after insertion"));
              }
            })

            .catch((err)=>{

                logging.LoggingFunction('unitInsert',err);
                callback(new Error("err  while inserting"));
             })

            .catch((err1)=>{

                logging.LoggingFunction('unitInsert',err1);
                callback(new Error("err while retrieving data"));

           })
        }
    });
 }

 this.unitUpdate = function(request,unit_id,callback) {

         const unitModel = new Unit();
         let ans = unitModel.unitUpdate(request);

  db.getConnection(function (err, con) {

    if (err) {

        logging.LoggingFunction('unitUpdate',err);
        callback(new Error("error in connecting to database"));
    }
    else {
        var queryobj = 'select * from unit where id = ?';
        var data = [request.id]
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                 var queryobj1 = 'update unit set name =?,description = ?,supervisor = ?,modifiedon=?, modifiedBy=? where id = ?';
                var data1 = [ans.name,ans.description,ans.supervisor,new Date(),unit_id,request.id]
                querydao.update(queryobj1,data1,con)

                // var response = unitModel.userResponse(result1,unit_id);
                // callback(null, response);
            }
            else{
                 logging.LoggingFunction('unitUpdate',err);
                 callback(new Error("err no data present"));
              }
            })

             .then((rows) =>{
               result2 = rows;
              callback(null, true);

              })
             .catch((err1)=>{

                logging.LoggingFunction('unitUpdate',err1);
                callback(new Error("err while retrieving data"));

             })
            .catch((err2)=>{

                logging.LoggingFunction('unitUpdate',err2);
                callback(new Error("no rows found after update"));

            })
        }
    });
 }

 this.getUnits = function(page,reqitem,callback) {

  db.getConnection(function (err, con) {

            if (err) {

               logging.LoggingFunction('getUnits',err);
               callback(new Error("error in connecting to database"));
            }
            else {
                
                var queryobj = 'select id from unit where status = ?';
                var data = 1
                 querydao.select(queryobj,data,con)

                .then((rows) => {
                  result1 = rows;

                 if (result1.length > 0) {
                    const total_items = result1.length;
                    let ans = paging.pagination(page,reqitem,total_items)

                    var queryobj1 = 'select * from unit where status = ? LIMIT '+[ans.Start_index,ans.Items_per_page];
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
                                logging.LoggingFunction('getUnits',"data is not present");
                                callback(new Error("data is not present"));
                        } 
                    })

                 .catch((err1) => {
                    
                        logging.LoggingFunction('getUnits',err1);
                        callback(new Error("error in retrieving details"));
                     }) 
                  }
                else{
                    
                     logging.LoggingFunction('getUnits',"no rows to retreive details");
                     callback(new Error("no rows to retreive details"));
                   }
                 })

              .catch((err1) => {
               
                logging.LoggingFunction('getUnits',err1);
                callback(new Error("error in retrieving details"));
            })    
         }
     });
  }

this.getUnitById = function(unit_id,callback) {

     const unitModel = new Unit();

  db.getConnection(function (err, con) {

      if (err) {

               logging.LoggingFunction('getUnitById',err);
               callback(new Error("error in connecting to database"));
            }
     else {

        var queryobj = 'select * from unit where id = ?';
        var data = unit_id
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result = rows;

             if (result.length > 0) {

                var response = unitModel.unitInsertResponse(result);
                callback(null, response);
            }
            else{
                 logging.LoggingFunction('getUnitById',err);
                 callback(new Error("err no data present"));
                }
             })

             .catch((err1)=>{

                logging.LoggingFunction('getUnitById',err1);//query err returned by promise
                callback(new Error("err while retrieving data"));

            })
         }
     });
   }
}

module.exports = new unitDataAccess();
