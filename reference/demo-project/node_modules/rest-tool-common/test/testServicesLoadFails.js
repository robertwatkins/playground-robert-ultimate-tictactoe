#!/usr/bin/env node
/*jshint node: true */
'use strict';

var should = require('should'),
    mocha = require('mocha');

describe('Services', function() {

    it('#loadFails()', function(done) {
        var services = require('../lib/services.js');

        if (services.load(__dirname + '/srvcs' ) === null ) {
            done();
        } else {
            done('services.load() should not return with non-null value.');
        }
    });
});