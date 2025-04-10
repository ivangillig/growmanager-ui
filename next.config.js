const withLess = require('next-with-less')
const { i18n } = require('./next-i18next.config');

module.exports = withLess({
  publicRuntimeConfig: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
  i18n,
})
