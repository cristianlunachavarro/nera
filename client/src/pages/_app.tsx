// import "@/styles/globals.css";
import type { AppProps } from "next/app";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { darkTheme } from "../themes/index";
import { AuthProvider } from "@/context/auth";
import { TransactionsProvider } from "@/context/transactions";

export default function App({ Component, pageProps }: AppProps) {


  return (
    <AuthProvider>
      <TransactionsProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} raton={true} />
        </ThemeProvider>
      </TransactionsProvider>
    </AuthProvider>
  );
}
