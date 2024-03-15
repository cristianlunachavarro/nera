import express from "express";
import passport from "passport";
import { getTransactions, createTransaction } from "../controllers/transaction";

const router = express.Router();

router.get("/:userId", getTransactions);
router.post("/create", createTransaction)


export default router;
