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


const render = (Component) => {
  ReactDOM.render(
    <Provider store={store} >
      <Component time={store.getState().time} isOn={store.getState().gameInProgress} interval={store.getState().interval}/>
    </Provider>,
    container
  );
};

render(App);
