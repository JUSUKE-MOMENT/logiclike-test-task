import { IdeaRepository } from "../repositories/ideaRepository";
import { VoteRepository } from "../repositories/voteRepository";

export class VoteService {
  private ideaRepository: IdeaRepository;
  private voteRepository: VoteRepository;

  constructor() {
    this.ideaRepository = new IdeaRepository();
    this.voteRepository = new VoteRepository();
  }

  async voteForIdea(ideaId: number, ipAddress: string) {
    const idea = await this.ideaRepository.findById(ideaId);
    if (!idea) {
      throw new Error("IDEA_NOT_FOUND");
    }

    const voteCount = await this.voteRepository.getVoteCountByIp(ipAddress);
    if (voteCount >= 10) {
      throw new Error("VOTE_LIMIT_EXCEEDED");
    }

    const existingVote = await this.voteRepository.findVote(ipAddress, ideaId);
    if (existingVote) {
      throw new Error("ALREADY_VOTED");
    }

    await this.voteRepository.createVote(ipAddress, ideaId);
    const newVoteCount = await this.ideaRepository.incrementVotes(ideaId);

    return { success: true, newVoteCount: newVoteCount };
  }

  async getVotesByIp(ipAddress: string) {
    const votes = await this.voteRepository.findVotesByIp(ipAddress);
    return votes.map((vote) => vote.idea_id);
  }
}
