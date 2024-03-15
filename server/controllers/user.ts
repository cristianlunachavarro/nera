import express, { Request, Response } from "express";
import UserModel, { UserType } from "../models/user";

import { v4 as uuidv4 } from "uuid";
import { TransactionModel } from "../models/transaction";

export const login = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    if (!req.isAuthenticated()) {
      return res.status(200).json({ error: "Authentication failed" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error logging in an User:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, lastname, username, password, balance } = req.body;

    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(200).json({
        error: "User already exists",
      });
    }

    const accountId = uuidv4();

    const newUser = new UserModel({
      name,
      lastname,
      username,
      password,
      balance,
      accountId,
    });

    const transaction = new TransactionModel({
      userId: newUser._id,
      transactionType: 'deposit',
      amount: balance,
    });

    const [savedUser, savedTransaction] = await Promise.all([newUser.save(), transaction.save()]);

    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error creating an User:", err);
    res.status(500).send("Internal Server Error");
  }
};

export const logout = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    console.log("usuario deslogueado");
    req.logout(() => {});
  }
  res.sendStatus(200);
};
