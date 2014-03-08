var Types = require('hapi').types;
var DtoProvider = require('./dto/DtoProvider').DtoProvider;
var productProvider= new DtoProvider('localhost', 27017, 'asok');
productProvider.setCollectionName('products');

module.exports = [
    {
        method: 'GET', path: '/products',
        config: {
            handler: getProducts, 
            validate: {
                query: { name: Types.String() }
            }
        }
    },
    {
        method: 'GET', path: '/products/{id}',
        config: { handler: getProduct } 
    },
    {
        method: 'POST', path: '/products/delete',
        config: {
            handler: delProduct,
            payload: {'parse': true},
            validate: {
                payload: { id: Types.String().required() } 
            }
        }
    },
    {
        method: 'POST', path: '/products',
        config: {
            handler: addProduct,
            payload: {'parse': true},
            validate: {
                payload: { name: Types.String().required().min(3) } 
            }
        }
    }
];

function getProducts(request, reply) {

    if (request.query.name) {
        reply(findProducts(request.query.name));
    }
    else {
      productProvider.findAll(function(error, items){
        reply(items);
      });
    }
}

function findProducts(name) {
    /**
    * can be more effective hoor, daar nie van
    **/
      productProvider.findAll(function(error, items){
        return items.filter(function(product) {
            return product.name.toLowerCase() === name.toLowerCase();
        });
      });

}

function getProduct(request, reply) {
  productProvider.findAll(function(error, products){

    var product = products.filter(function(p) {
        return p.id === parseInt(request.params.id);
    }).pop();

    reply(product);
  });
}

function addProduct(request, reply) {
  productProvider.findAll(function(error, products){
    if (products.length == 0)
    {
        var product = {
            id: 1,
            name: request.payload.name
        };
    } else {
        var product = {
            id: products[products.length - 1].id + 1,
            name: request.payload.name
        };
    }
    productProvider.save(product, function (argument) {
        reply([{status:'ok',product:product}]);
    });

  });
}

function delProduct(request, reply) {
    delid = request.payload.id;
    productProvider.findAll(function(error, products){

        var product = products.filter(function(p) {
            return p.id === parseInt(delid);
        }).pop();

        productProvider.delete(product._id, function (argument) {
            reply([{status:'ok',product_id:delid}]);
        });
    });

}

 