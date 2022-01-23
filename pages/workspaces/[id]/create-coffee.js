// nextjs, react
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// components
import CreateCoffee from "../../../components/coffees/CreateCoffee";
import ProtectedCreate from "../../../components/workspace/ProtectedCreate";
// mui
import { Box, CircularProgress } from '@mui/material';

const createCoffee = () => {
    const router = useRouter();
    const workspaceId = parseInt(router.query.id, 10);
    const { data: session, status } = useSession();
    const [isProtected, setProtected] = useState(false);
    const [authorized, setAuthorized] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const create = (name, description, image, url) => {
		console.log({ name, description, image, url });
		axios
			.post("http://localhost:3001/coffees", {
				name,
				description,
				image,
				url,
				userId: session.id,
				workspaceId,
			})
			.then((res) => {
				console.log(res);
				if (res.data.message === "coffee created") {
					router.push(`/workspaces/${workspaceId}`);
				} else {
					console.log("there was an error");
					// render alert box
				}
			});
    };
    
    // edit key
    const submitEditKey = (editKey) => {
        axios.post("http://localhost:3001/workspaces/protected", { userId: session.id, workspaceId, editKey }).then((res) => {
            setAuthorized(res.data.verified);
            if (!res.data.verified) {
                console.log('workspace is not verified');
            }
        })
    }

	// authentication and data fetching
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		}
		if (status === "authenticated") {
			if (!session.workspaces.includes(workspaceId)) {
				router.push("/");
			}
			axios
				.get("http://localhost:3001/workspaces/protected", {
					params: {
						workspaceId,
						userId: session.id,
					},
				})
                .then((res) => {
                    console.log(res.data);
					setProtected(res.data.protected);
					setLoaded(true);
				});
		}
	}, [status]);

	if (status === "loading") {
		return (
			<Box sx={{ display: "flex" }}>
				<CircularProgress />
			</Box>
		);
	}
	if (status === "authenticated") {
		if (isProtected && loaded && !authorized) {
			return (
				<Box sx={{ display: "flex" }}>
					<ProtectedCreate submit={submitEditKey} />
				</Box>
			);
        }
        if (loaded && (!isProtected || (isProtected && authorized))) {
            return (
				<Box sx={{ display: "flex" }}>
					<CreateCoffee
						create={create}
						userId={session.id}
						workspaceId={workspaceId}
					/>
				</Box>
			);
        }
	}

	return "Well something is wrong here";
};

export default createCoffee;
