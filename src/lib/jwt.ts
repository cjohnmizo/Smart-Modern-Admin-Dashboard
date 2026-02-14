import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is missing");

export const generateToken = (id: string) =>
    jwt.sign({ id }, JWT_SECRET, { expiresIn: "30d" });
