import React, { Component } from 'react';

export class Count extends Component {
    shouldComponentUpdate(nextProps, newState) {
        return false;
    }
    render() {
        console.log('count render');
        return <div>Count</div>;
    }
}

export default Count;
