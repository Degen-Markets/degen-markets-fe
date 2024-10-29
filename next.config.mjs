/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "degen-markets-static.s3.eu-west-1.amazonaws.com", // static images like logos/banners etc
      },
      {
        protocol: "https",
        hostname:
          "solanaactionsapi-bucket83908e77-ljhpui3hea4b.s3.eu-west-1.amazonaws.com", // prod SolanaActions stack
      },
      {
        protocol: "https",
        hostname:
          "clientapi-bucket83908e77-9tkuoz8eizrb.s3.eu-west-1.amazonaws.com", // prod ClientApi stack
      },
      {
        protocol: "https",
        hostname:
          "devclientapi-bucket83908e77-4gygtqz1u9ig.s3.us-east-1.amazonaws.com", // dev ClientApi stack
      },
      {
        protocol: "https",
        hostname:
          "devsolanaactionsapi-bucket83908e77-vjeyt41ym9km.s3.us-east-1.amazonaws.com", // dev SolanaActions stack
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com", // Twitter/X images
      },
    ],
  },
};

export default nextConfig;
