#!/usr/bin/env node
/*jshint node: true */
'use strict';

var fs = require('fs'),
    should = require('should'),
    schemas = require('../lib/schemas.js'),
    mocha = require('mocha');

describe('Services', function() {

    it('#testAliases()', function(done) {
        var services = require('../lib/services.js');

        if (services.load(__dirname + '/services' ) === null ) {
            done('ERROR: services.load unsuccessful.');
        } else {
            var allServices = services.getServices();
            allServices.should.be.instanceof(Object);

            // Check the aliases for each services
            for (var serviceName in allServices) {
                if (allServices.hasOwnProperty(serviceName)) {
                    var service = allServices[serviceName];

                    service.should.have.property('urlPattern');
                    service.urlPattern.should.be.instanceOf(String);

                    service.should.have.property('uriTemplate');
                    service.uriTemplate.should.be.instanceOf(String);
                }
            }

            // If reached here, then fine.
            done();
        }
    });
});