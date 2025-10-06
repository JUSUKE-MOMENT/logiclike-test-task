import prisma from "../config/database";

export class VoteRepository {
  async getVoteCountByIp(ipAddress: string) {
    return await prisma.vote.count({
      where: {
        ip_address: ipAddress,
      },
    });
  }

  async findVote(ipAddress: string, ideaId: number) {
    return await prisma.vote.findUnique({
      where: {
        ip_address_idea_id: {
          ip_address: ipAddress,
          idea_id: ideaId,
        },
      },
    });
  }

  async createVote(ipAddress: string, ideaId: number) {
    return await prisma.vote.create({
      data: {
        ip_address: ipAddress,
        idea_id: ideaId,
      },
    });
  }

  async findVotesByIp(ipAddress: string) {
    return await prisma.vote.findMany({
      where: { ip_address: ipAddress },
      select: { idea_id: true },
    });
  }
}
