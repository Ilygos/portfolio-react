const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProduction ? '/portfolio-react' : '',
  assetPrefix: isProduction ? '/portfolio-react/' : '',
};

module.exports = nextConfig;