import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TulSip Media",
    short_name: "TulSip",
    description: "Local brands. Global Voices.",
    start_url: "/",
    display: "standalone",
    background_color: "#140606",
    theme_color: "#b31313",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png"
      }
    ]
  };
}
