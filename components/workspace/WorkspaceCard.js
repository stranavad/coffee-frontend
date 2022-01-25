//nextjs, react
import Link from "next/link";

//components

//mui
import {
	Typography,
	Card,
	Button,
	CardActions,
	CardContent,
} from "@mui/material";

const WorkspaceCard = ({ workspace, leaveWorkspace }) => {
	console.log(workspace);
	return (
		<Card sx={{ width: 250 }}>
			<CardContent>
				<Typography>{workspace.name}</Typography>
				<Typography>workspace users BACKLOG</Typography>
			</CardContent>
			<CardActions sx={{ display: "flex", flexDirection: "column" }}>
				<Button>
					<Link href={`/workspaces/${workspace.id}`}>
						Go to workspace
					</Link>
				</Button>
				<Button onClick={() => leaveWorkspace(workspace.id)} sx={{ color: "red" }}>Leave workspace</Button>
			</CardActions>
			<Typography>Creator: {workspace.creatorName}</Typography>
		</Card>
	);
};

export default WorkspaceCard;
