var userdataaccess = require('../dataAccess/userDataAccess'); 
var logging  = require('../commons/logging');

function Contollers() {

this.userInsert = function (req,res) {

  let id = req.jwtToken.id

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2){

    if (req.body.phone==''||req.body.phone== null) {

           res.status(400).json({ error:'Missing phone in request'})

        }else{
        userdataaccess.userInsert(req.body,id,function(error,response) {

        if (error) {

             logging.LoggingFunction('userInsert',error);
              res.status(400).json(error.toString())
        }else {

              res.status(200).json({ message:'userInsertd successfully'})
         }
     });
   }
 }
}

this.userUpdate = function (req,res) {

  let id = req.jwtToken.id

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2||req.jwtToken.typeid==3){

    if (req.body.phone==''||req.body.phone== null) {

           res.status(400).json({ error:'Missing phone in request'})

        }else{
        userdataaccess.userUpdate(req.body,id,function(error,response) {

        if (error) {

             logging.LoggingFunction('userUpdate',error);
              res.status(400).json(error.toString())
        }else {

              res.status(200).json({ message:'userUpdated successfully'})
           }
        });
      }
    }else{

          logging.LoggingFunction('userUpdate','sorry you dont have permission ');
          res.status(401).json({ error:'sorry you dont have permission '})
    }
}


this.userUpdateByAdmin = function (req,res) {

  let id = req.jwtToken.id

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2){

    if (req.body.id==''||req.body.id== null) {

           res.status(400).json({ error:'Missing user id in request'})

        }else{
        userdataaccess.userUpdateByAdmin(req.body,id,function(error,response) {

        if (error) {

             logging.LoggingFunction('userUpdateByAdmin',error);
              res.status(400).json(error.toString())
        }else {

              res.status(200).json({ message:'userUpdated successfully'})
           }
        });
      }
    }else{

          logging.LoggingFunction('userUpdateByAdmin','sorry you dont have permission');
          res.status(401).json({ error:'sorry you dont have permission '})
    }
}

this.getUser = function (req,res) {

        let page = req.params.page;
        let reqitem = req.params.numOfItem;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2||req.jwtToken.typeid==3){

        userdataaccess.getUser(page,reqitem,function(error,response) {

        if (error) {

             logging.LoggingFunction('getUser',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'Retrieved user details', content: response })
         }
     });
   }else{

          logging.LoggingFunction('getUser','sorry you dont have permission ');
          res.status(401).json({ error:'sorry you dont have permission'})
    }
 }

this.getUserByUnit = function (req,res) {

        let page = req.params.page;
        let reqitem = req.params.numOfItem;
        let unit = req.params.id;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2){

        userdataaccess.getUserByUnit(unit,page,reqitem,function(error,response) {

        if (error) {

             logging.LoggingFunction('getUserByUnit',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'Retrieved user details', content: response })
         }
     });
   }else{

          logging.LoggingFunction('getUserByUnit','sorry you dont have permission ');
          res.status(401).json({ error:'sorry you dont have permission'})
    }
 }

 this.deleteUser = function (req,res) {
 
   let id = req.jwtToken.id
   let user_id = req.params.user_id;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2){

        userdataaccess.deleteUser(id,user_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('deleteUser',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'deleted/blocked user succesfully' })
         }
     });

   }else{
          logging.LoggingFunction('deleteUser','sorry you dont have permission');
          res.status(401).json({ error:'sorry you dont have permission'})
    }
 }

this.getUserById = function (req,res) {
 
   let user_id = req.params.id;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2||req.jwtToken.typeid==3){

        userdataaccess.getUserById(user_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('getUserById',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'retrieved user details succesfully', content: response})
         }
     });

   }else{
          logging.LoggingFunction('getUserById','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }

this.getUserByTypeId = function (req,res) {
 
   let type_id = req.params.id;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2){

        userdataaccess.getUserByTypeId(type_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('getUserByTypeId',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'retrieved user details succesfully', content: response})
         }
     });

   }else{
          logging.LoggingFunction('getUserByTypeId','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }

}

module.exports = new Contollers();

