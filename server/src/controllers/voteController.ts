import { Request, Response } from "express";
import { VoteService } from "../services/voteService";

const voteService = new VoteService();

export const voteForIdea = async (req: Request, res: Response) => {
  try {
    const { ideaId } = req.params;
    const ipAddress = req.clientIp || "unknown";

    const result = await voteService.voteForIdea(Number(ideaId), ipAddress);

    res.json({
      success: true,
      message: "Vote counted",
      newVoteCount: result.newVoteCount,
    });
  } catch (error: any) {
    switch (error.message) {
      case "IDEA_NOT_FOUND":
        return res.status(404).json({ error: "Not found" });
      case "VOTE_LIMIT_EXCEEDED":
        return res.status(409).json({ error: "Vote limit exceeded" });
      case "ALREADY_VOTED":
        return res.status(409).json({ error: "Already voted" });
      default:
        return res.status(500).json({ error: "Internal server error" });
    }
  }
};
