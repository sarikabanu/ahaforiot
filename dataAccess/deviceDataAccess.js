const Device = require('../models/device_model').Device;
var logging  = require('../commons/logging');
var paging = require('../commons/pagination');
var jwt = require('../commons/jwt');
var querydao = require('../commons/dao');


function deviceDataAccess() {

this.deviceInsert = function(request,user_id,callback) {

         const deviceModel = new Device();
         let deviceInstance = deviceModel.deviceInsert(request,user_id);

  db.getConnection(function (err, con) {

    if (err) {

        logging.LoggingFunction('deviceInsert',err);
        callback(new Error("error in connecting to database"));
    }
    else {
        var queryobj = 'insert into device set ?';
        var data = deviceInstance
        querydao.insert(queryobj,data,con)

            var queryobj1 = 'select * from device where deviceid = ?';
            var data1 = [request.deviceid]
            querydao.select(queryobj1,data1,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                var response = deviceModel.deviceInsertResponse(result1);
                callback(null, response);
            }
            else{
                 logging.LoggingFunction('deviceInsert',err);
                 callback(new Error("no rows found after insertion"));
              }
            })

            .catch((err)=>{

                logging.LoggingFunction('deviceInsert',err);
                callback(new Error("err  while inserting"));
             })

            .catch((err1)=>{

                logging.LoggingFunction('deviceInsert',err1);
                callback(new Error("err while retrieving data"));

           })
        }
    });
 }

 this.deviceUpdate = function(request,user_id,callback) {

         const deviceModel = new Device();
         let ans = deviceModel.deviceUpdate(request);

  db.getConnection(function (err, con) {

    if (err) {

        logging.LoggingFunction('deviceUpdate',err);
        callback(new Error("error in connecting to database"));
    }
    else {
        var queryobj = 'select * from device where id = ?';
        var data = [request.id]
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                 var queryobj1 = 'update device set devicename =?,deviceid = ?,unitid= ?,modifiedon=?, modifiedBy=? where id = ?';
                var data1 = [ans.devicename,ans.deviceid,ans.unitid,new Date(),user_id,request.id]
                querydao.update(queryobj1,data1,con)

                // var response = deviceModel.userResponse(result1,user_id);
                // callback(null, response);
            }
            else{
                 logging.LoggingFunction('deviceUpdate',err);
                 callback(new Error("err no data present"));
              }
            })

             .then((rows) =>{
               result2 = rows;
              callback(null, true);

              })
             .catch((err1)=>{

                logging.LoggingFunction('deviceUpdate',err1);
                callback(new Error("err while retrieving data"));

             })
            .catch((err2)=>{

                logging.LoggingFunction('deviceUpdate',err2);
                callback(new Error("no rows found after update"));

            })
        }
    });
 }

this.getMeasureUnit = function(callback) {

  db.getConnection(function (err, con) {

            if (err) {

               logging.LoggingFunction('getMeasureUnit',err);
               callback(new Error("error in connecting to database"));
            }
            else {
              
                var queryobj = 'select * from measuringunit where status = ?';
                var data = 1
                 querydao.select(queryobj,data,con)

                .then((rows) => {
                  result = rows;

                 if (result.length > 0) {
                  
                     callback(null, result);
                 }
                 else{
                            logging.LoggingFunction('getMeasureUnit',"data is not present");
                            callback(new Error("data is not present"));
                      } 
                 })

                 .catch((err) => {
                    
                        logging.LoggingFunction('getMeasureUnit',err);
                        callback(new Error("error in retrieving details"));
               })      
           }
     });
  }

 this.getDevices = function(page,reqitem,callback) {

  db.getConnection(function (err, con) {

            if (err) {

               logging.LoggingFunction('getDevices',err);
               callback(new Error("error in connecting to database"));
            }
            else {
              
                var queryobj = 'select id from device where status = ?';
                var data = 1
                 querydao.select(queryobj,data,con)

                .then((rows) => {
                  result1 = rows;

                 if (result1.length > 0) {
                    const total_items = result1.length;
                    let ans = paging.pagination(page,reqitem,total_items)

                    var queryobj1 = 'SELECT d.id, d.devicename, d.deviceid,d.unitid, (select u.name from unit u where u.id = d.unitid) as unitname, d.createdon,d.modifiedon, d.createdby,d.modifiedby, d.status FROM device d where d.status = ? LIMIT '+[ans.Start_index,ans.Items_per_page];
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
                                logging.LoggingFunction('getdevices',"data is not present");
                                callback(new Error("data is not present"));
                        } 
                    })

                 .catch((err1) => {
                    
                        logging.LoggingFunction('getdevices',err1);
                        callback(new Error("error in retrieving details"));
                     }) 
                  }
                else{
                    
                     logging.LoggingFunction('getdevices',"no rows to retreive details");
                     callback(new Error("no rows to retreive details"));
                   }
                 })

              .catch((err1) => {
               
                logging.LoggingFunction('getdevices',err1);
                callback(new Error("error in retrieving details"));
            })       
         }
     });
  }

  this.getdeviceById = function(device_id,callback) {

         const deviceModel = new Device();

  db.getConnection(function (err, con) {

      if (err) {

               logging.LoggingFunction('getdeviceById',err);
               callback(new Error("error in connecting to database"));
            }
     else {

        var queryobj = 'select * from device where id = ?';
        var data = device_id
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result = rows;

             if (result.length > 0) {

                var response = deviceModel.deviceInsertResponse(result);
                callback(null, response);
            }
            else{
                 logging.LoggingFunction('getdeviceById',err);
                 callback(new Error("err no data present"));
                }
             })

             .catch((err1)=>{

                logging.LoggingFunction('getdeviceById',err1);//query err returned by promise
                callback(new Error("err while retrieving data"));

            })
         }
     });
   }
   
  this.getdeviceByUnit = function(unit_id,callback) {

  db.getConnection(function (err, con) {

      if (err) {

               logging.LoggingFunction('getdeviceByUnit',err);
               callback(new Error("error in connecting to database"));
            }
     else {

        var queryobj = 'select * from device where unitid = ?';
        var data = unit_id
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result = rows;

             if (result.length > 0) {

                callback(null, result);
            }
            else{
                 logging.LoggingFunction('getdeviceByUnit',err);
                 callback(new Error("err no data present"));
                }
             })

             .catch((err1)=>{

                logging.LoggingFunction('getdeviceByUnit',err1);//query err returned by promise
                callback(new Error("err while retrieving data"));

            })
         }
     });
   }

 this.getdeviceBySupervisor = function(id,callback) {

  db.getConnection(function (err, con) {

      if (err) {

               logging.LoggingFunction('getdeviceBySupervisor',err);
               callback(new Error("error in connecting to database"));
            }
     else {

        var queryobj = 'select id from device where unitid in (select unitid from users where id = ?)';
        var data = id
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result = rows;

             if (result.length > 0) {

                callback(null, result);
            }
            else{
                 logging.LoggingFunction('getdeviceBySupervisor',err);
                 callback(new Error("err no data present"));
                }
             })

             .catch((err1)=>{

                logging.LoggingFunction('getdeviceBySupervisor',err1);//query err returned by promise
                callback(new Error("err while retrieving data"));

            })
         }
     });
   }
}

module.exports = new deviceDataAccess();
