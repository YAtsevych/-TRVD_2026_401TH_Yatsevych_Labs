import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No Authorization header" });
    }

    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid Authorization format" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { idUser, email, ... }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
