import useLaunchWeb from "@/lib/useLaunchWeb";

export default function Youtube() {
  useLaunchWeb("https://youtube.com/tv", {
    userAgent: "Roku/DVP-9.10 (519.10E04111A)",
  });

  return <></>;
}
