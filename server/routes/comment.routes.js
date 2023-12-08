import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import Comment from "../models/Comments.js";
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Comment.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (e) {
      res.status(500).json({ message: "Error:" + e.message });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newComment);
    } catch (e) {
      res.status(500).json({ message: "Error:" + e.message });
    }
  });

router.delete("/:commentId", auth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const removedComment = await Comment.findById(commentId);

    if (removedComment.userId.toString() === req.user._id) {
      await removedComment.remove();
      return res.status(200).json({
        message: "Comment deleted",
        code: 200,
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({ message: "Error:" + e.message });
  }
});

export default router;
