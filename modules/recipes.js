//recipes.js
var DtoProvider = require('./dto/DtoProvider').DtoProvider;
var Hapi = require('hapi');

module.exports = [
    {
        method: 'GET', 
        path: '/recipes/get/{id?}',
        config: { handler: getRecipeById }
    },
    {
        method: 'GET', 
        path: '/recipes/getraw/{id?}',
        config: { handler: getRecipeByRawId }
    },
    {
        method: 'GET', path: '/recipes',
        config: { handler: getRecipes } 
    },
    {
      method: 'POST',
      path: '/recipes/add',
      config: {
        handler: addRecipe,
        validate: {
          payload: {
            mid: Hapi.types.String().required(),
            title: Hapi.types.String().required()
          }
        }
      }
    }
];


var helloProvider= new DtoProvider('localhost', 27017, 'asok');
helloProvider.setCollectionName('recipes');

function addRecipe(req) {
  var newRecipe = {
    mid: req.payload.mid,
    title: req.payload.title
  };
  helloProvider.save(newRecipe, function( error, docs) {
    req.reply(newRecipe);
  });
}

function getRecipeById(req) {
  if (req.params.id) {
    helloProvider.findAll(function(error, items){
      for (var i = 0; i < items.length; i++) {
        console.log("check mid", items[i].mid);
        //okay so there is a difference between inserting to the mongo.console
        //and inserting via a POST
        // if (items[i].mid === parseInt(req.params.id,10)) {
        if (items[i].mid === req.params.id) {
          console.log("found mid", items[i].mid);
          return req.reply( { recipe: items[i] } );
          break;
        }
      }
     req.reply( { error: { message: 'No recipe found for id '+req.params.id+'.', type: '404' } } ).code(404);
    });
  } else {// no id found
    req.reply( { error: { message: 'Need an id to find a recipe.', type: '404' } } ).code(404);
  }
};

function getRecipeByRawId(req) {
  if (req.params.id) {
    helloProvider.findById(req.params.id, function (error, item) {
      if (item){
        return req.reply( { recipe: item } );
      }
      req.reply( { error: { message: 'No recipe found for id '+req.params.id+'.', type: '404' } } ).code(404);
    });
  } else {// no id found
    req.reply( { error: { message: 'Need an id to find a recipe.', type: '404' } } ).code(404);
  }
};

function getRecipes(req) {
  helloProvider.findAll(function(error, items){
    req.reply( { recipes: items } );
  });
};
