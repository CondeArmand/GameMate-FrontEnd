import {
  Box,
  Button,
  Stack,
  Alert,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { LoginFormData } from "../../types/LoginFormData";
import useDoLogin from "../../hooks/useDoLogin";
import { useAuthStore } from "../../states/authStore"; // <-- 1. Importa o store

const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido.").required("Email é obrigatório."),
  password: yup
    .string()
    .min(6, "Senha curta demais.")
    .required("Senha é obrigatória."),
});

export default function LoginForm() {
  const doLogin = useDoLogin(); // Pega a função de login do hook

  // 2. Lê os estados de loading e error diretamente do store global!
  const { loading, error } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // O handler de submit agora apenas chama a função do hook
  const onSubmit = (data: LoginFormData) => {
    doLogin(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 3 }}
    >
      <Stack spacing={2}>
        {/* Mostra o erro do store global, se houver */}
        {error && <Alert severity="error">{error.message}</Alert>}

        {/* Os campos agora usam o 'loading' global para se desabilitarem */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Endereço de Email"
              required
              fullWidth
              disabled={loading} // <-- Usa o loading do store
              error={!!formErrors.email}
              helperText={formErrors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Senha"
              type="password"
              required
              fullWidth
              disabled={loading} // <-- Usa o loading do store
              error={!!formErrors.password}
              helperText={formErrors.password?.message}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading} // <-- Usa o loading do store
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
        </Button>
      </Stack>
    </Box>
  );
}
