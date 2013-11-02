var Hapi = require('hapi');
var products = require('./modules/products');
var navlist = require('./modules/navlist');
var simplehello = require('./modules/simplehello');

// Server config
var config = { };
// Create a server with a host and port
var server = Hapi.createServer('localhost', 9993, config);

server.pack.require({
    lout: { endpoint: '/docs' }
  }, function (err) {
      if (err) {
          console.log('Failed loading plugins');
      }
  });

server.addRoutes(products);
server.addRoutes(navlist);
server.addRoutes(simplehello);

// Start the server
server.start();
