// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
const Sentry = require("@sentry/node");

const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
  dsn: "https://5754ca23af94e96f095d97241964489c@o4508105994534912.ingest.us.sentry.io/4508974059159552",
  integrations: [nodeProfilingIntegration(), Sentry.mongooseIntegration()],

  // Tracing
  // tracesSampleRate: 1.0,
   // Capture 100% of the transactions
});

// Manually call startProfiler and stopProfiler
// to profile the code in between
Sentry.profiler.startProfiler();

// Starts a transaction that will also be profiled
Sentry.startSpan(
  {
    name: "My First Transaction",
  },
  () => {
    // the code executing inside the transaction will be wrapped in a span and profiled
  }
);
