import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from './Pages/Home';
import Collection from './Pages/Collection';
import Profile from './Pages/Profile';
import Find from './Pages/Find';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="collection" element={<Collection />} />
        <Route path="profile" element={<Profile />} />
        <Route path="find" element={<Find />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
