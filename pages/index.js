//nextjs, react stuff
import { useSession } from "next-auth/react";
import Link from "next/link";
//components

// material ui
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Home() {
	const {status } = useSession();

	// user is logged in
	if (status === "authenticated") {
		return (
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<Box>
					<Typography>Check out your <Link href="/workspaces">Workspaces</Link></Typography>
				</Box>
			</Box>
		);
	}

	// the user state is yet to be determined
	if (status === "loading") {
		return (
			<Box sx={{ display: "flex" }}>
				<CircularProgress />
			</Box>
		);	
	}

	// users isn't logged in
	if (status === "unauthenticated") {
		return (
			<Box sx={{ display: 'flex' }}>
				<Typography>You need to first login to use this app</Typography>
			</Box>
		)
	}
	// some weird case
	return (
		<Box sx={{ display: 'flex' }}>
			<Typography>There was some error that needs to be reported</Typography>
		</Box>
	)

}
