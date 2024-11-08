const devConfig = {
  API_BASE_URL: "https://dev-api.degenmarkets.com",
  HELIUS_RPC_URL:
    "https://devnet.helius-rpc.com/?api-key=d89de0bd-ea34-4f41-9f17-5e0715a54d78",
  ACTION_API_URL: "https://dev.degenmarkets.com",
  ACTION_API_PATH: "https://dev-actions.degenmarkets.com",
};

const prodConfig = {
  API_BASE_URL: "https://api.degenmarkets.com",
  HELIUS_RPC_URL:
    "https://mainnet.helius-rpc.com/?api-key=e56ebb46-0709-4b0c-907e-4b6aa24d281b",
  ACTION_API_URL: "https://degenmarkets.com",
  ACTION_API_PATH: "https://actions.degenmarkets.com",
};

const Config =
  process.env.NEXT_PUBLIC_ENV === "development" ? devConfig : prodConfig;

export default Config;
