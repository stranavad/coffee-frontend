//nextjs, react
//components
import WorkspaceCard from "./WorkspaceCard";
//mui
import { Grid, Typography } from "@mui/material";

const Workspaces = ({ workspaces }) => {
	return (
		<>
			<Typography variant="h4">Workspaces</Typography>
			<Grid container spacing={4} sx={{ paddingTop: 3 }}>
				{workspaces.map((workspace) => (
					<Grid item key={workspace.id}>
						<WorkspaceCard workspace={workspace} />
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default Workspaces;
