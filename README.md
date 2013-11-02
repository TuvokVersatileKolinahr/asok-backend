# asok-backend

Asok is the node backend for the [asok frontend](https://github.com/TuvokVersatileKolinahr/asok-frontend).

It consists of

* a simple Hello service that sends a random greeting it takes from a mongodb
* documentation of the simple hello in /doc
* a navigation list with some (hardcoded) urls
* a productlist that is not finished yet

But hey, Asok is an intern, he has to learn a lot.

### Installation
* Clone into directory
* run npm install
* Configure mongo instance in simplehello.js defaults to 
	* Host: 'localhost'
	* Port: 27017
	* Database: 'asok'
* Put some greetings in the database:

		$ mongo
		> use asok
        > db.greetings.insert( [
            { greeting : "Hello", recipient : "world" },
            { greeting : "Hallo", recipient : "wereld" },
            { greeting : "Ola", recipient : "mundo" },
            { greeting : "Ciao", recipient : "bambino" },
            { greeting : "Gutentag", recipient : "welt" },
            { greeting : "qo'", recipient : "vIvan" },
            { greeting : "привет", recipient : "мир" }
          ] )
        > db.greetings.find()
        { "_id" : ObjectId(..), "greeting" : "Hello", "recipient" : "world" }
        { "_id" : ObjectId(..), "greeting" : "Hallo", "recipient" : "wereld" }
        { "_id" : ObjectId(..), "greeting" : "Ola", "recipient" : "mundo" }
        { "_id" : ObjectId(..), "greeting" : "Ciao", "recipient" : "bambino" }
        { "_id" : ObjectId(..), "greeting" : "Gutentag", "recipient" : "welt" }
        { "_id" : ObjectId(..), "greeting" : "qo'", "recipient" : "vIvan" }
        { "_id" : ObjectId(..), "greeting" : "привет", "recipient" : "мир" }
		> quit()
		$
* start the server:

		$ node index.js 
	or use [nodemon](http://nodemon.codeplex.com) for development:
		
		$ nodemon .

### Usage
See for usage the [asok frontend](https://github.com/TuvokVersatileKolinahr/asok-frontend).
Basically, call the provided urls like so:

          $.getJSON( "/hapi/hello").done(function( data ) {
            // do something wtih the data, like send it to a ractive frontend
            greet.set({
              greeting: data.greeting,
              recipient: data.recipient
            });
          });


### Used technology
asok uses [Hapi](http://spumko.github.io), a rich framework for building web applications and services, to expose its GET urls.

The HelloProvider uses [mongoDB native](https://github.com/mongodb/node-mongodb-native/) to connect to the [mongoDB](http://www.mongodb.org) backend.

