#!/usr/bin/env node
/*jshint node: true */
'use strict';

var mu = require('mu2'),
    fs = require('fs'),
    path = require('path'),
    wrench = require('wrench'),
    extend = require('./extend');
var verbose = true;

exports.createDirectoryTree = function(rootDirName, projectTree, removeIfExist) {
    var rootDirPath = path.resolve(rootDirName);

    if (fs.existsSync(rootDirPath)) {
        console.log( "ERROR: Directory exists yet! " + rootDirPath);
        if( ! removeIfExist ) {
            return false;
        }
        console.log('Remove existing directory...');
        wrench.rmdirSyncRecursive(rootDirPath);
    }

    wrench.mkdirSyncRecursive(rootDirPath);
    projectTree.forEach( function(dir) {
        var dirToCreate = path.resolve( path.join( rootDirName, dir));
        if (verbose) console.log('Create "' + dirToCreate + '"');
        fs.mkdirSync(dirToCreate);
    });
    return true;
};

exports.copyDir = function(context, opts) {
    var sourceDirName = path.resolve(opts.sourceBaseDir, opts.dirName),
        destDirName = path.resolve(opts.targetBaseDir, opts.dirName);

    if (verbose) console.log('Copy dir from: ' + sourceDirName + ' to: ' + destDirName);
    wrench.copyDirSyncRecursive(sourceDirName, destDirName, opts);
};

exports.copyFile = function(fileName, sourceBaseDir, targetBaseDir, context) {
        console.log('copyFile...' + fileName);

    var sourceFileName = path.resolve(sourceBaseDir, fileName),
        destFileName = path.resolve(targetBaseDir, fileName);

    if (verbose) console.log('Copy file from: ' + sourceFileName + ' to: ' + destFileName);
    fs.writeFileSync(destFileName, fs.readFileSync(sourceFileName));
};

exports.processTemplate = function(context, opts) {
    var templateFileName = path.resolve(opts.sourceBaseDir, opts.template),
        fileName = path.resolve(opts.targetBaseDir, opts.template),
        buffer = '',
        view = {};
    if (verbose) console.log('templateFileName: ' + templateFileName);
    if (verbose) console.log('fileName: ' + fileName);

    extend(view, context);

    mu.compileAndRender(templateFileName, view)
        .on('data', function(c) {
            buffer += c.toString();
        })
        .on('end', function() {
            fs.writeFile(fileName, buffer, function(err) {
                if (err) throw err;
            });
        });
};