import { IdeaRepository } from "../repositories/ideaRepository";

export class IdeaService {
  private ideaRepository: IdeaRepository;

  constructor() {
    this.ideaRepository = new IdeaRepository();
  }

  async getAllIdeas() {
    return await this.ideaRepository.findAll();
  }

  async getIdeaById(id: number) {
    return await this.ideaRepository.findById(id);
  }
}
