/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    poweredByHeader: false,
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
