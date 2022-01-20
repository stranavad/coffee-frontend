import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
//components
import Workspaces from "../components/workspace/Workspaces";

// material ui
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Home() {
	const { data: session, status } = useSession();
	const [workspaces, setWorkspaces] = useState([]);
	//useEffect(() => console.log(status), [status])
	useEffect(() => {
		console.log(status);
		if (status === "authenticated") {
			axios
				.get(`http://localhost:3001/user/workspace`, {
					params: { user_id: session.id },
				})
				.then((res) => {
					setWorkspaces(res.data.workspaces);
				});
		}
	}, [status]);

	// user is logged in
	if (status === "authenticated") {
		if (workspaces.length > 0) {
			return (
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<Workspaces workspaces={workspaces} />
					<Box>
						<Link href="/add">
							<Typography variant="h5" component="div">
								Add workspace
							</Typography>
						</Link>
					</Box>
				</Box>
			);
		} else {
			return (
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<Typography>First, you need to add or create a workspace</Typography>
					<Link href="/add">Add workspace</Link>
					<Link href="/create">Create Workspace</Link>
				</Box>
			);
		}
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
