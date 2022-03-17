import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Login } from './component/Login';
import "./App.scss";
//import Routes from "./Wrappers/Routing";
//import PageControl from "./Wrappers/PageControl";
//import AuthProvider from "./Wrappers/AuthProvider";




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


// function App() {
// 	return (
// 		<AuthProvider>
// 			<PageControl>
// 				<Routes />
// 			</PageControl>
// 		</AuthProvider>
// 	);
// }

export default App;
