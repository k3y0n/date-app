import express from "express";
import User from "../models/Users.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (_, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    res.status(500).json({
      message: "Error:" + error.message,
    });
  }
});

router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.status(200).send(updatedUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error:" + error.message,
    });
  }
});

export default router;
