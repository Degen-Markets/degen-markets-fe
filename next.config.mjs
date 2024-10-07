/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "degen-markets-static.s3.eu-west-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
