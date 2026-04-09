import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.sanity.io', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },

  webpack: (config, { webpack }) => {
    // Sanity 5.x imports `useEffectEvent` which React 19 stable does not export.
    // NormalModuleReplacementPlugin intercepts ONLY bare `react` imports (not
    // subpaths like react/jsx-runtime) inside Sanity packages and routes them
    // through a shim that patches the missing export onto the React object.
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^react$/, (resource) => {
        if (/node_modules[\\/](sanity|@sanity|next-sanity)/.test(resource.context ?? '')) {
          resource.request = path.resolve(__dirname, 'lib/react-sanity-shim.cjs');
        }
      })
    );
    return config;
  },
};

export default nextConfig;
