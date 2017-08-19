/** renders app to DOM */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/game';
import configureStore from './store/configureStore';
import * as types from './actions/actionTypes';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const container = document.getElementById('react-app');
const store = configureStore();


const render = () => {
  ReactDOM.render(
    <Provider store={store} >
      <App time={store.getState().time} isOn={store.getState().gameInProgress} interval={store.getState().interval}/>
    </Provider>,
    container
  );
};



// let interval = null; 
// store.subscribe(() => {
//   if (store.getState().gameInProgress && interval === null){
//     interval = setInterval(() => {
//       store.dispatch({
//         type: 'TICK',
//         time: Date.now()
//       });
//     });
//   }
//   if (!store.getState().gameInProgress && interval !==null) {
//       clearInterval(interval);
//       interval = null;
//   }
// });

render();
