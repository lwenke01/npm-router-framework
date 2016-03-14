'use strict';
var http = require('http');
var fs = require('fs');
// var express = require('express');
// var expRouter = express.Router();
var Router = require('./router.js');
var Animals = new Router();
var strftime = require('strftime');
// var mainRouter = require('./server').mainRouter;
var idCount = 0;
// var animalType = fs.readFileSync(__dirname + 'animals/' + req.url.subString(7));

Animals.route('/animals');
//check to see if app is working
Animals.get('/', (req, res)=>{
  res.json({message: 'hooray! its working'});
});

Animals.post('/animals', (req, res)=> {
  // // var animal = new Animals();
  // req.name = require.body.name;
  // //save the new animal and check for errors
  // req.save(function (err){
  //   if(err)
  //     res.send(err);
  //   res.json({message: 'new animal created!'});
  // });
  console.log('/animals POST request was hit');

  var date = new Date();
  var format = '%Y-%m-%d %H:%M';
  idCount += 1;
  req.on('data', (data) =>{
    var stringData = data.toString();
    console.log('string data:' + stringData);
    console.log(idCount + ' of files');
    fs.writeFile(__dirname + '/data/animal' + idCount + '.json', data, (err) =>{
      if(err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        return res.end('404 Not Found');

      } else {
        console.log('data was written to file');
        res.writeHead(200, {'Content-Type': 'text/plain'});
      // res.write(data);
        return res.end(stringData);
      }
    });
  });
});


//get route for /animals
Animals.get('/animals', (req, res)=>{
  console.log('hit with a GET request for /');
  fs.readdir(__dirname + '/animals', data, (err)=>{
    // if doesnt contain file
    if(err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      return res.end('404 Not Found');
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    console.log('got it');
    res.write(data);
    return res.end(data);

    // if contains files - get the name and content
    // dataFiles.forEach((file)=> {
    //   var content = fs.readFileSync(__dirname + '/animals/' + file, 'utf8');
    //   console.log(content);
    //   res.write(content);
    //
    // });
    // res.end();
  });
});
// get animal by id
// Animals.get('/animals/:id', (req, res)=> {
//   var parseNum = parsedURL.pathname.match(/\/animals\/(\d+)/);
//   fs.readFile(__dirname + '/animals/animal' + parseNum + '.json', data, (err) => {
//     if(err){
//       res.writeHead(404, {'Content-Type': 'text/plain'});
//       return res.end('404 Not Found');
//     }
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     res.end();
//   });
// });
//
// Animals.delete('/animals, ')

http.createServer(Animals.route()).listen(3000, () => {
  console.log('server up on 3000');
});
