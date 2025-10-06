import { Card, CardContent, Typography, Box } from "@mui/material";
import { VoteButton } from "../..";
import type { Idea } from "../../../types/idea";

type Props = {
  idea: Idea;
  votedIdeaIds: number[];
  voteLimitReached: boolean;
};

export const IdeaCard = ({ idea, votedIdeaIds, voteLimitReached }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {idea.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          {idea.description}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="primary">
            Голосов: {idea.votes_count}
          </Typography>

          <VoteButton ideaId={idea.id} votedIdeaIds={votedIdeaIds} voteLimitReached={voteLimitReached} />
        </Box>
      </CardContent>
    </Card>
  );
};
