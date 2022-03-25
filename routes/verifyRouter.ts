import { Router } from "express";
import verifyController from "../controller/verifyController";

const router = Router();

router.post("/verifytoken", verifyController.store);

export default router;
