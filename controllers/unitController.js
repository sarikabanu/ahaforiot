var unitdataaccess = require('../dataAccess/unitDataAccess'); 
var logging  = require('../commons/logging');

function Contollers() {

this.unitInsert = function (req,res) {

  let user_id = req.jwtToken.id

if(req.jwtToken.typeid==1){

      if (req.body.name == ''||req.body.name == null) {

           res.status(400).json({ error:'Missing unit name in request'})

        }else{
        unitdataaccess.unitInsert(req.body,user_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('unitInsert',error);
              res.status(400).json(error.toString())
        }else {

             res.status(200).json({ message:'unitInsertion successfull', content: response })
           }
       });
     }
  }else{
          logging.LoggingFunction('unitInsert','sorry you dont have permission ');
          res.status(401).json({ error:'sorry you dont have permission '})
    }
}

this.unitUpdate = function (req,res) {

  let user_id = req.jwtToken.id

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2){

    if (req.body.id==''||req.body.id== null) {

           res.status(400).json({ error:'Missing unit id in request'})

        }else{
        unitdataaccess.unitUpdate(req.body,user_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('unitUpdate',error);
              res.status(400).json(error.toString())
        }else {

              res.status(200).json({ message:'unitUpdated successfully'})
           }
        });
      }
    }else{
          logging.LoggingFunction('unitUpdate','sorry you dont have permission ');
          res.status(401).json({ error:'sorry you dont have permission'})
    }
}

this.getUnits = function (req,res) {

        let page = req.params.page;
        let reqitem = req.params.numOfItem;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2||req.jwtToken.typeid==3){

        unitdataaccess.getUnits(page,reqitem,function(error,response) {

        if (error) {

             logging.LoggingFunction('getUnits',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'Retrieved units details', content: response })
         }
     });
   }else{
          logging.LoggingFunction('getUnits','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }

 this.getUnitById = function (req,res) {
 
   let unit_id = req.params.id;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2){

        unitdataaccess.getUnitById(unit_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('getUnitById',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'retrieved unit details succesfully', content: response })
         }
     });

   }else{
          logging.LoggingFunction('getUnitById','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }

}

module.exports = new Contollers();

