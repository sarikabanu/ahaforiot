class User {

  loginUser(data) {

   this.userInstance = {
            id: uuid(),
            name: data.name,
            phone: data.phone,
            mailid:data.mailid,
            password:data.password,
            typeid:data.typeid,
            createdon: new Date(),
            modifiedon: new Date(),
            createdBy:0,
            modifiedBy:0,
            status: 1
           };

        return this.userInstance;
    }

//  loginResponse(data) {

//    this.userInstance = {
//             token : data.token,
//             name: data.name,
//             mailid:data.mailid,
//             phone: data.phone,
//             unit:data.unit
//          };

//         return this.userInstance;
//     }

  userInsert(data,id) {

   this.userInstance = {
            id: uuid(),
            name: data.name,
            phone: data.phone,
            mailid:data.mailid,
            unit:data.unit,
            typeid:data.typeid,
            createdon: new Date(),
            modifiedon: new Date(),
            createdBy:id,
            modifiedBy:id,
            status: 0
           };

        return this.userInstance;
    }

  userUpdateByAdmin(data) {

   this.userInstance = {
            unit:data.unit,
            typeid:data.typeid,
           };

        return this.userInstance;
    }
     userResponse(result) {

        this.userInstance = {
            id: result[0].id,
            name: result[0].name,
            phone:result[0].phone,
            mailid:result[0].mailid,
            createdon: result[0].createdon,
            modifiedon: result[0].modifiedon,
            status: result[0].status
          };
          
        return this.userInstance;
    }
     
 userUpdate(request) {

  let response={},name,phone,password,mailid

     if(request.name==null||request.name==""||request.name==undefined)
         { 
          name=result[0].name;
          }
            else{
            name=request.name;
        }
     if(request.phone==null||request.phone==""||request.phone==undefined)
                { 
                 phone=result[0].phone;
                }
                else{
                 phone=request.phone;
            }
     if(request.mailid==null||request.mailid==""||request.mailid==undefined)
         { 
          mailid=result[0].mailid;
          }
            else{
            mailid=request.mailid;
        }
    if(request.password==null||request.password==""||request.password==undefined)
         { 
          password=result[0].password;
          }
            else{
            password=request.password;
        }
        return response = {
            name,
            phone,
            mailid,
            password
           }
      }
}
exports.User = User;
