import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Login } from './component/Login';




function App() {
  return (
    <div className="App">

      <Router>
        
        <Routes>
            <Route path='/Login' element = {<Login/>}></Route>
        </Routes>
        
  
      </Router>
      
    </div>
    );
  }

export default App;
