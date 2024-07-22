// React Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Styles
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import "mdbreact/dist/css/mdb.css";

// Components
import App from './App';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children : [
      {
        path : '',
        element : <Main/>
      },
      {
        path : '/login',
        element : <Login/>
      },
      {
        path : '/register',
        element : <Register/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

