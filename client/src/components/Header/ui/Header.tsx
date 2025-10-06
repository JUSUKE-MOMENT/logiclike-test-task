import { Box, Container, Typography, Button, Stack } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

type Props = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

export const Header = ({ darkMode, setDarkMode }: Props) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        py: 2,
        px: 2,
        mb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="h4" component="h1">
            🏆 BestIdea
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Светлая тема" : "Тёмная тема"}
          </Button>
        </Stack>
        <Typography
          variant="subtitle1"
          component="p"
          sx={{ mt: { xs: 2, sm: 1 } }}
        >
          Голосуйте за лучшие идеи для развития платформы!
        </Typography>
      </Container>
    </Box>
  );
};
