import React, { Component } from 'react';

export class NavBar2 extends Component {
    render() {
        const { left, right, center } = this.props;

        return (
            <div className="nav-bar">
                <div className="left">{left}</div>
                <div className="center">{center}</div>
                <div className="right">{right}</div>
            </div>
        );
    }
}

export default NavBar2;
