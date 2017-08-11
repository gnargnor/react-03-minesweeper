/** renders app to DOM */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/game';
import configureStore from './store/configureStore';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const container = document.getElementById('react-app');
const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);