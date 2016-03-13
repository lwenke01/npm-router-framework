'use strict';

var http = require('http');
var animalsRouter = require(__dirname + '/routes/animal-route').animalsRouter;


http.createServer(animalsRouter.route()).listen(3000, () => {
  console.log('server up on 3000');
});
