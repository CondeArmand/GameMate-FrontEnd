import { Container, Typography } from "@mui/material";
import FeaturedGamesCarousel from "../features/games/components/ui/FeaturedGamesCarousel";
import { useAuthStore } from "../features/auth/states/authStore";

export default function HomePage() {
  const { currentUser, loading } = useAuthStore();

  console.log(currentUser);
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Bem-vindo ao GameMate!
      </Typography>
      <Typography variant="h6" component="p">
        Sua plataforma para encontrar parceiros de jogo.
      </Typography>
      <FeaturedGamesCarousel />
    </Container>
  );
}
