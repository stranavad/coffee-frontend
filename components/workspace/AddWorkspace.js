//nextjs, react
import { useState } from "react";
//components
//mui
import { Box, Stack, TextField, Button, Typography } from "@mui/material";

const AddWorkspace = ({ add }) => {
	const [workspaceId, setWorkspaceId] = useState(0);
	const [workspaceSecret, setWorkspaceSecret] = useState("");

	return (
		<Box
			sx={{
				width: 400,
				backgroundColor: "primary.light",
				padding: 4,
				borderRadius: 1,
			}}
		>
			<Stack
				component="form"
				pt={2}
				spacing={4}
				onSubmit={(e) => {
					e.preventDefault();
					add(workspaceId, workspaceSecret);
				}}
			>
				<Typography variant="h5" component="div">
					Add Workspace
				</Typography>
				<TextField
					placeholder="Workspace id"
					type="number"
					value={workspaceId}
					onChange={(e) => setWorkspaceId(e.target.value)}
				/>
				<TextField
					placeholder="Workspac secret"
					type="password"
					value={workspaceSecret}
					onChange={(e) => setWorkspaceSecret(e.target.value)}
				/>
				{workspaceId !== 0 && workspaceSecret !== "" && (
					<Button type="submit" variant="contained">
						Add Workspace
					</Button>
				)}
			</Stack>
			{workspaceId === 0 || workspaceSecret === "" && (
				<Typography
					sx={{ marginTop: "50px" }}
					variant="p"
					component="div"
				>
					You first have to enter details to submit the form
				</Typography>
			)}
		</Box>
	);
};

export default AddWorkspace;
