import React from "react";
import {
	Box,
	Card,
	CardContent,
	Typography,
	Paper,
	List,
	ListItem,
	ListItemText,
	Divider,
	Button
} from "@mui/material";
import {
	People,
	EventNote,
	Assessment,
	Settings
} from "@mui/icons-material";

const Admin: React.FC = () => {
	const mockReservations = [
		{ id: 1, quadra: "Quadra 1", date: "16/07/2025", time: "14:00", user: "João Silva" },
		{ id: 2, quadra: "Quadra 2", date: "16/07/2025", time: "15:00", user: "Maria Santos" },
		{ id: 3, quadra: "Quadra 3", date: "17/07/2025", time: "10:00", user: "Pedro Oliveira" },
		{ id: 4, quadra: "Quadra 1", date: "17/07/2025", time: "16:00", user: "Ana Costa" },
	];

	const stats = {
		totalReservations: 24,
		totalUsers: 156,
		activeQuadras: 3,
		todayReservations: 8
	};

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
				Painel Administrativo
			</Typography>
			
			{/* Estatísticas */}
			<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
				<Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
					<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<EventNote color="primary" sx={{ fontSize: 40, mb: 1 }} />
						<Typography variant="h4" component="div">
							{stats.totalReservations}
						</Typography>
						<Typography color="text.secondary">
							Total de Reservas
						</Typography>
					</Paper>
				</Box>
				<Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
					<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<People color="secondary" sx={{ fontSize: 40, mb: 1 }} />
						<Typography variant="h4" component="div">
							{stats.totalUsers}
						</Typography>
						<Typography color="text.secondary">
							Usuários Cadastrados
						</Typography>
					</Paper>
				</Box>
				<Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
					<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<Assessment color="success" sx={{ fontSize: 40, mb: 1 }} />
						<Typography variant="h4" component="div">
							{stats.activeQuadras}
						</Typography>
						<Typography color="text.secondary">
							Quadras Ativas
						</Typography>
					</Paper>
				</Box>
				<Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
					<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<Settings color="warning" sx={{ fontSize: 40, mb: 1 }} />
						<Typography variant="h4" component="div">
							{stats.todayReservations}
						</Typography>
						<Typography color="text.secondary">
							Reservas Hoje
						</Typography>
					</Paper>
				</Box>
			</Box>

			{/* Reservas Recentes */}
			<Card>
				<CardContent>
					<Typography variant="h5" component="h2" gutterBottom>
						Reservas Recentes
					</Typography>
					<List>
						{mockReservations.map((reservation, index) => (
							<React.Fragment key={reservation.id}>
								<ListItem>
									<ListItemText
										primary={`${reservation.quadra} - ${reservation.date} às ${reservation.time}`}
										secondary={`Usuário: ${reservation.user}`}
									/>
									<Button 
										variant="outlined" 
										size="small" 
										color="error"
										sx={{ ml: 2 }}
									>
										Cancelar
									</Button>
								</ListItem>
								{index < mockReservations.length - 1 && <Divider />}
							</React.Fragment>
						))}
					</List>
				</CardContent>
			</Card>

			{/* Ações Administrativas */}
			<Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
				<Button variant="contained" color="primary">
					Gerenciar Usuários
				</Button>
				<Button variant="contained" color="secondary">
					Configurar Quadras
				</Button>
				<Button variant="contained" color="success">
					Relatórios
				</Button>
			</Box>
		</Box>
	);
};

export default Admin;
