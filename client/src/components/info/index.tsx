import { useContext } from "react";
import { AuthContext } from "@/context/auth/AuthContext";
import { Card, CardContent, Typography, Grid, Divider } from "@mui/material";

import styles from "./Info.module.css";

const Info = () => {
  const { user } = useContext(AuthContext);

  const formatAmount = (amount: number | undefined) => {
    return amount && amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className={styles.infoContainer}>
      <h1>Account Information</h1>
      <Divider />
      <Card sx={{ margin: "0 auto" }}>
        <CardContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography align="center" gutterBottom>
                {user?.name} {user?.lastname}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="center" color="textSecondary">
                Account Number:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                {user?.accountId}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="center" color="textSecondary">
                Balance:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                $ {formatAmount(user?.balance)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Info;
