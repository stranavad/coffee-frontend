//nextjs, react stuff
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

//components
import AddCreateButton from "../components/workspace/AddCreateButton";

// material ui
import { Box, Typography, Button } from "@mui/material";

export default function Home() {
	const { status } = useSession();

	// // user is logged in
	// if (status === "authenticated") {
	// 	return (
	// 		<Box sx={{ display: "flex", flexDirection: "column" }}>
	// 			<Box>
	// 				<Typography>Check out your <Link href="/workspaces">Workspaces</Link></Typography>
	// 				<AddCreateButton/>
	// 			</Box>
	// 		</Box>
	// 	);
	// }
	// // users isn't logged in
	// if (status === "unauthenticated") {
	// 	return (
	// 		<Box sx={{ display: 'flex' }}>
	// 			<Typography>You need to first login to use this app</Typography>
	// 		</Box>
	// 	)
	// }
	// some weird case
	return (
		<Box sx={{ display: "flex", flexDirection: 'column' }}>
			<Typography variant="h4" sx={{marginBottom: 2}}>
				Welcome to Coffee
			</Typography>
			{status === "unauthenticated" && (
				<>
					<Typography>You have to first</Typography>
					<Button onClick={signIn}>Sign in</Button>
				</>
			)}
			{status === "authenticated" && (
				<>
					<Typography variant="h6"><Link href="/workspaces">Check out your workspaces</Link></Typography>
					<AddCreateButton />
				</>
			)}
		</Box>
	);
}
