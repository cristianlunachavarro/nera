import express from "express";
import passport from "passport";
import { login, register, logout } from "../controllers/user";

const router = express.Router();

router.post("/login", passport.authenticate("local"), login);
router.post("/logout", logout)
router.post("/register", register);


export default router;
