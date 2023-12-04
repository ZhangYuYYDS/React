import React, { Component } from 'react';
import NavBar from './nav-bar/NavBar';
import NavBar2 from './nav-bar2/index';

export class App extends Component {
    render() {
        return (
            <div>
                <h1>-----App----</h1>
                {/* 方式一： */}
                {/* 这些其实被传到的是在NAVBar实例->this */}
                {/* this.props.children */}
                {/* 传多个时，是个数组；传一个时，就呢一个 */}
                <NavBar>
                    <button>按钮</button>
                    <h2>标题</h2>
                    <i>斜体文字</i>
                </NavBar>

                {/* 方式二： */}
                <NavBar2 left={<button>按钮</button>} center={<h2>标题</h2>} right={<i>斜体文字</i>} />
            </div>
        );
    }
}

export default App;
