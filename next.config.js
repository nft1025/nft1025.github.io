/** @type {import('next').NextConfig} */

// Set this to your repo name if deploying to https://<user>.github.io/<repo>/
// Leave as '' if this repo IS your username.github.io user/org page.
const repoName = process.env.REPO_NAME || 'nft1025.github.io';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const basePath = isGithubActions && repoName ? `/${repoName}` : '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
