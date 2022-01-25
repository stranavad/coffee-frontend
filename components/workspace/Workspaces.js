//nextjs, react
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import axios from "axios";
//components
import WorkspaceCard from "./WorkspaceCard";
//mui
import { Grid, Typography } from "@mui/material";

const Workspaces = ({ workspaces }) => {
	const { data: session } = useSession();
	const router = useRouter();
	const leaveWorkspace = (workspaceId) => {
		axios
			.delete("http://localhost:3001/user/workspace", {
				params: {
					userId: session.id,
					workspaceId
				}
			})
			.then((res) => {
				if (res.data.message === "removed") {
					router.reload();
				} else {
					console.log("there was some problem");
				}
			});
		console.log("leave workspace" + workspaceId);
	};

	return (
		<>
			<Typography variant="h4">Your workspaces</Typography>
			<Grid container spacing={4} sx={{ paddingTop: 3 }}>
				{workspaces.map((workspace) => (
					<Grid item key={workspace.id}>
						<WorkspaceCard
							workspace={workspace}
							leaveWorkspace={leaveWorkspace}
						/>
					</Grid>
				))}
			</Grid>
		</>
	);
};


export default Workspaces;