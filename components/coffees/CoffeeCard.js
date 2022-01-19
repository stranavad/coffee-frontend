import React from "react";
import {
	Card,
	Typography,
	CardActionArea,
	CardContent,
	Box,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
// import imageLoader from "../../imageLoader";
import Options from "./Options";

const MyImage = React.forwardRef(({ coffee }, ref) => {
	return (
		<Image
			width="320"
			height="320"
			src={coffee.image}
			alt={coffee.name}
			// loader={imageLoader}
			unoptimized
		/>
	);
});

function CoffeeCard({ coffee }) {
	return (
		<Card
			sx={{
				widht: "100%",
				backgroundColor: "primary.light",
				display: "flex",
				justifyContent: "stretch",
			}}
		>
			<CardActionArea sx={{ width: "40%" }}>
				<Link href={`/coffee/${coffee.id}`} passhref>
					{/* <Image
						width="320"
						height="320"
						src={coffee.image}
						alt={coffee.name}
						loader={imageLoader}
						unoptimized
					/> */}
					<MyImage coffee={coffee} />
				</Link>
			</CardActionArea>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					paddingBottom: 2,
					width: "60%",
				}}
			>
				<CardActionArea sx={{ width: "100%", height: "80%" }}>
					<Link href={`/coffee/${coffee.id}`}>
						<CardContent>
							<Typography
								gutterBottom
								variant="h4"
								component="h2"
								color="text.white"
							>
								{coffee.name}
							</Typography>
							<Typography
								variant="h6"
								component="p"
								color="text.whiteParagraph"
							>
								{coffee.average
									? coffee.average + "%"
									: "No rating, yet"}
							</Typography>
						</CardContent>
					</Link>
				</CardActionArea>
				<Options coffee={coffee} />
			</Box>
		</Card>
	);
}

export default CoffeeCard;
