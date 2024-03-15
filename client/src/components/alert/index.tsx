import { useContext, useEffect, useState } from "react";

import Alert from "@mui/material/Alert";
import ClearIcon from "@mui/icons-material/Clear";

import { TransactionsContext } from "@/context/transactions";
import { AuthContext } from "@/context/auth";

const AlertComponent = () => {
  const { error: transError, clearError: cleanUserError } =
    useContext(TransactionsContext);

  const { error: userError, cleanError: cleanTransError } =
    useContext(AuthContext);

  const handleClose = () => {
    cleanUserError();
    cleanTransError();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [transError, userError]);

  const error = (userError && userError.length > 0) ? userError : transError;

  return (
    <Alert
      icon={<ClearIcon fontSize="inherit" />}
      severity="error"
      onClose={handleClose}
      style={{
        visibility: !error ? "hidden" : "visible",
        width: "50%",
        margin: "0 auto",
      }}
    >
      {error}
    </Alert>
  );
};

export default AlertComponent;
