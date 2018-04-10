var controller = require('../controllers/deviceController');


module.exports = {

    configure: function (app) {

           app.route('/device/:action')

            .post(function (req, res) {

               if (req.params.action == 'deviceInsert') {
                    controller.deviceInsert(req, res)
                }

               if (req.params.action == 'deviceUpdate') {
                    controller.deviceUpdate(req, res)
                 }
             })

          .get(function (req, res) {

               if (req.params.action == 'getMeasureUnit') {
                    controller.getMeasureUnit(req, res)
                }
             
               if (req.params.action == 'getdeviceBySupervisor') {//created by supervisor
                    controller.getdeviceBySupervisor(req, res)
              }

          })

            app.get('/device/getDevices/:page/:numOfItem', function (req, res) { 
              controller.getDevices(req, res)

           }); 

         app.route('/device/:action/:id')

            .get(function (req, res) {

            if (req.params.action == 'getdeviceById') {//deviceid
                    controller.getdeviceById(req, res)
              }
            
            if (req.params.action == 'getdeviceByUnit') {//Unitid
                    controller.getdeviceByUnit(req, res)
              }
          })
     }
}
 