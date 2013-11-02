# asok-backend

Asok is the node backend for the [asok frontend](https://github.com/TuvokVersatileKolinahr/asok-frontend).

It consists of

* a simple Hello service that sends a random greeting it takes from a mongodb
* documentation of the simple hello in /doc
* a navigation list with some (hardcoded) urls
* a productlist that is not finished yet

But hey, Asok is an intern, he has to learn a lot.

### Used technology
asok uses [Hapi](http://spumko.github.io), a rich framework for building web applications and services, to expose its GET urls.

The HelloProvider uses [mongoDB native](https://github.com/mongodb/node-mongodb-native/) to connect to the [mongoDB](http://www.mongodb.org) backend.