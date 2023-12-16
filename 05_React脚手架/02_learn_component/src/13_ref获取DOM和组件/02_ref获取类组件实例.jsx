import React, { PureComponent, createRef } from 'react';

export class Home extends PureComponent {
    test() {
        console.log('-------Home组件test方法-------');
    }
    render() {
        return <div>Home组件</div>;
    }
}

export class App extends PureComponent {
    constructor(props) {
        super(props);
        this.HomeRef = createRef();
    }

    getComponent = () => {
        console.log(this.HomeRef.current);
        this.HomeRef.current.test();
    };

    render() {
        return (
            <div>
                <Home ref={this.HomeRef}></Home>
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
