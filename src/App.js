import React, { Component } from 'react';

import MyDiagram from './Components/MyDiagram';
import './App.css';
import NavBar from './OldComponents/NarbarFeatures'
import Menu from './OldComponents/Menu'
import Carousel from "./OldComponents/Carousel";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Menu/>

                <MyDiagram />
            </div>
        );
    }
}

export default App;