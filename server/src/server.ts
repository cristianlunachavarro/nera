import express, { Request, Response, NextFunction } from "express";
import path from "path";
import morgan from "morgan";
import session from "express-session";
import cors from "cors";

import router from "../routes/index";
import passport from "../config/passport";

require("../config/db");

interface AppError extends Error {
  status?: number;
}

const app = express();

app.use(cors({ origin: "*" }));

console.log("Iniciando servidor");

app.use(express.static(path.join(__dirname, "/public")));
app.use(morgan("dev"));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(
  session({
    secret: "myPersonalBlog",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

app.use(function (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;