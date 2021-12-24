var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
require('dotenv').config();

const PORT=process.env.PORT;

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath;
        fs.readFile(oldpath, 'utf8', function(err, data){     
            if (err) throw err;
            res.write(`
            <h2><span style="color:#999999"><span style="font-family:Comic Sans MS,cursive"><span style="background-color:#ecf0f1">
            The Contents of the file are:-
            </span></span></span></h2>
            <hr />
            `);
            res.write(data);
            res.end();
        });
        
      });      
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form style="display:flex; flex-direction:column; border:2px solid gray; border-radius:10px; padding:10px" action="fileupload" method="post" enctype="multipart/form-data"><div style="padding:10px; font-size:20px; font-family:Comic Sans MS, cursive; margin-bottom:5px;">Select the file to view in the browser</div><input type="file" name="filetoupload" style="background-color:gray; border-radius:5px; box-shadow:1px 2px 3px gainsboro; color:white;  padding:10px; margin-bottom:3px"><hr/><input type="submit" style="width:150px; padding:10px; font-family:Comic Sans MS, cursive; background-color:gray; color:white; border-radius:4px"></form>');
    return res.end();
  }
}).listen(PORT,()=>console.log('server running on port 8080'));
