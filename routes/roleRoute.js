var controller = require('../controllers/roleController');


module.exports = {

    configure: function (app) {

           app.route('/role/:action')

            .post(function (req, res) {

             if (req.params.action == 'roleInsert') {
                    controller.roleInsert(req, res)
                 }

             if (req.params.action == 'roleUpdate') {
                    controller.roleUpdate(req, res)
                 }
             })

         app.get('/role/getRole/:page/:numOfItem', function (req, res) { 
            controller.getRole(req, res)

           });

           app.route('/role/:action/:id')

            .get(function (req, res) {

             if (req.params.action == 'deleteRole') {//roleid
                    controller.deleteRole(req, res)
              }

            if (req.params.action == 'getRoleByName') {//role name
                    controller.getRoleByName(req, res)
              }

            if (req.params.action == 'getRoleByUserType') {//usertype
                    controller.getRoleByUserType(req, res)
              }

          })
      }
}
 