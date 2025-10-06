import { useState } from "react";
import { ideaApi } from "../api";

export const useVote = () => {
  const [voting, setVoting] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const vote = async (ideaId: number) => {
    try {
      setVoting(ideaId);
      setError(null);

      await ideaApi.voteForIdea(ideaId);

      return {
        success: true,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Voting failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setVoting(null);
    }
  };

  return {
    voting,
    error,
    setError,
    vote,
  };
};
