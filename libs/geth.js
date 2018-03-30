var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

console.log("\n===========================================");
console.log("========== Geth connected:", web3.isConnected(), "==========");
console.log("===========================================\n");

var Geth = function () {}

Geth.getBlock = function (blockNumber) {
    return web3.eth.getBlock(blockNumber);
}

module.exports = Geth