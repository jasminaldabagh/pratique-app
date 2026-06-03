/** @type {import('next').NextConfig} */
const nextConfig = {
  // This removes the floating gray "N" badge from your screen entirely
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;