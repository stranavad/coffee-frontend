import { Alert } from '@mui/material';

const AlertBox = ({ text, severity }) => {
    return (
        <Alert severity={severity} sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px'
        }}>{text}</Alert>
    )
}