import React, { Component } from 'react';

import MyDiagram from './Components/MyDiagram';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">

                    <h1 className="App-title">Family Tree Example</h1>
                </header>
                <MyDiagram />
            </div>
        );
    }
}

export default App;