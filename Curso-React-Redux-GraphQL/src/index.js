import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import 'font-awesome/css/font-awesome.css'
import { Provider } from 'react-redux'
import generateStore from './redux/store'

// generateStore
let store = generateStore()

let WithRouter = () => <BrowserRouter><App /></BrowserRouter>
let WithStore = () =><Provider store={store}><WithRouter /></Provider>

ReactDOM.render(<WithStore />, document.getElementById('root'));

serviceWorker.unregister();
