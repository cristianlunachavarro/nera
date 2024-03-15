import mongoose, { Schema } from "mongoose";

enum TransactionType {
  Deposit = "deposit",
  Withdraw = "withdraw",
}

const transactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  transactionType: { type: String, enum: Object.values(TransactionType), required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const TransactionModel =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export { TransactionModel, TransactionType };

