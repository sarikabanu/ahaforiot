 function queryfun ()  {

     this.insert = function (queryobj,data,con){ 

         return new Promise((resolve, reject) => {

                con.query(queryobj, data, (err, rows) => {

                return err ? reject(err) : resolve(rows);

                });
            });
        } 
        
    this.select = function (queryobj,data,con){   

         return new Promise((resolve, reject) => {

                con.query(queryobj, data, (err1, rows) => {
        
                return err1 ? reject(err1) : resolve(rows);

                });
            });
        } 
    this.update = function (queryobj,data,con){   

         return new Promise((resolve, reject) => {

                con.query(queryobj, data, (err2, rows) => {

                return err2 ? reject(err2) : resolve(rows);

                });
            });
        } 
 }
 module.exports = new queryfun();
