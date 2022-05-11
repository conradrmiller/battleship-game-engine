import React, { useEffect } from 'react';
import './App.css';
import {
    shoot,
    startGame,
} from './battleship_game_engine/battleshipGameEngine';

const App = () => {
    useEffect(() => {}, []);
    return (
        <div className="App">
            {startGame().map((el, index) => {
                return el.map((el, index) => {
                    return <div>[{el}]</div>;
                });
            })}
        </div>
    );
};

export default App;
