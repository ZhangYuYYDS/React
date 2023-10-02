for (var i = 0; i < 3; i++) {
    console.log('for中i的值：' + i);
    var time = setTimeout(() => {
        console.log('setTimeout中i的值：' + i);
    }, 300);
}

/**
 * 原理：
 * 1. 当执行for循环时，定义了3个定时器，由于setTimeout是异步任务，所以所有的定时器都会在300ms后加入任务队列
 * 2. 此时执行代码，输出for中的1,2,3
 * 3. 300ms后，for循环执行结束，i变成了3，由于闭包的原因，所以输出三个3
 */