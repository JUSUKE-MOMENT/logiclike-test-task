import { Button, CircularProgress, Box, Typography } from "@mui/material";
import { useVote } from "../../../hooks";
import { useEffect, useState } from "react";

type Props = {
  ideaId: number;
  votedIdeaIds: number[];
  voteLimitReached: boolean;
};

export const VoteButton = ({ ideaId, votedIdeaIds, voteLimitReached }: Props) => {
  const { vote, voting, error } = useVote();
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    setHasVoted(votedIdeaIds.includes(ideaId));
  }, [ideaId, votedIdeaIds]);

  const handleVote = async () => {
    setHasVoted(true);
    const result = await vote(ideaId);

    if (!result.success) {
      setHasVoted(false);
    }
  };

  const getButtonState = () => {
    if (voting === ideaId) {
      return {
        variant: "outlined" as const,
        color: "primary" as const,
        disabled: true,
        startIcon: <CircularProgress size={16} />,
        text: "Голосую...",
      };
    }

    if (voteLimitReached) {
      return {
        variant: "outlined" as const,
        color: "error" as const,
        disabled: true,
        text: "Лимит голосов исчерпан",
      };
    }

    if (hasVoted) {
      return {
        variant: "outlined" as const,
        color: "success" as const,
        disabled: true,
        text: `Вы уже голосовали`,
      };
    }

    return {
      variant: "contained" as const,
      color: "success" as const,
      disabled: false,
      text: `Проголосовать`,
    };
  };

  const buttonState = getButtonState();

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
      <Button
        variant={buttonState.variant}
        color={buttonState.color}
        disabled={buttonState.disabled}
        startIcon={buttonState.startIcon}
        onClick={handleVote}
        size="small"
        sx={{
          minWidth: 180,
          fontWeight: 500,
        }}
      >
        {buttonState.text}
      </Button>

      {error &&
        !error.includes("лимит") &&
        !error.includes("limit") &&
        !error.includes("уже голосовали") &&
        !error.includes("already") && (
          <Typography
            variant="caption"
            color="error"
            sx={{ maxWidth: 180, textAlign: "center" }}
          >
            {error}
          </Typography>
        )}
    </Box>
  );
};
