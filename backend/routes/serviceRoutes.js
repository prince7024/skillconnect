import express from "express";
import { createService, getAll, getMyServices,searchServices,deleteService,updateService } from "../controllers/serviceController.js";
import { protect, restrictTo } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, restrictTo("provider"), createService);
router.get("/", getAll);
router.get("/my", protect, restrictTo("provider"), getMyServices);
router.get("/search", searchServices);
router.delete("/:id", protect, restrictTo("provider"), deleteService);
router.put("/:id", protect, restrictTo("provider"), updateService);


export default router;
