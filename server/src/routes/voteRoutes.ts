import { Router } from "express";
import { voteForIdea } from "../controllers/voteController";

const router = Router();

router.post("/ideas/:ideaId/vote", voteForIdea);

export default router;
