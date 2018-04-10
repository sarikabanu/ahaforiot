var controller = require('../controllers/thresholdController');


module.exports = {

    configure: function (app) {

           app.route('/threshold/:action')

            .post(function (req, res) {

               if (req.params.action == 'thresholdInsert') {
                    controller.thresholdInsert(req, res)
                }

               if (req.params.action == 'thresholdUpdate') {
                    controller.thresholdUpdate(req, res)
                 }
             })

           app.get('/threshold/getThresholds/:page/:numOfItem', function (req, res) { 
              controller.getThresholds(req, res)

           });
            
          app.route('/threshold/:action/:id')

            .get(function (req, res) {

            if (req.params.action == 'getThresholdById') {//Thresholdid
                    controller.getThresholdById(req, res)
              }

          })
      }
}
 