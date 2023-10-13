// 手写深拷贝;
function deepClone(obj) {
    // 如果是基本数据类型直接返回这个对象
    if (typeof obj !== 'object' || obj == null) return obj;

    // 如果是引用数据类型，则新建一个数组/对象存放放所有属性
    let newObj;
    if (obj instanceof Array) {
        newObj = [];
    } else {
        newObj = {};
    }
    for (let key in obj) {
        // for···in会遍历对象/数组的整个原型链，会有不属于obj的属性，所以使用hasOwnProperty
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key]);
        }
    }
    return newObj;
}

JSON.parse(JSON.stringify());
// 原理：就是先使用JSON.stringify(object)将其序列化为字符串，然后再反序列化
console.log(JSON.parse(JSON.stringify(object)));

// structuredClone: 支持循环引用;
console.log(structuredClone(object));

// 第三方库：_.cloneDeep()
console.log(_.cloneDeep(object));

let object = {
    name: 'zy',
    age: 18,
    user: {
        name: 'll',
        age: 20,
    },
    no: undefined,
};

let array = [1, 2, 3, 4];
