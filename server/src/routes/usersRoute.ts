import { Router } from "express";
import { detail, logIn, register } from "../controllers/usersController";

const router = Router();

router.post("/register", register);
router.post("/login", logIn);

router.get("/detail/:email?", detail);

export default router;
