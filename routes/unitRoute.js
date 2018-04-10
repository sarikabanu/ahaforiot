var controller = require('../controllers/unitController');


module.exports = {

    configure: function (app) {

           app.route('/unit/:action')

            .post(function (req, res) {

               if (req.params.action == 'unitInsert') {
                    controller.unitInsert(req, res)
                }

               if (req.params.action == 'unitUpdate') {
                    controller.unitUpdate(req, res)
                 }
             })

           app.get('/unit/getUnits/:page/:numOfItem', function (req, res) { 
              controller.getUnits(req, res)

           });
            
          app.route('/unit/:action/:id')

            .get(function (req, res) {

            if (req.params.action == 'getUnitById') {//unitid
                    controller.getUnitById(req, res)
              }

          })

     }
}
 