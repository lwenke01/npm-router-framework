'use strict';
var http = require('http');
var fs = require('fs');
var Router = require('./router.js');
var Animals = new Router();
// var strftime = require('strftime');
var idCount = 0;

Animals.route('/animals');
//check to see if app is working
Animals.post('/animals', (req, res)=> {
  console.log('/animals POST request was hit');
  idCount += 1;
  req.on('data', (data) =>{
    var stringData = data.toString();
    console.log('string data:' + stringData);
    console.log(idCount + ' of files');
    fs.writeFile(__dirname + '/data/' + idCount + '.json', stringData, (err) =>{
      if(err) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        return res.end('404 Not Found');

      } else {
        console.log('data was written to file');
        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end(stringData);
      }
    });
  });
});

Animals.get('/animals', (req, res)=>{
  console.log('hit with a GET request for /animals');
  fs.readdir(__dirname + '/data/', function(err, data){
    var stringData = data.toString();
    console.log('data: ' + stringData);
    if(err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end('404 Not Found');
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    console.log('got it');
    res.write(stringData);
    // res.write('hey');
    res.end();
  });
});
// get animal by id
// Animals.get('/animals/', (req, res)=> {
//   console.log('hit with a GET request for /animals/animalType');
//   fs.readdir(__dirname + '/data/', function(err, data) {
//
//     })
//     var stringData = data.toString();
//     console.log('data: ' + stringData);
//     if(err){
//       res.writeHead(404, {'Content-Type': 'application/json'});
//       return res.end('404 Not Found');
//     }
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     res.end(stringData);
//   });
// }

Animals.delete('/animals', (req, res)=>{
  console.log('/delete got hit');
  fs.readdir(__dirname + '/data/', function (err, data){
    var stringData = data.toString();
    var numFiles = data.length;
    return res.end(stringData - numFiles);

  });
});

http.createServer(Animals.route()).listen(3000, () => {
  console.log('server up on 3000');
});
