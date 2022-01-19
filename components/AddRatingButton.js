//nextjs, react
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
//components
// mui
import { Box, Fab, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function AddRatingButton() {
	const { status } = useSession();
	const [alert, setAlert] = useState(false);
	if (status === "authenticated") {
		return (
			<Box sx={{ position: "fixed", right: 50, bottom: 50 }}>
				<Link href="/create-coffee">
					<Fab color="primary" aria-label="create">
						<AddIcon />
					</Fab>
				</Link>
			</Box>
		);
	}
	return (
		<>
			<Box sx={{ position: "fixed", right: 50, bottom: 50 }}>
				<Fab
					color="primary"
					aria-label="create"
					onClick={() => setAlert((alert) => !alert)}
				>
					<AddIcon />
				</Fab>
			</Box>
			{alert && (
				<Alert
					severity="warning"
					variant="filled"
					onClose={() => setAlert(false)}
					sx={{ position: "fixed", left: 30, bottom: 30 }}
				>
					You have to be logged in to create coffee
				</Alert>
			)}
		</>
	);
}

export default AddRatingButton;
