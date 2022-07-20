"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindPercentage = exports.isMatch = void 0;
const help_1 = require("./helpers/help");
function isMatch(name1, name2) {
    var re = new RegExp("^([a-zA-Z])$");
    if ((0, help_1.validate)(name1)) {
        return name1 + " is not alphabetic characters";
    }
    if ((0, help_1.validate)(name2)) {
        return name2 + " is not alphabetic characters";
    }
    const result = `${name1} matches ${name2}`.toLowerCase();
    var numberList = [];
    (0, help_1.makeUnique)(result).split("").forEach(letter => {
        numberList.push((result.match(new RegExp(letter, "g")) || []).length);
    });
    var percentage = FindPercentage(numberList);
    if (percentage >= 80) {
        return `${name1} matches ${name2}` + " " + percentage + "%, good match";
    }
    else {
        return `${name1} matches ${name2}` + " " + percentage + "%";
    }
}
exports.isMatch = isMatch;
var newList = [];
function FindPercentage(numberList) {
    numberList = (0, help_1.breakLargeNumber)(numberList);
    newList = (0, help_1.breakLargeNumber)(newList);
    const sum = (numberList.length > 1) ? numberList[0] + numberList[numberList.length - 1] : numberList[0];
    numberList = numberList.slice(1, (numberList.length - 1));
    newList.push(sum);
    var res = 0;
    if (numberList.length > 0) {
        res = FindPercentage(numberList);
    }
    else if (newList.length > 2) {
        var temp = newList;
        newList = [];
        res = FindPercentage(temp);
    }
    else {
        res = parseInt(newList[0].toString() + newList[1].toString());
        newList = [];
        return res;
    }
    return res;
}
exports.FindPercentage = FindPercentage;
const num = 11;
console.log(isMatch("Jacky@#21", "Jacky@@$"));
//# sourceMappingURL=index.js.map