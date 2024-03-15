import { FC, ReactNode } from "react";
import NavBar from "@/components/navBar";

import styles from "./Layout.module.css";
import Alert from "../alert";
import Loader from "../loader";

interface LayoutPros {
  children: ReactNode | undefined;
}

const Layout: FC<LayoutPros> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <Alert />
      <div className={styles.layoutContainer}>{children}</div>
      <Loader />
    </div>
  );
};

export default Layout;
