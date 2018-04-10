var thresholddataaccess = require('../dataAccess/thresholdDataAccess'); 
var logging  = require('../commons/logging');

function Contollers() {

this.thresholdInsert = function (req,res) {

  let user_id = req.jwtToken.id

if(req.jwtToken.typeid==1){

      if (req.body.name == ''||req.body.name == null||req.body.unitid == ''||req.body.unitid == null) {

           res.status(400).json({ error:'Missing threshold name and unitid in request'})

        }else{
        thresholddataaccess.thresholdInsert(req.body,user_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('thresholdInsert',error);
              res.status(400).json(error.toString())
        }else {

             res.status(200).json({ message:'thresholdInsertion successfull', content: response })
           }
       });
     }
  }else{
          logging.LoggingFunction('thresholdInsert','sorry you dont have permission ');
          res.status(401).json({ error:'sorry you dont have permission'})
    }
}

this.thresholdUpdate = function (req,res) {

  let user_id = req.jwtToken.id

 if(req.jwtToken.typeid==1){

    if (req.body.id==''||req.body.id== null) {

           res.status(400).json({ error:'Missing threshold id in request'})

        }else{
        thresholddataaccess.thresholdUpdate(req.body,user_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('thresholdUpdate',error);
              res.status(400).json(error.toString())
        }else {

              res.status(200).json({ message:'thresholdUpdated successfully'})
           }
        });
      }
    }else{
          logging.LoggingFunction('thresholdUpdate','sorry you dont have permission');
          res.status(401).json({ error:'sorry you dont have permission'})
    }
}

this.getThresholds = function (req,res) {

        let page = req.params.page;
        let reqitem = req.params.numOfItem;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2||req.jwtToken.typeid==3){

        thresholddataaccess.getThresholds(page,reqitem,function(error,response) {

        if (error) {

             logging.LoggingFunction('getThresholds',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'Retrieved threshold details', content: response })
         }
     });

   }else{
          logging.LoggingFunction('getThresholds','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }
 
this.getThresholdById = function (req,res) {
 
   let threshold_id = req.params.id;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2||req.jwtToken.typeid==3){

        thresholddataaccess.getThresholdById(threshold_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('getThresholdById',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'retrieved threshold details succesfully', content: response })
         }
     });

   }else{
          logging.LoggingFunction('getThresholdById','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }

}

module.exports = new Contollers();

