import React, { useContext, useState } from "react";
import "./App.scss";
import Routes from "./Wrappers/Routing";
import PageControl from "./Wrappers/PageControl";
import AuthProvider from "./Wrappers/AuthProvider";
import { LoginContext } from "./Wrappers/AuthProvider";

function App() {
	const [Login, setLogin] = useState("");
	const value = { Login, setLogin };

	return (
		<LoginContext.Provider value={value}>
			<AuthProvider>
				<PageControl>
					<Routes />
				</PageControl>
			</AuthProvider>
		</LoginContext.Provider>
	);
}
// import React from 'react';
// import './App.css';
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import { Login } from './Components/Login/Login';




// function App() {
//   return (
//     <div className="App">

//       <Router>
        
//         <Routes>
//             <Route path='/Login' element = {<Login/>}></Route>
//         </Routes>
        
  
//       </Router>
      
//     </div>
//     );
//   }

export default App;
