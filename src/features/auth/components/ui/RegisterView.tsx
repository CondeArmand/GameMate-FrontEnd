import { Container, Box, Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import RegisterForm from "../form/RegisterForm";
export default function RegisterView() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography component="h1" variant="h4" fontWeight="bold" mb={3}>
          Criar Conta GameMate
        </Typography>
        <RegisterForm />
        <MuiLink
          component={RouterLink}
          to="/login"
          variant="body2"
          sx={{ mt: 2 }}
        >
          Já possui uma conta? Faça login
        </MuiLink>
      </Box>
    </Container>
  );
}
