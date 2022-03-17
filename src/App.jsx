import React, { useContext } from "react";
import "./App.scss";
import Routes from "./Wrappers/Routing";
import PageControl from "./Wrappers/PageControl";
import AuthProvider from "./Wrappers/AuthProvider";
import { LoginContext } from "./Wrappers/AuthProvider";

function App() {
	const { Login, setLogin } = useContext(LoginContext);
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

export default App;
