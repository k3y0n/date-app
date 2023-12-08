import express from "express";
import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import { randomData } from "../utils/randomData.js";
import TokenService from "../services/TokenService.js";
const router = express.Router({ mergeParams: true });

router.post("/signUp", async (req, res) => {
  try {
    const { email, password, name, ...data } = req.body;

    const user = await Users.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        error: {
          message: "User already exists",
          code: 400,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = Users.create({
      email: email,
      password: hashedPassword,
      image:
        "https://api.dicebear.com/7.x/personas/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=" +
        name,
      rate: randomData(1, 5),
      completedMeetings: randomData(0, 200),
      ...data,
    });

    const tokens = TokenService.generateToken({ _id: newUser._id });

    return res.status(201).send({
      ...tokens,
      userID: newUser._id,
      message: "User created successfully",
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error:" + error.message,
    });
  }
});

router.post("/signInWithPassword", async (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (error) {}
});

router.post("/token", async (req, res) => {
  try {
  } catch (error) {}
});

export default router;
