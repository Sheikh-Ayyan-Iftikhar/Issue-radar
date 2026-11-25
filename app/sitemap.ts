import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://firstissue-radar.vercel.app", lastModified: new Date() },
    { url: "https://firstissue-radar.vercel.app/explore", lastModified: new Date() },
    { url: "https://firstissue-radar.vercel.app/saved", lastModified: new Date() },
    { url: "https://firstissue-radar.vercel.app/about", lastModified: new Date() },
    { url: "https://firstissue-radar.vercel.app/docs", lastModified: new Date() },
  ];
}
