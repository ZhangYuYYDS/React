import React, { Component } from 'react';

export class MainProductList extends Component {
    // 可以省略不写，内部自己定义了props
    // constructor(props) {
    //     super(props);
    //     console.log(props);
    // }
    render() {
        const { productList } = this.props;
        return (
            <div>
                <h1>MainProductList</h1>
                <ul>
                    {productList.map((item) => {
                        return <li key={item}>{item}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default MainProductList;
