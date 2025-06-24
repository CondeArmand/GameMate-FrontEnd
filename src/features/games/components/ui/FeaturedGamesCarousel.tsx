import React from "react";
import Slider from "react-slick";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import useFeaturedGames from "../../hooks/useFeaturedGames";

export default function FeaturedGamesCarousel() {
  const { games, loading, error } = useFeaturedGames();

  // Configurações do carrossel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Mostra 3 slides de uma vez
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      // Ajustes para telas menores
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ width: "90%", margin: "auto", my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Destaques da Semana
      </Typography>
      <Slider {...settings}>
        {games.map((game: any) => (
          <Box key={game.id} sx={{ p: 1 }}>
            <Box
              component="img"
              src={game.cover.url}
              alt={game.name}
              sx={{
                width: "100%",
                height: "400px", // Altura fixa para os cards do carrossel
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
            <Typography variant="subtitle1" sx={{ mt: 1, textAlign: "center" }}>
              {game.name}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
