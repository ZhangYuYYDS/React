import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MainBanner extends Component {
    render() {
        const { banners, title } = this.props;
        return (
            <div>
                <h2> MainBanner:{title}</h2>
                <ul>
                    {banners.map((item) => {
                        return <li key={item}>{item}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

MainBanner.propTypes = {
    banners: PropTypes.array,
    title: PropTypes.string,
};

// 默认值
MainBanner.defaultProps = {
    banners: ['1', '2', '3'],
    title: 'MainBanner',
};

export default MainBanner;
