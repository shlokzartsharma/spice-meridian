import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
    NEXT_FEEDBACK_DISABLED: '1',
  },
};

export default nextConfig;
