/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: [
        {
          loader: "html-loader",
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
