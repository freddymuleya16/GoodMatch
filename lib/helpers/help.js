"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.breakLargeNumber = exports.makeUnique = void 0;
function makeUnique(str) {
    return String.prototype.concat(...new Set(str)).replace(/ /g, '');
}
exports.makeUnique = makeUnique;
function breakLargeNumber(numberList) {
    return numberList.toString().replace(/,/g, '').split('').map(function (item) {
        return parseInt(item);
    });
}
exports.breakLargeNumber = breakLargeNumber;
function validate(name) {
    var re = new RegExp("^([a-zA-Z])$");
    return !name.match(re);
}
exports.validate = validate;
//# sourceMappingURL=help.js.map