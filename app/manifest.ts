import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FirstIssue Radar",
    short_name: "FirstIssue",
    description: "Find real, open GitHub issues matching your language and skill level.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [{ src: "/icon.png", sizes: "192x192", type: "image/png" }],
  };
}
