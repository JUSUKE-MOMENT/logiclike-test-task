import { Router } from "express";
import {
  getVotesByIp,
  subscribeVotes,
  voteForIdea,
} from "../controllers/voteController";

const router = Router();

router.post("/ideas/:ideaId/vote", voteForIdea);
router.get("/votes-by-ip", getVotesByIp);
router.get("/votes/stream", subscribeVotes);

export default router;
