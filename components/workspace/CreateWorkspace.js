import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { useSession } from "next-auth/react";

import {
	Box,
	Stack,
	TextField,
	Button,
	Typography,
	Checkbox,
} from "@mui/material";

const CreateWorkspace = ({createWorkspace}) => {
	const [name, setName] = useState("");
	const [secret, setSecret] = useState("");
	const [editKey, setEditKey] = useState("");
	const [protect, setProtect] = useState(false);

	const fillData = () => {
		setName("name");
		setSecret("secret");
		setEditKey("edit");
		setProtect(true);
	};

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
					createWorkspace(name, secret, protect, editKey);
				}}
			>
				<Typography variant="h5" component="div">
					Create workspace
				</Typography>

				<Button onClick={fillData}>Fill data</Button>

				<TextField
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					autoFocus
					required
				/>
				<TextField
					placeholder="Secret"
					value={secret}
					onChange={(e) => setSecret(e.target.value)}
					required
				/>
				<Checkbox
					checked={protect}
					onChange={(e) => setProtect(e.target.checked)}
					inputProps={{ "aria-label": "controlled" }}
				/>
				{protect && (
					<TextField
						placeholder="Edit Key"
						value={editKey}
						onChange={(e) => setEditKey(e.target.value)}
					/>
				)}

				<Button type="submit" variant="contained">
					Create workspace
				</Button>
			</Stack>
		</Box>
	);
};

export default CreateWorkspace;
