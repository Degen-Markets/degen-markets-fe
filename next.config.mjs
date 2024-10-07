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
      {
        protocol: "https",
        hostname: "**", // This should be removed in the future when we update the implementation to host the images in our S3 bucket.
      },
    ],
  },
};

export default nextConfig;
