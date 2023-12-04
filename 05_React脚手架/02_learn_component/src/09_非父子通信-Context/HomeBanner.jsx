// import React, { Component } from 'react';
import ThemeContext from './context/theme-context';
function HomeBanner() {
    return (
        <div>
            <span>HomeBanner</span>
            {/* 函数式组件使用Context共享的数据 */}
            <ThemeContext.Consumer>
                {(value) => {
                    // console.log('111', value);
                    return <h2>{value.color}</h2>;
                }}
            </ThemeContext.Consumer>
        </div>
    );
}

export default HomeBanner;
