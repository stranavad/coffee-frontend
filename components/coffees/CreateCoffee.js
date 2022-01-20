// nextjs, react
import { useState, useEffect } from 'react';

// components

// mui
import { Box, Stack, TextField, Button, Typography } from '@mui/material';

const CreateCoffee = ({ create, id, workspace_id }) => {
    useEffect(() => {
        axios
			.get("http://localhost:3001/coffees/names", {
				params: { user_id: id, workspace_id },
			})
			.then((res) => {
				setCoffees(res.data.coffees);
			});
    }, [])
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
					placeholder="Name"
					value={name}
                    onChange={(e) => setName(e.target.value)}
                    autofocus
                    required
				/>
				<TextField
					placeholder="Description"
					value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
				/>
				<TextField
					placeholder="Image url"
					value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
				/>
				<TextField
					placeholder="Coffee link"
					value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
				/>
				{workspaceId !== 0 && workspaceSecret !== "" && (
					<Button type="submit" variant="contained">
						Add Workspace
					</Button>
				)}
			</Stack>
			{workspaceId === 0 ||
				(workspaceSecret === "" && (
					<Typography
						sx={{ marginTop: "50px" }}
						variant="p"
						component="div"
					>
						You first have to enter details to submit the form
					</Typography>
				))}
		</Box>
	);
}