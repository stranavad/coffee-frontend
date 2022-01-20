import { SessionProvider } from "next-auth/react";
import { useState } from "react";
// import Menu from "../components/Menu";
// import ButtonBar from "../components/ButtonBar";
import { Stack, Box } from "@mui/material";

//components
import AlertContext from "../components/context/AlertContext";
import AlertBox from "../components/page/Alert";
import Menu from "../components/page/Menu";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const [showAlert, setShowAlert] = useState(true);
	const [alertText, setAlertText] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");

	const showAlertFunction = (text, severity) => {
		setShowAlert(true);
		setAlertText(text);
		setAlertSeverity(severity);
	}

	return (
		<SessionProvider session={session}>
			<AlertContext.Provider value={showAlertFunction}>
				<Box
					sx={{
						maxWidth: "100vw",
						overflowX: "hidden",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					{/* <Menu /> */}
					<Menu />
					<Stack
						alignItems="center"
						sx={{ width: "100%", maxWidth: "lg", paddingTop: 2 }}
					>
						{/* <ButtonBar /> */}
						<Component {...pageProps} />
					</Stack>
					{showAlert && (
						<AlertBox text={alertText} severity={alertSeverity} close={() => setShowAlert(false)}/>
					)}
				</Box>
			</AlertContext.Provider>
		</SessionProvider>
	);
}

export default MyApp;
