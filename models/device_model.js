class Device {

  deviceInsert(data,user_id) {

   this.deviceInstance = {
            id: uuid(),
            devicename: data.devicename,
            deviceid: data.deviceid,
            unitid:data.unitid,
            createdon: new Date(),
            modifiedon: new Date(),
            createdBy:user_id,
            modifiedBy:user_id,
            status: 1
           };

        return this.deviceInstance;
    }

     deviceInsertResponse(result) {

        this.deviceInstance = {
            id: result[0].id,
            devicename: result[0].devicename,
            deviceid:result[0].deviceid,
            unitid:result[0].unitid,
            createdon: result[0].createdon,
            modifiedon: result[0].modifiedon,
            createdBy: result[0].createdBy,
            modifiedBy: result[0].modifiedBy,
            status: result[0].status
          
          };
          
        return this.deviceInstance;
    }

 deviceUpdate(request) {
      let response={},devicename,deviceid,unitid

     if(request.devicename==null||request.devicename==""||request.devicename==undefined)
         { 
          devicename=result[0].devicename;
          }
            else{
            devicename=request.devicename;
        }
     if(request.deviceid==null||request.deviceid==""||request.deviceid==undefined)
                { 
                 deviceid=result[0].deviceid;
                }
                else{
                 deviceid=request.deviceid;
            }
      if(request.unitid==null||request.unitid==""||request.unitid==undefined)
                { 
                 unitid=result[0].unitid;
                }
                else{
                 unitid=request.unitid;
          }
    
        return response = {
            devicename,
            deviceid,
            unitid
           }
      }
}

exports.Device = Device;
