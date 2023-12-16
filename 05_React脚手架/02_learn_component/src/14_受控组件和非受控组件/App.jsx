import React, { PureComponent } from 'react';

export class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            usename: 'zy',
        };
    }
    changeInput = (e) => {
        // e中包含每次输入的东西，以及输入框的value值
        // console.log(e.target.value);
        this.setState({ usename: e.target.value });
    };
    render() {
        const { usename } = this.state;
        return (
            <div>
                {/* 想要向输入框中输入一些东西，并且能够获取到输入框中的东西 */}
                {/* 现在这个input组件叫做非受控组件，因为并没有受React来管理 */}
                <input
                    type="text"
                    onChange={(e) => {
                        this.changeInput(e);
                    }}
                />
                {/* 受控组件：绑定value */}
                {/* 当没有给这个input绑定嫦娥事件时，输入是失效的，无法输入 */}
                <input
                    type="text"
                    value={usename}
                    onChange={(e) => {
                        this.changeInput(e);
                    }}
                />
                <h2>usename:{usename}</h2>
            </div>
        );
    }
}

export default App;
