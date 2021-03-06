import { useSession } from "next-auth/react";
import Link from "next/link";

import { Stack, Button } from "@mui/material";

const AddCreateButton = () => {
	const { status } = useSession();

	if (status === "authenticated") {
		return (
			<Stack direction="row" spacing={2}>
				<Button href="/workspaces/add">
					Add workspace
				</Button>
				<Button href="/workspaces/create">
					Create new workspace
				</Button>
			</Stack>
		);
	}
	return;
};

export default AddCreateButton;
