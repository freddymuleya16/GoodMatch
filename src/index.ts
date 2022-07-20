import { breakLargeNumber, makeUnique, validate } from './helpers/help'

export function isMatch(name1: string, name2: string) {
   
    var re = new RegExp("^([a-zA-Z])$");
    if (validate(name1)) {
        return name1 + " is not alphabetic characters";
    } 
    if (validate(name2)) {
        return name2 + " is not alphabetic characters";
    } 
    const result: string = `${name1} matches ${name2}`.toLowerCase()
    var numberList: number[] = [];
    makeUnique(result).split("").forEach(letter => {
        numberList.push((result.match(new RegExp(letter, "g")) || []).length);
    });
    var percentage = FindPercentage(numberList)

    if (percentage >= 80) {
        return `${name1} matches ${name2}` + " " + percentage + "%, good match"
    } else {
        return `${name1} matches ${name2}` + " " + percentage + "%"
    }
}

var newList: any = []
export function FindPercentage(numberList: number[]) {
    numberList = breakLargeNumber(numberList);
    newList = breakLargeNumber(newList);

    const sum: number = (numberList.length > 1) ? numberList[0] + numberList[numberList.length - 1] : numberList[0]
    numberList = numberList.slice(1, (numberList.length - 1))

    newList.push(sum)
    var res: number = 0;
    if (numberList.length > 0) {
        res = FindPercentage(numberList)
    } else if (newList.length > 2) {
        var temp = newList;
        newList = [];
        res = FindPercentage(temp);
    }
    else {
        res = parseInt(newList[0].toString() + newList[1].toString())
        newList = [];
        return res;
    }
    return res

}

const num: number = 11;
console.log(isMatch("Jacky@#21", "Jacky@@$"))
