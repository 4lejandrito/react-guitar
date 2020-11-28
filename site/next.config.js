module.exports = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})()
