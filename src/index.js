import React from 'react';
import ReactDOM from 'react-dom';
import store from "./modules/store";
import { addArticle } from "./modules/application/index";

import App from './components/App';
import './index.scss';

ReactDOM.render(<App />, document.getElementById('app'));
