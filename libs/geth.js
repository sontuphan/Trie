var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

console.log("\n===========================================");
console.log("========== Geth connected:", web3.isConnected(), "===========");
console.log("===========================================\n");

var Geth = function () {}

Geth.getBlock = function (blockNumber) {
    return console.log('blockData:', web3.eth.getBlock(blockNumber));
}

Geth.getStateRoot = function (blockNumber) {
    return console.log('stateRoot:', web3.eth.getBlock(blockNumber).stateRoot);
}

module.exports = Geth