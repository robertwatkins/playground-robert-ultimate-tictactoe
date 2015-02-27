var request = require('superagent'),
    should = require('should'),
    mocha = require('mocha');

describe('Succesfully updates a Player', function() {
    var agent = request.agent();

    it('should Succesfully updates a Player', function(done) {
        var path = require('path');
        var body = require(path.resolve('services/players/player', 'putResource-requestBody.json'));
        agent
            .put('http://localhost:3007/rest/players/{id}')
            .auth('username', 'password')
            .send(body)
            
            .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8')
            
            .set('Accept-Encoding', 'gzip, deflate')
            
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                
                res.should.have.header('Content-Type', 'application/json');
                
                res.should.have.property('body');
                // FIXME add further checks if appropriate
                
                done();
            });
    });
});