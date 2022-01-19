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

const WorkspaceCard = ({ workspace }) => {
	return (
		<Card sx={{ width: 250 }}>
			<CardContent>
				<Typography>{workspace.name}</Typography>
				<Typography>workspace users BACKLOG</Typography>
			</CardContent>
			<CardActions>
				<Button>
					<Link href={`/workspaces/${workspace.id}`}>
						Go to workspace
					</Link>
				</Button>
			</CardActions>
		</Card>
	);
};

export default WorkspaceCard;
