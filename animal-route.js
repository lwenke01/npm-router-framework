'use strict';
var http = require('http');
var fs = require('fs');
var Router = require('../lib/router.js');
var animalsRouter = new Router();
// var animalType = fs.readFileSync(__dirname + 'animals/' + req.url.subString(7));



animalsRouter.get('/animals', (req, res)=>{
  fs.readdir(__dirname + '/animals', (err, dataFiles)=>{
    //if doesnt contain file
    if(err || dataFiles.length === 0) {
      console.log(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      return res.end('404 Not Found');
    }
    //if contains files - get the name and content
    dataFiles.forEach((file)=> {
      var content = fs.readFileSync(__dirname + '/animals/' + file, 'utf8');
      console.log(content);
      res.write(content);

    });
    res.end();
  });
});
//get animal by id
animalsRouter.get('/animals/:id', (req, res, parsedURL)=> {
  var parseNum = parsedURL.pathname.match(/\/animals\/(\d+)/);
  fs.readFile(__dirname + '/animals/' + parseNum + '.json', 'utf', (err, data)=> {
    if(err){
      res.writeHead(404, {'Content-Type': 'text/plain'});
      return res.end('404 Not Found');
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    return res.end(data);
  });
});

animalsRouter.post('/animals', (req, res)=> {
  console.log('/animals POST request was hit');
  req.on('data', (data) =>{
    console.log('data' + data);
    fs.writeFile(__dirname + '/animals/' + animalsRouter.parseNum + '.json', data, (err)=>{
      animalsRouter.parseNum++;
      if(err) {
        console.log(err);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        return res.end('500 Internal Server Error');
      }
      res.writeHead(200, {'Content-Type': 'text/plain'});
      return res.end();
    });
  });
});






exports.animalsRouter = animalsRouter;
