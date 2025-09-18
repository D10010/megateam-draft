// utils/geo.ts - Geographic Mapping Functions
const GEO_MAP = {
  continents: {
    // Asia
    'China': 'Asia', 'Japan': 'Asia', 'South Korea': 'Asia', 'Singapore': 'Asia', 'India': 'Asia',
    'Indonesia': 'Asia', 'Thailand': 'Asia', 'Malaysia': 'Asia', 'Philippines': 'Asia', 'Vietnam': 'Asia',
    'Taiwan': 'Asia', 'Hong Kong': 'Asia', 'Mongolia': 'Asia', 'Kazakhstan': 'Asia', 'Uzbekistan': 'Asia',
    
    // Europe  
    'Germany': 'Europe', 'United Kingdom': 'Europe', 'France': 'Europe', 'Netherlands': 'Europe',
    'Russia': 'Europe', 'Poland': 'Europe', 'Italy': 'Europe', 'Spain': 'Europe', 'Sweden': 'Europe',
    'Norway': 'Europe', 'Finland': 'Europe', 'Denmark': 'Europe', 'Belgium': 'Europe', 'Switzerland': 'Europe',
    'Austria': 'Europe', 'Czech Republic': 'Europe', 'Ukraine': 'Europe', 'Romania': 'Europe',
    
    // North America
    'United States': 'North America', 'Canada': 'North America', 'Mexico': 'North America',
    
    // South America
    'Brazil': 'South America', 'Argentina': 'South America', 'Chile': 'South America', 'Colombia': 'South America',
    'Peru': 'South America', 'Venezuela': 'South America', 'Uruguay': 'South America', 'Paraguay': 'South America',
    
    // Africa
    'South Africa': 'Africa', 'Nigeria': 'Africa', 'Egypt': 'Africa', 'Kenya': 'Africa', 'Morocco': 'Africa',
    'Ghana': 'Africa', 'Tunisia': 'Africa', 'Algeria': 'Africa', 'Ethiopia': 'Africa', 'Tanzania': 'Africa',
    
    // Oceania
    'Australia': 'Oceania', 'New Zealand': 'Oceania', 'Fiji': 'Oceania', 'Papua New Guinea': 'Oceania'
  },
  
  locations: {
    // Known exchanges and their locations
    'BINANCE': { country: 'Malta', region: 'Europe', lat: 35.9375, lng: 14.3754, type: 'exchange' },
    'POLONIEX': { country: 'United States', region: 'North America', lat: 40.7128, lng: -74.0060, type: 'exchange' },
    'HUOBI': { country: 'Singapore', region: 'Asia', lat: 1.3521, lng: 103.8198, type: 'exchange' },
    'OKEX': { country: 'Malta', region: 'Europe', lat: 35.9375, lng: 14.3754, type: 'exchange' },
    'KUCOIN': { country: 'Singapore', region: 'Asia', lat: 1.3521, lng: 103.8198, type: 'exchange' },
    'GATE': { country: 'Cayman Islands', region: 'Americas', lat: 19.3133, lng: -81.2546, type: 'exchange' },
    'BITFINEX': { country: 'British Virgin Islands', region: 'Americas', lat: 18.4207, lng: -64.6399, type: 'exchange' },
    'KRAKEN': { country: 'United States', region: 'North America', lat: 37.7749, lng: -122.4194, type: 'exchange' },
    
    // Cloud providers
    'GOOGLE': { country: 'United States', region: 'North America', lat: 37.4419, lng: -122.1430, type: 'cloud' },
    'AWS': { country: 'United States', region: 'North America', lat: 47.6062, lng: -122.3321, type: 'cloud' },
    'AMAZON': { country: 'United States', region: 'North America', lat: 47.6062, lng: -122.3321, type: 'cloud' },
    'AZURE': { country: 'United States', region: 'North America', lat: 47.6062, lng: -122.3321, type: 'cloud' },
    'MICROSOFT': { country: 'United States', region: 'North America', lat: 47.6062, lng: -122.3321, type: 'cloud' },
    
    // Regional indicators
    'USA': { country: 'United States', region: 'North America', lat: 39.8283, lng: -98.5795, type: 'regional' },
    'US': { country: 'United States', region: 'North America', lat: 39.8283, lng: -98.5795, type: 'regional' },
    'CHINA': { country: 'China', region: 'Asia', lat: 35.8617, lng: 104.1954, type: 'regional' },
    'SINGAPORE': { country: 'Singapore', region: 'Asia', lat: 1.3521, lng: 103.8198, type: 'regional' },
    'JAPAN': { country: 'Japan', region: 'Asia', lat: 36.2048, lng: 138.2529, type: 'regional' },
    'KOREA': { country: 'South Korea', region: 'Asia', lat: 35.9078, lng: 127.7669, type: 'regional' },
    'EUROPE': { country: 'Germany', region: 'Europe', lat: 51.1657, lng: 10.4515, type: 'regional' },
    'CANADA': { country: 'Canada', region: 'North America', lat: 56.1304, lng: -106.3468, type: 'regional' },
    'AUSTRALIA': { country: 'Australia', region: 'Oceania', lat: -25.2744, lng: 133.7751, type: 'regional' },
    'BRAZIL': { country: 'Brazil', region: 'South America', lat: -14.2350, lng: -51.9253, type: 'regional' },
    'INDIA': { country: 'India', region: 'Asia', lat: 20.5937, lng: 78.9629, type: 'regional' },
    'RUSSIA': { country: 'Russia', region: 'Europe', lat: 61.5240, lng: 105.3188, type: 'regional' },
    
    // TRON ecosystem
    'TRONLINK': { country: 'Singapore', region: 'Asia', lat: 1.3521, lng: 103.8198, type: 'ecosystem' },
    'TRONWALLET': { country: 'Singapore', region: 'Asia', lat: 1.3521, lng: 103.8198, type: 'ecosystem' },
    'JUSTLEND': { country: 'Singapore', region: 'Asia', lat: 1.3521, lng: 103.8198, type: 'ecosystem' },
    'JUSTSWAP': { country: 'Singapore', region: 'Asia', lat: 1.3521, lng: 103.8198, type: 'ecosystem' },
    'SUN': { country: 'Singapore', region: 'Asia', lat: 1.3521, lng: 103.8198, type: 'ecosystem' }
  }
};

