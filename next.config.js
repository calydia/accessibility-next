/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['drupal.ampere.corrupted.pw'],
  },
  i18n: {
    locales: ['en', 'fi'],
    defaultLocale: 'en',
    localeDetection: false,
  }
}

module.exports = nextConfig
