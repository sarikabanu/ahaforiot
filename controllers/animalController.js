var animaldataaccess = require('../dataAccess/animalDataAccess'); 
var logging  = require('../commons/logging');

function Contollers() {

this.animalInsert = function (req,res) {

  let user_id = req.jwtToken.id

if(req.jwtToken.typeid==1||req.jwtToken.typeid==2){

      if (req.body.animalname == ''||req.body.animalname == null) {

           res.status(400).json({ error:'Missing animalname in request'})

        }else{
        animaldataaccess.animalInsert(req.body,user_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('animalInsert',error);
              res.status(400).json(error.toString())
        }else {

             res.status(200).json({ message:'animalInsertion successfull', content: response })
           }
       });
     }

  }else{
          logging.LoggingFunction('animalInsert','sorry you dont have permission');
          res.status(401).json({ error:'sorry you dont have permission'})
    }
}

this.animalUpdate = function (req,res) {

  let user_id = req.jwtToken.id

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2){

    if (req.body.id==''||req.body.id== null) {

           res.status(400).json({ error:'Missing animalid in request'})

        }else{
        animaldataaccess.animalUpdate(req.body,user_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('animalUpdate',error);
              res.status(400).json(error.toString())
        }else {

              res.status(200).json({ message:'animalUpdated successfully'})
           }
        });
      }

    }else{
          logging.LoggingFunction('animalUpdate','sorry you dont have permission');
          res.status(401).json({ error:'sorry you dont have permission'})
    }
}

this.getAnimals = function (req,res) {

        let page = req.params.page;
        let reqitem = req.params.numOfItem;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2||req.jwtToken.typeid==3){

        animaldataaccess.getAnimals(page,reqitem,function(error,response) {

        if (error) {

             logging.LoggingFunction('getAnimals',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'Retrieved animals details', content: response })
         }
     });

   }else{
          logging.LoggingFunction('getAnimals','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }

this.getanimalById = function (req,res) {
 
   let animal_id = req.params.id;

 if(req.jwtToken.typeid==1||req.jwtToken.typeid==2||req.jwtToken.typeid==3){

        animaldataaccess.getanimalById(animal_id,function(error,response) {

        if (error) {

             logging.LoggingFunction('getanimalById',error);
              res.status(400).json(error.toString())
        }else {

           res.status(200).json({ message:'retrieved animal details succesfully', content: response })
         }
     });

   }else{
          logging.LoggingFunction('getanimalById','sorry you dont have permission to retrieve details');
          res.status(401).json({ error:'sorry you dont have permission to retrieve details'})
    }
 }
 
}

module.exports = new Contollers();

