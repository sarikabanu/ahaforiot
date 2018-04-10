var controller = require('../controllers/animalController');


module.exports = {

    configure: function (app) {

           app.route('/animal/:action')

            .post(function (req, res) {

               if (req.params.action == 'animalInsert') {
                    controller.animalInsert(req, res)
                }

               if (req.params.action == 'animalUpdate') {
                    controller.animalUpdate(req, res)
                 }
             })

            app.get('/animal/getAnimals/:page/:numOfItem', function (req, res) { 
              controller.getAnimals(req, res)

           }); 
           
          app.route('/animal/:action/:id')

            .get(function (req, res) {

            if (req.params.action == 'getanimalById') {//animalid
                    controller.getanimalById(req, res)
              }

          })
     }
}
 