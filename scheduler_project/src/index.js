import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './pages/content/login';
import SignUp from './pages/content/signup';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' exact element={<Login></Login>}></Route>
        <Route path='/login' exact element={<Navigate to="/"></Navigate>}></Route>
        <Route path='/signup' exact element={<SignUp></SignUp>}></Route>
        <Route path="/forgot_password" exact element={<div>Forgot Password</div>}></Route>
        <Route path="/homepage/*" exact element={<App></App>}>
        </Route>
        <Route path="/*" exact element={<div>404 Not Found</div>}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
