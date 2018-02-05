var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

console.log(web3.eth.getTransactionCount('0x283e59B39A51F2B7aF87dABB0eA14fd981Cb707A'));