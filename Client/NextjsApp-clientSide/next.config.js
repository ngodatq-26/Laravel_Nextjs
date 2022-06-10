/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler : {
    styledComponents : true,
  },
  env : {
    broadcaster: "pusher",
    key: "3e1d5540be708e51f488",
    cluster: "ap1",
    forceTLS: true
  }
}

module.exports = nextConfig;

