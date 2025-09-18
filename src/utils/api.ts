/**
 * Shared API utilities for TRON MEGATEAM
 * Eliminates duplicate fetch patterns and error handling
 */

import type { Context } from 'hono'

// Standard headers for TRONScan API calls
const TRONSCAN_HEADERS = {
  'Accept': 'application/json',
  'User-Agent': 'MEGATEAM-Website/1.0'
} as const

// Standard headers for external APIs (CoinGecko, etc.)
const EXTERNAL_HEADERS = {
  'Accept': 'application/json',
  'User-Agent': 'MEGATEAM-Website/1.0'
} as const

/**
 * Unified fetch wrapper for TRONScan API calls
 */
export async function tronFetch(endpoint: string, options: RequestInit = {}) {
  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `https://apilist.tronscanapi.com/api/${endpoint}`
  
  console.log(`🔄 Fetching ${endpoint}...`)
  
  const response = await fetch(url, {
    method: 'GET',
    ...options,
    headers: { 
      ...TRONSCAN_HEADERS, 
      ...options.headers 
    }
  })
  
  if (!response.ok) {
    throw new Error(`${endpoint} API error: ${response.status}`)
  }
  
  const data = await response.json()
  console.log(`✅ ${endpoint} data received`)
  
  return data
}

/**
 * Unified fetch wrapper for external APIs (CoinGecko, etc.)
 */
export async function externalFetch(url: string, options: RequestInit = {}) {
  const endpoint = url.split('/').pop() || 'external'
  console.log(`🔄 Fetching ${endpoint}...`)
  
  const response = await fetch(url, {
    method: 'GET',
    ...options,
    headers: { 
      ...EXTERNAL_HEADERS, 
      ...options.headers 
    }
  })
  
  if (!response.ok) {
    throw new Error(`${endpoint} API error: ${response.status}`)
  }
  
  const data = await response.json()
  console.log(`✅ ${endpoint} data received`)
  
  return data
}

/**
 * Unified error handler for API endpoints
 */
export function handleApiError(endpointName: string, error: any, fallbackData: any, c: Context, statusCode = 500) {
  console.error(`❌ ${endpointName} API error:`, error.message || error)
  
  return c.json({ 
    error: `Failed to fetch ${endpointName} data`,
    fallback: true,
    ...fallbackData 
  }, statusCode)
}

/**
 * Batch fetch with rate limiting for TRONScan API (3 RPS limit)
 */
export async function tronBatchFetch(endpoints: string[], delayMs = 350) {
  const results: { [key: string]: any } = {}
  
  for (let i = 0; i < endpoints.length; i++) {
    const endpoint = endpoints[i]
    const key = endpoint.split('/').pop() || `endpoint_${i}`
    
    try {
      results[key] = await tronFetch(endpoint)
      
      // Add delay between requests (except for the last one)
      if (i < endpoints.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs))
      }
    } catch (error) {
      console.warn(`⚠️ ${endpoint} failed:`, error)
      results[key] = null
    }
  }
  
  return results
}

/**
 * Parallel fetch with Promise.all (for APIs without rate limits)
 */
export async function parallelFetch(fetchers: Promise<any>[]) {
  try {
    const results = await Promise.all(fetchers)
    return results
  } catch (error) {
    console.error('❌ Parallel fetch error:', error)
    throw error
  }
}