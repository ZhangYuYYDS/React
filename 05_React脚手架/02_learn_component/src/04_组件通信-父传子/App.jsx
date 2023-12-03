import React, { Component } from 'react';
import Footer from './c-cpns/Footer';
import Header from './c-cpns/Header';
import Main from './c-cpns/Main';

class App extends Component {
    render() {
        return (
            <div>
                <Footer />
                <Header />
                <Main />
            </div>
        );
    }
}

export default App;
