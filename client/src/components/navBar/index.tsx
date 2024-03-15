import React, { useContext } from "react";
import { useRouter } from "next/router";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { AuthContext } from "@/context/auth";
import useAuthentication from "@/hooks/useIsAuth";

const NavBar = () => {
  const { logout } = useContext(AuthContext);
  const { isAuthenticated } = useAuthentication();

  const router = useRouter();
  const currentPath = router.pathname;

  const handleLogout = () => {
    logout();
  };

  const handleChangeView = (path: string) => {
    router.push(path);
  };

  const TextButton = () => {
    return currentPath === "/login" ? (
      <Button color="inherit" onClick={() => handleChangeView("/register")}>
        Register
      </Button>
    ) : (
      <Button color="inherit" onClick={() => handleChangeView("/login")}>
        Login
      </Button>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            {isAuthenticated ? (
              <>
                <Button
                  color="inherit"
                  onClick={() => handleChangeView("transaction")}
                >
                  Transaction
                </Button>
              </>
            ) : null}
          </Box>
          <Box>
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <TextButton />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
