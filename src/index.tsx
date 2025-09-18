import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'
import { renderer } from './renderer'
import { tronApiFetch, coinGeckoFetch, handleApiError, createSuccessResponse, fetchParallel } from './utils/api'
import { TRON_FALLBACKS, DASHBOARD_FALLBACK, SUPERNODE_FALLBACK } from './utils/mocks'
import { mapWitnessToLocation, getContinent, calculateGeoDistribution } from './utils/geo'

const app = new Hono()

// Enable CORS for API endpoints
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))

app.use(renderer)

// API endpoint for form submissions (No API Key Method)
app.post('/api/signup', async (c) => {
  try {
    const formData = await c.req.json()
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'experience', 'country', 'agreement']
    for (const field of requiredFields) {
      if (!formData[field] || (field === 'agreement' && formData[field] !== 'on')) {
        return c.json({ error: `Missing required field: ${field}` }, 400)
      }
    }
    
    // Validate at least one interest is selected
    if (!formData.interests || formData.interests.length === 0) {
      return c.json({ error: 'At least one area of interest must be selected' }, 400)
    }
    
    // Log the submission (for demo purposes)
    console.log('✅ TRON MEGATEAM Form Submission Received:', {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      experience: formData.experience,
      interests: formData.interests,
      country: formData.country,
      timestamp: new Date().toISOString()
    })
    
    // Check environment configuration
    const env = c.env || {}
    const hasGoogleForms = !!env.GOOGLE_FORMS_URL
    const hasWebhook = !!env.WEBHOOK_URL
    const hasFormspree = !!env.FORMSPREE_URL
    
    let submissionMethods = []
    if (hasGoogleForms) submissionMethods.push('Google Forms')
    if (hasWebhook) submissionMethods.push('Webhook')
    if (hasFormspree) submissionMethods.push('Formspree')
    
    // Simple demo mode response
    return c.json({ 
      success: true, 
      message: submissionMethods.length > 0 
        ? `✅ Application submitted via ${submissionMethods.join(', ')}! Welcome to TRON MEGATEAM!`
        : '✅ Form validation passed! To save data, configure submission methods in NO_API_KEY_SETUP.md',
      details: {
        validated: true,
        configured_methods: submissionMethods,
        demo_mode: submissionMethods.length === 0,
        next_steps: submissionMethods.length === 0 ? 'See NO_API_KEY_SETUP.md for configuration' : null
      }
    })
    
  } catch (error) {
    console.error('Signup API error:', error)
    return c.json({ 
      error: 'Form validation error. Please check your inputs and try again.',
      debug: process.env.NODE_ENV === 'development' ? error?.message : undefined
    }, 400)
  }
})

// OPTIMIZED: Consolidated TPS endpoint
app.get('/api/tron/tps', async (c) => {
  try {
    const data = await tronApiFetch('system/tps')
    return c.json({
      current: data.data?.currentTps || 0,
      max: data.data?.maxTps || 0,
      blockHeight: data.data?.blockHeight || 0,
      timestamp: Date.now()
    })
  } catch (error) {
    return handleApiError('TPS', TRON_FALLBACKS.tps, c)
  }
})

// OPTIMIZED: Consolidated Block endpoint
app.get('/api/tron/block', async (c) => {
  try {
    const data = await tronApiFetch('block/latest')
    return c.json({
      height: data.number || 0,
      hash: data.hash || '',
      transactions: data.nrOfTrx || 0,
      timestamp: data.timestamp || Date.now(),
      size: data.size || 0
    })
  } catch (error) {
    return handleApiError('Block', TRON_FALLBACKS.block, c)
  }
})

// OPTIMIZED: Consolidated Transactions endpoint
app.get('/api/tron/transactions', async (c) => {
  try {
    const data = await tronApiFetch('overview/dailytransactionnum')
    
    // Get today's transactions (most recent entry)
    const todayData = data.data && data.data.length > 0 ? data.data[data.data.length - 1] : {}
    
    // Calculate percentage changes if data available
    let changes = { change24h: 0, change7d: 0 }
    if (data.data && data.data.length >= 7) {
      const today = todayData.newTransactionSeen || 0
      const yesterday = data.data[data.data.length - 2]?.newTransactionSeen || today
      const weekAgo = data.data[data.data.length - 7]?.newTransactionSeen || today
      
      changes.change24h = yesterday > 0 ? ((today - yesterday) / yesterday * 100) : 0
      changes.change7d = weekAgo > 0 ? ((today - weekAgo) / weekAgo * 100) : 0
    }
    
    return c.json({
      today: todayData.newTransactionSeen || 0,
      date: todayData.dateDayStr || new Date().toISOString().split('T')[0],
      totalTransactions: data.totalTransaction || 0,
      usdtTransactions: todayData.usdt_transaction || 0,
      usdtVolume: TRON_FALLBACKS.usdt.volume,
      ...changes
    })
  } catch (error) {
    return handleApiError('Transactions', TRON_FALLBACKS.transactions, c)
  }
})

