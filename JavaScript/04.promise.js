// // resolve参数的三种情况
// // 情况一：resolve传入的是普通值或对象，这个值会作为then回调的参数
new Promise((resolve, reject) => {
    resolve('normal resolve');
}).then((res) => {
    console.log(res); // normal resolve
});

new Promise((resolve, reject) => {
    resolve({ name: 'zy', age: 20 });
}).then((res) => {
    console.log(res); // { name: 'zy', age: 20 }
});

// // 情况二：传入的是一个Promise，那么这个新的Promise会决定原Promise的状态
new Promise((resolve, reject) => {
    resolve(
        new Promise((resolve, reject) => {
            setTimeout(() => {
                // resolve('Promise resolve');
                reject('Promise reject');
            }, 3000);
        })
    );
})
    .then((res) => {
        console.log('resolve:', res); // 执行resolve时输出：resolve: Promise resolve
    })
    .catch((err) => {
        console.log('reject:', err); // 执行reject时输出：reject: Promise reject
    });

// // 情况三：传入的是一个对象，并且对象有实现then方法，那么会执行该then方法，并且根据该then方法的结果来决定promise的状态
new Promise((resolve, reject) => {
    resolve({
        then: function (resolve, reject) {
            // resolve('object resolve');
            reject('object reject');
        },
    });
})
    .then((res) => {
        console.log('resolve:', res); // 执行resolve时输出：resolve: object resolve
    })
    .catch((err) => {
        console.log('reject:', err); // 执行reject时输出：reject: object reject
    });

// then方法
// 情况一：多次调用：连续输出三个resolve
let promise = new Promise((resolve, reject) => {
    resolve('resolve');
});

promise.then((res) => {
    console.log(res);
});
promise.then((res) => {
    console.log(res);
});
promise.then((res) => {
    console.log(res);
});

// // 情况二：链式调用
let promise = new Promise((resolve, reject) => {
    resolve('resolve');
});

promise
    .then((res) => {
        console.log(res);
        return 'abc';
    })
    .then((res) => {
        console.log(res);
        return 'cba';
    })
    .then((res) => {
        console.log(res);
    });

// catch方法
// 多次调用：连续输出三个reject
let promise = new Promise((resolve, reject) => {
    reject('reject');
});

promise.catch((err) => {
    console.log(err);
});
promise.catch((err) => {
    console.log(err);
});
promise.catch((err) => {
    console.log(err);
});

// 返回值 ：因为catch的回调函数执行完成后仍是fullfilled的
let promise = new Promise((resolve, reject) => {
    reject('reject');
});
promise
    .catch((err) => {
        console.log('1', err);
        throw new Error('error message');
    })
    .catch((err) => {
        console.log('2', err);
    })
    .then((res) => {
        console.log('3', res);
    });

finally方法：无论promise的状态是什么都会执行的代码
const promise = new Promise((resolve, reject) => {
    resolve('fulfilled');
    reject('reject');
});

promise
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        console.log('finally');
    });

// all方法：一假则假
const p1 = new Promise((resolve, reject) => {
    // resolve('1 fulfilled');
    reject('1 reject');
});

const p2 = new Promise((resolve, reject) => {
    // resolve('2 fulfilled');
    reject('2 reject');
});

const p3 = new Promise((resolve, reject) => {
    resolve('3 fulfilled');
});

Promise.all([p1, p2, p3])
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

// race方法：最快的，不管结果是啥
Promise.race([p1, p2, p3])
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

allSettled：全部都执行完后，将所有promise的状态打印出来
Promise.allSettled([p1, p2, p3])
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

// any方法：就等fulfilled状态
Promise.any([p1, p2, p3])
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
