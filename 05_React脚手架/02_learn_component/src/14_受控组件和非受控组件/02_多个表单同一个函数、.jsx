import React, { PureComponent } from 'react';

export class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }
    changeInput = (e) => {
        // 将多个表单放到一个事件中处理
        const keyName = e.target.id;
        this.setState({ [keyName]: e.target.value });
    };
    handleSubmitClick = (e) => {
        // 阻止默认事件
        e.preventDefault();
        console.log('获取所有输入的内容');
        console.log(this.state.username, this.state.password);
    };
    render() {
        const { username, password } = this.state;
        return (
            <div>
                <form
                    onSubmit={(e) => {
                        this.handleSubmitClick(e);
                    }}
                >
                    <label htmlFor="username">
                        <input
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => {
                                this.changeInput(e);
                            }}
                        />
                    </label>

                    <label htmlFor="password">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                this.changeInput(e);
                            }}
                        />
                    </label>

                    <button type="submit">注册</button>
                </form>
            </div>
        );
    }
}

export default App;
