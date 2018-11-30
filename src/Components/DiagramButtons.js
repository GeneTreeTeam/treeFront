import React from 'react';
import './DiagramButtons.css';

const DiagramButton = ({ onInit, onUpdateColor, onAddNode, onHandleChange, onHandleSubmit, onUpdateText }) => {
    return (
        <div>
            <div className="centered-container">

                <h3>Tree</h3>
                <form onSubmit={onHandleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="LastName"
                            onChange={onHandleChange}
                        ></input>
                    </div>
                    <div>
                        <label>FirstName:</label>
                        <input
                            type="text"
                            name="FirstName"
                            onChange={onHandleChange}
                        ></input>
                    </div>
                    <div className="inline-element">
                        <button type="button" onClick={onInit}>
                            Family Tree
                        </button>
                    </div>
                    <div className="inline-element" onClick={onAddNode}>
                        <button type="submit">Add parent(s)</button>
                    </div>


                </form>

            </div>
            <div className="centered-container">
                <div className="inline-element">
                    <button type="button" onClick={onInit}>
                        Init diagram
                    </button>
                </div>
                <div className="inline-element">
                    <button type="button" onClick={onUpdateColor}>
                        Update node color
                    </button>
                </div>
                <div className="inline-element">
                    <button type="button" onClick={onUpdateText}>
                        Update text
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DiagramButton;