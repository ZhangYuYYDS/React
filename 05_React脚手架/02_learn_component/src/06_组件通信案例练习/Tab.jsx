import React, { Component } from 'react';

export class Tab extends Component {
    constructor() {
        super();
        this.state = {
            currIndex: 0,
        };
    }
    itemClick(index) {
        this.props.itemClickIndex(index);
    }
    render() {
        const { list } = this.props;
        return (
            <div className="list">
                {list.map((item, index) => {
                    return (
                        <span
                            className="item"
                            key={index}
                            onClick={(e) => {
                                this.itemClick(index);
                            }}
                        >
                            {item}
                        </span>
                    );
                })}
            </div>
        );
    }
}

export default Tab;
