import React from "react";
import {
	Box,
	Button,
	Modal,
	Typography,
	Card,
	CardContent
} from "@mui/material";

interface ReservationModalProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	quadraName: string;
	date: string;
	time: string;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
	open,
	onClose,
	onConfirm,
	quadraName,
	date,
	time
}) => {
	return (
		<Modal open={open} onClose={onClose}>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="100vh"
			>
				<Card sx={{ width: "400px", boxShadow: 3 }}>
					<CardContent>
						<Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
							<Typography variant="h5" gutterBottom align="center">
								Deseja confirmar sua reserva na {quadraName}?
							</Typography>
							<Typography variant="body1" align="center">
								Dia: {date} <br /> Horário: {time}
							</Typography>
							<Box display="flex" justifyContent="space-between" mt={2}>
								<Button variant="outlined" color="error" onClick={onClose}>
									Cancelar
								</Button>
								<Button variant="contained" color="success" onClick={onConfirm}>
									Confirmar
								</Button>
							</Box>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Modal>
	);
};

export default ReservationModal;
