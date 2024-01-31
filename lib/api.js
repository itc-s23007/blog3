import { createClient } from 'microcom-js-sdk'

export const client = createClient({
  serviceDomain: process.env.SERVISE_DOMAIN,
  apikey: process.env.API_KEY
})
