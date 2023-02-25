import { useEffect } from "react";

export default function Netflix() {
  useEffect(() => {
    api.launchWeb("https://netflix.com");
  }, []);

  return <></>;
}
