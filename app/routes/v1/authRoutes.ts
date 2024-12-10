import { Router } from "express";
import { userLogin } from "../../controllers/authController";

const router = Router();

router.post("/login", userLogin);

export default router;
