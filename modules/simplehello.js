var DtoProvider = require('./dto/DtoProvider').DtoProvider;

module.exports = [
    {
        method: 'GET',
        path: '/hello',
        config: {
          handler: getHello
        }
    },
    {
        method: 'GET',
        path: '/hellos',
        config: {
          handler: getHellos
        }
    }
];


var helloProvider= new DtoProvider('localhost', 27017, 'asok');
helloProvider.setCollectionName('greetings');

function getHello(request, reply) {
  helloProvider.findAll(function(error, items){
    var rand = items[Math.floor(Math.random() * items.length)];
    reply(rand);
  });
};

function getHellos(request, reply) {
  helloProvider.findAll(function(error, items){
    reply(items);
  });
};
