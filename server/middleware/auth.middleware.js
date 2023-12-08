import TokenService from "../services/token.service.js";

export const auth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const data = TokenService.validateAccess(token);

    req.user = data;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
