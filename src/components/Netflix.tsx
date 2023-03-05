import injectionCSS from "@/lib/injection/netflix.scss?inline";
import injectionJS from "@/lib/injection/netflix?raw";
import useLaunchWeb from "@/lib/useLaunchWeb";

export default function Netflix() {
  useLaunchWeb("https://tv.netflix.com", {
    injectionCSS,
    injectionJS,
    userAgent: "Roku/DVP-9.10 (519.10E04111A)",
  });

  return <></>;
}
