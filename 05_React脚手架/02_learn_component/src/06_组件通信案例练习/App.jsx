import React, { Component } from 'react';
import './style.css';
import Tab from './Tab';

export class App extends Component {
    constructor() {
        super();
        this.state = {
            list: ['流行', '新款', '精选'],
            tabIndex: 0,
        };
    }
    setIndex(index) {
        this.setState({
            tabIndex: index,
        });
    }
    render() {
        const { list, tabIndex } = this.state;
        return (
            <div className="app">
                <Tab
                    list={list}
                    itemClickIndex={(index) => {
                        this.setIndex(index);
                    }}
                />
                <h1>{list[tabIndex]}</h1>
            </div>
        );
    }
}

export default App;
