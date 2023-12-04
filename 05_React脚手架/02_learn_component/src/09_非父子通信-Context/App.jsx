import React, { Component } from 'react';
import Home from './Home';

// 现在想做的事情：
// App中的数据，HomeInfo中可以共享

// 1. 创建Context对象
import ThemeContext from './context/theme-context.js';
import HomeBanner from './HomeBanner.jsx';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: { name: 'kobe', age: 23 },
        };
    }
    render() {
        const { info } = this.state;
        return (
            <div>
                <h2>App</h2>
                {/* 第二步：通过ThemeContext中value属性为后代提供数据 */}
                <ThemeContext.Provider value={{ color: 'red', size: '30' }}>
                    <Home {...info} />
                </ThemeContext.Provider>
                <HomeBanner />
            </div>
        );
    }
}

export default App;
