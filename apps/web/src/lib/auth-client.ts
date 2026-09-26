import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

import { ENV } from "../env";

export const authClient = createAuthClient({
  baseURL: ENV.VITE_SERVER_URL,
  plugins: [adminClient()],
});
