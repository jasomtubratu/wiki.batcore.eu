/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    poweredByHeader: false,
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve = {
          ...config.resolve,
          fallback: {
            net: false,
            dns: false,
            tls: false,
            fs: false,
            request: false,
          },
        };
      }
      },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "X-Powered-By",
              value: "BatCore.eu",
            },
          ],
        },
      ];
    },
  };

module.exports = nextConfig
