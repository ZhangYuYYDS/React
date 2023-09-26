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
// function fn1() {
//     var a = 888;
//     return function fn2() {
//         // console.log('a值为:', a);
//         // 为什么最后输出会多出一个undefined，因为默认返回undefined
//         return a;
//     };
// }
// var res = fn1();
// console.log(res()); //a值为: 888

// 闭包==fn2
// 概念：闭包就是能够读取其他函数内部变量的函数，由于在JavaScript中只有函数内部的函数才能读取局部变量，所以说，闭包可以简单理解为定义在一个函数内部的函数

// 写法一：
// function a() {
//     var aa = 0;
//     // 将子函数暴露出去，当然不用return也是可以的，只要在全局作用域能拿到这个子函数就行，例如将这个函数赋值给全局作用域中的某个变量，这样在全局作用域中也能拿到这个函数
//     function b() {
//         aa++;
//         console.log(aa);
//     }
//     return b;
// }
// var ab = a();
// ab(); //1
// ab(); //2

// 写法二：立即执行函数，定义后立即执行这个函数
// var ab = (function a() {
//     var aa = 0;
//     function b() {
//         aa++;
//         console.log(aa);
//     }
//     return b;
// })();
// ab(); //1
// ab(); //2

// 写法三：实际中最常用的写法，用于实现对象中私有属性的定义
function Person(name, age, publicval) {
    // 定义私有属性
    var names = name;
    var ages = age;
    // 对象公有属性
    this.publicval = publicval;
    // 在对象中定义方法，通过方法返回私有属性
    this.getName = function () {
        // 子作用域是可以访问父作用域的数据的
        return name;
    };
    this.getAge = function () {
        return age;
    };
}
var person = new Person('张三', 23, '共有属性');
// 这里如果要访问私有属性，必须通过方法进行访问，无法直接操作
console.log(person.getName()); //张三
console.log(person.getAge()); //23
// 对象的属性也就是共有属性则可以直接访问并操作
console.log(person.publicval);
person.publicval = 'updateval';
// 这里并不会修改对象中的names变量，而是会在Person对象中新增一个names属性
person.names = 'updatename';
