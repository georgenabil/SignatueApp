var express = require('express');
var fs = require('fs');
var path = require('path');
const { spawn, execFile } = require('child_process');
var router = express.Router();


// perform signature.
router.post('/', function(req, res, next) { // change it to post request .
  
    
    // recives requiest with data 
    // console.log(req.body); 
      
     var jsondata = JSON.stringify(req.body);
    // take data and put it into file nameing confinataion  
      
    fs.writeFile("../SourceDocumentJson.json",jsondata,function(err){
        
        if(err){
            console.log(err);
         }
       console.log('Data transferred successfully and file created');
       
    });

   console.log(jsondata);
  
    // Run batach       
    const bat = spawn('cmd.exe', ['/c',"SubmitInvoices.bat"],{cwd: 'D:\\EInvoicing'});
   
    bat.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    
    bat.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    
    bat.on('exit', (code) => {
         console.log(`Child exited with code ${code}`);
        
         var buffer = fs.readFileSync("../FullSignedDocument.json","UTF-8"); 
       
        /* fs.readFile('../FullSignedDocument.json', 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          console.log(data);
        });*/
           
         res.json(JSON.parse(buffer));

         // delete the following files with following names  CanonicalString.txt , Cades.txt , FullSignedDocument.json , SourceDocumentJson.json
         // console log the deletion in th console. 

    });

    setTimeout(() => {
      bat.stdin.write("E");
    }, 3000);

 
   

});

module.exports = router;
