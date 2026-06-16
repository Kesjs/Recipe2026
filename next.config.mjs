/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ✅ Formats modernes activés — Next.js sert AVIF puis WebP automatiquement
    // selon le support navigateur (Content-Type négocié via Accept header)
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.over-blog-kiwi.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "www.kingnature.ch",
      },
      {
        protocol: "https",
        hostname: "tarasmulticulturaltable.com",
      },
    ],

    // ✅ Tailles d'images adaptées aux breakpoints du projet
    // Évite de générer des variantes inutiles
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;