// nextjs, react
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// components
import CreateCoffee from '../../../components/coffees/CreateCoffee';
// mui
import { Box, Typography, Stack, CircularProgress } from '@mui/material';

const createCoffee = () => {
    const router = useRouter();
    const workspace_id = router.query.id;
    const { data: session, status } = useSession();
    const [isProtected, setProtected] = useState(false);

    const create = (name, description, image, url) => {
        console.log({ name, description, image, url });
        axios.post('http://localhost:3001/coffees', {
            name, description, image, url, user_id: session.id, workspace_id
        }).then((res) => {
            if (res.data.message === "coffee created") {
                router.push(`/workspaces/${workspace_id}`);
            } else {
                console.log('there was an error');
                // render alert box
            }
        });
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
        console.log(status);
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
                <CreateCoffee create={create} id={session.id} workspace_id={workspace_id}/>
            </Box>
        )
    }

    return ('Well something is wrong here')
}

export default createCoffee;