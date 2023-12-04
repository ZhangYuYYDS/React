import React, { Component } from 'react';
import ThemeContext from './context/theme-context';

export class HomeInfo extends Component {
    render() {
        // 第四步：通过this.context访问上下文对象，并使用数据
        console.log(this.context);
        return <div>HomeInfo:{this.context.color}</div>;
    }
}

// 第三步：设置组件的contextType属性，值为上下文对象
HomeInfo.contextType = ThemeContext;
export default HomeInfo;
