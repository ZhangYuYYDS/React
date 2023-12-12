import React, { Component } from 'react';

export class App extends Component {
    constructor() {
        // @ts-ignore
        super();
        this.state = {
            message: 'hello world',
            counter: 0,
        };
    }
    changeMsg() {
        // this.setState({ message: 'hello React' });
        // setSatet的更多用法：
        // 1. setState可以传入一个回调函数
        // this.setState((state, props) => {
        //     // 好处：
        //     // -  可以在回调函数中编写新的state的逻辑
        //     // -  当前的回调函数会将之前的state和props值传递进来
        //     console.log(this.state.message, this.props);
        //     return {
        //         message: 'hello React',
        //     };
        // });

        // 2. setState是一个异步回调
        // 如果希望在数据更新之后（数据合并），获取到对应的结果执行一些逻辑代码，可以在setState中传入第==二个参数：callback==
        this.setState({ message: 'hello React' }, () => {
            console.log('111', this.state.message); //结果：111 hello React
        });
        console.log(this.state.message); //结果：hello world
    }

    changeCon() {
        this.setState({ counter: this.state.counter + 1 });
    }
    render() {
        const { message, counter } = this.state;
        return (
            <div>
                <h2>message:{message}</h2>
                <button
                    onClick={(e) => {
                        this.changeMsg();
                    }}
                >
                    修改文本
                </button>
                <h2>当前计数：{counter}</h2>
                <button
                    onClick={(e) => {
                        this.changeCon();
                    }}
                >
                    counter+1
                </button>
            </div>
        );
    }
}

export default App;
