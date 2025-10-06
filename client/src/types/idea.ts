export type Idea = {
  id: number;
  title: string;
  description: string;
  votes_count: number;
};

export type VoteResponse = {
  success: boolean;
};

export type VoteStatusResponse = {
  votedIdeaIds: number[];
  voteLimitReached: boolean;
};

