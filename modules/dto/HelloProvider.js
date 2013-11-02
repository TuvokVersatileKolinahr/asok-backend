var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

HelloProvider = function(host, port, dbname) {
  this.db= new Db(dbname, new Server(host, port, {}), {safe: true});
  this.db.open(function(){});
};


HelloProvider.prototype.getCollection= function(callback) {
  this.db.collection('greetings', function(error, hello_collection) {
    if( error ) callback(error);
    else callback(null, hello_collection);
  });
};

//find all greetings
HelloProvider.prototype.findAll = function(callback) {
  this.getCollection(function(error, hello_collection) {
    if( error ) callback(error)
      else {
        hello_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
            else callback(null, results)
          });
      }
    });
};

//find an hello by ID
HelloProvider.prototype.findById = function(id, callback) {
  this.getCollection(function(error, hello_collection) {
    if( error ) callback(error)
      else {
        hello_collection.findOne({_id: hello_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
            else callback(null, result)
          });
      }
    });
};

exports.HelloProvider = HelloProvider;