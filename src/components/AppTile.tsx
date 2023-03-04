import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import { To } from "react-router";
import { Link } from "react-router-dom";

import styles from "../styles/AppTile.module.scss";

interface Props {
  to: To;
}

export default function AppTile({ to, children }: PropsWithChildren<Props>) {
  const { ref, focused } = useFocusable({
    onEnterPress() {
      ref.current && ref.current.click();
    },
  });

  return (
    <Link
      to={to}
      className={classNames(styles.column, { [styles.focused]: focused })}
      ref={ref}
    >
      <div className={styles.tileWrapper}>
        <div className={styles.tile}>
          <div className={styles.logo}>{children}</div>
        </div>
      </div>
    </Link>
  );
}
