import { ReactElement } from "react";

import styles from "../styles/Layout.module.scss";
import NavigationBar from "./NavigationBar";

interface Props {
  children?: ReactElement;
}

export default function Layout({ children }: Props) {
  return (
    <div className={styles.root}>
      {children}
      <div className={styles.navBarWrapper}>
        <NavigationBar />
      </div>
    </div>
  );
}
