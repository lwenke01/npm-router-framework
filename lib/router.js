'use strict';
// var url = require('url');
var Router = module.exports = function() {
  this.routes = {
    'GET': {},
    'POST': {},
    'DELETE': {}
  };
};

// Router.formatURL = (req, res) =>{
//   var parsedURL = url.parse(req.url);
//   if(parsedURL.pathname.indexOf('/animals/') !== -1) {
//     if(typeof(Number(parsedURL.pathname.slice(6))) === 'id'){
//       req.url = '/animals/:id';
//     } else {
//       res.writeHead(404, {'Content-Type': 'application/json'});
//       res.end('404 Not Found');
//     }
//   }
//   return parsedURL;
// };


Router.prototype.post = function(route, cb){
  this.routes['POST'][route] = cb;
};
Router.prototype.get = function(route, cb){
  this.routes['GET'][route] = cb;
};
Router.prototype.delete = function(route, cb){
  this.routes['DELETE'][route] = cb;
};

Router.prototype.route = function() {
  return(req, res)=> {
    var parsedURL = Router.formatURL(req, res);
    var routeFunction = this.routes[req.method][req.url];
    if (routeFunction instanceof Function) {
      routeFunction(req, res, parsedURL);
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 Not Found');
    }
  };
};
