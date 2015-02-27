var request = require('superagent'),
	should = require('should'),
	mocha = require('mocha');

describe('Succesfully creates a new instance of Games', function() {
	var agent = request.agent();

	it('should Succesfully creates a new instance of Games', function(done) {
		var path = require('path');
		var body = require(path.resolve('services/games', 'postCollection-requestBody.json'));
		agent
			.post('http://localhost:3007/rest/games')
			.auth('username', 'password')
			.send(body)
			.set('Accept', 'application/json')
			.end(function(err, res) {
				should.not.exist(err);
				res.should.have.status(200);
				res.should.have.property('body');
				// FIXME add further checks if appropriate
				
				done();
			});
	});
});