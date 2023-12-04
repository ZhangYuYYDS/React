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
        const { list, itemType } = this.props;
        return (
            <div className="list">
                {list.map((item, index) => {
                    return (
                        <div
                            className="item"
                            key={index}
                            onClick={(e) => {
                                this.itemClick(index);
                            }}
                        >
                            {/* <span className="text">{item}</span> */}
                            {itemType(item)}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Tab;
