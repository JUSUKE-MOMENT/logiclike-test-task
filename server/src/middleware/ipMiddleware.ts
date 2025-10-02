import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      clientIp?: string;
    }
  }
}

export const getClientIp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let clientIp = "unknown";

  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    clientIp = Array.isArray(forwarded)
      ? forwarded[0]
      : forwarded.split(",")[0].trim();
  } else if (req.socket?.remoteAddress) {
    clientIp = req.socket.remoteAddress;
  }

  if (clientIp.startsWith("::ffff:")) {
    clientIp = clientIp.substring(7);
  }

  req.clientIp = clientIp;
  next();
};
