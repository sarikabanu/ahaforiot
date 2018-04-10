const Threshold = require('../models/threshold_model').Threshold;
var logging  = require('../commons/logging');
var paging = require('../commons/pagination');
var jwt = require('../commons/jwt');
var querydao = require('../commons/dao');


function ThresholdDataAccess() {

this.thresholdInsert = function(request,user_id,callback) {

         const thresholdModel = new Threshold();
         let thresholdInstance = thresholdModel.thresholdInsert(request,user_id);

  db.getConnection(function (err, con) {

    if (err) {

        logging.LoggingFunction('thresholdInsert',err);
        callback(new Error("error in connecting to database"));
    }
    else {
        var queryobj = 'insert into threshold set ?';
        var data = thresholdInstance
        querydao.insert(queryobj,data,con)

            var queryobj1 = 'select * from threshold where name = ? and unitid = ?';
            var data1 = [request.name,request.unitid]
            querydao.select(queryobj1,data1,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                var response = thresholdModel.thresholdInsertResponse(result1);
                callback(null, response);
            }
            else{
                 logging.LoggingFunction('thresholdInsert',err);
                 callback(new Error("no rows found after insertion"));
              }
            })

            .catch((err)=>{

                logging.LoggingFunction('thresholdInsert',err);
                callback(new Error("err  while inserting"));
             })

            .catch((err1)=>{

                logging.LoggingFunction('thresholdInsert',err1);
                callback(new Error("err while retrieving data"));

           })
        }
    });
 }

 this.thresholdUpdate = function(request,user_id,callback) {

         const thresholdModel = new Threshold();
         let ans = thresholdModel.thresholdUpdate(request);

  db.getConnection(function (err, con) {

    if (err) {

        logging.LoggingFunction('thresholdUpdate',err);
        callback(new Error("error in connecting to database"));
    }
    else {
        var queryobj = 'select * from threshold where id = ?';
        var data = [request.id]
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                 var queryobj1 = 'update threshold set name = ?,type = ?,description = ?,valueofmax = ?,valueofmin = ?,unitid = ?,modifiedon=?, modifiedBy = ? where id = ?';
                var data1 = [ans.name,ans.type,ans.description,ans.valueofmax,ans.valueofmin,ans.unitid,new Date(),user_id,request.id]
                querydao.update(queryobj1,data1,con)
                // var response = thresholdModel.userResponse(result1,user_id);
                // callback(null, response);
            }
            else{
                                 console.log('@@@@@@@@@@'+err)

                 logging.LoggingFunction('thresholdUpdate',err);
                 callback(new Error("err no data present"));
              }
            })

             .then((rows) =>{
               result2 = rows;
              callback(null, true);

              })
             .catch((err1)=>{
                 console.log('###############'+err1)

                logging.LoggingFunction('thresholdUpdate',err1);
                callback(new Error("err while retrieving data"));

             })
            .catch((err2)=>{
  console.log('555555555555555555'+err1)
                logging.LoggingFunction('thresholdUpdate',err2);
                callback(new Error("no rows found after update"));

            })
        }
    });
 }

 this.getThresholds = function(page,reqitem,callback) {

  db.getConnection(function (err, con) {

            if (err) {

               logging.LoggingFunction('getThresholds',err);
               callback(new Error("error in connecting to database"));
            }
            else {
              
                var queryobj = 'select id from threshold where status = ?';
                var data = 1
                 querydao.select(queryobj,data,con)

                .then((rows) => {
                  result1 = rows;

                 if (result1.length > 0) {
                    const total_items = result1.length;
                    let ans = paging.pagination(page,reqitem,total_items)

                    var queryobj1 = 'select * from threshold where status = ? LIMIT '+[ans.Start_index,ans.Items_per_page];
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
                                logging.LoggingFunction('getThresholds',"data is not present");
                                callback(new Error("data is not present"));
                        } 
                    })

                 .catch((err1) => {
                    
                        logging.LoggingFunction('getThresholds',err1);
                        callback(new Error("error in retrieving details"));
                     }) 
                  }
                else{
                    
                     logging.LoggingFunction('getThresholds',"no rows to retreive details");
                     callback(new Error("no rows to retreive details"));
                   }
                 })

              .catch((err1) => {
               
                logging.LoggingFunction('getThresholds',err1);
                callback(new Error("error in retrieving details"));
            })          
         }
     });
  }

this.getThresholdById = function(threshold_id,callback) {

     const thresholdModel = new Threshold();

  db.getConnection(function (err, con) {

      if (err) {

               logging.LoggingFunction('getThresholdById',err);
               callback(new Error("error in connecting to database"));
            }
     else {

        var queryobj = 'select * from threshold where id = ?';
        var data = threshold_id
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result = rows;

             if (result.length > 0) {

                var response = thresholdModel.thresholdInsertResponse(result);
                callback(null, response);
            }
            else{
                 logging.LoggingFunction('getThresholdById',err);
                 callback(new Error("err no data present"));
                }
             })

             .catch((err1)=>{

                logging.LoggingFunction('getThresholdById',err1);//query err returned by promise
                callback(new Error("err while retrieving data"));

            })
         }
     });
   }
}

module.exports = new ThresholdDataAccess();
