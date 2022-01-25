//nextjs, react
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from 'next-auth/react';
import Link from "next/link";
import axios from "axios";
//components
import AddWorkspace from "../../components/workspace/AddWorkspace";
//mui
import { Box, CircularProgress } from "@mui/material";

const addWorkspace = () => {
	const router = useRouter();
	const { data: session, status } = useSession();

	// methods
    const add = (id, secret) => {
        console.log(id);
        console.log(secret);
        if (id && secret) {
            console.log({ user_id: session.id, workspace_id: id, secret });
			axios
				.post("http://localhost:3001/user/workspace", {
					user_id: session.id,
					workspace_id: id,
					secret,
				})
                .then(({ data }) => {
                    console.log(data.message);
                    
					if (data.message === "User added to workspace") {
						console.log("workspace added");
						router.push(`/workspace/${id}`);
					} else {
						console.log("something is wrong");
					}
				});
        } else {
            console.log('not enough credentials');
        }
	};

	// authentication and return
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		}
	}, [status]);

	if (status === "loading") {
		return (
			<Box>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box>
			<AddWorkspace add={add} />
		</Box>
	);
};

export default addWorkspace;
