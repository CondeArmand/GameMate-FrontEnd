import { createTheme, ThemeOptions } from "@mui/material/styles";

// Permite adicionar cores customizadas à paleta e variantes aos componentes
declare module "@mui/material/styles" {
  // Permitir adicionar novas chaves à paleta
  interface Palette {
    app?: Palette["primary"]; // Exemplo, se você tiver cores específicas da "app"
  }
  interface PaletteOptions {
    app?: PaletteOptions["primary"];
  }
  // Permitir adicionar novas variantes de cor aos botões
  interface ButtonPropsColorOverrides {
    app: true;
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark", // Modo escuro definido como padrão
    primary: {
      main: "#2979ff", // Azul principal para botões de ação primária (Entrar)
    },
    secondary: {
      main: "#42a5f5", // Azul um pouco mais claro ou diferente para ações secundárias (Cadastrar)
    },
    background: {
      default: "#0a1929", // Um azul bem escuro para o fundo (ajuste conforme o design)
      paper: "#132f4c", // Um tom mais claro para "superfícies de papel" como cards, inputs
    },
    text: {
      primary: "#e0e0e0", // Texto primário mais claro
      secondary: "#b0bec5", // Texto secundário
    },
    // Exemplo de cor customizada 'app' (se você precisar)
    // app: {
    //   main: 'rgba(100, 182, 247, 0.7)',
    //   contrastText: '#fff',
    // },
  },
  typography: {
    fontFamily: "'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif", // Montserrat como principal
    h1: { fontWeight: 700 }, // Títulos mais pesados
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 }, // Para o título "GameMate"
    h5: { fontWeight: 600 },
    button: {
      textTransform: "none", // Botões sem tudo em maiúsculas
      fontWeight: "bold", // Texto do botão em negrito
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Bordas um pouco mais arredondadas
          paddingTop: "10px", // Mais padding vertical
          paddingBottom: "10px",
        },
        containedPrimary: {
          // Estilo para botões primários preenchidos
          // color: '#fff', // Garante texto branco se necessário
        },
        // Outras variantes podem ser estilizadas aqui
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled", // 'filled' parece mais com o design
      },
      styleOverrides: {
        root: ({ theme }) => ({
          // Acesso ao tema para usar cores da paleta
          "& .MuiFilledInput-root": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.09)"
                : "rgba(0, 0, 0, 0.06)", // Fundo sutil
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.13)"
                  : "rgba(0, 0, 0, 0.09)",
            },
            "&.Mui-focused": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.13)"
                  : "rgba(0, 0, 0, 0.09)",
            },
          },
        }),
      },
    },
    MuiAppBar: {
      // Ajuste para o AppBar se ele voltar
      styleOverrides: {
        colorPrimary: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper, // AppBar com cor de "papel"
          color: theme.palette.text.primary,
        }),
      },
    },
  },
};

export const defaultTheme = createTheme(themeOptions);
