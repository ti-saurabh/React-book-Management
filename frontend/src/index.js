import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import App from './App';
import {Auth} from './Context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth>
    <App />
    </Auth>
    
  </React.StrictMode>
);

