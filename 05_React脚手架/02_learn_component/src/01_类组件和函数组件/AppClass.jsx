import React from 'react';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            message: 'hello world',
        };
    }

    render() {
        // const { message } = this.state;
        // 1. react元素
        // return <h2>hello world</h2>;
        // 2. 数组
        // return ["abc","cba","bca"]
        // return[
        //     <div>1</div>,
        //     <h2>2</h2>,
        //     <p>3</p>
        // ]
        // 3. 字符串/数字
        // return 123
        return "hello world"
    }
}

export default App;