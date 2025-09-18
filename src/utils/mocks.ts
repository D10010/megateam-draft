/**
 * Centralized mock data for TRON MEGATEAM
 * Single source of truth for fallback values
 */

// Current TRON network stats (updated regularly based on real data)
export const TRON_MOCKS = {
  // TPS (Transactions Per Second)
  tps: {
    current: 45,
    max: 2000,
    timestamp: Date.now()
  },

  // Block information
  block: {
    height: 75850596,
    transactions: 156,
    hash: '',
    timestamp: Date.now(),
    size: 0
  },

  // Daily transactions
  transactions: {
    today: 9124874,
    change24h: -1.67,
    change7d: -7.05,
    totalTransactions: 8500000000,
    usdtTransactions: 0,
    usdtVolume: 0,
    date: new Date().toISOString().split('T')[0]
  },

  // TRX price data
  price: {
    price: 0.341,
    change24h: 3.5,
    change30d: 0.4,
    change1y: 134.9,
    marketCap: 32300000000,
    volume24h: 815000000,
    rank: 11,
    ath: 0.431,
    atl: 0.0018
  },

  // Account statistics
  accounts: {
    totalAccounts: 300000000,
    activeAccounts: 6000000,
    newAccounts24h: 250000
  },

  // Network validators
  validators: {
    totalValidators: 427,
    superReps: 27,
    continents: 7,
    networkHealth: 'Healthy'
  },

  // USDT ecosystem
  usdt: {
    volume: 35000000000,
    circulation: 80000000000,
    transfers: 2500000
  },

  // Network infrastructure
  network: {
    health: 'Healthy',
    uptime: 99.9,
    decentralization: 'Excellent'
  }
} as const

// Enhanced fallback for dashboard API
export const DASHBOARD_FALLBACK = {
  tps: TRON_MOCKS.tps,
  block: TRON_MOCKS.block,
  transactions: TRON_MOCKS.transactions,
  price: TRON_MOCKS.price,
  accounts: TRON_MOCKS.accounts,
  usdtVolume: TRON_MOCKS.usdt.volume,
  totalValidators: TRON_MOCKS.validators.totalValidators,
  superReps: TRON_MOCKS.validators.superReps,
  continents: TRON_MOCKS.validators.continents,
  networkHealth: TRON_MOCKS.validators.networkHealth,
  timestamp: Date.now(),
  fallback: true
}

// Enhanced fallback for stats API
export const STATS_FALLBACK = {
  tps: TRON_MOCKS.tps,
  block: TRON_MOCKS.block,
  transactions: TRON_MOCKS.transactions,
  price: TRON_MOCKS.price,
  accounts: TRON_MOCKS.accounts,
  usdtVolume: TRON_MOCKS.usdt.volume,
  totalValidators: TRON_MOCKS.validators.totalValidators,
  superReps: TRON_MOCKS.validators.superReps,
  continents: TRON_MOCKS.validators.continents,
  networkHealth: TRON_MOCKS.validators.networkHealth
}

