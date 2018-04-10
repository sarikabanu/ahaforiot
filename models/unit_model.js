class Unit {

  unitInsert(data,user_id) {

   this.unitInstance = {
            id: uuid(),
            name: data.name,
            description: data.description,
            supervisor:data.supervisor,
            createdon: new Date(),
            modifiedon: new Date(),
            createdBy:user_id,
            modifiedBy:user_id,
            status: 1
           };

        return this.unitInstance;
    }

     unitInsertResponse(result) {

        this.unitInstance = {
            id: result[0].id,
            name: result[0].name,
            description:result[0].description,
            supervisor:result[0].supervisor,
            createdon: result[0].createdon,
            modifiedon: result[0].modifiedon,
            createdBy: result[0].createdBy,
            modifiedBy: result[0].modifiedBy,
            status: result[0].status
           };
          
        return this.unitInstance;
    }

 unitUpdate(request) {
      let response={},name,description,supervisor

     if(request.name==null||request.name==""||request.name==undefined)
         { 
          name=result[0].name;
          }
            else{
            name=request.name;
        }
     if(request.description==null||request.description==""||request.description==undefined)
                { 
                 description=result[0].description;
                }
                else{
                 description=request.description;
            }
     if(request.supervisor==null||request.supervisor==""||request.supervisor==undefined)
            { 
                supervisor=result[0].supervisor;
            }
            else{
                supervisor=request.supervisor;
        }
        return response = {
            name,
            description,
            supervisor
           }
      }
}

exports.Unit = Unit;
