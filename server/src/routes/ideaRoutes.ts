import { Router } from "express";
import { getIdeas, getIdeaById } from "../controllers/ideaController";

const router = Router();

router.get("/ideas", getIdeas);
router.get("/ideas/:id", getIdeaById);

export default router;
