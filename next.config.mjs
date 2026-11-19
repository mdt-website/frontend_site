/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/membership-class/enrol', destination: '/membership-class/new', permanent: true },
      { source: '/membership-class/certificate', destination: '/membership-class/completed', permanent: true },
    ];
  },
};
export default nextConfig;
