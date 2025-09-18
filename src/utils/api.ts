// utils/api.ts - Shared Fetch & Error Handling
import type { Context } from 'hono';

export async function tronApiFetch(endpoint: string, options: RequestInit = {}, c?: Context) {
  try {
    const res = await fetch(`https://apilist.tronscanapi.com/api/${endpoint}`, {
      ...options,
      headers: { 
        'Accept': 'application/json',
        'User-Agent': 'MEGATEAM-Website/1.0',
        'Cache-Control': 'no-cache',
        ...options.headers
      }
    });
    
    if (!res.ok) {
      throw new Error(`${endpoint} API error: ${res.status}`);
    }
    
    const data = await res.json();
    console.log(`✅ ${endpoint} data:`, Object.keys(data).length > 0 ? Object.keys(data) : 'empty');
    return data;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`❌ ${endpoint} API error:`, errorMsg);
    return null;
  }
}

export async function coinGeckoFetch(params: string = 'ids=tron&vs_currencies=usd&include_24hr_change=true&include_market_cap=true') {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?${params}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MEGATEAM-Website/1.0'
      }
    });
    
    if (!res.ok) {
      throw new Error(`CoinGecko API error: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('✅ CoinGecko data:', Object.keys(data));
    return data;
  } catch (error) {
    console.error('❌ CoinGecko API error:', error);
    return null;
  }
}

export function handleApiError(endpoint: string, fallback: any, c: Context) {
  console.warn(`🔧 Using fallback data for ${endpoint}`);
  return c.json({ 
    error: `Failed to fetch ${endpoint}`, 
    fallback: true,
    timestamp: new Date().toISOString(),
    ...fallback 
  }, 500);
}

export function createSuccessResponse(data: any, c: Context) {
  return c.json({
    success: true,
    timestamp: new Date().toISOString(),
    ...data
  });
}

// Rate limiting helper
export async function withRateLimit(fn: () => Promise<any>, delay: number = 300): Promise<any> {
  const result = await fn();
  if (delay > 0) {
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  return result;
}

// Parallel fetch helper
export async function fetchParallel(endpoints: { [key: string]: string }, context?: Context) {
  const promises = Object.entries(endpoints).map(async ([key, endpoint]) => {
    const data = await tronApiFetch(endpoint, {}, context);
    return [key, data];
  });
  
  const results = await Promise.all(promises);
  return Object.fromEntries(results);
}