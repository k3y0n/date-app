import express from "express";
import User from "../models/Users.js";

const router = express.Router({ mergeParams: true });

router.get("/user", async (_, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    res.status(500).json({
      message: "Error:" + error.message,
    });
  }
});

router.patch("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
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
