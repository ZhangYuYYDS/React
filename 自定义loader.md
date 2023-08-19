> 一个loader就是一个Node.js模块，这个模块需要导出一个函数，这个导出函数的工作就是获得处理前的源内容，对源内容进行处理后，返回处理后的内容



# loader模板 





实现一个替换文件中姓名的loader

name.js

```js
export const name = "小张"
```

index.js

```js
import { name } from "./name.js"

function showInfo() {
    console.log("name")
}

showInfo()
```

运行代码输出：

```js
小张
```

现在我们希望将小张替换成小李：

1. 创建replace-loader

myLoaders/replace-loader.js

```js
module.exports = function(source) {
    // source为compiler传递给loader的一个文件的源内容
    
    const cotent = source.replace("小张", "小李")
    // 该处理函数需要返回处理后的内容
    return cotent
}
```

2. 使用loader

webpack.config.js

```js
const path = require("path")

module.export = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:"./myLoaders/replace-loader.js"
                // 本地loader， 要填写本地的路径
            }
        ]
    },
}
```

打包后我们就会发现实现我们的想要的功能啦~~~



因为我们使用的是本地的loader，因此需要填写本地的路径。loader的引入主要有以下几种方式：

# loader引入方式

1. 如果是npm包安装的loader，那么直接写loader名称即可

```js
{
    test: /\.js$/,
    use:'babel-loader'
}
```

2. 如果是本地自定义的loader，那么需要写本地loader的地址

```js
{
    test: /\.js$/,
    use: path.resolve(__dirname, "./myLoaders/replace-loader")
}
```

如上面的代码，我们每使用一个自定义的loader，都必须使用 path 模块来解析自定义loader的路径问题，这就会导致代码变得难以维护。那可不可以像引用第三方的loader一样，只写loader 名呢？我们可以使用 resolveLoader 来解决这个问题。

3. 如果是本地定义的loader，然后也想直接使用loader名称，那么可以取个别名

```js
module.exports = {
    resolveLoader: {
    // 取个别名
     alias: {
        "replace-loader": path.resolve(__dirname,"myLoaders/replace-loader")
    }
  },
  module: {
        rules: [
            {
                test: /\.js$/,
                use: 'replace-loader',
            }
        ]
    }
}
```

4. 如果你不想取别名，还想直接使用loader，那么就定义一下loader的查找位置，loader会默认先从`node_modules`中查找。如果我们希望它也能够到本地查找，那么就定义一下查找位置。

> **ResolveLoader** 用于配置 webpack 如何寻找 loader，默认情况下只会去 node_modules 目录下寻找，为了让 webpack 去加载自定义的 loader，我们需要修改 resolveLoader.modules

比如我们自定义的loader 放在 ./myLoaders 目录下，则需要如下配置：

```js
module.exports = {
    resolveLoader: {
    // 去哪些目录下寻找 loader ，有先后顺序之分
    // 如下配置中，查找顺序是：先在 node_modules 目录下寻找，若找不到，再到 ./myLoaders 目录下寻找
    modules: ["node_modules", "./myLoaders"],
  },
  module: {
        rules: [
            {
                test: /\.js$/,
                use: 'replace-loader',
            }
        ]
    }
}
```

# loader传入/接收参数

## 传入参数

我们上述代码的功能是将“小张”替换成“小李”，假如我们希望将“小张”替换成“小王”，换成“小周”，那么我们难道每次都在loader中修改吗？这肯定不会，因此，我们需要支持配置参数。loader支持通过options进行配置：

```js
{
  test: /\.js$/,
  use: [
    "replace-loader",
    {
      loader: "replace-loader",
      options: {
        name: "小李",
      },
    },
  ],
}
```

## 接收参数

1. this.query

webpack官方文档如何让编写一个loader中说明了loader只接收一个参数，这个参数是读取的文件内容（一个包含资源文件内容的字符串）。webpack会把所有的信息都放到上下文this中，我们可以通过`this.query`API来获取webpack.config.js中配置的options对象:

```js
module.exports = function (source) {
  // this.query 获取到的就是在webpack.config.js配置中配置的 options 对象
  // 通过 this.query API 获取在配置中配置的 name 
  return source.replace("小张", this.query.name);
};
```

2. loader-utils

虽然我们可以通过`this.query`来进行获取，但是webpack更加推荐使用`loader-utils`来进行操作，它提供了许多有用的工具，最常用的一种工具是**获取传递给loader的选项。**

- 安装

```js
npm i loader-utils -D
```

- 使用

