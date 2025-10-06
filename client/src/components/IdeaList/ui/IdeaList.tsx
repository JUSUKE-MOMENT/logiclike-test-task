import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { IdeaCard } from "../../IdeaCard";
import { useIdeas } from "../../../hooks";

export const IdeaList = () => {
  const { ideas, votedIdeaIds, voteLimitReached, loading, error } = useIdeas();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Ошибка загрузки идей: {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Все идеи ({ideas.length})
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            votedIdeaIds={votedIdeaIds}
            voteLimitReached={voteLimitReached}
          />
        ))}
      </Box>
    </Box>
  );
};
