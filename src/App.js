import React, { Component } from 'react';

import MyDiagram from './Components/MyDiagram';
import './App.css';
import NavBar from './OldComponents/NarbarFeatures'

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <MyDiagram />
            </div>
        );
    }
}

export default App;