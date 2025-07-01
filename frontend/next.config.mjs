/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://a.storyblok.com/**')],
  }
};

export default nextConfig;
