import React, { Component } from 'react';
import AddCounter from './AddCounter';

class App extends Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
        };
    }

    changeCounter = (count) => {
        this.setState({
            counter: this.state.counter + count,
        });
    };
    render() {
        const { counter } = this.state;
        return (
            <div>
                <h2>当前计数:{counter}</h2>
                <AddCounter
                    addClick={(count) => {
                        this.changeCounter(count);
                    }}
                />
            </div>
        );
    }
}

export default App;
