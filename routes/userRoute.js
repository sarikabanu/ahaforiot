var controller = require('../controllers/userController');


module.exports = {

    configure: function (app) {

           app.route('/user/:action')

            .post(function (req, res) {

             if (req.params.action == 'userInsert') {
                    controller.userInsert(req, res)
                 }

             if (req.params.action == 'userUpdate') {
                    controller.userUpdate(req, res)
                 }
                
             if (req.params.action == 'userUpdateByAdmin') {
                    controller.userUpdateByAdmin(req, res)
                 }
             })

         app.get('/user/getUser/:page/:numOfItem', function (req, res) { 
            controller.getUser(req, res)

           });

         app.get('/user/getUserByUnit/:page/:numOfItem/:id', function (req, res) { 
            controller.getUserByUnit(req, res)

           });

           app.route('/user/:action/:id')

            .get(function (req, res) {

             if (req.params.action == 'deleteUser') {//userid
                    controller.deleteUser(req, res)
              }

            if (req.params.action == 'getUserById') {//userid
                    controller.getUserById(req, res)
              }

            if (req.params.action == 'getUserByTypeId') {//TypeId
                    controller.getUserByTypeId(req, res)
              }

          })
      }
}
 