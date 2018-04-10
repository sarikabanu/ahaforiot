class Animal {

  animalInsert(data,user_id) {

   this.animalInstance = {
            id: uuid(),
            animalname: data.animalname,
            description: data.description,
            deviceid:data.deviceid,
            createdon: new Date(),
            modifiedon: new Date(),
            createdBy:user_id,
            modifiedBy:user_id,
            status: 1
           };

        return this.animalInstance;
    }

     animalInsertResponse(result) {

        this.animalInstance = {
            id: result[0].id,
            animalname: result[0].animalname,
            description:result[0].description,
            deviceid:result[0].deviceid,
            createdon: result[0].createdon,
            modifiedon: result[0].modifiedon,
            createdBy: result[0].createdBy,
            modifiedBy: result[0].modifiedBy,
            status: result[0].status
          
          };
          
        return this.animalInstance;
    }

 animalUpdate(request) {
      let response={},animalname,description,deviceid

     if(request.animalname==null||request.animalname==""||request.animalname==undefined)
         { 
          animalname=result[0].animalname;
          }
            else{
            animalname=request.animalname;
        }
     if(request.description==null||request.description==""||request.description==undefined)
                { 
                 description=result[0].description;
                }
                else{
                 description=request.description;
            }
     if(request.deviceid==null||request.deviceid==""||request.deviceid==undefined)
                { 
                 deviceid=result[0].deviceid;
                }
                else{
                 deviceid=request.deviceid;
            }
        return response = {
            animalname,
            description,
            deviceid
           }
      }
}

exports.Animal = Animal;
