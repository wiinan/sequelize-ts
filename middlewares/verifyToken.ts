import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  req.method === "OPTIONS" && next();

  try {
    const authHeader = await req.headers["token"].replace(/^JWT\s/, "");

    if (!authHeader) {
      return res.status(401).json("Token nao authenticado");
    }

    const tokenVerificated = jwt.verify(authHeader, process.env.JWT_SECRET);

    if (!tokenVerificated) {
      return res.status(401).json("Usuario Invalido!");
    }

    req.currentUser = tokenVerificated;

    next();
  } catch (err) {
    res.status(401).json({ Expirado: "Token Expirado!" });
  }
};

export default verifyToken;
