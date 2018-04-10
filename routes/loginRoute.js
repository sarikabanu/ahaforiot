var controller = require('../controllers/loginController');


module.exports = {

    configure: function (app) {

           app.route('/login/:action')

            .post(function (req, res) {

               if (req.params.action == 'userLogin') {
                    controller.userLogin(req, res)
                }

               if (req.params.action == 'userRegistration') {
                    controller.userRegistration(req, res)
                 }
             })

           .get (function (req, res) {

               if (req.params.action == 'getUserType') {
                    controller.getUserType(req, res)
              }

            })
      }
}
 