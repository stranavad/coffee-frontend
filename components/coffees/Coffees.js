import { useRouter } from 'next/router';

import { Grid, Typography } from "@mui/material";
import CoffeeCard from "./CoffeeCard";
import CoffeesContext from "../context/CoffeesContext";

function Coffees() {
	const router = useRouter();
	const workspaceId = parseInt(router.query.id, 10);
	return (
		<CoffeesContext.Consumer>
			{({ coffees }) => (
				<>
					{coffees.length !== 0 ? (
						<Grid container spacing={4} sx={{ paddingTop: 3 }}>
							{coffees.map((coffee) => (
								<Grid item sm={6} key={coffee.id}>
									<CoffeeCard coffee={coffee} workspaceId={workspaceId}/>
								</Grid>
							))}
						</Grid>
					) : (
						<Typography>No coffees yet</Typography>
					)}
				</>
			)}
		</CoffeesContext.Consumer>
	);
}

export default Coffees;
