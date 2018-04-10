const Animal = require('../models/animal_model').Animal;
var logging  = require('../commons/logging');
var paging = require('../commons/pagination');
var jwt = require('../commons/jwt');
var querydao = require('../commons/dao');


function animalDataAccess() {

this.animalInsert = function(request,user_id,callback) {

         const animalModel = new Animal();
         let animalInstance = animalModel.animalInsert(request,user_id);

  db.getConnection(function (err, con) {

    if (err) {

        logging.LoggingFunction('animalInsert',err);
        callback(new Error("error in connecting to database"));
    }
    else {
        var queryobj = 'insert into animal set ?';
        var data = animalInstance
        querydao.insert(queryobj,data,con)

            var queryobj1 = 'select * from animal where animalname = ?';
            var data1 = [request.animalname]
            querydao.select(queryobj1,data1,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                var response = animalModel.animalInsertResponse(result1);
                callback(null, response);
            }
            else{
                 logging.LoggingFunction('animalInsert',err);
                 callback(new Error("no rows found after insertion"));
              }
            })

            .catch((err)=>{

                logging.LoggingFunction('animalInsert',err);
                callback(new Error("err  while inserting"));
             })

            .catch((err1)=>{

                logging.LoggingFunction('animalInsert',err1);
                callback(new Error("err while retrieving data"));

           })
        }
    });
 }

 this.animalUpdate = function(request,user_id,callback) {

         const animalModel = new Animal();
         let ans = animalModel.animalUpdate(request);

  db.getConnection(function (err, con) {

    if (err) {

        logging.LoggingFunction('animalUpdate',err);
        callback(new Error("error in connecting to database"));
    }
    else {
        var queryobj = 'select * from animal where id = ?';
        var data = [request.id]
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result1 = rows;

             if (result1.length > 0) {

                 var queryobj1 = 'update animal set animalname =?,description = ?,deviceid=?,modifiedon=?, modifiedBy=? where id = ?';
                var data1 = [ans.animalname,ans.description,ans.deviceid,new Date(),user_id,request.id]
                querydao.update(queryobj1,data1,con)

                // var response = animalModel.userResponse(result1,user_id);
                // callback(null, response);
            }
            else{
                 logging.LoggingFunction('animalUpdate',err);
                 callback(new Error("err no data present"));
              }
            })

             .then((rows) =>{
               result2 = rows;
              callback(null, true);

              })
             .catch((err1)=>{

                logging.LoggingFunction('animalUpdate',err1);
                callback(new Error("err while retrieving data"));

             })
            .catch((err2)=>{

                logging.LoggingFunction('animalUpdate',err2);
                callback(new Error("no rows found after update"));

            })
        }
    });
 }

 this.getAnimals = function(page,reqitem,callback) {

  db.getConnection(function (err, con) {

            if (err) {

               logging.LoggingFunction('getAnimals',err);
               callback(new Error("error in connecting to database"));
            }
            else {
  
                var queryobj = 'select id from animal where status = ?';
                var data = 1
                 querydao.select(queryobj,data,con)

                .then((rows) => {
                  result1 = rows;

                 if (result1.length > 0) {
                    const total_items = result1.length;
                    let ans = paging.pagination(page,reqitem,total_items)

                    var queryobj1 = 'select a.id, a.animalname,d.deviceid, a.description,a.createdon, a.modifiedon, a.createdby, a.modifiedby, a.status from animal a,device d where d.id in( select a.deviceid where a.status = ?) LIMIT '+[ans.Start_index,ans.Items_per_page];
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
                                logging.LoggingFunction('getanimals',"data is not present");
                                callback(new Error("data is not present"));
                        } 
                    })

                 .catch((err1) => {
                    
                        logging.LoggingFunction('getanimals',err1);
                        callback(new Error("error in retrieving details"));
                     }) 
                  }
                else{
                    
                     logging.LoggingFunction('getanimals',"no rows to retreive details");
                     callback(new Error("no rows to retreive details"));
                   }
                 })

              .catch((err1) => {
               
                logging.LoggingFunction('getanimals',err1);
                callback(new Error("error in retrieving details"));
            })             
         }
     });
  }
  
  this.getanimalById = function(animal_id,callback) {

         const animalModel = new Animal();

  db.getConnection(function (err, con) {

      if (err) {

               logging.LoggingFunction('getanimalById',err);
               callback(new Error("error in connecting to database"));
            }
     else {

        var queryobj = 'select * from animal where id = ?';
        var data = animal_id
        querydao.select(queryobj,data,con)

            .then((rows)=>{
             result = rows;

             if (result.length > 0) {

                var response = animalModel.animalInsertResponse(result);
                callback(null, response);
            }
            else{
                 logging.LoggingFunction('getanimalById',err);
                 callback(new Error("err no data present"));
                }
             })

             .catch((err1)=>{

                logging.LoggingFunction('getanimalById',err1);//query err returned by promise
                callback(new Error("err while retrieving data"));

            })
         }
     });
   }
}

module.exports = new animalDataAccess();