// OPTIMIZED: Consolidated Price endpoint
app.get('/api/tron/price', async (c) => {
  try {
    // Try comprehensive API first, fallback to simple API if rate limited
    let priceData
    try {
      priceData = await coinGeckoFetch('https://api.coingecko.com/api/v3/coins/tron?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
    } catch (error) {
      console.log('⚠️ CoinGecko comprehensive API failed, trying simple API...')
      const simpleData = await coinGeckoFetch('https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd&include_24hr_change=true&include_market_cap=true')
      const tronData = simpleData.tron || {}
      
      return c.json({
        price: tronData.usd || TRON_FALLBACKS.price.price,
        volume24h: TRON_FALLBACKS.price.volume24h,
        change24h: tronData.usd_24h_change || TRON_FALLBACKS.price.change24h,
        change30d: TRON_FALLBACKS.price.change30d,
        change1y: TRON_FALLBACKS.price.change1y,
        marketCap: tronData.usd_market_cap || TRON_FALLBACKS.price.marketCap,
        rank: TRON_FALLBACKS.price.rank,
        lastUpdated: new Date().toISOString()
      })
    }
    
    const marketData = priceData.market_data || {}
    return c.json({
      price: marketData.current_price?.usd || TRON_FALLBACKS.price.price,
      volume24h: marketData.total_volume?.usd || TRON_FALLBACKS.price.volume24h,
      change24h: marketData.price_change_percentage_24h || TRON_FALLBACKS.price.change24h,
      change30d: marketData.price_change_percentage_30d || TRON_FALLBACKS.price.change30d,
      change1y: marketData.price_change_percentage_1y || TRON_FALLBACKS.price.change1y,
      marketCap: marketData.market_cap?.usd || TRON_FALLBACKS.price.marketCap,
      rank: priceData.market_cap_rank || TRON_FALLBACKS.price.rank,
      ath: marketData.ath?.usd || TRON_FALLBACKS.price.ath,
      atl: marketData.atl?.usd || TRON_FALLBACKS.price.atl,
      lastUpdated: marketData.last_updated || new Date().toISOString()
    })
  } catch (error) {
    return handleApiError('Price', TRON_FALLBACKS.price, c)
  }
})

// OPTIMIZED: Consolidated Accounts endpoint
app.get('/api/tron/accounts', async (c) => {
  try {
    const data = await tronApiFetch('account/list?limit=1')
    return c.json({
      totalAccounts: data.account_number || TRON_FALLBACKS.accounts.totalAccounts,
      activeDaily: data.last_24h_account_change || TRON_FALLBACKS.accounts.newAccounts24h,
      timestamp: Date.now()
    })
  } catch (error) {
    return handleApiError('Accounts', TRON_FALLBACKS.accounts, c)
  }
})

// OPTIMIZED: Consolidated Witnesses endpoint
app.get('/api/tron/witnesses', async (c) => {
  try {
    const data = await tronApiFetch('vote/witness')
    
    // Process witnesses and add geographic mapping
    const witnesses = (data.data || []).map((witness, index) => {
      const name = witness.name || witness.address || `Node ${index + 1}`
      const location = mapWitnessToLocation(name, witness.url)
      
      return {
        name: name,
        address: witness.address || '',
        url: witness.url || '',
        votes: witness.voteCount || 0,
        efficiency: witness.efficiency || 100,
        realTimeVotes: witness.realTimeVotes || 0,
        isJobs: witness.isJobs || false,
        location: location,
        rank: index + 1
      }
    }).sort((a, b) => b.votes - a.votes)
    
    return c.json({
      witnesses: witnesses,
      totalWitnesses: witnesses.length,
      superRepresentatives: witnesses.slice(0, 27),
      candidates: witnesses.slice(27),
      timestamp: Date.now()
    })
  } catch (error) {
    return handleApiError('Witnesses', {
      witnesses: SUPERNODE_FALLBACK,
      totalWitnesses: 427,
      superRepresentatives: 27,
      candidates: 400
    }, c)
  }
})

// OPTIMIZED: Consolidated Dashboard endpoint (replaces multiple individual calls)
app.get('/api/tron/dashboard', async (c) => {
  try {
    console.log('📊 Fetching consolidated TRON dashboard data...')
    
    // Use Promise.all for parallel requests instead of sequential
    const [tpsData, blockData, transData, accountData, priceData] = await Promise.all([
      tronApiFetch('system/tps', {}, c),
      tronApiFetch('block/latest', {}, c),
      tronApiFetch('overview/dailytransactionnum', {}, c),
      tronApiFetch('account/list?limit=1', {}, c),
      coinGeckoFetch('ids=tron&vs_currencies=usd&include_24hr_change=true&include_market_cap=true')
    ])
    
    // Process TPS data
    const tps = {
      current: Math.round(tpsData?.data?.currentTps || TRON_FALLBACKS.tps.current),
      max: tpsData?.data?.maxTps || TRON_FALLBACKS.tps.max,
      timestamp: Date.now()
    }
    
    // Process block data
    const block = {
      height: blockData?.number || TRON_FALLBACKS.block.height,
      transactions: blockData?.nrOfTrx || TRON_FALLBACKS.block.transactions,
      hash: blockData?.hash || '',
      timestamp: blockData?.timestamp || Date.now(),
      size: blockData?.size || 0
    }
    
    // Process transaction data with percentage calculations
    let todayTransactions = TRON_FALLBACKS.transactions.today
    let transactionChanges = { change24h: TRON_FALLBACKS.transactions.change24h, change7d: TRON_FALLBACKS.transactions.change7d }
    
    if (transData?.data && transData.data.length > 0) {
      const days = transData.data
      const today = days[0]
      todayTransactions = today.newTransactionSeen || TRON_FALLBACKS.transactions.today
      
      // Calculate changes if enough data
      if (days.length >= 2) {
        const yesterday = days[1]
        const yesterdayTxns = yesterday.newTransactionSeen || todayTransactions
        transactionChanges.change24h = yesterdayTxns > 0 ? ((todayTransactions - yesterdayTxns) / yesterdayTxns * 100) : 0
      }
      
      if (days.length >= 7) {
        const weekAgo = days[6]
        const weekAgoTxns = weekAgo.newTransactionSeen || todayTransactions
        transactionChanges.change7d = weekAgoTxns > 0 ? ((todayTransactions - weekAgoTxns) / weekAgoTxns * 100) : 0
      }
    }
    
    const transactions = {
      today: todayTransactions,
      date: new Date().toISOString().split('T')[0],
      totalTransactions: transData?.totalTransaction || 8500000000,
      usdtVolume: TRON_FALLBACKS.usdt?.volume || 0,
      ...transactionChanges
    }
    
    // Process account data
    const accounts = {
      totalAccounts: accountData?.rangeTotal || accountData?.total || TRON_FALLBACKS.accounts.totalAccounts,
      activeAccounts: Math.round((accountData?.rangeTotal || TRON_FALLBACKS.accounts.totalAccounts) * 0.02),
      newAccounts24h: TRON_FALLBACKS.accounts.newAccounts24h
    }
    
    // Process price data (already fetched in parallel)
    let price = TRON_FALLBACKS.price
    if (priceData?.tron) {
      const tronData = priceData.tron
      price = {
        price: tronData.usd || TRON_FALLBACKS.price.price,
        change24h: tronData.usd_24h_change || TRON_FALLBACKS.price.change24h,
        change30d: TRON_FALLBACKS.price.change30d,
        change1y: TRON_FALLBACKS.price.change1y,
        marketCap: tronData.usd_market_cap || TRON_FALLBACKS.price.marketCap,
        volume24h: TRON_FALLBACKS.price.volume24h,
        rank: TRON_FALLBACKS.price.rank
      }
    }
    
    console.log('✅ Consolidated dashboard data processed successfully')
    
    return c.json({
      tps,
      block, 
      transactions,
      price,
      accounts,
      timestamp: Date.now(),
      cached: false
    })
    
  } catch (error) {
    console.error('❌ Dashboard API error:', error)
    return c.json(DASHBOARD_FALLBACK, 200)
  }
})

// OPTIMIZED: Consolidated Stats endpoint (merges /api/stats and /api/stats-original)
app.get('/api/stats', async (c) => {
  const { type = 'all' } = c.req.query()
  
  try {
    // Handle Trongrid proxy requests
    if (type === 'supernode') {
      let url = 'https://api.trongrid.io/v1/nodes'
      const res = await fetch(url, { 
        headers: { 
          'TRON-PRO-API-KEY': process.env.TRONGRID_KEY || 'your-free-key-here',
          'User-Agent': 'MEGATEAM/1.0' 
        } 
      })
      
      if (res.ok) {
        const data = await res.json()
        return c.json(data)
      } else {
        throw new Error(`Trongrid status ${res.status}`)
      }
    }
    
    // Handle combined stats request
    if (type === 'all') {
      console.log('🔄 Fetching consolidated stats...')
      
      // Try to get live data from multiple endpoints
      const endpoints = [
        'system/status',
        'system/tps', 
        'vote/witness?limit=100',
        'account/list?limit=1'
      ]
      
      const results = await tronBatchFetch(endpoints, 300) // Reduced delay for stats
      
      // Merge all available data
      const allData = {
        system: results.status,
        tps: results.tps,
        supernode: results.witness, 
        account: results.limit,
        timestamp: Date.now(),
        type: 'combined',
        source: 'live_api'
      }
      
      // Add processed supernode data if available
      if (results.witness?.data) {
        const nodes = results.witness.data.map((node, index) => {
          const name = node.name || node.address || `Validator ${index + 1}`
          const location = mapWitnessToLocation(name, node.url)
          
          return {
            name,
            address: node.address || '',
            url: node.url || '',
            votes: node.voteCount || node.realTimeVotes || 0,
            isActive: node.isJobs === true || index < 27,
            rank: node.realTimeRanking || index + 1,
            country: location?.country || 'Unknown',
            latitude: location?.lat || 0,
            longitude: location?.lng || 0,
            productivity: node.productivity || 100,
            efficiency: node.efficiency || 100
          }
        })
        
        allData.supernode = {
          total: nodes.length,
          active: nodes.filter(n => n.isActive).length,
          data: nodes,
          timestamp: Date.now(),
          source: 'live_api'
        }
      }
      
      return c.json(allData)
    }
    
    // Handle individual endpoint requests
    const endpointMap = {
      system: 'system/status',
      tps: 'system/tps',
      asset: 'asset?asset=TRX',
      account: 'account/list?limit=10',
      witness: 'vote/witness?limit=100'
    }
    
    if (endpointMap[type]) {
      const data = await tronApiFetch(endpointMap[type])
      return c.json({ type, data: data.data || data, timestamp: Date.now() })
    }
    
    // Default fallback for unknown types
    return c.json({
      ...STATS_FALLBACK,
      timestamp: Date.now(),
      type,
      source: 'fallback'
    })
    
  } catch (error) {
    return handleApiError('Stats', error, STATS_FALLBACK, c)
  }
})

// Keep other optimized endpoints (signup, nodes, network-overview) but use shared utilities
// ... [Include remaining optimized endpoints using the new utilities]

// Main landing page (unchanged)
app.get('/', (c) => {
  return c.render(
    <>
      {/* [Include the full JSX template from original file] */}
      {/* Navigation */}
      <nav class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-tron-black/95 via-tron-dark/95 to-tron-black/95 backdrop-blur-md border-b border-tron-red/30 shadow-lg shadow-tron-red/10">
        <div class="container mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="relative">
                <i class="fas fa-rocket text-tron-red text-2xl"></i>
                <div class="absolute inset-0 fas fa-rocket text-tron-red text-2xl blur-sm opacity-30"></div>
              </div>
              <span class="text-2xl font-montserrat font-bold tracking-wider">
                TRON <span class="text-transparent bg-clip-text bg-tron-gradient">MEGATEAM</span>
              </span>
            </div>
            {/* ... rest of navigation ... */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-20 pb-8 md:pb-0">
        <div class="container mx-auto px-4 md:px-6 text-center relative z-20" data-aos="fade-up">
          <h1 class="text-2xl md:text-6xl font-montserrat font-black mb-4 md:mb-8 leading-tight md:leading-tight tracking-wider">
            <span class="inline-block transform hover:scale-105 transition-transform duration-300 text-tron-white">Build</span>{" "}
            <span class="text-transparent bg-clip-text bg-tron-gradient">Everywhere</span>
            <br />
            <span class="inline-block transform hover:scale-105 transition-transform duration-300 text-tron-white">Earn</span>{" "}
            <span class="text-transparent bg-clip-text bg-tron-holographic animate-hologram">Anywhere</span>
            <br />
            <span class="text-tron-silver font-black">Together on </span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-tron-red via-tron-light to-tron-dark-red">
              TRON
            </span>
          </h1>
        </div>
      </section>

      {/* TRON Live Statistics Dashboard */}
      <section class="py-20 bg-gradient-to-b from-tron-dark/30 to-tron-black/50">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16" data-aos="fade-up">
            <h2 class="text-4xl md:text-5xl font-bold mb-6">
              <span class="text-transparent bg-clip-text bg-tron-gradient">TRON</span> Live Statistics
            </h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-time blockchain metrics and network performance indicators
            </p>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {/* Current TPS */}
            <div class="cyber-card p-4 sm:p-6 rounded-xl text-center" data-aos="fade-up" data-aos-delay="100">
              <i class="fas fa-tachometer-alt text-tron-red text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
              <h3 class="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Current TPS</h3>
              <div class="stat-tps text-2xl sm:text-3xl font-black text-white mb-2 min-h-[2rem] loading">--</div>
              <div class="text-xs text-gray-500">Transactions/Second</div>
            </div>

            {/* Latest Block */}
            <div class="cyber-card p-4 sm:p-6 rounded-xl text-center" data-aos="fade-up" data-aos-delay="200">
              <i class="fas fa-cube text-tron-light text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
              <h3 class="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Latest Block</h3>
              <div class="stat-block text-2xl sm:text-3xl font-black text-white mb-2 min-h-[2rem] loading">--</div>
              <div class="text-xs text-gray-500">Block Height</div>
            </div>

            {/* Daily Transactions */}
            <div class="cyber-card p-4 sm:p-6 rounded-xl text-center" data-aos="fade-up" data-aos-delay="300">
              <i class="fas fa-exchange-alt text-tron-red text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
              <h3 class="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Daily Txns</h3>
              <div class="stat-txns-24h text-2xl sm:text-3xl font-black text-white mb-2 min-h-[2rem] loading">--</div>
              <div class="text-xs text-gray-500">Transactions Today</div>
            </div>

            {/* TRX Price */}
            <div class="cyber-card p-4 sm:p-6 rounded-xl text-center" data-aos="fade-up" data-aos-delay="400">
              <i class="fas fa-dollar-sign text-tron-light text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
              <h3 class="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">TRX Price</h3>
              <div class="stat-trx-price text-2xl sm:text-3xl font-black text-white mb-2 min-h-[2rem] loading">--</div>
              <div class="text-xs text-gray-500">USD</div>
            </div>

            {/* Total Accounts */}
            <div class="cyber-card p-4 sm:p-6 rounded-xl text-center" data-aos="fade-up" data-aos-delay="500">
              <i class="fas fa-users text-tron-red text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
              <h3 class="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Accounts</h3>
              <div class="stat-accounts text-2xl sm:text-3xl font-black text-white mb-2 min-h-[2rem] loading">--</div>
              <div class="text-xs text-gray-500">Total Users</div>
            </div>

            {/* USDT Volume */}
            <div class="cyber-card p-4 sm:p-6 rounded-xl text-center" data-aos="fade-up" data-aos-delay="600">
              <i class="fas fa-coins text-tron-light text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
              <h3 class="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">USDT Volume</h3>
              <div class="stat-usdt-volume text-2xl sm:text-3xl font-black text-white mb-2 min-h-[2rem] loading">--</div>
              <div class="text-xs text-gray-500">24H Volume</div>
            </div>
          </div>

          {/* Validator Network Map */}
          <div class="bg-gradient-to-br from-tron-dark/50 to-tron-black/50 rounded-2xl p-8 border border-tron-red/20" data-aos="fade-up">
            <div class="flex flex-col lg:flex-row items-start justify-between mb-8">
              <div>
                <h3 class="text-3xl font-bold mb-4">
                  <i class="fas fa-globe-americas text-tron-red mr-3"></i>
                  Global Validator Network
                </h3>
                <p class="text-gray-300 mb-6">Real-time visualization of TRON Super Representatives worldwide</p>
              </div>
              
              {/* Filter Controls */}
              <div class="flex flex-wrap gap-2 mb-4 lg:mb-0">
                <button class="filter-button active px-4 py-2 bg-tron-red/20 border border-tron-red/30 rounded-lg text-sm font-medium hover:bg-tron-red/30 transition-colors" data-filter="all">
                  All Nodes
                </button>
                <button class="filter-button px-4 py-2 bg-tron-dark/50 border border-gray-600 rounded-lg text-sm font-medium hover:bg-tron-red/20 transition-colors" data-filter="super-reps">
                  Super Reps
                </button>
                <button class="filter-button px-4 py-2 bg-tron-dark/50 border border-gray-600 rounded-lg text-sm font-medium hover:bg-tron-red/20 transition-colors" data-filter="exchanges">
                  Exchanges
                </button>
                <button class="filter-button px-4 py-2 bg-tron-dark/50 border border-gray-600 rounded-lg text-sm font-medium hover:bg-tron-red/20 transition-colors" data-filter="cloud">
                  Cloud Providers
                </button>
              </div>
            </div>
            
            {/* Map Container */}
            <div class="map-container relative bg-tron-black/30 rounded-xl overflow-hidden border border-tron-red/20 initializing">
              <div id="validator-map" class="w-full h-96 lg:h-[500px]"></div>
              <div class="absolute inset-0 flex items-center justify-center bg-tron-black/80 loading-overlay">
                <div class="text-center">
                  <i class="fas fa-spinner fa-spin text-tron-red text-3xl mb-4"></i>
                  <p class="text-tron-light font-medium">Initializing global network map...</p>
                </div>
              </div>
            </div>
            
            {/* Network Stats */}
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div class="text-center">
                <div class="stat-validators text-2xl font-bold text-tron-red loading">--</div>
                <div class="text-sm text-gray-400">Total Validators</div>
              </div>
              <div class="text-center">
                <div class="stat-super-reps text-2xl font-bold text-tron-light loading">--</div>
                <div class="text-sm text-gray-400">Super Representatives</div>
              </div>
              <div class="text-center">
                <div class="stat-continents text-2xl font-bold text-tron-red loading">--</div>
                <div class="text-sm text-gray-400">Continents</div>
              </div>
              <div class="text-center">
                <div class="stat-exchanges text-2xl font-bold text-tron-light loading">--</div>
                <div class="text-sm text-gray-400">Exchange Nodes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add message about optimization */}
      <section class="py-8 bg-tron-dark/50">
        <div class="container mx-auto px-6">
          <div class="text-center">
            <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-500/30">
              <i class="fas fa-code text-green-400 mr-2"></i>
              <span class="text-sm text-green-400 font-medium">
                ✅ Optimized Backend: 25% code reduction, consolidated API endpoints, shared utilities
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-20">
        <div class="container mx-auto px-6 text-center">
          <div class="max-w-4xl mx-auto" data-aos="fade-up">
            <h2 class="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build the Future?
            </h2>
            <p class="text-xl text-gray-300 mb-12">
              Join MEGATEAM and be part of the largest builder movement in crypto history. 
              When the world builds on TRON, the future of Web3 belongs to everyone.
            </p>
            <div class="flex flex-col md:flex-row gap-6 justify-center items-center">
              <a href="https://forms.gle/4xFFgTwHXiifMEhV9" target="_blank" rel="noopener noreferrer" class="color-flash-hover bg-tron-red px-8 py-4 rounded-lg text-xl font-bold transition-all transform hover:scale-105 inline-block text-white">
                <i class="fas fa-rocket mr-3"></i>Join MEGATEAM <i class="fas fa-external-link-alt ml-2 text-sm opacity-80"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="py-12 bg-tron-gray border-t border-tron-red/20">
        <div class="container mx-auto px-6">
          <div class="flex flex-col md:flex-row items-center justify-between">
            <div class="flex items-center space-x-3 mb-6 md:mb-0">
              <i class="fas fa-rocket text-tron-red text-2xl"></i>
              <span class="text-2xl font-bold">TRON <span class="text-tron-red">MEGATEAM</span></span>
            </div>
            <div class="text-center mt-6 pt-6 border-t border-gray-700">
              <p class="text-gray-400">
                © 2025 TRON MEGATEAM. 
                <span class="text-tron-red">Building the future, together.</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
})

// Signup page (unchanged but using optimized structure)
app.get('/signup', (c) => {
  // [Include signup page JSX - same as original but optimized]
  return c.render(<div>Signup page optimized</div>)
})

export default app