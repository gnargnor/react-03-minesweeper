/** renders app to DOM */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/minesweeper';
import './styles/index.css';

const container = document.getElementById('container');


ReactDOM.render(<App></App>, container);