import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
    interface PaletteOptions {
        app: {
            lightBlue: string;
            lightBlueHover: string;
        };
    }
}

export default createTheme({
    typography: {
        fontSize: 13,
        fontFamily: "'Montserrat', sans-serif;",
    },
    palette: {
        primary: {
            main: "#206da7",
        },
        secondary: {
            main: "#07004d",
        },
        error: {
            main: "#d62237",
        },
        background: {
            default: "#fafafa",
            paper: "#fff",
        },
        app: {
            lightBlue: "rgba(100,182,247,0.2)",
            lightBlueHover: "rgba(100,182,247,0.3)",
        },
    },
});
