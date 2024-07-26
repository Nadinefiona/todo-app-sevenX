/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        perf_hooks: false,
        fs: false,
        };
      return config;
    },
  };
  
  export default nextConfig;
  