import { Box, Typography } from "@mui/material";
import Coffee from "./Coffee";
import CoffeesContext from "../Context/CoffeesContext";

function CurrentCoffee() {
	return (
		<CoffeesContext.Consumer>
			{({ currentCoffee }) => (
				<>
					{Object.entries(currentCoffee).length !== 0 ? (
						<Box sx={{ width: "100%" }}>
							<Coffee coffee={currentCoffee} />
						</Box>
					) : (
						<Typography variant="h5" component="h4">
							No current coffee, set one
						</Typography>
					)}
				</>
			)}
		</CoffeesContext.Consumer>
	);
}

export default CurrentCoffee;
