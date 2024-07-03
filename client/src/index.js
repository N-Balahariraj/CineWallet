// React Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';

// Styles
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

