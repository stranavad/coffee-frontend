import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from 'next/link';
import axios from "axios";
//components
import Workspaces from '../components/workspace/Workspaces';

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
					params: { user_id: 1235 },
				})
				.then((res) => {
					setWorkspaces(res.data.workspaces);
				});
		}
	}, [status]);

	if (workspaces.length > 0) {
		return (
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<Workspaces workspaces={workspaces}/>
			</Box>
		);
	}
	return (
    <Box sx={{ display: "flex" }}>
      {status === "unauthenticated" ? (<button onClick={signIn}>singin</button>) : ("")}
			<CircularProgress />
		</Box>
	);
}
