import { Request, Response } from "express";
import jwt from "jsonwebtoken";

class verifyToken {
  async store(req: Request, res: Response) {
    const token = req.body.token || "";
    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      return res.status(200).send({ valid: true });
    });
  }
}

export default new verifyToken();
