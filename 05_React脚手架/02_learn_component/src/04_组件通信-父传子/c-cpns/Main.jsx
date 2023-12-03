import React, { Component } from 'react';
import MainBanner from './MainBanner';
import MainProductList from './MainProductList';

// 想做的事情：
// 1. 将banners的数据传递给MainBanner组件
// 2. 将productList的数据传递给MainProductList组件
export class Main extends Component {
    constructor() {
        super();
        this.state = {
            banners: ['新歌曲', '新电影', '新综艺'],
            productList: ['推荐商品', '热卖商品', '热评商品'],
        };
    }
    render() {
        const { banners, productList } = this.state;
        return (
            <div>
                Main
                <MainBanner banners={banners} title="轮播图" />
                <MainProductList productList={productList} />
            </div>
        );
    }
}

export default Main;
