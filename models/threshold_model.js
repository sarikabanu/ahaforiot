class Threshold {

  thresholdInsert(data,user_id) {

   this.thresholdInstance = {
            id: uuid(),
            name: data.name,
            type:data.type,
            description: data.description,
            valueofmax :data.valueofmax,
            valueofmin :data.valueofmin, 
            unitid :data.unitid,  
            createdon: new Date(),
            modifiedon: new Date(),
            createdBy:user_id,
            modifiedBy:user_id,
            status: 1
           };

        return this.thresholdInstance;
    }

     thresholdInsertResponse(result) {

        this.thresholdInstance = {
            id: result[0].id,
            name: result[0].name,
            type: result[0].type,
            description:result[0].description,
            valueofmax:result[0].valueofmax,
            valueofmin:result[0].valueofmin,
            unitid:result[0].unitid,
            createdon: result[0].createdon,
            modifiedon: result[0].modifiedon,
            createdBy: result[0].createdBy,
            modifiedBy: result[0].modifiedBy,
            status: result[0].status
          
          };
          
        return this.thresholdInstance;
    }

 thresholdUpdate(request) {
      let response={},name,description,valueofmax,valueofmin,unitid,type

     if(request.name==null||request.name==""||request.name==undefined)
         { 
          name=result[0].name;
          }
            else{
            name=request.name;
        }
     if(request.type==null||request.type==""||request.type==undefined)
         { 
          type=result[0].type;
          }
            else{
            type=request.type;
        }
     if(request.description==null||request.description==""||request.description==undefined)
                { 
                 description=result[0].description;
                }
                else{
                 description=request.description;
            }
     if(request.valueofmax==null||request.valueofmax==""||request.valueofmax==undefined)
         { 
          valueofmax=result[0].valueofmax;
          }
            else{
            valueofmax=request.valueofmax;
        }
     if(request.valueofmin==null||request.valueofmin==""||request.valueofmin==undefined)
                { 
                 valueofmin=result[0].valueofmin;
                }
                else{
                 valueofmin=request.valueofmin;
            }    
     if(request.unitid==null||request.unitid==""||request.unitid==undefined)
         { 
          unitid=result[0].unitid;
          }
            else{
            unitid=request.unitid;
        }
        return response = {
            name,
            type,
            description,
            valueofmax,
            valueofmin,
            unitid
           }
      }
}

exports.Threshold = Threshold;
