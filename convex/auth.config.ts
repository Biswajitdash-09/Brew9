const issuerDomain = process.env.CLERK_JWT_ISSUER_DOMAIN;

if (!issuerDomain) {
  console.warn(
    "Warning: CLERK_JWT_ISSUER_DOMAIN is not set in Convex environment variables. Auth verification will fail until set."
  );
}

const authConfig = {
  providers: [
    {
      domain: issuerDomain || "https://placeholder-clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
};

export default authConfig;
