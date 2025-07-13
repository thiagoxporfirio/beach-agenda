import { useState } from "react";
import {
	TextField,
	Button,
	Box,
	Typography,
	Card,
	CardContent,
	CircularProgress
} from "@mui/material";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const nameSchema = z.string().min(3, "O nome deve ter pelo menos 3 caracteres");
const phoneSchema = z
	.string()
	.regex(/^\d{10,11}$/, "Número de telefone inválido");
const passwordSchema = z
	.string()
	.min(6, "A senha deve ter pelo menos 6 caracteres");

function Register() {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({ name: "", phone: "", password: "" });
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const validateInputs = () => {
		const nameValidation = nameSchema.safeParse(name);
		const phoneValidation = phoneSchema.safeParse(phone.replace(/\D/g, ""));
		const passwordValidation = passwordSchema.safeParse(password);

		setErrors({
			name: nameValidation.success
				? ""
				: nameValidation.error?.issues[0]?.message,
			phone: phoneValidation.success
				? ""
				: phoneValidation.error?.issues[0]?.message,
			password: passwordValidation.success
				? ""
				: passwordValidation.error?.issues[0]?.message
		});

		return (
			nameValidation.success &&
			phoneValidation.success &&
			passwordValidation.success
		);
	};

	const handleRegister = () => {
		if (validateInputs()) {
			setLoading(true);
			console.log("Registrado com", name, phone, password);
			toast.success("Registro realizado com sucesso!", {
				onClose: () => {
					setLoading(false);
					navigate("/");
				}
			});
		} else {
			console.log("Erro na validação dos inputs");
		}
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="100vh"
			bgcolor="grey.100"
			padding={2}
		>
			<Card sx={{ maxWidth: 550, width: "100%", boxShadow: 3 }}>
				<CardContent>
					<Typography variant="h4" component="h1" gutterBottom align="center">
						Registrar
					</Typography>
					<TextField
						label="Nome Completo"
						variant="outlined"
						value={name}
						onChange={e => setName(e.target.value)}
						margin="normal"
						fullWidth
						error={!!errors.name}
						helperText={errors.name}
					/>
					<InputMask
						mask="(99) 99999-9999"
						value={phone}
						onChange={e => setPhone(e.target.value)}
					>
						{inputProps => (
							<TextField
								{...inputProps}
								label="Telefone"
								variant="outlined"
								margin="normal"
								fullWidth
								error={!!errors.phone}
								helperText={errors.phone}
							/>
						)}
					</InputMask>
					<TextField
						label="Senha"
						type="password"
						variant="outlined"
						value={password}
						onChange={e => setPassword(e.target.value)}
						margin="normal"
						fullWidth
						error={!!errors.password}
						helperText={errors.password}
					/>
					<Button
						onClick={handleRegister}
						variant="contained"
						color="primary"
						fullWidth
						sx={{ mt: 2 }}
						disabled={loading}
					>
						{loading ? <CircularProgress size={24} /> : "Registrar"}
					</Button>
				</CardContent>
			</Card>
			<ToastContainer />
		</Box>
	);
}

export default Register;
