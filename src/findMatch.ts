import { breakLargeNumber, makeUnique } from "./helpers";

export function isMatch(name1: string, name2: string) {
  const result: string = `${name1} matches ${name2}`.toLowerCase();
  var numberList: number[] = [];
  makeUnique(result)
    .split("")
    .forEach((letter) => {
      numberList.push((result.match(new RegExp(letter, "g")) || []).length);
    });
  var percentage = FindPercentage(numberList);

  return percentage;
}

var newList: any = [];
function FindPercentage(numberList: number[]) {
  numberList = breakLargeNumber(numberList);
  newList = breakLargeNumber(newList);

  const sum: number =
    numberList.length > 1
      ? numberList[0] + numberList[numberList.length - 1]
      : numberList[0];
  numberList = numberList.slice(1, numberList.length - 1);

  newList.push(sum);
  newList = breakLargeNumber(newList);
  var res: number = 0;
  if (numberList.length > 0) {
    res = FindPercentage(numberList);
  } else if (newList.length > 2) {
    var temp = newList;
    newList = [];
    res = FindPercentage(temp);
  } else {
    res = parseInt(newList[0].toString() + newList[1].toString());
    newList = [];
    return res;
  }
  return res;
}