// Fallback supernode data with geographic distribution
export const SUPERNODE_FALLBACK = [
  { name: 'TRON Foundation', address: 'TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH', url: 'https://tron.network', votes: 40000000000, rank: 1, country: 'Singapore', latitude: 1.3521, longitude: 103.8198, isActive: true },
  { name: 'Binance Staking', address: 'TFvvacKsjWKgDcai2dtAAns1DkFhk4C3GY', url: 'https://binance.com', votes: 39000000000, rank: 2, country: 'Malta', latitude: 35.9375, longitude: 14.3754, isActive: true },
  { name: 'Huobi Pool', address: 'TGCRXKFcqRBgvVS6qdTHFc2hLX8bZZSsG9', url: 'https://huobi.com', votes: 38000000000, rank: 3, country: 'Singapore', latitude: 1.3521, longitude: 103.8198, isActive: true },
  { name: 'OKEx Pool', address: 'TFvfhF8e4c8YBzdHZcrWXUTrRhyFuXR8Kq', url: 'https://okex.com', votes: 37000000000, rank: 4, country: 'Malta', latitude: 35.9375, longitude: 14.3754, isActive: true },
  { name: 'Poloniex', address: 'TPoloniexTRXGhao6w7g9cJ8rCgEctCK3t6', url: 'https://poloniex.com', votes: 36000000000, rank: 5, country: 'United States', latitude: 40.7128, longitude: -74.0060, isActive: true },
  { name: 'TRON Europe', address: 'TEuropeC7sYZKtKQ7Br1wX6bZQwXgTF8Kzg', url: 'https://troneurope.org', votes: 35000000000, rank: 6, country: 'Germany', latitude: 52.5200, longitude: 13.4050, isActive: true },
  { name: 'TRON Asia', address: 'TAsia9qYmKw7FjWNkLsZjKJB7g5PppBKxX', url: 'https://tronasia.org', votes: 34000000000, rank: 7, country: 'Japan', latitude: 35.6762, longitude: 139.6503, isActive: true },
  { name: 'BitTorrent', address: 'TBitTorrentYwX8y4k9e7T4F2jX4gPwE1cV', url: 'https://bittorrent.com', votes: 33000000000, rank: 8, country: 'United States', latitude: 37.7749, longitude: -122.4194, isActive: true },
  { name: 'CryptoGuyInZA', address: 'TCryptoGuyZASrw2KF4j3x9Q2mR6Y3pV8kX', url: 'https://cryptoguy.co.za', votes: 32000000000, rank: 9, country: 'South Africa', latitude: -25.7461, longitude: 28.1881, isActive: true },
  { name: 'TRON Spark', address: 'TSparkS4C8KU9w6F2k8T4v3Y1xQ2mP7jK8', url: 'https://tronspark.com', votes: 31000000000, rank: 10, country: 'Canada', latitude: 43.6532, longitude: -79.3832, isActive: true },
  { name: 'TronWallet', address: 'TTronWallet9f8K4X2Y3v6Z1P5Q8m7R4jK9', url: 'https://tronwallet.me', votes: 30000000000, rank: 11, country: 'Singapore', latitude: 1.3521, longitude: 103.8198, isActive: true },
  { name: 'TRON Brasil', address: 'TBrasilX3K9F4w6Z2Y1v8P7Q5m4R6jK8T2', url: 'https://tronbrasil.org', votes: 29000000000, rank: 12, country: 'Brazil', latitude: -15.7801, longitude: -47.9292, isActive: true },
  { name: 'TronGrid', address: 'TGridY4K8F2w5Z1v7P6Q4m3R5jK7T1X9C8', url: 'https://trongrid.io', votes: 28000000000, rank: 13, country: 'Singapore', latitude: 1.3521, longitude: 103.8198, isActive: true },
  { name: 'BitGuild', address: 'TBitGuildZ2K7F3w4Y1v6P5Q2m8R4jK6T9', url: 'https://bitguild.io', votes: 27000000000, rank: 14, country: 'Singapore', latitude: 1.3521, longitude: 103.8198, isActive: true },
  { name: 'TRON Russia', address: 'TRussiaF1K6w3Z2Y8v5P4Q7m1R3jK5T8X', url: 'https://tronrussia.org', votes: 26000000000, rank: 15, country: 'Russia', latitude: 55.7558, longitude: 37.6173, isActive: true },
  { name: 'Sesameseed', address: 'TSesameX8K5F2w4Z1Y7v6P3Q5m2R4jK7T', url: 'https://sesameseed.org', votes: 25000000000, rank: 16, country: 'United States', latitude: 40.7128, longitude: -74.0060, isActive: true },
  { name: 'TronLink', address: 'TTronLinkK3F6w2Z4Y5v8P1Q9m7R1jK4T', url: 'https://tronlink.org', votes: 24000000000, rank: 17, country: 'Singapore', latitude: 1.3521, longitude: 103.8198, isActive: true },
  { name: 'TRON India', address: 'TIndiaY7K4F8w3Z2v9P6Q1m5R2jK8T3X', url: 'https://tronindia.org', votes: 23000000000, rank: 18, country: 'India', latitude: 28.6139, longitude: 77.2090, isActive: true },
  { name: 'CoinEx', address: 'TCoinExZ9K2F5w7Y4v3P8Q6m4R9jK1T5X', url: 'https://coinex.com', votes: 22000000000, rank: 19, country: 'Hong Kong', latitude: 22.3193, longitude: 114.1694, isActive: true },
  { name: 'TRON Australia', address: 'TAustraliaK8F1w6Z3Y2v7P9Q3m6R8jK2T', url: 'https://tronaustralia.org', votes: 21000000000, rank: 20, country: 'Australia', latitude: -33.8688, longitude: 151.2093, isActive: true },
  { name: 'Multiplier', address: 'TMultiplierF4w9Z6Y1v2P5Q8m1R7jK9T', url: 'https://multiplier.network', votes: 20000000000, rank: 21, country: 'Singapore', latitude: 1.3521, longitude: 103.8198, isActive: true },
  { name: 'TRON Korea', address: 'TKoreaX6K7F3w8Z5Y4v1P2Q9m3R6jK4T', url: 'https://tronkorea.org', votes: 19000000000, rank: 22, country: 'South Korea', latitude: 37.5665, longitude: 126.9780, isActive: true },
  { name: 'TRON Vietnam', address: 'TVietnamF9K1w4Z8Y7v5P3Q6m8R1jK7T', url: 'https://tronvietnam.org', votes: 18000000000, rank: 23, country: 'Vietnam', latitude: 21.0285, longitude: 105.8542, isActive: true },
  { name: 'TRON Mexico', address: 'TMexicoK2F7w1Z9Y6v4P8Q2m5R4jK8T6', url: 'https://tronmexico.org', votes: 17000000000, rank: 24, country: 'Mexico', latitude: 19.4326, longitude: -99.1332, isActive: true },
  { name: 'TRON Turkey', address: 'TTurkeyF5K9w2Z7Y3v6P4Q7m2R9jK3T1', url: 'https://tronturkey.org', votes: 16000000000, rank: 25, country: 'Turkey', latitude: 41.0082, longitude: 28.9784, isActive: true },
  { name: 'TRON Africa', address: 'TAfricaK8F6w5Z1Y9v2P7Q4m6R2jK9T4', url: 'https://tronafrica.org', votes: 15000000000, rank: 26, country: 'Nigeria', latitude: 6.5244, longitude: 3.3792, isActive: true },
  { name: 'Community Node', address: 'TCommunityF3K4w8Z2Y5v9P1Q3m9R5jK6', url: 'https://community.org', votes: 14000000000, rank: 27, country: 'United States', latitude: 40.7128, longitude: -74.0060, isActive: true }
]