```js
const { getOptions } = require('loader-utils')
module.exports = function(source)  {
    // const options = this.getOptions();
    let { name } = getOptions(this);
    const content = source.replace("小张",name);
    return content;
}
```



# loader返回值

> loader 的原理就是将输入的源内容进行处理后返回，loader的返回值涉及到一个还是多个返回值。有些情况下比如我们需要返回sourceMap，那么就需要多个返回值。 如果需要返回一个返回值，可以直接使用return。

## return source

> 如果只有一个返回值，可以使用return返回，这种方式返回的是源内容转换后的内容

```js
const { getOptions } = require('loader-utils')
module.exports = function (source) {
    // 处理source
    let { name } = getOptions(this)
    const content = source.replace("小张", name)
    return content // 返回一个值
}
```

## this.callback()

> 如果有多个值需要返回，需要使用loader本身提供的回调函数callback。这种方式可以返回除了处理内容之外的其他信息。

```js
const { getOptions } = require('loader-utils')
const { SourceMap } = require('module')

module.exports = function (source) {
  // 处理 source
  let { name } = getOptions(this)
  const content = source.replace("小张", name);
  // 使用 this.callback 返回内容
  this.callback(null, content，SourceMap);
};

```

***callback支持的参数如下：***

```js
callback({
    // 报错
    error: Error | Null,
    // 转换后的内容
    content: String | Buffer,
    // 转换后的内容得出的sourceMap
    sourceMap?: SourceMap,
    // ast
    abstractSyntaxTree?: AST 
})
```

`注意`:

> 在Webpack中，每个loader都可以返回一个包含多个属性的对象。
>
> - content是该对象的一个属性，用于指定经过loader处理后生成的代码。
> - sourceMap是另一个属性，用于指定生成的代码的源映射表。
>
> 因此，content和sourceMap的区别在于，content是经过loader处理后生成的代码本身，而sourceMap则是一个包含了生成的代码和原始代码的映射关系的JSON对象。



事实上，如果只有一个返回值，我们也可以直接使用this.callback。

```js
this.callback(null,content)
```

# 同步/异步loader

> loader有同步异步之分，上面介绍的loader都是同步loader，因为它们的转换流程都是同步的，即转换完成后再返回结果。但在某些场景下转换内容需要异步才能完成，例如需要通过网络请求才能得到结果，如果使用同步的方式，网络请求就会阻塞整个构建过程，导致构建变得十分缓慢。

## 使用async和await进行处理

```js
module.exports = async function(source)  {
    let {name,age} = getOptions(this);
    // 这里其实不是异步的，只是作为示例，可以这样处理
    const content =  await source.replace("小张",name);
    return content;
}
```



## 使用loader提供的this.async进行处理

当转换内容需要异步才能完成时，我们可以使用webpack为loader提供的`this.async`将这个loader变成是一个异步loader：

```js
const { getOptions } = require('loader-utils')
const { SourceMap } = require('module')

module.exports = function (source) {
  let { name } = getOptions(this);
  // 使用 setTimeout 模拟异步过程
  setTimeout(() => {
    const content = source.replace("小张", name);
    // 通过 callback 返回执行异步后的结果
    this.async(null, content，SourceMap);
  }, 3000);
};
```

# loader单一功能原则

在webpack官网的如何编写一个loader中提到，webpack的loader编写最寻单一功能原则，也就是loader只能实现一个功能。比如less-loader用来处理less文件，css-loader用来处理css文件，style-loader用来将样式插入到style标签中，这些功能虽然可以放到一个loader中实现，但是为了确保loader的功能纯粹，能够让不同的loader各司其职，同时进行功能组合，最好每个loader只负责一个功能。

# loader实战

## style-loader

> style-loader做的事情其实很简单，就是把序列化后的css内容放到style标签中，然后将style标签插入到HTML页面的head标签中

```js
module.exports = function(source) {
    return `const styleTag = document.createElement('style');
        styleTag.innerHTML = ${source};
        document.head.appendChild(styleTag);
    `
}
```

## css-loader

> css-loader 做的事情也十分的简单，将 less-loader 转换后的 css 内容进行序列化

```js
module.exports = function(source) {
    return JSON.stringify(source);
}
```



## less-loader

> less-loader 做的事情就是使用 less 模块，将 less 转换成 css

```js
// 使用 less 模块处理 less 语法
const less = require('less');

module.exports = function(source) {
    less.render(source, (error, output) => {
    let { css } = output;
    this.callback(error, css)
  })
}
```

