//next js stuff
import { useRouter } from "next/router";
import Link from "next/link";

// modules
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
// components
import CoffeesContext from "../../../components/context/CoffeesContext";
import Coffees from "../../../components/coffees/Coffees";
import CurrentCoffee from "../../../components/coffees/CurrentCoffee";
import AddRatingButton from "../../../components/AddRatingButton";


// mui
import { Box, CircularProgress, Typography, Stack } from "@mui/material";

const workspaces = () => {
	const router = useRouter();
	const { data: session, status } = useSession();

	const [coffees, setCoffees] = useState([]);
	const [currentCoffee, setCurrentCoffee] = useState({});

	const workspaceId = parseInt(router.query.id, 10);

	// user logging and getting neccessary data
	useEffect(() => {
		if (status === "authenticated") {
			console.log(session);
			if (session.workspaces.includes(workspaceId)) {
				axios
					.get("http://localhost:3001/coffees", {
						params: { userId: session.id, workspaceId },
					})
					.then((res) => {
						setCoffees(res.data.coffees);
						setCurrentCoffee(res.data.coffee);
					});
			}
		} else if (status === "unauthenticated") {
			router.push("/");
		}
	}, [status, session]);

	// coffee functions
	const deleteCoffee = () => {
		console.log("deleting coffee");
	};

	const setCurrent = () => {
		console.log("set current coffee");
		e;
	};

	let contextObject = {
		coffees,
		currentCoffee,
		setCurrent,
		deleteCoffee,
	};

	// user status is yet to be determined
	if (status === "loading") {
		return (
			<Box sx={{ display: "flex" }}>
				<CircularProgress />
			</Box>
		);
	}

	// user is authemticated, but not in this workspace
	if (
		 status === "authenticated" &&
		!session.workspaces.includes(workspaceId)
	) {
		return (
			<Box>
				<Typography>
					You have to first
					<Link
						href={{ pathname: "/login", query: { workspaceId } }}
					>
						log in
					</Link>{" "}
					to use this workspace
				</Typography>
			</Box>
		);
	}

	// user is logged IN this workspace
	return (
		<CoffeesContext.Provider value={contextObject}>
			<Stack alignItems="left" sx={{ maxWidth: "lg" }}>
				<CurrentCoffee />
				<Typography
					variant="h4"
					component="div"
					sx={{ marginTop: "50px" }}
					color="text.white"
				>
					Dalsi kavicky
				</Typography>
				<Coffees />
				<AddRatingButton />
			</Stack>
		</CoffeesContext.Provider>
	);
};

export default workspaces;
