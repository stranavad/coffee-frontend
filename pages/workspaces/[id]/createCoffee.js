// nextjs, react
import { useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// components
import CreateCoffee from '../../../components/coffees/CreateCoffee';
// mui
import { Box, Typography, Stack, CircularProgress } from '@mui/material';

const createCoffee = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [coffees, setCoffees] = useState([]);
    const [protected, setProtected] = useState(false);

    const create = (coffee) => {
        console.log(coffee);
    }

    // authentication and data fetching
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/');
        }
        if (status === "authenticated") {
            if (!(parseInt(router.query.id, 10) in session.workspaces)) {
                router.push('/');
            }
        }
    }, [status])

    if (status === "loading") {
        return (
            <Box sx={{display: 'flex'}}>
                <CircularProgress/>
            </Box>
        )
    }
    if (status === "authenticated") {
        return (
            <Box sx={{ display: 'flex' }}>
                <Typography>Create coffee</Typography>
                <CreateCoffee create={coffee} id={session.id} workspace_id={workspace_id}/>
            </Box>
        )
    }
}

export default createCoffee;