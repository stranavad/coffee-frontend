import { useState } from 'react';
import { Stack, TextField, Button, Typography } from '@mui/material';

const ProtectedCreate = ({submit}) => {
    const [editKey, setEditKey] = useState("");
    return (
        <Stack component="form" onSubmit={(e) => {
            e.preventDefault();
            submit(editKey);
        }}>
            <Typography>Enter workspace protect key</Typography>
            <TextField plaholder="the key" type="password" value={editKey} onChange={(e) => setEditKey(e.target.value)} />
            <Button type="submit">Submit</Button>
        </Stack>
    )
}

export default ProtectedCreate;