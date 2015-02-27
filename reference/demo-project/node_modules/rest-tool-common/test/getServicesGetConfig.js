#!/usr/bin/env node
/*jshint node: true */
'use strict';

var fs = require('fs'),
    schemas = require('../lib/schemas.js'),
    should = require('should'),
    mocha = require('mocha');

describe('Services', function() {

    it('#getConfig()', function(done) {
        var services = require('../lib/services.js');

        if (services.load(__dirname + '/services' ) === null ) {
            done('ERROR: services.load unsuccessful.');
        } else {
            var allServices = services.getServices();
            var servicesConfig = services.getConfig();

            // Validate whether the structure conforms to the schema
            var errors = schemas.validate(servicesConfig, 'serviceConfigSchema.yml');
            if (errors.length > 0 ) {
                errors.forEach(function(error) {
                    console.log(JSON.stringify(error, null, '  '));
                });
                done('Validation error');
            } else {
                // Validate contentwise
                servicesConfig.should.be.instanceof(Object);
                servicesConfig.should.have.property('projectName', 'rest-tool-common');
                servicesConfig.should.have.property('apiVersion', 'v0.0.0');
                servicesConfig.should.have.property('author', 'TomBenke');
                servicesConfig.should.have.property('licence', 'MIT');
                servicesConfig.should.have.property('serviceUrlPrefix', '/rest');
                servicesConfig.should.have.property('servicePort', 3007);
                servicesConfig.should.have.property('baseUrl', 'http://localhost:3007/rest');
                servicesConfig.should.have.property('servicesRoot', '.');
                servicesConfig.should.have.property('services');
                servicesConfig.services.should.be.instanceof(Array);

                done();
            }
        }
    });
});