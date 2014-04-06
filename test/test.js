var assert = require("assert")
describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})

var hapi = require("../index")
  , http = require('../support/http');

describe('Products API', function() {
  before(function(done){
    http.createServer(hapi,done);
  });
    it('GET /users should return 200',function(done){
    request()
      .get('/users')
      .expect(200,done);
  });
	
})