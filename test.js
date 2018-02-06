var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

console.log(web3.eth.getTransactionCount('0x1585936b53834b021f68CC13eEeFdEc2EfC8e724'));