import React, { Component } from 'react';
import Home from './Home';
import eventBus from './utils/event-bus';

// 现在想做的事情：
// 在HomeBanner中发送的事件，可以在App中监听到
// 方案一：一层层传递
// 方案二：使用EventBus
export class App extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            age: 0,
        };
    }
    componentDidMount() {
        // 监听到HomeBanner中的按钮的点击事件，并执行回调函数
        // 既然有监听事件，最好在组件销毁时，可以移除掉监听事件
        eventBus.on('bannerPre', this.bannerClick);
    }
    bannerClick = (name, age) => {
        this.setState({ name, age });
    };

    componentWillUnmount() {
        // 移除监听事件
        eventBus.off('bannerPre', this.bannerClick);
    }
    render() {
        const { name, age } = this.state;
        return (
            <div>
                <h2>
                    App-{name}-{age}
                </h2>
                <Home></Home>
            </div>
        );
    }
}

export default App;
