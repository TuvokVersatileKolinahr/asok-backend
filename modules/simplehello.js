var HelloProvider = require('./dto/HelloProvider').HelloProvider;

module.exports = [
    {
        method: 'GET', path: '/hello',
        config: { handler: getHello } 
    },
    {
        method: 'GET', path: '/hellos',
        config: { handler: getHellos } 
    }
];


var helloProvider= new HelloProvider('localhost', 27017, 'asok');

function getHello(request) {
  helloProvider.findAll(function(error, items){
    var rand = items[Math.floor(Math.random() * items.length)];
    request.reply(rand);
  });
};

function getHellos(request) {
  helloProvider.findAll(function(error, items){
    request.reply(items);
  });
};
