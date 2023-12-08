import express from "express";
import Quality from "../models/Qualities.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (_, res) => {
  try {
    const quality = await Quality.find();
    res.status(200).send(quality);
  } catch (error) {
    res.status(500).json({
      message: "Error:" + error.message,
    });
  }
});

export default router;
