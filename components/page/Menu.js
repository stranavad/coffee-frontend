import { useSession, signIn, signOut } from 'next-auth/react';
import { AppBar, Typography, Toolbar, Button, Box } from '@mui/material';



export default function Menu() {
    const { status } = useSession();
    return (
        <Box sx={{ width: '100vw' }}>
            <AppBar position="static">
                <Toolbar sx={{display: "flex", justifyContent: 'space-between'}}>
                    <Typography variant="h4" component="h1">Coffee</Typography>
                    <Button onClick={status === "authenticated" ? signOut : signIn} color="secondary">{status === "authenticated" ? "SignOut" : "SignIn"}</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}