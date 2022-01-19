import Image from "next/image";
//import imageLoader from "../../imageLoader";
import { Card, Typography, CardContent, Box } from "@mui/material";
import Ratings from "./Ratings";
import Options from "./Options";

const Coffee = ({ coffee }) => {
	return (
		<Card
			sx={{
				width: 800,
				backgroundColor: "primary.light",
				display: "flex",
			}}
		>
			<Image
				width="400"
				height="400"
				// loader={imageLoader}
				src={coffee.image}
				alt={coffee.name}
				unoptimized
			/>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					paddingBottom: 2,
					width: "50%",
				}}
			>
				<CardContent>
					<Typography
						variant="h5"
						component="div"
						color="text.whiteParagraph"
					>
						Dneska servirujeme
					</Typography>
					<Typography
						gutterBottom
						variant="h3"
						component="h2"
						color="text.white"
					>
						{coffee.name}
					</Typography>
					<Typography variant="h5" component="div" color="text.white">
						{coffee.average
							? coffee.average + "%"
							: "No rating, yet"}
					</Typography>
				</CardContent>
				<Options coffee={coffee} />
				<Ratings ratings={coffee?.ratings} />
			</Box>
		</Card>
	);
};

export default Coffee;
