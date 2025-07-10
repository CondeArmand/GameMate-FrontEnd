import { Outlet, Link as RouterLink } from "react-router-dom";
import useAuthObserver from "./features/auth/hooks/useAuthObserver";
import {Button} from "@mui/material";

export default function AppRoot() {
  useAuthObserver();

  return (
      <>
        <Button color="inherit" component={RouterLink} to="/search">
          Buscar Jogos
        </Button>
        <Button color="inherit" component={RouterLink} to="/profile">
          Meu Perfil
        </Button>
        <Button color="inherit" component={RouterLink} to="/login">
          Entrar
        </Button>
        <Outlet />
      </>
     );
}
