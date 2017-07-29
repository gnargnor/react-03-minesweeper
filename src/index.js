/** renders app to DOM */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/game';
import configureStore from './store/configureStore';
import './styles/index.css';

const container = document.getElementById('container');
const store = configureStore();


ReactDOM.render(<Provider store={store}><App></App></Provider>, container);