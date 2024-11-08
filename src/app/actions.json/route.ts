import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";
import { ACTION_API_PATH } from "../config/api";

export const GET = async () => {
  const payload: ActionsJson = {
    rules: [
      {
        pathPattern: "/pools/*",
        apiPath: `${ACTION_API_PATH}/pools/*`,
      },
    ],
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;
