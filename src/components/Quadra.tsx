import { useState } from "react";
import {
	Box,
	Card,
	CardContent,
	Typography,
	Button,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	Snackbar
} from "@mui/material";
import ReservationModal from "./ReservationModal";
import { saveQuadraData } from "../api/saveQuadraData";

interface QuadraProps {
	quadraName: string;
	times: string[];
}

const Quadra: React.FC<QuadraProps> = ({ quadraName, times }) => {
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const [day, setDay] = useState<number>(new Date().getDate());
	const [month] = useState<number>(new Date().getMonth() + 1);
	const [year] = useState<number>(new Date().getFullYear());
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [toastOpen, setToastOpen] = useState<boolean>(false);

	const handleTimeClick = (time: string) => {
		setSelectedTime(time);
	};

	const handleReserve = () => {
		setIsModalOpen(true);
	};

	const handleConfirm = async () => {
		try {
			await saveQuadraData({
				quadraName,
				date: `${day}/${month}/${year}`,
				time: selectedTime || ""
			});
			setToastOpen(true);
			setIsModalOpen(false);
		} catch (error) {
			console.error("Erro ao salvar os dados da quadra:", error);
		}
	};

	const isReserveDisabled = !selectedTime || day < new Date().getDate();

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100vh"
		>
			<Card sx={{ width: "100%", height: "100%" }}>
				<CardContent>
					<Typography variant="h4" component="h1" gutterBottom align="center">
						{quadraName}
					</Typography>
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
						gap={2}
					>
						<Box display="flex" gap={1} justifyContent="center">
							<FormControl sx={{ minWidth: 120 }}>
								<InputLabel>Dia</InputLabel>
								<Select
									value={day}
									onChange={e => setDay(Number(e.target.value))}
								>
									{[...Array(31)].map((_, index) => (
										<MenuItem key={index + 1} value={index + 1}>
											{index + 1}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl sx={{ minWidth: 120 }} disabled>
								<InputLabel>Mês</InputLabel>
								<Select value={month}>
									<MenuItem value={month}>{month}</MenuItem>
								</Select>
							</FormControl>
							<FormControl sx={{ minWidth: 120 }} disabled>
								<InputLabel>Ano</InputLabel>
								<Select value={year}>
									<MenuItem value={year}>{year}</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<Box
							display="flex"
							flexWrap="wrap"
							gap={1}
							justifyContent="center"
							marginTop={10}
						>
							{times.map(time => (
								<Button
									key={time}
									variant={selectedTime === time ? "contained" : "outlined"}
									color="primary"
									onClick={() => handleTimeClick(time)}
								>
									{time}
								</Button>
							))}
						</Box>
					</Box>
				</CardContent>
				<Box display="flex" justifyContent="center" mt={10}>
					<Button
						variant="contained"
						color="success"
						onClick={handleReserve}
						disabled={isReserveDisabled}
					>
						Reservar
					</Button>
				</Box>
			</Card>
			<ReservationModal
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleConfirm}
				quadraName={quadraName}
				date={`${day}/${month}/${year}`}
				time={selectedTime || ""}
			/>
			<Snackbar
				open={toastOpen}
				autoHideDuration={8000}
				onClose={() => setToastOpen(false)}
				message={`Reserva confirmada para ${day}/${month}/${year} às ${selectedTime}`}
			/>
		</Box>
	);
};

export default Quadra;
