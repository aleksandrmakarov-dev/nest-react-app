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
    ],
  },
};

module.exports = nextConfig;
