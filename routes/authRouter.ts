import { Router } from "express";
import userController from "../controller/userController";
import Validate from "../schemas/validate";
import Users from "../schemas/users";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.post("/register/", Validate(Users.store), userController.store);
router.post("/login/", Validate(Users.login), userController.login);

router.use(verifyToken);

router.get("/User/:id?", userController.index);
router.put("/User/:id", Validate(Users.update), userController.update);
router.delete("/User/:id", Validate(Users.delete), userController.delete);

export default router;
