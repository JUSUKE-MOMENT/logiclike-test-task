import { useState, useEffect, useCallback } from "react";
import { ideaApi } from "../api";
import type { Idea } from "../types/idea";
import { useVoteStream } from ".";

export const useIdeas = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votedIdeaIds, setVotedIdeaIds] = useState<number[]>([]);
  const [voteLimitReached, setVoteLimitReached] = useState(false);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      setError(null);

      const ideasData = await ideaApi.getIdeas();
      setIdeas(ideasData);

      const voteData = await ideaApi.getVotesByIp();

      setVotedIdeaIds(voteData.votedIdeaIds);
      setVoteLimitReached(voteData.voteLimitReached);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch ideas"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const refetch = () => {
    fetchIdeas();
  };

  const handleGlobalUpdate = useCallback(
    (ideaId: number, newVoteCount: number) => {
      setIdeas((prev) =>
        prev.map((idea) =>
          idea.id === ideaId ? { ...idea, votes_count: newVoteCount } : idea
        )
      );
    },
    []
  );

  const handlePersonalUpdate = useCallback(
    (votedIds: number[], limitReached: boolean) => {
      setVotedIdeaIds(votedIds);
      setVoteLimitReached(limitReached);
    },
    []
  );

  useVoteStream(handleGlobalUpdate, handlePersonalUpdate);

  return { ideas, votedIdeaIds, voteLimitReached, loading, error, refetch };
};
