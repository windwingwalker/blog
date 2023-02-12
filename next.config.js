/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self' windwingwalker.xyz *.windwingwalker.xyz;
`

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "windwingwalker.xyz"
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'ContentSecurityPolicy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN; DNEY; ALLOW-FROM windwingwalker.xyz'
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig
