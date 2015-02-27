#!/usr/bin/env node
/*jshint node: true */
'use strict';

var fs = require('fs'),
    should = require('should'),
    schemas = require('../lib/schemas.js'),
    mocha = require('mocha');

describe('Services', function() {

    it('#testDefaults()', function(done) {
        var services = require('../lib/services.js');

        if (services.load(__dirname + '/services' ) === null ) {
            done('ERROR: services.load unsuccessful.');
        } else {
            var allServices = services.getServices();
            allServices.should.be.instanceof(Object);

            // Check if each method and their request and response objects
            // have arrays of headers and cookies
            for (var serviceName in allServices) {
                if (allServices.hasOwnProperty(serviceName)) {
                    var service = allServices[serviceName];
                    var methods = service.methods;

                    service.should.have.property('style');

                    for (var methodName in methods) {
                        if (methods.hasOwnProperty(methodName)) {
                            var method = methods[methodName];
                            method.request.should.exist;
                            method.request.should.be.instanceOf(Object);

                            method.request.parameters.should.be.instanceOf(Array);
                            method.request.headers.should.be.instanceOf(Array);
                            method.request.cookies.should.be.instanceOf(Array);

                            method.testCases.should.be.instanceOf(Array);
                            method.testCases.forEach(function(testCase) {
                                testCase.request.should.exist;
                                testCase.request.should.be.instanceOf(Object);
                                testCase.request.headers.should.be.instanceOf(Array);
                                testCase.request.cookies.should.be.instanceOf(Array);

                                testCase.response.should.exist;
                                testCase.response.should.be.instanceOf(Object);
                                testCase.response.headers.should.be.instanceOf(Array);
                                testCase.response.cookies.should.be.instanceOf(Array);
                            });
                        }
                    }
                }
            }

            // If reached here, then fine.
            done();
        }
    });
});
