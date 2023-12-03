import react from 'react';

class HelloWorld extends react.Component {
    // 1. 执行constructor函数
    constructor() {
        console.log('hello world constructor');
        super();
        this.state = {
            message: 'Hello World',
        };
    }

    changeText() {
        this.setState({
            message: 'Hello React',
        });
    }

    // 2. 执行render函数
    render() {
        const { message } = this.state;
        console.log('hello world render');
        return (
            <div>
                <div>---{message}---</div>
                <button
                    onClick={(e) => {
                        this.changeText();
                    }}
                >
                    修改文本
                </button>
            </div>
        );
    }

    // 3. 组件被渲染成DOM，被挂载到真实DOM上
    componentDidMount() {
        console.log('hello world componentDidMount');
    }

    // 4.组件的DOM被更新完成：DOM发生更新
    componentDidUpdate() {
        console.log('hello world componentDidUpdate');
    }

    // 5.组件被销毁
    componentWillUnmount() {
        console.log('hello world componentWillUnmount');
    }
}
export default HelloWorld;
