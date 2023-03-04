import { LaunchWebOptions } from "common/api";
import { useEffect } from "react";

export default function useLaunchWeb(url: string, options: LaunchWebOptions = {}) {
  useEffect(() => {
    api.launchWeb(url, options);

    return () => api.closeWeb();
  }, []);
}
