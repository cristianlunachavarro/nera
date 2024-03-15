import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, MenuItem, Card, CardContent } from "@mui/material";

import * as yup from "yup";

import { useContext } from "react";
import { TransactionsContext } from "@/context/transactions";

import styles from "./TransactionForm.module.css";

enum TransactionType {
  Deposit = "deposit",
  Withdraw = "withdraw",
}

const transactionSchema = yup.object({
  amount: yup.number().label("Amount").min(1000).max(100000).required(),
  transactionType: yup
    .string()
    .oneOf(Object.values(TransactionType))
    .required(),
});

const TransactionFrom = () => {
  const { createTransaction } = useContext(TransactionsContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(transactionSchema),
    defaultValues: { transactionType: TransactionType.Deposit },
  });

  type TransType = yup.InferType<typeof transactionSchema>;

  const onSubmit = (value: TransType) => {
    createTransaction(value);
    reset()
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <h1>Make Transaction</h1>
      <Card sx={{ margin: "0 auto" }}>
        <CardContent>
          <Controller
            name="transactionType"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Transaction Type"
                className={styles.input}
                error={!!errors.transactionType}
                helperText={errors.transactionType?.message}
              >
                <MenuItem value="deposit">Deposit</MenuItem>
                <MenuItem value="withdraw">Withdraw</MenuItem>
              </TextField>
            )}
          />
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                label="Amount"
                placeholder="Set your Amount"
                autoFocus
                className={styles.input}
                error={!!errors.amount}
                helperText={errors.amount?.message}
                {...field}
              />
            )}
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            sx={{ textAlign: "center" }}
          >
            Make Transaction
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default TransactionFrom;
