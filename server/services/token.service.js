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

  async save(userId, refreshToken) {
    const data = await Token.findOne({ userId });
    console.log("enter save");

    if (data) {
      data.refreshToken = refreshToken;
      console.log("done");
      return data.save();
    }

    const token = await Token.create({
      userId,
      refreshToken,
    });

    console.log("token", token);

    // return token;
  }
}

export default new TokenService();
