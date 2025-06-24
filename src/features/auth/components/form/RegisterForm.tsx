import React from "react";
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
import type { RegisterFormData } from "../../types/RegisterFormData";
import useDoRegister from "../../hooks/useDoRegister"; // <-- Hook de registro

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Nome de usuário é obrigatório.")
    .min(3, "Mínimo de 3 caracteres."),
  email: yup.string().email("Email inválido.").required("Email é obrigatório."),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .required("Senha é obrigatória."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "As senhas não coincidem.") // Correção: yup.ref('password') pode ser undefined
    .required("Confirmação de senha é obrigatória."),
});

export default function RegisterForm() {
  const doRegister = useDoRegister();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    await doRegister(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%", mt: 1 }}
    >
      <Stack spacing={2}>
        {/* {error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {error}
          </Alert>
        )}{" "} */}
        {/* Erro do hook */}
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome de Usuário (Apelido)"
              required
              fullWidth
              autoFocus
              // disabled={loading}
              error={!!formErrors.username}
              helperText={formErrors.username?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              required
              fullWidth
              // disabled={loading}
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
              // disabled={loading}
              error={!!formErrors.password}
              helperText={formErrors.password?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Confirmar Senha"
              type="password"
              required
              fullWidth
              // disabled={loading}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword?.message}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 2, mb: 2, py: 1.5 }}
          // disabled={loading}
        >
          {/* {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Cadastrar"
          )} */}
          {"Cadastrar"}
        </Button>
      </Stack>
    </Box>
  );
}
