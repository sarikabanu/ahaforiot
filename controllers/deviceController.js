var devicedataaccess = require('../dataAccess/deviceDataAccess'); 
var logging  = require('../commons/logging');

function Contollers() {

this.deviceInsert = function (req,res) {

  let user_id = req.jwtToken.id

if(req.jwtToken.typeid==1){

      if (req.body.deviceid==''||req.body.deviceid== null||req.body.devicename==''||req.body.devicename== null) {

           res.status(400).json({ error:'Missing deviceid and devicename in request'})

        }else{
        devicedataaccess.deviceInsert(req.body,user_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('deviceInsert',error);
              res.status(400).json(error.toString())
        }else {

             res.status(200).json({ message:'deviceInsertion successfull', content: response })
           }
       });
     }
  }else{
          logging.LoggingFunction('deviceInsert','sorry you dont have permission');
          res.status(401).json({ error:'sorry you dont have permission'})
    }
}

this.deviceUpdate = function (req,res) {

  let user_id = req.jwtToken.id

 if(req.jwtToken.typeid==1){

    if (req.body.deviceid==''||req.body.deviceid== null) {

           res.status(400).json({ error:'Missing deviceid in request'})

        }else{
        devicedataaccess.deviceUpdate(req.body,user_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('deviceUpdate',error);
              res.status(400).json(error.toString())
        }else {

              res.status(200).json({ message:'deviceUpdated successfully'})
           }
        });
      }
    }else{
          logging.LoggingFunction('deviceUpdate','sorry you dont have permission');
          res.status(401).json({ error:'sorry you dont have permission '})
    }
}

this.getMeasureUnit = function (req,res) {
 
 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2){

        devicedataaccess.getMeasureUnit(function(error,response) {

        if (error) {

             logging.LoggingFunction('getMeasureUnit',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'Retrieved measure unit details', content: response })
         }
     });
   }else{
          logging.LoggingFunction('getMeasureUnit','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }

this.getDevices = function (req,res) {
 
        let page = req.params.page;
        let reqitem = req.params.numOfItem;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2||req.jwtToken.typeid==3){

        devicedataaccess.getDevices(page,reqitem,function(error,response) {

        if (error) {

             logging.LoggingFunction('getDevices',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'Retrieved Device details', content: response })
         }
     });
   }else{
          logging.LoggingFunction('getDevices','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }

 this.getdeviceById = function (req,res) {
 
   let device_id = req.params.id;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2||req.jwtToken.typeid==3){

        devicedataaccess.getdeviceById(device_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('getdeviceById',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'retrieved device details succesfully', content: response })
         }
     });

   }else{
          logging.LoggingFunction('getdeviceById','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }

  this.getdeviceByUnit = function (req,res) {
 
   let unit_id = req.params.id;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2){

        devicedataaccess.getdeviceByUnit(unit_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('getdeviceByUnit',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'retrieved device details succesfully', content: response })
         }
     });

   }else{
          logging.LoggingFunction('getdeviceByUnit','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }

   this.getdeviceBySupervisor = function (req,res) {
 
   let id = req.jwtToken.id;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2){

        devicedataaccess.getdeviceBySupervisor(id,function(error,response) {

        if (error) {

             logging.LoggingFunction('getdeviceBySupervisor',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'retrieved device details succesfully', content: response })
         }
     });

   }else{
          logging.LoggingFunction('getdeviceBySupervisor','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }
}

module.exports = new Contollers();

