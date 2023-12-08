import express from "express";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import { randomData } from "../utils/randomData.js";
import { check, validationResult } from "express-validator";
import TokenService from "../services/token.service.js";

const router = express.Router({ mergeParams: true });

const signUpValidator = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Email is required").not().isEmpty().isEmail(),
  check("password", "Min length password 8 symbols")
    .not()
    .isEmpty()
    .isLength({ min: 8 }),
];

const signInValidator = [
  check("email", "Email not correct")
    .not()
    .isEmpty()
    .normalizeEmail()
    .isEmail(),
  check("password", "Password not correct").not().isEmpty().exists(),
];

router.post("/signUp", signUpValidator, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
          code: 400,
        },
      });
    }

    const { email, password, name } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: {
          message: "User already exists",
          code: 400,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      image:
        "https://api.dicebear.com/7.x/personas/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=" +
        name,
      rate: randomData(1, 5),
      completedMeetings: randomData(0, 200),
      ...req.body,
      password: hashedPassword,
    });

    const tokens = TokenService.generateToken({ _id: newUser._id });
    await TokenService.save(newUser._id, tokens.refreshToken);

    return res.status(201).send({
      ...tokens,
      userId: newUser._id,
      message: "User created successfully",
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error:" + error.message,
    });
  }
});

router.post("/signInWithPassword", signInValidator, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
          code: 400,
        },
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: {
          message: "User not found",
          code: 400,
        },
      });
    }

    const isConfirmed = await bcrypt.compare(password, user.password);

    if (!isConfirmed) {
      return res.status(400).json({
        error: {
          message: "Password not correct",
          code: 400,
        },
      });
    }

    const tokens = TokenService.generateToken({ _id: user._id });
    await TokenService.save(user._id, tokens.refreshToken);

    return res.status(200).json({
      ...tokens,
      userId: user._id,
      message: "User logged in successfully",
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error:" + error.message,
    });
  }
});

router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = TokenService.validateRefresh(refreshToken);
    const dbToken = await TokenService.findToken(refreshToken);

    if (!data || !dbToken || data._id !== dbToken?.userId?.toString()) {
      return res.status(401).json({ message: "Unauthorized", code: 401 });
    }

    const tokens = TokenService.generateToken({
      _id: data._id,
    });

    await TokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (error) {
    res.status(500).json({
      message: "Error:" + error.message,
    });
  }
});

export default router;
