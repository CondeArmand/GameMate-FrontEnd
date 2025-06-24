import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginForm from "../form/LoginForm.tsx";

export default function LoginView() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    console.log("Botão Entrar com Google clicado");
    // TODO: Implementar lógica de login com Google Firebase
  };

  const handleRegister = () => {
    console.log("Botão Cadastrar clicado");
    // TODO: Navegar para a página de cadastro
    navigate("/register");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center", // Para centralizar o título e logo
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          {/* <SportsEsportsIcon sx={{ fontSize: 40, mr: 1 }} /> Substitua pelo seu logo */}
          <Typography component="h1" variant="h4" fontWeight="bold">
            GameMate
          </Typography>
          {/* Se tiver um <img src="/path/to/logo.svg" alt="GameMate Logo" style={{ height: '30px', marginLeft: '8px' }} /> */}
        </Box>

        {/* O LoginForm renderizará os campos de Email, Senha, "Esqueceu Senha" e Botão Entrar */}
        <LoginForm />

        <Divider sx={{ width: "100%", my: 3 }}>
          {" "}
          {/* my: margem no eixo Y */}
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            OU
          </Typography>
        </Divider>

        <Stack spacing={2} sx={{ width: "100%" }}>
          <Button
            type="button"
            fullWidth
            variant="outlined" // Design diferente para o Google
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={
              {
                // Você pode querer ajustar as cores para combinar com o design
                // Por exemplo: borderColor: 'grey.500', color: 'text.primary'
              }
            }
          >
            Entrar com o Google
          </Button>

          <Button
            type="button"
            fullWidth
            variant="contained" // Design indica um botão preenchido
            color="secondary" // Usando cor secundária para diferenciar
            onClick={handleRegister}
          >
            Cadastrar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
