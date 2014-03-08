var Hapi = require('hapi');
var products = require('./modules/products');
var navlist = require('./modules/navlist');
var simplehello = require('./modules/simplehello');
var recipes = require('./modules/recipes');

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

server.route(products);
server.route(navlist);
server.route(simplehello);
server.route(recipes);

// Start the server
server.start();
