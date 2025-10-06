import { useEffect } from "react";

type GlobalUpdate = (ideaId: number, newVoteCount: number) => void;
type PersonalUpdate = (
  votedIdeaIds: number[],
  voteLimitReached: boolean
) => void;

export const useVoteStream = (
  onGlobalUpdate: GlobalUpdate,
  onPersonalUpdate: PersonalUpdate
) => {
  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:3000/api/votes/stream"
    );

    eventSource.addEventListener("vote", (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      onGlobalUpdate(Number(data.ideaId), data.newVoteCount);
    });

    eventSource.addEventListener("personal", (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      onPersonalUpdate(data.votedIdeaIds, data.voteLimitReached);
    });

    return () => {
      eventSource.close();
    };
  }, [onGlobalUpdate, onPersonalUpdate]);
};
