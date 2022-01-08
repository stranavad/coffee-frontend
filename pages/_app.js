import { SessionProvider } from "next-auth/react";
import Menu from "../components/Menu";
import ButtonBar from "../components/ButtonBar";
import { Stack, Box } from "@mui/material";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<Box
				sx={{
					maxWidth: "100vw",
					overflowX: "hidden",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Menu />
				<Stack
					alignItems="center"
					sx={{ width: "100%", maxWidth: "lg", paddingTop: 2 }}
				>
					<ButtonBar />
					<Component {...papgeProps} />
				</Stack>
			</Box>
		</SessionProvider>
	);
}

export default MyApp;
