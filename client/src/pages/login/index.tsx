import { useContext } from "react";

import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "@/context/auth";
import { useForm, Controller } from "react-hook-form";

import Layout from "@/components/layout";
import styles from "./Login.module.css";

const loginSchema = yup.object({
  username: yup.string().label('Username').min(10).required(),
  password: yup
  .string()
  .label('Password')
  .min(5)
  .required(),
});


const Login = () => {
  const router = useRouter();
  
  const { login } = useContext(AuthContext);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });
  
  type LoginType = yup.InferType<typeof loginSchema>;
  
  const onSubmit = (value: LoginType) => {
    login(value);
  };

  return (
    <Layout>
      <form className={styles.loginContainer} onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              label="E-mail"
              placeholder="Use your E-mail"
              autoFocus
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
              placeholder="Password"
              type="password"
              className={styles.input}
              error={!!errors.password}
              helperText={errors.password?.message}
              {...field}
            />
          )}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={Object.keys(errors).length !== 0}
        >
          Login
        </Button>
        <Button onClick={() => router.push("register")}>Register</Button>
      </form>
    </Layout>
  );
};

export default Login;
