export const constants = {
  CACHE_TTL: parseInt(process.env.CACHE_TTL_SECONDS || '300'),
  FRESHNESS_DAYS: parseInt(process.env.IFSC_FRESHNESS_DAYS || '7'),
  EXTERNAL_API_BASE_URL: process.env.EXTERNAL_API_BASE_URL || 'https://ifsc.razorpay.com'
};