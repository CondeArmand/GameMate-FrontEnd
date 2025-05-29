import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const RootLayout: React.FC = () => {
    return (
        <>
            {/* Nosso AppBar (Cabeçalho) Fixo */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        GameMate
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/login">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Área Principal onde as Páginas da Rota Serão Renderizadas */}
            <Box component="main" sx={{ p: 3 }}>
                <Outlet /> {/* <-- O Outlet renderiza a rota filha correspondente */}
            </Box>
        </>
    );
};

export default RootLayout;