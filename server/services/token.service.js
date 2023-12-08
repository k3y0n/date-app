import jwt from "jsonwebtoken";
import Token from "../models/Token.js";
import config from "config";

class TokenService {
  generateToken = (data) => {
    const accessToken = jwt.sign(data, config.get("JWT_SECRET"), {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(data, config.get("JWT_SECRET_REFRESH"), {
      expiresIn: 3600,
    });
    return { accessToken, refreshToken };
  };

  async save(userId, refreshToken) {
    await Token.findOne({ userId: userId });
  }
}
