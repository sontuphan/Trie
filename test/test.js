var path = require('path');
var levelup = require('levelup');
var leveldown = require('leveldown');
var rlp = require('rlp');

/**
 * Level DB
 */
var levelDBPath = path.relative('./', '/Users/User/Library/Ethereum/ropsten/geth/chaindata');
var db = levelup(leveldown(levelDBPath));

// Try a recursive function
var traverse = function (_root) {
    return new Promise(function (res, rej) {
        db.get(_root, function (er, value) {
            if (er) throw new Error(er);
            value = rlp.decode(value);
            console.log(value);

            return res(value);
        });
    });
}

var hashKey = "3e07d9 61514b1a37874228ccc4374620bc5a5831a22cab0b785fef13e47394d3";
var stateRoot = new Buffer("1a63facb2a82966504a643f7c6cce28ddb47ea056b02009975c665bdada64c81", "hex");

traverse(stateRoot).then(re => {
    return traverse(re[3]); // 3
}).then(re => {
    return traverse(re[14]); // e
}).then(re => {
    return traverse(re[0]); // 0
}).then(re => {
    return traverse(re[7]); // 7
}).then(re => {
    return traverse(re[13]); // d
}).then(re => {
    return traverse(re[9]); // 9
})