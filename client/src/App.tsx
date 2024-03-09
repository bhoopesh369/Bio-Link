import React from "react";
import Router from "./routes";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackUI } from "./components";

const App = () => {
	return (
		<ErrorBoundary
			FallbackComponent={FallbackUI}
			onError={(error: Error) => {
				console.error(error);
			}}
		>
			<Provider store={store}>
				<MantineProvider>
					<Router />
				</MantineProvider>
			</Provider>
		</ErrorBoundary>
	);
};

export default App;
