var db = global.db;

var ethBlock = require('ethereumjs-block');
var rlp = require('rlp');

var utils = require('./libs/utils');
var trie = require('./libs/trie');

/**
 * Constants
 */
const prefix = utils.stringToHex('h');
const suffix = utils.stringToHex('n');

/**
 * Test leveldb
 */
var blockNumber = 2596315;
var hexBlockNumber = utils.padLeft(utils.decimalToHex(blockNumber), 16);
var keyString = prefix + hexBlockNumber + suffix;
var key = new Buffer(keyString, 'hex');

console.log('Block Number:', key);

db.get(key, function (er, value) {
    if (er) throw new Error(er);

    console.log('Block Hash:', value);

    value = value.toString('hex');
    var keyString = prefix + hexBlockNumber + value;
    var key = new Buffer(keyString, 'hex');

    db.get(key, function (er, value) {
        if (er) throw new Error(er);

        console.log('Raw Block Data:', value);

        var block = new ethBlock.Header(value);
        var stateRoot = block.stateRoot;
        console.log('State Root:', stateRoot);

        // Check state root in db
        trie.checkRoot(stateRoot);

        var address = '0x6512b9E5ed91DbA434E19DBdeC4229bEBEa3e350';
        var hash = utils.sha3(address).toString('hex');
        console.log('Hash key:', hash, hash.length);
        var keyAddress = utils.getNaked(hash);
        trie.getInfoByAddress(stateRoot, keyAddress);
    });
});