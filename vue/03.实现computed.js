const targetMap = new WeakMap();

// 这个函数是用于收集依赖
function track(target, key) {
    // 如果此时activeEffect为null则不执行下面
    // 这里判断是为了避免例如console.log(person.name)而触发track
    if (!activeEffect) return;
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }

    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect); // 把此时的activeEffect添加进去
}

// 这个函数是用于派发更新
function trigger(target, key) {
    let depsMap = targetMap.get(target);
    if (depsMap) {
        const dep = depsMap.get(key);
        if (dep) {
            dep.forEach((effect) => effect());
        }
    }
}

// 实现reactive
function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            track(receiver, key); // 访问时收集依赖
            return Reflect.get(target, key, receiver);
        },
        set(target, key, value, receiver) {
            Reflect.set(target, key, value, receiver);
            trigger(receiver, key); // 设值时自动通知更新
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

// 实现computed函数
function computed(fn) {
    let result = ref(0);
    // effect函数用于监听fn函数中的依赖
    effect(() => (result.value = fn()));
    return result;
}

let num1 = ref(5);
let sum1 = computed(() => num1.value * 8);

num1.value = 10;

console.log(sum1.value); // 80
