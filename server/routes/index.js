import express from "express";
import authRoutes from "./auth.routes.js";
import qualityRoutes from "./quality.routes.js";
import professionRoutes from "./profession.routes.js";

const router = express.Router({ mergeParams: true });

router.use("/auth", authRoutes);
router.use("/comment", authRoutes);
router.use("/quality", qualityRoutes);
router.use("/profession", professionRoutes);
router.use("/user", authRoutes);

export default router;
