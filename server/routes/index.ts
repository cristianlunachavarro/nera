const express = require("express");
const router = express.Router();

import userRouter from "./auth";
import transactiosnRouter from "./transaction";

router.use("/user", userRouter);
router.use("/transactions", transactiosnRouter);

export default router;
