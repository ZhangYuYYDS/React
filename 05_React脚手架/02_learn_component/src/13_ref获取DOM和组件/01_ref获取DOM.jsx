import React, { PureComponent, createRef } from 'react';

export class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        // 创建一个函数
        this.titleRef = createRef();
        this.titleEl = null;
    }
    getDom = () => {
        // 1. 在react元素上绑定一个ref字符串
        console.log(this.refs.zy);

        // 2. 提前通过createRef创建好ref对象，将创建出来的对象绑定到元素上
        console.log(this.titleRef.current);

        // 3.传入一个回调函数，在对应的元素被渲染之后，回调函数会被调用，并且将元素传入
        console.log(this.titleEl);
    };
    render() {
        return (
            <div>
                <h2 ref="zy">hello</h2>
                <h2 ref={this.titleRef}>hi</h2>
                <h2
                    ref={(e) => {
                        // 默认情况下，ref回调函数接收的是虚拟DOM，所以e就是当前DOM
                        // console.log(e)
                        this.titleEl = e;
                    }}
                >
                    你好
                </h2>
                <button
                    onClick={(e) => {
                        this.getDom();
                    }}
                >
                    获取DOM
                </button>
            </div>
        );
    }
}

export default App;
