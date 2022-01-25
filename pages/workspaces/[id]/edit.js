import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import axios from "axios";

import { Box, CircularProgress } from "@mui/material";
import axios from "axios";

import EditWorkspace from '../../../components/workspace/EditWorkspace';

const edit = () => {
	const { data: session, status } = useSession();
    const router = useRouter();
    
    const [name, setName] = useState('');

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		} else if (status === "authenticated") {
			axios
				.get("http://localhost:3000/workspaces/id", {
					params: { userId: session.id, workspaceId },
				})
				.then(({data: {message, workspace}}) => {
                    if (message === "workspace") {
                        setName(workspace.name);
                    } else {
                        console.log(message);
                    }
				});
		}
    }, [status]);

    if (status === "authenticated") {
        return (
            <Stack>
                <EditWorkspace name={name} setName={setName}/>
            </Stack>
        )
    }

	if (status === "loading") {
		return (
			<Box>
				<CircularProgress />
			</Box>
		);
	}
};
