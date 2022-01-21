// nextjs, react stuff
import { useRouter } from "next/router";
// components
// mui
import { CircularProgress, Stack } from "@mui/material";

const coffees = () => {
    const router = useRouter();
    const workspace_id = router.query.id;
	useEffect(() => {
        router.push(`/workspaces/${workspace_id}`);
	}, []);

	return <Stack><CircularProgress/></Stack>;
};

export default coffees;
