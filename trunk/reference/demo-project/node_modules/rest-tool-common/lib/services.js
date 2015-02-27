#!/usr/bin/env node
/*jshint node: true */
'use strict';

/**
 * Service Loader for the restapi tool
 */
var fs = require('fs');

var schemas = require('./schemas.js');

/** restapi configuration parameters */
var config = {};

/** Descriptors of all services */
var services = {};

var mapOwnProperties = function(obj, func) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            func(obj[property], property);
        }
    }
};

/**
 * Load content identified by 'contentFileName' with the selected 'encoding'
 * 
 * @param  {String} contentFileName The path to the content file
 * @param  {String} encoding        The encoding of the content file
 * @return {Buffer}                 The content
 */
var loadFile = function (contentFileName, encoding) {
    var fs = require('fs');
    // console.log('loadFile:' + contentFileName);
    return(fs.readFileSync(contentFileName, encoding));
};

var loadJsonFile = function (contentFileName) {
    var content = null;

    try {
        content = require(contentFileName);
    } catch (error) {
        console.log(error);
    };
    return content;
};

var loadConfig = function(configFileName) {

    var config = loadJsonFile(configFileName);
    if (config !== null) {
        var err = schemas.validate(config, 'serviceConfigSchema.yml');

        if (err.length > 0 ) {
            console.log('\nERROR: In config file: ' + configFileName);
            err.forEach(function(error) {
                console.log(error.desc);
            });
            return null;
        }
    }

    return config;
};

exports.load = function(restapiRoot) {
    var path = require( 'path' );

    config = loadConfig(path.resolve(restapiRoot,'config.yml'));
    if (config === null) {
        return null;
    }

    var baseFolder = path.resolve(restapiRoot, config.servicesRoot),
        servicesToLoad = config.services;

    return loadServices(restapiRoot, config.servicesRoot, servicesToLoad);
};

var updateMethodLists = function (serviceDescriptor) {
    serviceDescriptor.methodList = [];

    for (var method in serviceDescriptor.methods) {
        if (serviceDescriptor.methods.hasOwnProperty(method)) {
            serviceDescriptor.methods[method].methodName = method;
            serviceDescriptor.methodList.push(serviceDescriptor.methods[method]);
        }
    }
};

var setAlias = function(object, property, alias) {
    if (object.hasOwnProperty(property) && !object.hasOwnProperty(alias)) {
        object[alias] = object[property];
    } else if (object.hasOwnProperty(alias) && !object.hasOwnProperty(property)) {
        object[property] = object[alias];
    }
};

var setAliases = function(serviceDescriptor) {
    setAlias(serviceDescriptor, 'urlPattern', 'uriTemplate');
};

var setDefault = function(object, property, defaultValue) {
    if (!object.hasOwnProperty(property) || object[property] === null) {
        object[property] = defaultValue;
    }
};

var setDefaults = function(serviceDescriptor) {

    setDefault(serviceDescriptor, 'style', 'OPERATION');

    mapOwnProperties( serviceDescriptor.methods, function(method, methodName) {
        var sdMethod = serviceDescriptor.methods[methodName];
        setDefault( sdMethod, 'testCases', []);
        sdMethod.testCases.forEach(function(testCase) {
            setDefault(testCase, 'request', {
                cookies: [],
                headers: []
            });

            setDefault( testCase.request, 'cookies', []);
            setDefault( testCase.request, 'headers', []);

            setDefault(testCase.response, 'headers', []);
            setDefault(testCase.response, 'cookies', []);
        });

        // Set the defaults for the request
        setDefault(sdMethod, 'request', {
            parameters: [],
            cookies: [],
            headers: []
        });

        setDefault( sdMethod.request, 'parameters', []);
        setDefault( sdMethod.request, 'cookies', []);
        setDefault( sdMethod.request, 'headers', []);

        // Set defaults for the responses items
        sdMethod.responses.forEach(function(response) {
            setDefault(response, 'headers', []);
            setDefault(response, 'cookies', []);
        });
    });
};

