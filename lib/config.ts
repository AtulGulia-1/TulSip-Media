export const CONFIG = {
  brandName: "TulSip Media",
  tagline: "Local brands. Global Signals.",
  positioning: "We turn local brands into global attention.",
  siteUrl: "https://www.tulsipmedia.com",
  bookCallUrl: "/contact",
  logoPath: "/logo.png",
  cameraFallbackImage: "/camera-fallback.png",
  whatsappNumber: "919821005996",
  whatsappMessage: "Hi TulSip Media, I want to grow my brand.",
  upiId: process.env.UPI_ID ?? "yourupi@bank",
  upiPayeeName: process.env.UPI_PAYEE_NAME ?? "TulSip Media",
  paymentsEnabled: (process.env.NEXT_PUBLIC_PAYMENTS_ENABLED ?? process.env.PAYMENTS_ENABLED) !== "false",
  officeAddress: "Najafgarh, New Delhi, India",
  contactEmail: "hello@tulsipmedia.com",
  contactPhone: "+91 98210 05996",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=Najafgarh,+New+Delhi,+India&output=embed",
  googleMapsLocationUrl:
    "https://maps.app.goo.gl/G5c5Ngtxf9MgVH8z6?g_st=ic",
  socialLinks: {
    instagram: "https://www.instagram.com/tulsipmedia/",
    twitter: "https://x.com/TulSipMedia",
    linkedin: "https://www.linkedin.com/in/tulsip-media-189251401",
    facebook: "https://www.facebook.com/profile.php?id=61574364127948",
    youtube: "https://www.instagram.com/tulsipmedia/"
  },
  splineEnabled: false,
  splineSceneUrl: "https://prod.spline.design/your-scene/scene.splinecode"
} as const;


