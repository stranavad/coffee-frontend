import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import CoffeeCard from "./CoffeeCard";
import CoffeesContext from "../context/CoffeesContext";

function Coffees(props) {
	//const router = useRouter();
	return (
		<CoffeesContext.Consumer>
			{({ coffees }) => (
				<>
					{coffees.length !== 0 ? (
						<Grid container spacing={4} sx={{ paddingTop: 3 }}>
							{coffees.map((coffee) => (
								<Grid item sm={6} key={coffee.id}>
									<CoffeeCard coffee={coffee} />
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
