import React, { Component, PureComponent } from 'react';
import Home from './Home';
import Count from './Count';

export class App extends PureComponent {
    // export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'hello world',
        };
    }
    // shouldComponentUpdate(nextProps, newState) {
    //     // 如果直接returnfalse，则不会执行render方法，也不会执行子组件的render方法
    //     // 所以需要检测一下state中数据是否发生变化，如果变化了，则执行render方法
    //     if (this.state.message !== newState.message) {
    //         return true;
    //     }
    //     return false;
    // }
    changeMeg = () => {
        this.setState({ message: 'hello React' });
    };
    render() {
        const { message } = this.state;
        console.log('App render');
        return (
            <div>
                <div>app-{message}</div>
                <button
                    onClick={(e) => {
                        this.changeMeg();
                    }}
                >
                    修改message的值
                </button>
                <Home></Home>
                <Count></Count>
            </div>
        );
    }
}

export default App;
