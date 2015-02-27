#!/usr/bin/env node
/*jshint node: true */
'use strict';

var fs = require('fs'),
    should = require('should'),
    schemas = require('../lib/schemas.js'),
    mocha = require('mocha');

describe('Services', function() {

    it('#testNoTestCases()', function(done) {
        var services = require('../lib/services.js');

        if (services.load(__dirname + '/services' ) === null ) {
            done('ERROR: services.load unsuccessful.');
        } else {
            var allServices = services.getServices();
            allServices.should.be.instanceof(Object);

            var noTestCasesService = allServices['/defaults/noTestCases'];

            // Check the default values
            noTestCasesService.should.have.property('style');
            noTestCasesService.style.should.equal('OPERATION');

            noTestCasesService.methods.GET.request.should.exist;
            noTestCasesService.methods.GET.request.should.be.instanceOf(Object);

            noTestCasesService.methods.GET.request.parameters.should.be.instanceOf(Array);
            noTestCasesService.methods.GET.request.parameters.length.should.equal(0);

            noTestCasesService.methods.GET.request.headers.should.be.instanceOf(Array);
            noTestCasesService.methods.GET.request.headers.length.should.equal(0);

            noTestCasesService.methods.GET.request.cookies.should.be.instanceOf(Array);
            noTestCasesService.methods.GET.request.cookies.length.should.equal(0);

            noTestCasesService.methods.GET.testCases.length.should.equal(0);

            // If reached here, then fine.
            done();
        }
    });
});