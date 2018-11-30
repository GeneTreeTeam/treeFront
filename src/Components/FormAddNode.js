import React from 'react';


const FormAddNode = ({ onInit, onUpdateColor, onAddNode, onHandleChange, onHandleSubmit }) => {
     return (
            <div className="centered-container">
                <h3>From</h3>
                <form onSubmit={onHandleSubmit}>
                    <div>
                        <lable>Username:</lable>
                        <input
                            type="text"
                            name="LastName"
                            onChange={onHandleChange}
                        ></input>
                    </div>
                    <div>
                        <lable>FirstName:</lable>
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
        );

}

export default FormAddNode;