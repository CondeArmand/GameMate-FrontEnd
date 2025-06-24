import "./App.css";
import { ConfirmProvider } from "material-ui-confirm";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ptBR } from "date-fns/locale";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { defaultTheme } from "./data/defaultTheme.ts";
import AppRoot from "./AppRoot.tsx";


export default function App() {
  return (
    <LocalizationProvider adapterLocale={ptBR} dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={defaultTheme}>
        <ConfirmProvider>
          <CssBaseline />
          <AppRoot />
        </ConfirmProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
