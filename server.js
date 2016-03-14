'use strict';
var http = require('http');
var fs = require('fs');
var Router = require('./router.js');
var Animals = new Router();
var strftime = require('strftime');
// var mainRouter = require('./server').mainRouter;
var idCount = 0;
// var animalType = fs.readFileSync(__dirname + 'animals/' + req.url.subString(7));


Animals.post('/animals', (req, res)=> {
  console.log('/animals POST request was hit');

  // var date = new Date();
  // var format = '%Y-%m-%d %H:%M';
  idCount += 1;
  req.on('data', (data) =>{
    var stringData = data.toString();
    console.log('string data:' + stringData);
    fs.writeFile(__dirname + '/data/animal' + idCount + '.json', data, (err)=>{
      console.log(err);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end();

    });
  });
});

Animals.get('/animals', (req, res)=>{
  // fs.readdir(__dirname + '/animals', (err, dataFiles)=>{
    //if doesnt contain file
    // if(err || dataFiles.length === 0) {
    //   console.log(err);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  console.log('got it');
  res.end();
    // }
    //if contains files - get the name and content
  //   dataFiles.forEach((file)=> {
  //     var content = fs.readFileSync(__dirname + '/animals/' + file, 'utf8');
  //     console.log(content);
  //     res.write(content);
  //
  //   });
  //   res.end();
  // });
});
// get animal by id
Animals.get('/animals/:id', (req, res, parsedURL)=> {
  var parseNum = parsedURL.pathname.match(/\/animals\/(\d+)/);
  fs.readFile(__dirname + '/animals/animal' + parseNum + '.json', data, (err) => {
    if(err){
      res.writeHead(404, {'Content-Type': 'text/plain'});
      return res.end('404 Not Found');
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end();
  });
});

// Animals.delete('/animals, ')

http.createServer(Animals.route()).listen(3000, () => {
  console.log('server up on 3000');
});
