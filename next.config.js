/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const withPWA = require('next-pwa')({
  dest: 'public'
})


const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['drupal.ampere.corrupted.pw'],
  },
  i18n
}

module.exports = withPWA(nextConfig)
