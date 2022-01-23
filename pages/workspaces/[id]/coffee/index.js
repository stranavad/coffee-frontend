// nextjs, react stuff
import { useRouter } from "next/router";
// components
// mui
import { CircularProgress, Stack } from "@mui/material";

const coffees = () => {
    const router = useRouter();
    const workspaceId = router.query.id;
	useEffect(() => {
        router.push(`/workspaces/${workspaceId}`);
	}, []);

	return <Stack><CircularProgress/></Stack>;
};

export default coffees;
