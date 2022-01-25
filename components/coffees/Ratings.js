//nnextjs, react
import { useSession } from "next-auth/react";
// components
// mui
import { Card, Box, Typography, Button, CardContent } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

function Ratings({ ratings }) {
	const { data: session } = useSession();
	if (ratings.length !== 0) {
		return (
			<CardContent>
				<Typography
					variant="h6"
					component="div"
					color="text.whiteParagraph"
				>
					Hodnoceni gurmanu
				</Typography>
				{ratings.map((rating) => (
					<Card
						sx={{
							display: "flex",
							padding: 1,
							alignItems: "center",
							justifyContent: "space-between",
							marginBottom: 1,
						}}
						key={rating.userId}
					>
						<Box>
							<Typography variant="h5" component="div">
								{rating.name}
							</Typography>
							<Typography variant="p" component="div">
								{rating.notes}
							</Typography>
						</Box>
						<Box sx={{ display: "flex" }}>
							{session?.id === rating.userId ? (
								<Button
									variant="text"
									onClick={() => {
										router.push(`/add-rating/${coffee.id}`);
									}}
								>
									<SettingsIcon />
								</Button>
							) : (
								""
							)}
							<Typography
								variant="h5"
								component="div"
								color="text.whiteParagraph"
							>
								{rating.rating}%
							</Typography>
						</Box>
					</Card>
				))}
			</CardContent>
		);
	}
	return <Typography>No ratings yet</Typography>;
}

export default Ratings;
