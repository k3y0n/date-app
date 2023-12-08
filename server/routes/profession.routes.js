import express from "express";
import Profession from "../models/Professions.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (_, res) => {
  try {
    const profession = await Profession.find();
    res.status(200).send(profession);
  } catch (error) {
    res.status(500).json({
      message: "Error:" + error.message,
    });
  }
});

export default router;
