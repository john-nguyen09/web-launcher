import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useEffect } from "react";

import { ReactComponent as NetflixLogo } from "../assets/images/netflix-logo.inline.svg";
import { ReactComponent as YoutubeLogo } from "../assets/images/youtube-logo.inline.svg";
import styles from "../styles/AppGrid.module.scss";
import AppTile from "./AppTile";

export default function AppGrid() {
  const { ref, focusKey, focusSelf } = useFocusable();

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <div className={styles.root}>
      <FocusContext.Provider value={focusKey}>
        <div className={styles.row} ref={ref}>
          <AppTile to="/netflix">
            <NetflixLogo />
          </AppTile>

          <AppTile to="/">
            <YoutubeLogo className={styles.youtube} />
          </AppTile>
        </div>
      </FocusContext.Provider>
    </div>
  );
}
