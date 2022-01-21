//next js stuff
import { useRouter } from "next/router";
import Link from "next/link";

// modules
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

import CoffeesContext from "../../../../components/context/CoffeesContext";

//components
import Coffee from "../../../../components/coffees/Coffee";

// mui
import { Box, CircularProgress } from "@mui/material";

const coffee = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	

	// SSG fast return 
	if (status === "loading") {
		return (
			<Box>
				<CircularProgress />
			</Box>
		);
	}

	// user is logged in, not in this workspace
	if (
		status === "authenticated" &&
		!session.workspaces.includes(workspace_id)
	) {
		return (
			<Box>
				<Typography>
					You have to first
					<Link
						href={{ pathname: "/login", query: { workspace_id } }}
					>
						log in
					</Link>
					to use this workspace
				</Typography>
			</Box>
		);
	}

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
};

export default coffee;
