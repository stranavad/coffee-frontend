import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";

import { Box, CircularProgress, Typography } from "@mui/material";
import CreateWorkspace from "../../components/workspace/CreateWorkspace";

const create = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	const createWorkspace = (name, secret, protect, editKey) => {
		console.log({ name, secret, protect, editKey });
		axios
			.post("http://localhost:3001/workspaces", {
				userId: session.id,
				name,
				secret,
				protect,
				editKey,
			})
            .then((res) => {
                if (res.data.message === "created") {
                    router.push(`/workspaces/${res.data.id}`);
                } else {
                    console.log('there is something weird going on');
                }
			});
	};

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		}
		console.log(status);
	}, [status]);

	if (status === "authenticated") {
		return <CreateWorkspace createWorkspace={createWorkspace} />;
	}

	if (status === "loading") {
		return (
			<Box sx={{ flexGrow: 1 }}>
				<CircularProgress />
			</Box>
		);
	}
	return (
		<Box>
			<Typography>Something is very wrong here</Typography>
		</Box>
	);
};

export default create;
