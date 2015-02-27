#!/usr/bin/env node
/*jshint node: true */
'use strict';

var fs = require('fs'),
    schemas = require('../lib/schemas.js'),
    mocha = require('mocha');

describe('Services', function() {

    it('#getServices()', function(done) {
        var services = require('../lib/services.js');

        if (services.load(__dirname + '/services' ) === null ) {
            done('ERROR: services.load unsuccessful.');
        } else {
            var allServices = services.getServices();
            allServices.should.be.instanceof(Object);

            var validationError = false;

            for (var s in allServices ) {
                var service = allServices[s];
                var errors = schemas.validate(service, 'serviceSchema.yml');
                if (errors.length > 0) {
                    errors.forEach(function(error) {
                        console.log(JSON.stringify(error, null, '  '));
                        validationError = true;
                    });
                }
            }

            if (validationError) {
                done('Validation error');
            }
            done();
        }
    });
});