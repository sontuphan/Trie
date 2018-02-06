var merklePatriciaTree = require('merkle-patricia-tree/secure');
var rlp = require('rlp');
var db = global.db;

var Trie = function () {}

Trie.trie = function (root) {
    var root = new Buffer(root, 'hex');
    var trie = new merklePatriciaTree(db, root);
    return trie;
}

Trie.getInfoByAddress = function (root, address) {
    var root = new Buffer(root, 'hex');
    var address = new Buffer(address, 'hex');
    var trie = new merklePatriciaTree(db, root);

    trie.get(address, function (er, re) {
        if (er) throw new Error(er);

        var decoded = rlp.decode(re);
        return console.log('Address Data:', decoded);
    });
}

Trie.getTrieByStream = function (root) {
    var root = new Buffer(root, 'hex');
    var trie = new merklePatriciaTree(db, root);

    var stream = trie.createReadStream().on('data', function (data) {
        console.log('key:' + data.key.toString('hex'));
        var decodedVal = rlp.decode(data.value);
        console.log(decodedVal);
    }).on('end', function (val) {
        console.log('done reading!');
    });
}

Trie.checkRoot = function (root) {
    var root = new Buffer(root, 'hex');
    var trie = new merklePatriciaTree(db, root);
    trie.checkRoot(root, function (er, re) {
        return console.log('Check root:', er, re);
    });
}

module.exports = Trie