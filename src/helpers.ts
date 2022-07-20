export function makeUnique(str: string) {
    return String.prototype.concat(...new Set(str)).replace(/ /g, '')
}
export function breakLargeNumber(numberList: number[]):number[] {
    return numberList.toString().replace(/,/g, '').split('').map(function (item) {
        return parseInt(item);
    })
}
export function validate(name:string){
    var re = new RegExp(/([a-zA-Z])+$/g);
    return !name.match(re);
}