const withLess = require('next-with-less')

module.exports = withLess({
  publicRuntimeConfig: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
})
