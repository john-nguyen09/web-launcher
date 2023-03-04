import injectionCSS from "@/lib/injection/netflix.scss?inline";
import injectionJS from "@/lib/injection/netflix?raw";
import useLaunchWeb from "@/lib/useLaunchWeb";

export default function Netflix() {
  useLaunchWeb("https://netflix.com", {
    injectionCSS,
    injectionJS,
  });

  return <></>;
}
