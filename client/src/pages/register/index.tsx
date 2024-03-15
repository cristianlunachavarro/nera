import { useContext } from "react";

import { Button, TextField } from "@mui/material";

import * as yup from "yup";

import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import Layout from "@/components/layout";
import styles from "./Register.module.css";

const registerSchema = yup.object({
  username: yup.string().label("Username").min(2).required(),
  password: yup.string().label("Password").min(6).max(16).required(),
  name: yup.string().label("Name").min(2).required(),
  lastname: yup.string().label("Lastname").min(2).required(),
  balance: yup.number().label("Balance").min(3).required(),
});

const Register = () => {
  const router = useRouter();

  const { register } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { username: "", password: "" },
  });

  type RegisterType = yup.InferType<typeof registerSchema>;

  const onSubmit = (value: RegisterType) => {
    register(value);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.registerContainer}>
          <h1>Register</h1>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Name"
                placeholder="First Name"
                autoFocus
                className={styles.input}
                error={!!errors.name}
                helperText={errors.name?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            render={({ field }) => (
              <TextField
                label="Lastname"
                placeholder="Lastname"
                className={styles.input}
                error={!!errors.lastname}
                helperText={errors.lastname?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                label="E-mail"
                placeholder="Use your E-mail"
                className={styles.input}
                error={!!errors.username}
                helperText={errors.username?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                label="Password"
                placeholder="Create a strong password"
                className={styles.input}
                error={!!errors.password}
                helperText={errors.password?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="balance"
            control={control}
            render={({ field }) => (
              <TextField
                type="number"
                label="Initial Balance"
                placeholder="Add your initial balance"
                className={styles.input}
                error={!!errors.balance}
                helperText={errors.balance?.message}
                {...field}
              />
            )}
          />
          <Button onClick={handleSubmit(onSubmit)}>Create Account</Button>
          <Button onClick={() => router.push("login")}>Go to Login</Button>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
