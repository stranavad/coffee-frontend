//next js stuff
import { useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';

import { useSession } from "next-auth/react";

import CoffeesContext from '../../../../../components/context/CoffeesContext';

//components
import Coffee from "../../../../../components/coffees/Coffee";

// mui
import { Box, CircularProgress } from "@mui/material";
import axios from 'axios';

const coffee = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const workspaceId = parseInt(router.query.id, 10);

	const coffeeId = router.query.coffeeId;
	const [coffee, setCoffee] = useState({});

	useEffect(() => {
		if (status === "authenticated" && session.workspaces.includes(workspaceId)) {
			axios.get('http://localhost:3001/coffees/id', { params: { userId: session.id, workspaceId, coffeeId } }).then((res) => {
				setCoffee(res.data?.coffee);
				console.log(res.data.message);
			})
		}
		if (status === 'unauthenticated') {
			router.push("/");
		}
	}, [status, session])

	const setCurrent = () => {
		console.log('set current');
	}
	const deleteCoffee = () => {
		console.log('delete coffee');
	}

	// user is logged in, not in this workspace
	if (
		status === "authenticated" &&
		!session.workspaces.includes(workspaceId)
	) {
		return (
			<Box>
				<Typography>
					You have to first
					<Link
						href={{ pathname: "/add", query: { workspaceId } }}
					>
						log in
					</Link>
					login
					to use this workspace
				</Typography>
			</Box>
		);
	}

	if (status === "authenticated") {
		// user is IN this workspace
		return (
			<CoffeesContext.Provider
				value={{
					coffee,
					currentCoffee: { id: currentCoffeeId },
					setCurrent,
					deleteCoffee,
				}}
			>
				<Coffee coffee={coffee} />
			</CoffeesContext.Provider>
		);
	}

	return (
		<Box>
			<CircularProgress />
		</Box>
	);
};

export default coffee;
