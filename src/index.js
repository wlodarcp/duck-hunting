import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import {createStore} from "redux";
import App from './App';
import {duckHuntReducer} from "./reducers";

export const store = createStore(duckHuntReducer);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));


