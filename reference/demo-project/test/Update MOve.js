var request = require('superagent'),
    should = require('should'),
    mocha = require('mocha');

describe('Succesfully updates a MOve', function() {
    var agent = request.agent();

    it('should Succesfully updates a MOve', function(done) {
        var path = require('path');
        var body = require(path.resolve('services/games/game/moves/move', 'putResource-requestBody.json'));
        agent
            .put('http://localhost:3007/rest/games/{id}/moves/{move}')
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