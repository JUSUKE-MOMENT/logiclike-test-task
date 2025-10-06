import prisma from "../config/database";

export class IdeaRepository {
  async findAll() {
    return await prisma.idea.findMany({
      orderBy: {
        votes_count: "desc",
      },
    });
  }

  async findById(id: number) {
    return await prisma.idea.findUnique({
      where: { id },
    });
  }

  async incrementVotes(id: number) {
    const updated = await prisma.idea.update({
      where: { id },
      data: {
        votes_count: {
          increment: 1,
        },
      },
    });
    return updated.votes_count;
  }
}
