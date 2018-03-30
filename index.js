var path = require('path');
var levelup = require('levelup');
var leveldown = require('leveldown');

/**
 * Level DB
 */
var levelDBPath = path.relative('./', '/Users/User/Library/Ethereum/ropsten/geth/chaindata');
var db = levelup(leveldown(levelDBPath));


/**
 * Global variable
 */
global.db = db;

/**
 * Run
 */
require('./main.js');