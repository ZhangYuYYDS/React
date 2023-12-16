import React, { Component } from 'react';

export class Home extends Component {
    shouldComponentUpdate(nextProps, newState) {
        return false;
    }
    render() {
        console.log('home render');
        return <div>Home</div>;
    }
}

export default Home;
