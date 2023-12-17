// @ts-nocheck
import React, { PureComponent } from 'react';

export class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAgree: false,
            hobbies: [
                { value: 'sing', text: '唱', ischecked: false },
                { value: 'dance', text: '跳', ischecked: false },
                { value: 'rap', text: 'rap', ischecked: false },
            ],
            fruit: ['watermelon'],
        };
    }
    changeInput = (e) => {
        // 将多个表单放到一个事件中处理
        const keyName = e.target.id;
        this.setState({ [keyName]: e.target.value });
    };
    changeAgree = (e) => {
        this.setState({ isAgree: e.target.checked });
    };
    changeChecked = (e, index) => {
        // 对原来的数组进行拷贝
        const hobbies = [...this.state.hobbies];
        // 修改数据
        hobbies[index].ischecked = e.target.checked;
        // 更新数据
        this.setState({ hobbies: hobbies });
    };
    changeFruit = (e) => {
        const options = Array.from(e.target.selectedOptions);
        const value = options.map((item) => item.value);
        this.setState({ fruit: value });
    };
    handleSubmitClick = (e) => {
        // 阻止默认事件
        e.preventDefault();
        console.log('获取所有输入的内容');
        console.log(this.state.username, this.state.password);
        const hobbies = this.state.hobbies.filter((item) => item.ischecked).map((item) => item.value);
        console.log('获取爱好', hobbies);
    };
    render() {
        const { username, password, isAgree, hobbies, fruit } = this.state;
        return (
            <div>
                <form
                    onSubmit={(e) => {
                        this.handleSubmitClick(e);
                    }}
                >
                    {/*1. input */}
                    <div>
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
                    </div>

                    {/* 2. checkbox */}
                    <label htmlFor="agree">
                        {/* checkbox不是绑定value而是checked */}
                        <input
                            id="agree"
                            type="checkbox"
                            checked={isAgree}
                            onChange={(e) => {
                                this.changeAgree(e);
                            }}
                        />
                        同意协议
                    </label>

                    {/* 3. checkbox多选 */}
                    <div>
                        您的爱好：
                        {hobbies.map((item, index) => {
                            return (
                                <label htmlFor={item.value} key={index}>
                                    <input
                                        type="checkbox"
                                        id={item.value}
                                        checked={item.ischecked}
                                        onChange={(e) => {
                                            this.changeChecked(e, index);
                                        }}
                                    />
                                    {item.text}
                                </label>
                            );
                        })}
                    </div>

                    {/* 4. select元素:单选和多选两种情况 */}
                    <select
                        value={fruit}
                        onChange={(e) => {
                            this.changeFruit(e);
                        }}
                        multiple
                    >
                        <option value="apple">苹果</option>
                        <option value="watermelon">西瓜</option>
                        <option value="organge">桔子</option>
                    </select>

                    <button type="submit">注册</button>
                </form>
            </div>
        );
    }
}

export default App;
