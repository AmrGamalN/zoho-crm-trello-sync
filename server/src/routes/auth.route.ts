import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { HandleError } from "../middlewares/error.middleware";
const { handleError } = HandleError.getInstance();
const controller = AuthController.getInstance();
const router = Router();

router.get("/", handleError(controller.redirectAuth.bind(controller)));
router.get("/login", handleError(controller.login.bind(controller)));
export default router;
