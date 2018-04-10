class Role {

  roleInsert(data,id) {

   this.roleInstance = {
            id: uuid(),
            name: data.name,
            usertype: data.usertype,
            createdBy:id,
            modifiedBy:id,
            createdon: new Date(),
            modifiedon: new Date(),
            status:1
           };

        return this.roleInstance;
    }

     roleInsertResponse(result) {

        this.roleInstance = {
            id: result[0].id,
            name: result[0].name,
            usertype:result[0].usertype,
            createdon: result[0].createdon,
            modifiedon: result[0].modifiedon,
            createdBy: result[0].createdBy,
            modifiedBy: result[0].modifiedBy,
            status: result[0].status
          };
          
        return this.roleInstance;
    }
     
 roleUpdate(request) {

  let response={},name,usertype

     if(request.name==null||request.name==""||request.name==undefined)
         { 
          name=result[0].name;
          }
            else{
            name=request.name;
        }
     if(request.usertype==null||request.usertype==""||request.usertype==undefined)
                { 
                 usertype=result[0].usertype;
                }
                else{
                 usertype=request.usertype;
            }

        return response = {
            name,
            usertype
           }
      }
}
exports.Role = Role;
