import React, { PureComponent, createRef, forwardRef } from 'react';

// function Home() {
//     return <h1>hello world</h1>;
// }

// frowardRef高阶函数
const Home = forwardRef(function (props, ref) {
    return <h1 ref={ref}>hello world</h1>;
});

export class App extends PureComponent {
    constructor(props) {
        super(props);
        this.HomeRef = createRef();
    }

    getComponent = () => {
        // 此时拿到的就是Home组件中的某个元素
        console.log(this.HomeRef.current);
    };

    render() {
        return (
            <div>
                {/* 这个ref被传入到函数式组件的第二个参数里 */}
                <Home ref={this.HomeRef} />
                <button
                    onClick={(e) => {
                        this.getComponent();
                    }}
                >
                    获取组件实例
                </button>
            </div>
        );
    }
}

export default App;
