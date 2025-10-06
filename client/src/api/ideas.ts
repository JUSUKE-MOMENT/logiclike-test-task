import { api } from "./api";
import type { Idea, VoteResponse, VoteStatusResponse } from "../types/idea";

export const ideaApi = {
  getIdeas: async (): Promise<Idea[]> => {
    const response = await api.get<Idea[]>("/ideas");
    return response.data;
  },

  getIdea: async (id: number): Promise<Idea> => {
    const response = await api.get<Idea>(`/ideas/${id}`);
    return response.data;
  },

  voteForIdea: async (ideaId: number): Promise<VoteResponse> => {
    const response = await api.post<VoteResponse>(`/ideas/${ideaId}/vote`);
    return response.data;
  },

  getVotesByIp: async (): Promise<VoteStatusResponse> => {
    const response = await api.get<VoteStatusResponse>("/votes-by-ip");
    return response.data;
  },
};
