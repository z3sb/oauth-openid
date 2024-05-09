const { VITE_CLIENT_ID, VITE_ISSUER } = import.meta.env;

const BASENAME =
  import.meta.env.MODE === "production" ? "/okta-hosted-login" : "";
const REDIRECT_URI = `${window.location.origin}${BASENAME}/login/callback`;

export default {
  openIdConfig: {
    clientId: VITE_CLIENT_ID || "",
    issuer: VITE_ISSUER || "",
    redirectUri: REDIRECT_URI,
    scopes: ["openid", "profile", "email"],
    pkce: true,
  },
  app: {
    basename: BASENAME,
  },
};
