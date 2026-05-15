import type { MetadataRoute } from "next";
import { POPULAR_NPM, POPULAR_PYPI } from "@/data/popular";

const BASE = "https://freshdeps.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];
  for (const pkg of POPULAR_NPM) {
    pages.push({
      url: `${BASE}/npm/${encodeURIComponent(pkg)}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    });
  }
  for (const pkg of POPULAR_PYPI) {
    pages.push({
      url: `${BASE}/pypi/${encodeURIComponent(pkg)}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    });
  }
  return pages;
}
