import { Router } from "express";
import requestController from "../controller/requestController";
import Validate from "../schemas/validate";
import Request from "../schemas/requests";

const router = Router();

router.get("/request/:id?", requestController.index);
router.post("/request/", Validate(Request.store), requestController.store);
router.put("/request/:id", Validate(Request.update),requestController.update);
router.delete("/request/:id", Validate(Request.delete),requestController.delete);

export default router;