
const uuid = require('uuid');
multer = require('multer'),
  
setconfig = require('../config/setconfig');
setconfig.setConf(false);

var storage = multer.memoryStorage();
var upload = multer()


var AccountKey = "pigjjJ0yrHCnfyLtX2W4bL8pVpYfegW36F+24geQ2OruWMMdQHvkY6PmOAuWIClSJuuydIHgTzbNiVuvUiMZTg==";
var AccountName = "vsplitstorage";
var storageConnectionString = 'DefaultEndpointsProtocol=https;AccountName=vsplitstorage;AccountKey=pigjjJ0yrHCnfyLtX2W4bL8pVpYfegW36F+24geQ2OruWMMdQHvkY6PmOAuWIClSJuuydIHgTzbNiVuvUiMZTg==;EndpointSuffix=core.windows.net'
//
var azureSorage = require('azure-storage');
var blobSvc = azureSorage.createBlobService(AccountName,AccountKey);
var streamifier = require('streamifier');
 


exports.commonFunc =(function (req, res) {
   if(req.files['vedio'][0].fieldname == 'vedio'){
   var stream = streamifier.createReadStream(req.files['vedio'][0].buffer);
    var file = req.files['vedio'][0].originalname;
   var media = uuid()+file
   var size =  req.files['vedio'][0].size;
   console.log('media in commonfunc  '+media )
    var  upload =  blobSvc.createBlockBlobFromStream(
            'vsplitcontainer',
             media,
             stream,
             size,
            function(error, result, response){
                if(error){
                    console.log("Couldn't upload stream");
                    console.error(error);
                } else {
                    console.log('Stream uploaded successfully');
                     console.log(media);
                }
         })
 }
else{
     console.log('error in azure');
     return error
    }
  return  media
})

exports.propic =(function (req, res) {
   var file = req.files['profileUrl'][0].originalname;
   var file_name = uuid()+file
   var size =  req.files['profileUrl'][0].size;
    console.log(file_name)
 var stream = streamifier.createReadStream(req.files['profileUrl'][0].buffer);
  var  uploadImage =  blobSvc.createBlockBlobFromStream(
            'vsplitcontainer',
             file_name,
             stream,
             size,
            function(error, result, response){
                if(error){
                    console.log("Couldn't upload stream");
                    console.error(error);
                } else {
                    console.log('Stream uploaded successfully');
                    console.log(file_name)
                }
        })
        return file_name;
})