var loadServices = function(restapiRoot, servicesRoot, servicesToLoad) {
    var path = require( 'path' );

    var baseFolder = path.resolve(restapiRoot, servicesRoot);
    // console.log('loadServices from ', baseFolder);

    // serviceFolders
    servicesToLoad.forEach(function (servicePath) {
        var serviceDescriptorFileName = baseFolder + servicePath + '/service.yml';

        // Load the YAML format service descriptor
        // console.log('Loading ' + serviceDescriptorFileName);
        var serviceDescriptor = require( serviceDescriptorFileName );

        setAliases(serviceDescriptor);

        // Validate the service description
        var err = schemas.validate(serviceDescriptor, 'serviceSchema.yml');
        if (err.length > 0 ) {
            console.log('\nERROR: In service descriptor file: ' + serviceDescriptorFileName);
            err.forEach(function(error) {
                console.log(error);
            });
        } else {
            setDefaults(serviceDescriptor);
            updateMethodLists(serviceDescriptor);

            // Set service description to services map
            // console.log(serviceDescriptorFileName + 'service is loaded.\n');
            serviceDescriptor.restapiRoot = restapiRoot;
            serviceDescriptor.contentPath = servicesRoot + servicePath;
            services[serviceDescriptor.uriTemplate] = serviceDescriptor;
        }
    });
    return services;
};

var findHeaderValue = function ( headers, field ) {
    var content = null;
    headers.forEach(function(header) {
        if (header.field.toLowerCase() === field.toLowerCase()) {
            content = header.content;
        }
    });
    return content;
};

/**
 * Get the response body of a given method of a service.
 * The default content type is 'application/json'.
 * 
 * @param  {String} method      The name of the method
 * @param  {Object} serviceDesc The service descriptor
 * @return {String}             The content
 */
exports.getMockResponseBody = function(method, serviceDesc) {
    var mockResponseBody = '';

    var mockBody = '';
    var contentType = 'application/json';

    serviceDesc.methods[method].responses.forEach(function(response) {
        if (response.name === 'OK' &&
            typeof response.mockBody != 'undefined' &&
            response.mockBody !== null) {
            mockBody = response.mockBody;
            contentType = findHeaderValue( response.headers, 'Content-Type' );
        }
    });

    console.log('mockBody: ' + mockBody + ' contentType: ' + contentType);
    if (mockBody !== '') {
        mockBody = serviceDesc.restapiRoot + '/' + serviceDesc.contentPath + '/' + mockBody;
        if(contentType === 'application/json') {
            mockResponseBody = loadJsonFile(mockBody);
        } else {
            if( contentType === 'text/plain' ||
                contentType === 'text/html' ||
                contentType === 'text/xml') {
                mockResponseBody = loadFile(mockBody, 'utf-8');
            } else {
                mockResponseBody = loadFile(mockBody, null);
            }
        }
    }
    return mockResponseBody;
};

exports.getServices = function () {
    return services;
};

exports.getConfig = function () {
    return config;
};

exports.getAllTestCases = function () {
    var testCases = [];

    for (var service in services) {
        if (services.hasOwnProperty(service)) {
            // console.log('get test cases of ' + service);
            var serviceDesc = services[service];
            for (var method in serviceDesc.methods ) {
                if ( serviceDesc.methods.hasOwnProperty(method) ) {
                    var methodDesc = serviceDesc.methods[method];
                    methodDesc.testCases.forEach( function(testCaseDesc) {
                        testCases.push({
                            service: {
                                name: serviceDesc.name,
                                description: serviceDesc.description,
                                uriTemplate: serviceDesc.uriTemplate,
                                urlPattern: serviceDesc.uriTemplate,
                                style: serviceDesc.style
                            },
                            method: method,
                            testCase: {
                                name: testCaseDesc.name,
                                description: testCaseDesc.description,
                                url: testCaseDesc.url,
                                contentPath: serviceDesc.contentPath,
                                template: testCaseDesc.template,
                                request: testCaseDesc.request,
                                response: testCaseDesc.response
                            }
                        });
                    });
                }
            }
        }
    }
    return testCases;
};