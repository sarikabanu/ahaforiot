var roledataaccess = require('../dataAccess/roleDataAccess'); 
var logging  = require('../commons/logging');

function Contollers() {

this.roleInsert = function (req,res) {

  let id = req.jwtToken.id

 if(req.jwtToken.typeid==1){

    if (req.body.name==''||req.body.name== null) {

           res.status(400).json({ error:'Missing name in request'})

        }else{
        roledataaccess.roleInsert(req.body,id,function(error,response) {

        if (error) {

             logging.LoggingFunction('roleInsert',error);
              res.status(400).json(error.toString())
        }else {

              res.status(200).json({ message:'role Insertd successfully', content: response})
           }
        });
      }
    }else{

          logging.LoggingFunction('roleInsert','sorry you dont have permission ');
          res.status(401).json({ error:'sorry you dont have permission '})
    }
}

this.roleUpdate = function (req,res) {

  let id = req.jwtToken.id

 if(req.jwtToken.typeid==1){

    if (req.body.id==''||req.body.id== null) {

           res.status(400).json({ error:'Missing id in request'})

        }else{
        roledataaccess.roleUpdate(req.body,id,function(error,response) {

        if (error) {

             logging.LoggingFunction('roleUpdate',error);
              res.status(400).json(error.toString())
        }else {

              res.status(200).json({ message:'roleUpdated successfully'})
           }
        });
      }
    }else{

          logging.LoggingFunction('roleUpdate','sorry you dont have permission ');
          res.status(401).json({ error:'sorry you dont have permission '})
    }
}

this.getRole = function (req,res) {

        let page = req.params.page;
        let reqitem = req.params.numOfItem;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2){

        roledataaccess.getRole(page,reqitem,function(error,response) {

        if (error) {

             logging.LoggingFunction('getRole',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'Retrieved role details', content: response })
         }
     });
   }else{

          logging.LoggingFunction('getRole','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }

 this.deleteRole = function (req,res) {
 
   let id = req.jwtToken.id
   let role_id = req.params.id;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2){

        roledataaccess.deleteRole(id,role_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('deleteRole',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'deleted role succesfully' })
         }
     });

   }else{
          logging.LoggingFunction('deleteRole','sorry you dont have permission');
          res.status(401).json({ error:'sorry you dont have permission'})
    }
 }

this.getRoleByName = function (req,res) {
 
   let name = req.params.id;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2||req.jwtToken.typeid==3){

        roledataaccess.getRoleByName(name,function(error,response) {

        if (error) {

             logging.LoggingFunction('getRoleByName',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'retrieved role details succesfully', content: response})
         }
     });

   }else{
          logging.LoggingFunction('getRoleByName','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }

this.getRoleByUserType = function (req,res) {
 
   let usertype = req.params.id;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2||req.jwtToken.typeid==3){

        roledataaccess.getRoleByUserType(usertype,function(error,response) {

        if (error) {

             logging.LoggingFunction('getRoleByUserType',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'retrieved role details succesfully', content: response})
         }
     });

   }else{
          logging.LoggingFunction('getRoleByUserType','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }

}

module.exports = new Contollers();

