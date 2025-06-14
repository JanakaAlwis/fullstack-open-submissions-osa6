import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';  // make sure extension is .jsx

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counterReducer from './reducer.js';

const store = createStore(counterReducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
