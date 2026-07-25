// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
const Sentry = require("@sentry/node");

// nodeProfilingIntegration() ships a native binary per-platform, which
// serverless bundlers (Vercel included) frequently fail to include in the
// deployed function - that crashed every single request here. Basic error
// tracking doesn't need it, so profiling is left out entirely.
Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://5754ca23af94e96f095d97241964489c@o4508105994534912.ingest.us.sentry.io/4508974059159552",
  integrations: [Sentry.mongooseIntegration()],
});
