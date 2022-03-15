import React from "react";
import "./App.scss";
import Routes from "./Wrappers/Routing";
import PageControl from "./Wrappers/PageControl";
import AuthProvider from "./Wrappers/AuthProvider";

function App() {
	return (
		<AuthProvider>
			<PageControl>
				<Routes />
			</PageControl>
		</AuthProvider>
	);
}

export default App;
