import { Alert } from "@mui/material";

const AlertBox = ({ text, severity, close }) => {
	return (
		<Alert
			severity={severity}
			sx={{
				position: "fixed",
				bottom: "20px",
				right: "20px",
			}}
			onClose={close}
		>
			{text}
		</Alert>
	);
};

export default AlertBox;
