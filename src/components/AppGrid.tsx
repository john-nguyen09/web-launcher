import styles from "../styles/AppGrid.module.scss";
import NetflixLogo from "../assets/images/netflix-logo.inline.svg";
import { Link } from "react-router-dom";

export default function AppGrid() {
  return (
    <div className={styles.root}>
      <div className={styles.column}>
        <div className={styles.tileWrapper}>
          <Link to="/netflix" className={styles.tile}>
            <div className={styles.logo}>
              <NetflixLogo />
            </div>
            {/* <div className={styles.title}>Netflix</div> */}
          </Link>
        </div>
      </div>
    </div>
  );
}
