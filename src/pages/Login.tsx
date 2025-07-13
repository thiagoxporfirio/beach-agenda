import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	TextField,
	Button,
	Box,
	Typography,
	Card,
	CardContent,
	IconButton,
	InputAdornment
} from "@mui/material";
import InputMask from "react-input-mask";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { z } from "zod";
// import { formatPhoneBR } from "../utils/formatPhoneBR";
import { mockLogin } from "../mock/authMock";

const phoneSchema = z.string().regex(/^\d{10,11}$/, "Número de telefone inválido");
const passwordSchema = z.string().min(6, "A senha deve ter pelo menos 6 caracteres");

function Login() {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({ phone: "", password: "" });
	const navigate = useNavigate();

	const validateInputs = () => {
		const phoneValidation = phoneSchema.safeParse(phone.replace(/\D/g, ""));
		const passwordValidation = passwordSchema.safeParse(password);

		setErrors({
			phone: phoneValidation.success ? "" : phoneValidation.error?.issues[0]?.message,
			password: passwordValidation.success ? "" : passwordValidation.error?.issues[0]?.message
		});

		return phoneValidation.success && passwordValidation.success;
	};

	const handleLogin = () => {
		if (validateInputs()) {
			const token = mockLogin(phone, password);
			if (token) {
				localStorage.setItem("authToken", token);
				navigate("/");
			} else {
				console.log("Credenciais inválidas");
			}
		} else {
			console.log("Erro na validação dos inputs");
		}
	};

	const handleRegister = () => {
		console.log("Redirecionar para registro");
		navigate("/register");
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(e.target.value);
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
						Login
					</Typography>
					<InputMask
						mask="(99) 99999-9999"
						value={phone}
						onChange={handlePhoneChange}
					>
						{(inputProps: React.ComponentProps<typeof TextField>) => (
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
						type={showPassword ? "text" : "password"}
						variant="outlined"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						margin="normal"
						fullWidth
						error={!!errors.password}
						helperText={errors.password}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={togglePasswordVisibility} edge="end">
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
					<Button
						onClick={handleLogin}
						variant="contained"
						color="primary"
						fullWidth
						sx={{ mt: 2, mb: 1 }}
					>
						Entrar
					</Button>
					<Button
						onClick={handleRegister}
						variant="outlined"
						color="error"
						fullWidth
					>
						Registrar
					</Button>
				</CardContent>
			</Card>
		</Box>
	);
}

export default Login;
