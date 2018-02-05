var ethUtil = require('ethereumjs-util');
var BigNumber = require('bignumber.js');

var Utils = function () {}

Utils.sanitizeHex = function (hex) {
    hex = hex.substring(0, 2) == '0x' ? hex.substring(2) : hex;
    if (hex == "") return "";
    return '0x' + this.padLeftEven(hex);
}

Utils.padLeftEven = function (hex) {
    hex = hex.length % 2 != 0 ? '0' + hex : hex;
    return hex;
}

Utils.getNaked = function (address) {
    return address.toLowerCase().replace('0x', '');
}

Utils.padLeft = function (n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

Utils.padRight = function (n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : n + new Array(width - n.length + 1).join(z)
}

Utils.stringToHex = function (tmp) {
    var str = '';
    for (var i = 0; i < tmp.length; i++) {
        str += tmp[i].charCodeAt(0).toString(16);
    }
    return str;
}

Utils.decimalToHex = function (dec) {
    return new BigNumber(dec).toString(16);
}

Utils.sha3 = function (input) {
    return ethUtil.sha3(input);
}

module.exports = Utils;