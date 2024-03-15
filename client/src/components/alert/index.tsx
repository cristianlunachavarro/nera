import { useContext, useEffect } from "react";

import Alert from "@mui/material/Alert";
import ClearIcon from "@mui/icons-material/Clear";

import { TransactionsContext } from "@/context/transactions";

const AlertComponent = () => {
  const { error, clearError } = useContext(TransactionsContext);

  const handleClose = () => {
    clearError();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <Alert
      icon={<ClearIcon fontSize="inherit" />}
      severity="error"
      onClose={handleClose}
      style={{ visibility: !error ? "hidden" : "visible", width: '50%', margin: '0 auto' }}
    >
      {error}
    </Alert>
  );
};

export default AlertComponent;
