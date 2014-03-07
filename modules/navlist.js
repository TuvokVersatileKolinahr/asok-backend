var Types = require('hapi').types;

module.exports = [
    {
        method: 'GET', path: '/navlist',
        config: {
            handler: getNavigationlists, 
            validate: {
                query: { name: Types.String() }
            }
        }
    },
    {
        method: 'GET', path: '/navlist/{id}',
        config: { handler: getNavigationlist } 
    },
    {
        method: 'POST', path: '/navlist',
        config: {
            handler: addNavigationlist,
            payload: 'parse',
            validate: {
                payload: { name: Types.String().required().min(3) } 
            }
        }
    }
];

function getNavigationlists(request) {

    if (request.query.name) {
        request.reply(findNavigationlists(request.query.name));
    }
    else {
        request.reply(navigationlists);
    }
}

function findNavigationlists(name) {

    return navigationlists.filter(function(navigationlist) {
        return navigationlist.name.toLowerCase() === name.toLowerCase();
    });
}

function getNavigationlist(request) {

    var navigationlist = navigationlists.filter(function(p) {
        return p.id === parseInt(request.params.id);
    }).pop();

    request.reply(navigationlist);
}

function addNavigationlist(request) {

    var navigationlist = {
        id: navigationlists[navigationlists.length - 1].id + 1,
        name: request.payload.name
    };

    navigationlists.push(navigationlist);

    request.reply(navigationlist).code(201).header('Location,: /navigationlists/' + navigationlist.id);
}

  // mock object for the list of urls in the navigation list
  var navigationlists = [
    {linkclass: 'mainlink', linkname: 'Go to T.V.K.',                       linkurl: 'http://www.tuvok.nl',                           id: 1},
    {linkclass: 'mainlink', linkname: 'Find us on GitHub.',                 linkurl: 'https://github.com/TuvokVersatileKolinahr',     id: 2},
    {linkclass: 'mainlink', linkname: 'Or visit Development',               linkurl: 'http://okki.tuvok.nl',                          id: 3},
    {linkclass: 'mainlink', linkname: 'HAPI docs',                          linkurl: 'http://asok.tuvok.nl/hapi/docs',                id: 4},
    {linkclass: 'mainlink', linkname: 'HAPI instrumental products',         linkurl: 'http://asok.tuvok.nl/instruments.html',         id: 5},
    {linkclass: 'mainlink', linkname: 'Building a Products API with HAPI',  linkurl: 'http://spumko.github.io/example/products-api/', id: 6}
  ];