const DEFAULT_LOCATIONS = [
  { country: 'United States', region: 'North America', lat: 39.8283, lng: -98.5795, type: 'unknown' },
  { country: 'Singapore', region: 'Asia', lat: 1.3521, lng: 103.8198, type: 'unknown' },
  { country: 'Germany', region: 'Europe', lat: 51.1657, lng: 10.4515, type: 'unknown' },
  { country: 'China', region: 'Asia', lat: 35.8617, lng: 104.1954, type: 'unknown' },
  { country: 'South Korea', region: 'Asia', lat: 35.9078, lng: 127.7669, type: 'unknown' },
  { country: 'Japan', region: 'Asia', lat: 36.2048, lng: 138.2529, type: 'unknown' },
  { country: 'Canada', region: 'North America', lat: 56.1304, lng: -106.3468, type: 'unknown' },
  { country: 'United Kingdom', region: 'Europe', lat: 55.3781, lng: -3.4360, type: 'unknown' }
];

export function getContinent(country: string): string {
  return GEO_MAP.continents[country] || 'Unknown';
}

export function mapWitnessToLocation(name: string, url?: string) {
  const nameUpper = (name || '').toUpperCase();
  const urlLower = (url || '').toLowerCase();
  
  // Try to find location based on name or URL
  for (const [key, location] of Object.entries(GEO_MAP.locations)) {
    if (nameUpper.includes(key) || urlLower.includes(key.toLowerCase())) {
      return location;
    }
  }
  
  // Hash the name to get consistent location assignment for unknown witnesses
  const nameHash = name.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return DEFAULT_LOCATIONS[Math.abs(nameHash) % DEFAULT_LOCATIONS.length];
}

// Helper to get geographic distribution stats
export function getGeographicStats(nodes: Array<{ location?: { country?: string }, country?: string }>) {
  const countries = new Set();
  const continents = new Set();
  
  nodes.forEach(node => {
    const country = node.location?.country || node.country;
    if (country) {
      countries.add(country);
      continents.add(getContinent(country));
    }
  });
  
  return {
    countries: countries.size,
    continents: continents.size
  };
}