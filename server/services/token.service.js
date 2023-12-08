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
    return { accessToken, refreshToken, expiresIn: 3600 };
  };

  async save(user, refreshToken) {
    const data = await Token.findOne({ user });
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }

    const token = await Token.create({ user, refreshToken });
    return token;
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("JWT_SECRET_REFRESH"));
    } catch (e) {
      return null;
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get("JWT_SECRET"));
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
