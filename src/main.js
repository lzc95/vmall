import React,{Component} from 'react';
import { render } from 'react-dom';
import Routes from './routers/index';
import axios from 'axios';
axios.defaults.withCredentials=true;  


render((
    <Routes/>
), document.getElementById('root'))
