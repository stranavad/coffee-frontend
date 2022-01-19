// nextjs, react
import { useSession } from "next-auth/react";
import Link from "next/link";
// components
import CoffeesContext from "../context/CoffeesContext";
// mui
import { ButtonGroup, Button } from "@mui/material";
import {
	Grade,
	ReadMore,
	DeleteForever,
	AddCircle,
	Settings,
} from "@mui/icons-material";


function Options({ coffee }) {
	const { data: session } = useSession();
	return (
		<CoffeesContext.Consumer>
			{({ setCurrent, deleteCoffee, currentCoffee }) => (
				<ButtonGroup variant="text">
					{session?.user ? (
						<>
							<Button>
								<Link href={`/add-rating/${coffee.id}`}>
									<Grade color="secondary.dark" />
								</Link>
							</Button>
							<Button>
								<Link href={`/edit/${coffee.id}`}>
									<Settings color="secondary.dark" />
								</Link>
							</Button>
						</>
					) : (
						""
					)}
					<Button href={coffee.url} target="_blank">
						<ReadMore color="secondary.dark" />
					</Button>
					{currentCoffee.id !== coffee.id ? (
						<Button onClick={() => setCurrent(coffee)}>
							<AddCircle color="secondary.dark" />
						</Button>
					) : (
						""
					)}
					{session?.id === "61092270" && (
						<Button onClick={() => deleteCoffee(coffee)}>
							<DeleteForever color="secondary.dark" />
						</Button>
					)}
				</ButtonGroup>
			)}
		</CoffeesContext.Consumer>
	);
}

export default Options;
