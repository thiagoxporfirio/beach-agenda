import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserProvider } from "./context/UserContext";
import "./index.css";
import App from "./App.tsx";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<UserProvider>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</UserProvider>
	</React.StrictMode>
);
