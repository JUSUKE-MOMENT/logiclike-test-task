import { Request, Response } from "express";
import { VoteService } from "../services/voteService";

const voteService = new VoteService();

type Client = {
  id: string;
  res: Response;
  ip: string;
};

let clients: Client[] = [];

export const voteForIdea = async (req: Request, res: Response) => {
  try {
    const { ideaId } = req.params;
    const ipAddress = req.clientIp || "unknown";

    const result = await voteService.voteForIdea(Number(ideaId), ipAddress);

    const globalData = JSON.stringify({
      ideaId,
      newVoteCount: result.newVoteCount,
    });
    clients.forEach((client) => {
      client.res.write(`event: vote\n`);
      client.res.write(`data: ${globalData}\n\n`);
      client.res.flush?.();
    });

    const votedIdeaIds = await voteService.getVotesByIp(ipAddress);
    const personalData = JSON.stringify({
      votedIdeaIds,
      voteLimitReached: votedIdeaIds.length >= 10,
    });
    clients
      .filter((client) => client.ip === ipAddress)
      .forEach((client) => {
        client.res.write(`event: personal\n`);
        client.res.write(`data: ${personalData}\n\n`);
        client.res.flush?.();
      });

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

export const getVotesByIp = async (req: Request, res: Response) => {
  try {
    const ipAddress = req.clientIp || "unknown";
    const votedIdeaIds = await voteService.getVotesByIp(ipAddress);
    const voteLimitReached = votedIdeaIds.length >= 10;

    res.json({ votedIdeaIds, voteLimitReached });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const subscribeVotes = (req: Request, res: Response) => {
  const clientId = crypto.randomUUID();
  const ipAddress = req.clientIp || "unknown";

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  const client: Client = { id: clientId, res, ip: ipAddress };
  clients.push(client);

  const heartbeat = setInterval(() => {
    if (!res.writableEnded) {
      res.write(": heartbeat\n\n");
    }
  }, 30000);

  (async () => {
    try {
      const votedIdeaIds = await voteService.getVotesByIp(ipAddress);
      const voteLimitReached = votedIdeaIds.length >= 10;

      if (!res.writableEnded) {
        res.write(`event: personal\n`);
        res.write(
          `data: ${JSON.stringify({ votedIdeaIds, voteLimitReached })}\n\n`
        );
      }
    } catch (error) {
      console.error("Error sending initial SSE data:", error);
    }
  })();

  const cleanup = () => {
    clearInterval(heartbeat);
    clients = clients.filter((client) => client.id !== clientId);
    console.log(
      `Client ${clientId} disconnected. Remaining: ${clients.length}`
    );
  };

  req.on("close", cleanup);
  req.on("error", cleanup);
};
