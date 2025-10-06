import { Request, Response } from "express";
import { IdeaService } from "../services/ideaService";

const ideaService = new IdeaService();

export const getIdeas = async (req: Request, res: Response) => {
  try {
    const ideas = await ideaService.getAllIdeas();
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getIdeaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idea = await ideaService.getIdeaById(Number(id));

    if (!idea) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(idea);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
