/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "placekitten.com",
      },
      {
        hostname: "placebeard.it",
      },
      {
        hostname: "storage.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;
