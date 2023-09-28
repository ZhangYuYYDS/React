const targetMap = new WeakMap();

// 这个函数是用于收集依赖
function track(target, key) {
    // 如果此时activeEffect为null则不执行下面
    // 这里判断是为了避免例如console.log(person.name)而触发track
    if (!activeEffect) return;
    // depsMap中存放的是每一个对象的属性
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }

    // dep中存放的是每一个属性的effect函数
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect); // 把此时的activeEffect添加进去
}

// 这个函数是用于派发更新
function trigger(target, key, type, newValue, oldValue) {
    let depsMap = targetMap.get(target);
    if (!depsMap) return;

    // 将当前属性所依赖的effect全部存到一个新的集合中
    const effects = new Set();

    // add函数：将effect存到effects中
    function add(effectsToAdd) {
        if (effectsToAdd) {
            effectsToAdd.forEach((effect) => effects.add(effect));
        }
    }

    // 如果修改的是数组长度
    if (key == 'length' && isArray(target)) {
        const newLength = Number(newValue);
        depsMap.forEach((dep, key) => {
            if (key == 'length' || key >= newLength) {
                add(dep);
            }
        });
    } else {
        // 修改的是对象
        if (key !== undefined) {
            add(depsMap.get(key));
        }
    }

    //如果修改数组中的 某一个索引 怎么办？
    switch (type) {
        case 'Tadd': //这种情况：原来arr:[1,2,3]  但是现在：arr[100]=1
            if (isArray(target) && isIntegerKey(key)) {
                //如果是数组并且修改的索引大于数组的长度(上面首先判断的是修改索引小于数组长度的情况)
                add(depsMap.get('length'));
            }
    }

    effects.forEach((effect) => effect());
}

// 判断是否是对象或数组
function isObject(target) {
    return typeof target == 'object' && target !== null;
}

// 判断对象中是否有这个属性
function hasOwnProperty(target, key) {
    return Object.prototype.hasOwnProperty.call(target, key);
}

// 判断两个值是否相等
function isEqual(newValue, oldValue) {
    return newValue === oldValue;
}

// 判断是否是数组
const isArray = Array.isArray;

// 判断一个属性是不是索引（针对数组）
function isIntegerKey(key) {
    return parseInt(key) + '' == key;
}

// 实现reactive
function reactive(target) {
    if (!isObject(target)) {
        return target;
    }
    const handler = {
        get(target, key, receiver) {
            track(receiver, key); // 访问时收集依赖
            const res = Reflect.get(target, key, receiver);
            console.log('getter ' + res);

            // 递归判断的关键，如果发现子元素存在引用类型，递归处理
            if (!isObject(res)) {
                return reactive(res);
            }
            return res;
        },
        set(target, key, value, receiver) {
            console.log('set');
            const isKetExist = hasOwnProperty(target, key);
            const oldValue = target[key];
            let res = Reflect.set(target, key, value, receiver);
            console.log('setter ' + key + ':' + value + '=>' + res);
            if (!isKetExist) {
                console.log('响应式新增：', value);
                trigger(receiver, key, Tadd, value, oldValue); // 设值时自动通知更新
            } else if (!isEqual(value, oldValue)) {
                console.log('响应式修改：', key + '=' + value);
                trigger(receiver, key, Tset, value, oldValue); // 设值时自动通知更新
            }
            return res;
        },
    };

    return new Proxy(target, handler);
}

// effect函数：实现每一个函数一执行，就将这个这个函数放到dep中
let activeEffect = null;
function effect(fn) {
    activeEffect = fn;
    activeEffect();
    activeEffect = null; // 执行完成后立即设置为null
}

// 实现ref函数
function ref(initValue) {
    return reactive({
        value: initValue,
    });
}

let arr = [1, 2, 3, 4];
let proxy = reactive(arr);
proxy.push(9);
console.log(arr);
