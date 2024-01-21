import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import encryptSecret from "../../secret";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  token = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, encryptSecret) as JwtPayload;
    (req as CustomRequest).token = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};
