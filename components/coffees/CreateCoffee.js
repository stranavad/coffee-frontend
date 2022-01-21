// nextjs, react
import { useState, useEffect } from "react";
import axios from "axios";

// components

// mui
import { Box, Stack, TextField, Button, Typography } from "@mui/material";

const CreateCoffee = ({ create, id, workspace_id }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [url, setUrl] = useState("");

	const [coffees, setCoffees] = useState([]); // only coffees names in array

	const [filled, setFilled] = useState(false); // for conditional rendering of the buttons
	const [missing, setMissing] = useState(true);
	useEffect(() => {
		if (!name || !description || !image || !url) {
			setMissing(true);
		} else {
			setMissing(false);
		}
		if (name && description && image && url) {
			setFilled(true);
		} else {
			setFilled(false);
		}
	}, [name, description, image, url]);

	// checking if coffee name is unique (in this workspace)
	useEffect(() => {
		if (coffees.includes(name)) {
			console.log("coffee with this name already exists");
		}
	}, [name]);

	// gettings coffees name for comparsion
	useEffect(() => {
		axios
			.get("http://localhost:3001/coffees/names", {
				params: { user_id: id, workspace_id },
			})
			.then((res) => {
				console.log(res.data.coffees);
				setCoffees(res.data.coffees ? res.data.coffees : []);
			});
	}, []);

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
					create(name, description, image, url);
				}}
			>
				<Typography variant="h5" component="div">
					Add Workspace
				</Typography>
				<TextField
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					autoFocus
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
					value={image}
					onChange={(e) => setImage(e.target.value)}
					required
				/>
				<TextField
					placeholder="Coffee link"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					required
				/>
				{filled && (
					<Button type="submit" variant="contained">
						Add Workspace
					</Button>
				)}
			</Stack>
			{missing && (
				<Typography
					sx={{ marginTop: "50px" }}
					variant="p"
					component="div"
				>
					You first have to enter all the details to submit the form
				</Typography>
			)}
		</Box>
	);
};

export default CreateCoffee;
