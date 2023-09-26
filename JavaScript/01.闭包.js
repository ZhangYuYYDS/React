// 问题：函数内部可以访问到函数外部的变量，而函数外部的变量无法访问到函数内部的变量
// var a = 888;
// function fn() {
//     var b = 999;
//     console.log('函数内：', a); // 888
// }
// fn();
// console.log('函数外', b); // 报错

// 解决：在函数内部在定义一个函数
// 原理：因为fn2在fn1函数内部，所以在fn2内部可以访问到fn1内部的变量，即a。此时将fn2函数作为fn1函数的返回值，我们就可以在fn1函数外部访问到fn1内部的变量了！
function fn1() {
    var a = 888;
    return function fn2() {
        // console.log('a值为:', a);
        // 为什么最后输出会多出一个undefined，因为默认返回undefined
        return a;
    };
}
var res = fn1();
console.log(res()); //a值为: 888

// 闭包==fn2
// 概念：闭包就是能够读取其他函数内部变量的函数，由于在JavaScript中只有函数内部的函数才能读取局部变量，所以说，闭包可以简单理解为定义在一个函数内部的函数
