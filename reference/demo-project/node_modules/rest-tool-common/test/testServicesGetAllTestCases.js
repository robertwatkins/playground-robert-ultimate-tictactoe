/*jshint node: true */
'use strict';

var fs = require('fs'),
    should = require('should'),
    mocha = require('mocha'),
    schemas = require('../lib/schemas.js');

/**
 * Validate the testCase object
 * @param  {Object} testCase  The testCase object to validate
 * @return {Boolean}          true if successfully validated, false otherwise
 */
var validateTestCase = function (testCase) {
    // Validate service
    testCase.should.have.property('service');
    testCase.service.should.be.instanceof(Object);
    testCase.service.should.have.property('name');
    testCase.service.should.have.property('description');
    testCase.service.should.have.property('uriTemplate');
    testCase.service.should.have.property('style');
    testCase.service.style.should.match(/OPERATION|RESOURCE/);

    // Validate method
    testCase.should.have.property('method');
    testCase.method.should.match(/GET|PUT|POST|DELETE/);

    // Validate testCase
    testCase.should.have.property('testCase');
    testCase.testCase.should.be.instanceof(Object);
    schemas.validate(testCase.testCase, 'testCaseSchema.yml');

    return true;
};


describe('Services', function() {

    it('#getAllTestCases()', function(done) {
        var services = require('../lib/services.js');

        if (services.load(__dirname + '/services' ) === null ) {
            done('ERROR: services.load unsuccessful.');
        } else {
            var allTestCases = services.getAllTestCases();

            // Validate each test-cases
            allTestCases.should.be.instanceof(Array);
            allTestCases.forEach(function(testCase) {
                validateTestCase(testCase);
            });

            done();
        }
    });
});