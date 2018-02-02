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
var blockNumber = 2571673;
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

        // db.get(stateRoot, function (er, data) {
        //     if (er) throw new Error(er);

        //     data = rlp.decode(data);
        //     console.log('Trie Data:', data);
        // });

        var address = '0x81b7E08F65Bdf5648606c89998A9CC8164397647';
        var keyAddress = utils.getNaked(address);
        trie.getInfoByAddress(stateRoot, keyAddress);
    });
});