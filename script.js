//Задание 1 
var a = 100;
var b = 200;
var p = calcPer(a, b);
var s = calcSq(a, b);
console.log(p, s);

function calcPer(c, d) {
    let per = c * 2 + d * 2
    return per
}

function calcSq(e, f) {
    return (e * f)
}
//Задание 3
var c = [45, 60, 12, 98, 78, 154, 65];
var b = reverseArray(c);
console.log(b); //drucke 65,154,78,98,12,60,45

var t = ["php", "javascript", "html", "css", "mysql"];
var m = reverseArray(t);
console.log(m); //напечатает mysql, css, html, javascript, php

function reverseArray(a) {
    let mus = []
    for (let i = a.length - 1; i >= 0; i--) {
        let el = a[i];
        mus.push(el)
    }
    return mus
}