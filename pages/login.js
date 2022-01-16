//nextjs stuff
import { useRouter } from 'next/router';

// modules
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

//mui
import { Stack, TextField, Button, Typography, Box, CircularProgress, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const login = () => {
    // const
    const router = useRouter();
    const { data: session, status } = useSession();

    // form data
    const [workspaceId, setWorkspaceId] = useState('');
    const { workspaceSecret, setWorkspaceSecret } = useState('');
    const [showSecret, setShowSecret] = useState(false);


    // login handling
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/');
        }
    }, [status])

    if (status === "loading") {
        return (
            <Box>
                <CircularProgress/>
            </Box>
        )
    }

    return (
		<Stack
			component="form"
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit();
			}}
		>
			<Typography variant="h4">Add workspace</Typography>
            <TextField />
            
            {/* password field */}
			<FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
				<InputLabel htmlFor="outlined-adornment-password">
					Workspace Secret
				</InputLabel>
				<OutlinedInput
					id="outlined-adornment-password"
					type={showSecret ? "text" : "password"}
					value={workspaceSecret}
					onChange={(e) => setWorkspaceSecret(e.target.value)}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={() => setShowSecret(i => !i)}
								// onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{showSecret ? (
									<VisibilityOff />
								) : (
									<Visibility />
								)}
							</IconButton>
						</InputAdornment>
					}
					label="Password"
				/>
            </FormControl>
            {/* end of password field */}
		</Stack>
	);
}

export default login;