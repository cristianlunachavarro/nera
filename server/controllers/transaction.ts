import { Request, Response } from "express";

import { TransactionModel } from "../models/transaction";
import UserModel from "../models/user";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { userId, transactionType, amount } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (transactionType === "withdraw" && amount > user.balance) {
      return res.status(200).json({ error: "Insufficient balance" });
    }

    const transaction = new TransactionModel({
      userId,
      transactionType,
      amount,
    });

    switch (transactionType) {
      case "deposit":
        user.balance += amount;
        break;
      case "withdraw":
        user.balance -= amount;
        break;
        default:
          'deposit'
    }
    
    await Promise.all([transaction.save(), user.save()]);

    const transactions = await TransactionModel.find({userId})

    res.status(201).json({transactions, user});
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const transactions = await TransactionModel.find({ userId });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
