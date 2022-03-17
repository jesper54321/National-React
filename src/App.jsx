import React from "react";
import "./App.scss";
import Routes from "./Wrappers/Routing";
import PageControl from "./Wrappers/PageControl";
import AuthProvider from "./Wrappers/AuthProvider";

export const LoginContext = React.createContext({
	Login: "",
	setLogin: () => {},
});

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

export default App;
