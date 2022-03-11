import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Home}  from './component/Home';
import { Login } from './component/login';
import { PageLanding } from './component/Landing';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
    <Route path="/Home" element={<Home/>}></Route>
    <Route path='/login' element = {<Login/>}></Route>
    <Route path='/Landing' element = {<PageLanding/>}></Route>
        </Routes>
      </Router>
      
    </div>
    );
  }

export default App;
