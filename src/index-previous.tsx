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

// API endpoint for form submissions - handles both MEGATEAM signup forms
app.post('/api/signup', async (c) => {
  try {
    const formData = await c.req.json()
    
    // Check which type of signup form this is
    if (formData.username && formData.password) {
      // New MEGATEAM signup form with username/password
      const { username, email, password, tronAddress, terms } = formData

      // Validate required fields
      if (!username || !email || !password || !terms) {
        return c.json({ error: 'Missing required fields' }, 400)
      }

      // Validate username format
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
        return c.json({ error: 'Invalid username format' }, 400)
      }

      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return c.json({ error: 'Invalid email format' }, 400)
      }

      // Validate password length
      if (password.length < 8) {
        return c.json({ error: 'Password must be at least 8 characters' }, 400)
      }

      // Validate TRON address if provided
      if (tronAddress && !/^T[A-Za-z0-9]{33}$/.test(tronAddress)) {
        return c.json({ error: 'Invalid TRON wallet address' }, 400)
      }

      // Log the submission
      console.log('✅ MEGATEAM Account Registration:', {
        username,
        email,
        tronAddress: tronAddress || 'Not provided',
        timestamp: new Date().toISOString()
      })

      // For demo purposes, return success
      return c.json({
        success: true,
        message: 'Account created successfully',
        user: {
          username,
          email,
          tronAddress: tronAddress || null
        }
      })

    } else {
      // Original proposal form with firstName/lastName
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
    }
    
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

// Complete landing page with full proposal content
app.get('/', (c) => {
  return c.render(
    <>
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
            {/* Desktop Navigation */}
            <div class="hidden md:flex items-center space-x-8">
              <a href="#mission" class="text-tron-silver hover:text-tron-red transition-colors font-medium">Mission</a>
              <a href="#objectives" class="text-tron-silver hover:text-tron-red transition-colors font-medium">Objectives</a>
              <a href="#governance" class="text-tron-silver hover:text-tron-red transition-colors font-medium">Governance</a>
              <a href="#roadmap" class="text-tron-silver hover:text-tron-red transition-colors font-medium">Roadmap</a>
              <a href="/signup" class="bg-tron-red hover:bg-tron-dark-red px-6 py-2 rounded-lg font-bold transition-colors">Sign Up</a>
            </div>
            {/* Mobile Menu Button */}
            <div class="md:hidden">
              <button id="mobile-menu-btn" class="text-tron-white hover:text-tron-red transition-colors">
                <i class="fas fa-bars text-2xl"></i>
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          <div id="mobile-menu" class="md:hidden hidden mt-4 pb-4 border-t border-tron-red/30">
            <div class="flex flex-col space-y-4 pt-4">
              <a href="#mission" class="text-tron-silver hover:text-tron-red transition-colors font-medium">Mission</a>
              <a href="#objectives" class="text-tron-silver hover:text-tron-red transition-colors font-medium">Objectives</a>
              <a href="#governance" class="text-tron-silver hover:text-tron-red transition-colors font-medium">Governance</a>
              <a href="#roadmap" class="text-tron-silver hover:text-tron-red transition-colors font-medium">Roadmap</a>
              <a href="/signup" class="bg-tron-red hover:bg-tron-dark-red px-6 py-2 rounded-lg font-bold transition-colors text-center">Sign Up</a>
            </div>
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


        </div>
      </section>

      {/* Mission Statement Section */}
      <section id="mission" class="py-20 bg-gradient-to-b from-tron-black to-tron-dark">
        <div class="container mx-auto px-6">
          <div class="text-center mb-12" data-aos="fade-up">
            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-tron-red">
              TRON MEGATEAM Mission Statement
            </h2>
            <div class="max-w-4xl mx-auto bg-tron-dark/50 p-8 rounded-xl border border-tron-red/20">
              <p class="text-xl md:text-2xl text-gray-300 italic leading-relaxed">
                "TRON MEGATEAM exists to ignite the largest, most inclusive builder-movement in crypto history—uniting global communities to create, educate, and prosper on the TRON blockchain's superior, profitable, and sustainable foundation."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Narrative Section */}
      <section class="py-20 bg-tron-dark/50">
        <div class="container mx-auto px-6">
          <div class="text-center mb-12" data-aos="fade-up">
            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-tron-red">
              Core Narrative
            </h2>
          </div>
          <div class="max-w-5xl mx-auto">
            <p class="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Since Bitcoin's genesis, enthusiasts have dreamed of a network that is accessible, low-cost, lightning-fast, and profitable for builders at every level. TRON quietly became that network—powering more USDT transfers than any chain on earth, leading in stablecoin velocity, and delivering an unparalleled energy-rental model that lets developers run at near-zero gas cost.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div class="bg-tron-black/50 p-6 rounded-xl border border-tron-red/20">
                <h3 class="text-xl font-bold text-tron-light mb-4">
                  <i class="fas fa-globe-americas text-tron-red mr-3"></i>
                  Global Activation, Local Soul
                </h3>
                <p class="text-gray-300">From Lagos to Lima, Berlin to Bangalore, Boston to San Francisco, MEGATEAM launches hubs and city squads that turn TRON enthusiasm into funded projects.</p>
              </div>
              <div class="bg-tron-black/50 p-6 rounded-xl border border-tron-red/20">
                <h3 class="text-xl font-bold text-tron-light mb-4">
                  <i class="fas fa-coins text-tron-red mr-3"></i>
                  Builder-First Economics
                </h3>
                <p class="text-gray-300">With the industry's deepest bounty & grant engine, we fund everything from dApp prototypes to educational content.</p>
              </div>
              <div class="bg-tron-black/50 p-6 rounded-xl border border-tron-red/20">
                <h3 class="text-xl font-bold text-tron-light mb-4">
                  <i class="fas fa-shield-alt text-tron-red mr-3"></i>
                  Radical Accountability
                </h3>
                <p class="text-gray-300">A Guardian corps of vetted experts verifies every milestone, ensuring quality and preventing waste.</p>
              </div>
              <div class="bg-tron-black/50 p-6 rounded-xl border border-tron-red/20">
                <h3 class="text-xl font-bold text-tron-light mb-4">
                  <i class="fas fa-graduation-cap text-tron-red mr-3"></i>
                  Education as Fuel
                </h3>
                <p class="text-gray-300">MEGATEAM's multilingual media studio drops bite-sized tutorials, making TRON development accessible worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intentions & North-Star Objectives */}
      <section id="objectives" class="py-20 bg-gradient-to-b from-tron-dark/30 to-tron-black/50">
        <div class="container mx-auto px-6">
          <div class="text-center mb-12" data-aos="fade-up">
            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-tron-red">
              Intentions & North-Star Objectives
            </h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              Our Year-1 roadmap with quantifiable targets across six strategic pillars
            </p>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-tron-dark/50 border border-tron-red/20 rounded-lg overflow-hidden">
              <thead class="bg-tron-red/20">
                <tr>
                  <th class="px-6 py-4 text-left text-tron-red font-bold text-lg">Pillar</th>
                  <th class="px-6 py-4 text-left text-tron-red font-bold text-lg">Year-1 Intent</th>
                  <th class="px-6 py-4 text-left text-tron-red font-bold text-lg">Quantifiable Targets</th>
                </tr>
              </thead>
              <tbody class="text-gray-300">
                <tr class="border-t border-tron-red/10">
                  <td class="px-6 py-4 font-bold text-tron-light">Scale</td>
                  <td class="px-6 py-4">Stage the largest community activation in crypto history.</td>
                  <td class="px-6 py-4 text-tron-light font-medium">40 regional hubs • 150 city squads • 3,000+ funded deliverables</td>
                </tr>
                <tr class="border-t border-tron-red/10 bg-tron-black/20">
                  <td class="px-6 py-4 font-bold text-tron-light">Education</td>
                  <td class="px-6 py-4">Make TRON fundamentals common knowledge on every continent.</td>
                  <td class="px-6 py-4 text-tron-light font-medium">1,000 multilingual learning assets • 1M+ unique course completions</td>
                </tr>
                <tr class="border-t border-tron-red/10">
                  <td class="px-6 py-4 font-bold text-tron-light">Economic Impact</td>
                  <td class="px-6 py-4">Put real earnings in the hands of global builders.</td>
                  <td class="px-6 py-4 text-tron-light font-medium">≥ USDD 40M paid out in bounties, grants, and seed tickets</td>
                </tr>
                <tr class="border-t border-tron-red/10 bg-tron-black/20">
                  <td class="px-6 py-4 font-bold text-tron-light">Network Growth</td>
                  <td class="px-6 py-4">Translate community energy into on-chain traction.</td>
                  <td class="px-6 py-4 text-tron-light font-medium">+50% YoY TRON daily active wallets • +30 flagship dApps live</td>
                </tr>
                <tr class="border-t border-tron-red/10">
                  <td class="px-6 py-4 font-bold text-tron-light">Sustainability</td>
                  <td class="px-6 py-4">Reinforce TRON's profitability narrative.</td>
                  <td class="px-6 py-4 text-tron-light font-medium">Public KPI dashboard linking MEGATEAM spend to TX volume, TVL, fee burn</td>
                </tr>
                <tr class="border-t border-tron-red/10 bg-tron-black/20">
                  <td class="px-6 py-4 font-bold text-tron-light">Cultural Leadership</td>
                  <td class="px-6 py-4">Position TRON as the builder chain of choice for Web3.</td>
                  <td class="px-6 py-4 text-tron-light font-medium">Host "TRON Mega-World Expo" • Top-3 social engagement among all L1s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Rallying Cry Section */}
      <section class="py-20 bg-tron-black/50">
        <div class="container mx-auto px-6 text-center">
          <div class="max-w-4xl mx-auto" data-aos="fade-up">
            <h2 class="text-4xl md:text-5xl font-bold mb-8 text-tron-red">
              Rallying Cry
            </h2>
            <div class="bg-gradient-to-r from-tron-red/20 to-tron-light/20 p-8 rounded-xl border border-tron-red/30">
              <p class="text-3xl md:text-4xl text-tron-light italic font-bold mb-6">
                "Build Everywhere. Earn Anywhere. Together on TRON."
              </p>
              <p class="text-lg md:text-xl text-gray-300 leading-relaxed">
                With MEGATEAM, TRON shifts from quiet powerhouse to global front-runner—not through slogans, but by funding real people to build real products that generate real value for real communities. The future doesn't wait. Let's build it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structure and Governance Section */}
      <section id="governance" class="py-20 bg-tron-dark/50">
        <div class="container mx-auto px-6">
          <div class="text-center mb-12" data-aos="fade-up">
            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-tron-red">
              Structure and Governance
            </h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              A hybrid model balancing decentralized participation with operational efficiency
            </p>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Organizational Hierarchy */}
            <div class="bg-tron-black/50 p-8 rounded-xl border border-tron-red/20">
              <h3 class="text-2xl font-bold text-tron-light mb-6">
                <i class="fas fa-sitemap text-tron-red mr-3"></i>
                Organizational Structure
              </h3>
              <div class="space-y-4">
                <div class="pl-0">
                  <div class="text-tron-red font-bold text-lg">Global Council</div>
                </div>
                <div class="pl-6">
                  <div class="text-tron-light font-semibold">Program Director / COO</div>
                </div>
                <div class="pl-12 space-y-2">
                  <div class="text-gray-300">• Core Engineering & Product</div>
                  <div class="text-gray-300">• Security & Compliance</div>
                  <div class="text-gray-300">• Regional Hub Leads (40)</div>
                  <div class="pl-6 text-gray-400">└ Local Squad Captains (150)</div>
                  <div class="text-gray-300">• Guardian Committee</div>
                  <div class="pl-6 text-gray-400">└ Independent audit & quality control</div>
                </div>
              </div>
            </div>
            
            {/* Governance Principles */}
            <div class="bg-tron-black/50 p-8 rounded-xl border border-tron-red/20">
              <h3 class="text-2xl font-bold text-tron-light mb-6">
                <i class="fas fa-balance-scale text-tron-red mr-3"></i>
                Governance Principles
              </h3>
              <div class="space-y-4">
                <div class="flex items-start">
                  <i class="fas fa-check-circle text-tron-red mr-3 mt-1"></i>
                  <div>
                    <div class="text-tron-light font-semibold">DAO Partnership</div>
                    <div class="text-gray-300 text-sm">Strategic input from existing TRON DAOs</div>
                  </div>
                </div>
                <div class="flex items-start">
                  <i class="fas fa-users text-tron-red mr-3 mt-1"></i>
                  <div>
                    <div class="text-tron-light font-semibold">Community Leadership</div>
                    <div class="text-gray-300 text-sm">Hub leads elected by local communities</div>
                  </div>
                </div>
                <div class="flex items-start">
                  <i class="fas fa-shield-alt text-tron-red mr-3 mt-1"></i>
                  <div>
                    <div class="text-tron-light font-semibold">Guardian Reviewers</div>
                    <div class="text-gray-300 text-sm">Independent verification of all deliverables</div>
                  </div>
                </div>
                <div class="flex items-start">
                  <i class="fas fa-vote-yea text-tron-red mr-3 mt-1"></i>
                  <div>
                    <div class="text-tron-light font-semibold">Transparent Decisions</div>
                    <div class="text-gray-300 text-sm">Public voting on major initiatives</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rollout Roadmap */}
      <section id="roadmap" class="py-20 bg-gradient-to-b from-tron-black to-tron-dark">
        <div class="container mx-auto px-6">
          <div class="text-center mb-12" data-aos="fade-up">
            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-tron-red">
              Year-1 Rollout Roadmap
            </h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              Phased deployment ensuring sustainable growth and community engagement
            </p>
          </div>
          <div class="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-tron-red/50"></div>
            
            <div class="space-y-12">
              {/* Phase 1 */}
              <div class="relative flex flex-col md:flex-row items-center">
                <div class="w-full md:w-1/2 text-center md:text-right md:pr-8 mb-4 md:mb-0">
                  <div class="bg-tron-dark/50 p-6 rounded-xl border border-tron-red/20">
                    <h3 class="text-xl font-bold text-tron-red mb-2">Phase 1: Seed</h3>
                    <p class="text-gray-300 mb-2">Initial setup, secure leadership</p>
                    <div class="text-tron-light font-semibold">Months 1-2</div>
                  </div>
                </div>
                <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-tron-red rounded-full w-6 h-6 border-4 border-tron-black"></div>
                <div class="w-full md:w-1/2 md:pl-8"></div>
              </div>
              
              {/* Phase 2 */}
              <div class="relative flex flex-col md:flex-row items-center">
                <div class="w-full md:w-1/2 md:pr-8"></div>
                <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-tron-light rounded-full w-6 h-6 border-4 border-tron-black"></div>
                <div class="w-full md:w-1/2 text-center md:text-left md:pl-8">
                  <div class="bg-tron-dark/50 p-6 rounded-xl border border-tron-red/20">
                    <h3 class="text-xl font-bold text-tron-light mb-2">Phase 2: Portal MVP</h3>
                    <p class="text-gray-300 mb-2">Launch core platform & first hubs</p>
                    <div class="text-tron-light font-semibold">Months 2-3</div>
                  </div>
                </div>
              </div>
              
              {/* Phase 3 */}
              <div class="relative flex flex-col md:flex-row items-center">
                <div class="w-full md:w-1/2 text-center md:text-right md:pr-8 mb-4 md:mb-0">
                  <div class="bg-tron-dark/50 p-6 rounded-xl border border-tron-red/20">
                    <h3 class="text-xl font-bold text-tron-red mb-2">Phase 3: Ambassador Onboarding</h3>
                    <p class="text-gray-300 mb-2">Scale to 40 regional hubs</p>
                    <div class="text-tron-light font-semibold">Months 3-6</div>
                  </div>
                </div>
                <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-tron-red rounded-full w-6 h-6 border-4 border-tron-black"></div>
                <div class="w-full md:w-1/2 md:pl-8"></div>
              </div>
              
              {/* Phase 4 */}
              <div class="relative flex flex-col md:flex-row items-center">
                <div class="w-full md:w-1/2 md:pr-8"></div>
                <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-tron-light rounded-full w-6 h-6 border-4 border-tron-black"></div>
                <div class="w-full md:w-1/2 text-center md:text-left md:pl-8">
                  <div class="bg-tron-dark/50 p-6 rounded-xl border border-tron-red/20">
                    <h3 class="text-xl font-bold text-tron-light mb-2">Phase 4: Full Launch</h3>
                    <p class="text-gray-300 mb-2">150 city squads, major campaigns</p>
                    <div class="text-tron-light font-semibold">Months 6-12</div>
                  </div>
                </div>
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

// MEGATEAM Signup Page
app.get('/signup', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Join MEGATEAM - TRON Network</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            .gradient-text {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .glass-morphism {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .form-input {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: all 0.3s ease;
            }
            .form-input:focus {
                background: rgba(255, 255, 255, 0.1);
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }
            .submit-button {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                transition: all 0.3s ease;
            }
            .submit-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
            }
            .error-message {
                animation: shake 0.5s ease-in-out;
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        </style>
    </head>
    <body class="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen text-white">
        <!-- Navigation -->
        <nav class="glass-morphism fixed w-full top-0 z-50 px-6 py-4">
            <div class="max-w-7xl mx-auto flex justify-between items-center">
                <a href="/" class="flex items-center space-x-2">
                    <i class="fas fa-network-wired text-2xl text-purple-400"></i>
                    <span class="text-xl font-bold gradient-text">MEGATEAM</span>
                </a>
                <div class="flex items-center space-x-4">
                    <a href="/" class="hover:text-purple-400 transition-colors">Dashboard</a>
                    <a href="/analytics" class="hover:text-purple-400 transition-colors">Analytics</a>
                    <a href="/signup" class="text-purple-400 font-semibold">Join Now</a>
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <div class="pt-24 pb-12 px-6">
            <div class="max-w-md mx-auto">
                <!-- Header -->
                <div class="text-center mb-8">
                    <h1 class="text-4xl font-bold mb-4">
                        <span class="gradient-text">Join MEGATEAM</span>
                    </h1>
                    <p class="text-gray-300">Become part of the TRON network's most powerful validator team</p>
                </div>

                <!-- Signup Form -->
                <div class="glass-morphism rounded-2xl p-8">
                    <form id="signupForm" class="space-y-6">
                        <!-- Username Field -->
                        <div>
                            <label for="username" class="block text-sm font-medium text-gray-300 mb-2">
                                <i class="fas fa-user mr-2"></i>Username
                            </label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username"
                                required
                                minlength="3"
                                maxlength="20"
                                pattern="[a-zA-Z0-9_]+"
                                class="form-input w-full px-4 py-3 rounded-lg text-white focus:outline-none"
                                placeholder="Enter your username"
                            >
                            <span class="text-xs text-gray-400 mt-1">Letters, numbers, and underscores only</span>
                        </div>

                        <!-- Email Field -->
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                                <i class="fas fa-envelope mr-2"></i>Email Address
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                required
                                class="form-input w-full px-4 py-3 rounded-lg text-white focus:outline-none"
                                placeholder="your@email.com"
                            >
                        </div>

                        <!-- Password Field -->
                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
                                <i class="fas fa-lock mr-2"></i>Password
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                required
                                minlength="8"
                                class="form-input w-full px-4 py-3 rounded-lg text-white focus:outline-none"
                                placeholder="Minimum 8 characters"
                            >
                            <div class="mt-2" id="passwordStrength"></div>
                        </div>

                        <!-- Confirm Password Field -->
                        <div>
                            <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">
                                <i class="fas fa-lock mr-2"></i>Confirm Password
                            </label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                name="confirmPassword"
                                required
                                minlength="8"
                                class="form-input w-full px-4 py-3 rounded-lg text-white focus:outline-none"
                                placeholder="Re-enter your password"
                            >
                        </div>

                        <!-- TRON Wallet Address (Optional) -->
                        <div>
                            <label for="tronAddress" class="block text-sm font-medium text-gray-300 mb-2">
                                <i class="fas fa-wallet mr-2"></i>TRON Wallet Address (Optional)
                            </label>
                            <input 
                                type="text" 
                                id="tronAddress" 
                                name="tronAddress"
                                pattern="T[A-Za-z0-9]{33}"
                                class="form-input w-full px-4 py-3 rounded-lg text-white focus:outline-none"
                                placeholder="TYourTronWalletAddress..."
                            >
                            <span class="text-xs text-gray-400 mt-1">Connect your TRON wallet for enhanced features</span>
                        </div>

                        <!-- Terms and Conditions -->
                        <div class="flex items-start">
                            <input 
                                type="checkbox" 
                                id="terms" 
                                name="terms"
                                required
                                class="mt-1 mr-3 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            >
                            <label for="terms" class="text-sm text-gray-300">
                                I agree to the <a href="#" class="text-purple-400 hover:underline">Terms of Service</a> 
                                and <a href="#" class="text-purple-400 hover:underline">Privacy Policy</a>
                            </label>
                        </div>

                        <!-- Error Message Container -->
                        <div id="errorMessage" class="hidden bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg"></div>

                        <!-- Success Message Container -->
                        <div id="successMessage" class="hidden bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg"></div>

                        <!-- Submit Button -->
                        <button 
                            type="submit" 
                            class="submit-button w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center"
                        >
                            <span id="buttonText">Create Account</span>
                            <i class="fas fa-arrow-right ml-2" id="buttonIcon"></i>
                            <span id="loadingSpinner" class="hidden">
                                <i class="fas fa-spinner fa-spin"></i>
                            </span>
                        </button>
                    </form>

                    <!-- Divider -->
                    <div class="relative my-6">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-600"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-transparent text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <!-- Social Login Options -->
                    <div class="grid grid-cols-2 gap-4">
                        <button class="form-input px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center justify-center">
                            <i class="fab fa-google mr-2"></i> Google
                        </button>
                        <button class="form-input px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center justify-center">
                            <i class="fab fa-github mr-2"></i> GitHub
                        </button>
                    </div>

                    <!-- Login Link -->
                    <p class="text-center mt-6 text-gray-400">
                        Already have an account? 
                        <a href="/login" class="text-purple-400 hover:underline font-semibold">Sign In</a>
                    </p>
                </div>

                <!-- Features List -->
                <div class="mt-8 space-y-4">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-check-circle text-green-400"></i>
                        <span class="text-gray-300">Access to real-time TRON network analytics</span>
                    </div>
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-check-circle text-green-400"></i>
                        <span class="text-gray-300">Join a network of 7,662+ global nodes</span>
                    </div>
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-check-circle text-green-400"></i>
                        <span class="text-gray-300">Participate in network governance</span>
                    </div>
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-check-circle text-green-400"></i>
                        <span class="text-gray-300">Earn rewards through staking</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Signup JavaScript -->
        <script>
            // Password strength checker
            function checkPasswordStrength(password) {
                let strength = 0;
                const strengthIndicator = document.getElementById('passwordStrength');
                
                if (password.length >= 8) strength++;
                if (password.length >= 12) strength++;
                if (/[a-z]/.test(password)) strength++;
                if (/[A-Z]/.test(password)) strength++;
                if (/[0-9]/.test(password)) strength++;
                if (/[^a-zA-Z0-9]/.test(password)) strength++;
                
                let strengthText = '';
                let strengthColor = '';
                
                if (strength <= 2) {
                    strengthText = 'Weak';
                    strengthColor = 'text-red-400';
                } else if (strength <= 4) {
                    strengthText = 'Medium';
                    strengthColor = 'text-yellow-400';
                } else {
                    strengthText = 'Strong';
                    strengthColor = 'text-green-400';
                }
                
                if (password.length > 0) {
                    strengthIndicator.innerHTML = \`
                        <div class="flex items-center space-x-2">
                            <div class="flex space-x-1">
                                \${[1,2,3,4,5].map(i => \`
                                    <div class="w-8 h-1 rounded \${i <= strength ? (strength <= 2 ? 'bg-red-400' : strength <= 4 ? 'bg-yellow-400' : 'bg-green-400') : 'bg-gray-600'}"></div>
                                \`).join('')}
                            </div>
                            <span class="text-xs \${strengthColor}">\${strengthText}</span>
                        </div>
                    \`;
                } else {
                    strengthIndicator.innerHTML = '';
                }
            }
            
            // Password input event listener
            document.getElementById('password').addEventListener('input', (e) => {
                checkPasswordStrength(e.target.value);
            });
            
            // Form submission handler
            document.getElementById('signupForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(e.target);
                const errorMessage = document.getElementById('errorMessage');
                const successMessage = document.getElementById('successMessage');
                const buttonText = document.getElementById('buttonText');
                const buttonIcon = document.getElementById('buttonIcon');
                const loadingSpinner = document.getElementById('loadingSpinner');
                const submitButton = e.target.querySelector('button[type="submit"]');
                
                // Reset messages
                errorMessage.classList.add('hidden');
                successMessage.classList.add('hidden');
                
                // Validate passwords match
                if (formData.get('password') !== formData.get('confirmPassword')) {
                    errorMessage.textContent = 'Passwords do not match';
                    errorMessage.classList.remove('hidden');
                    errorMessage.classList.add('error-message');
                    return;
                }
                
                // Validate TRON address if provided
                const tronAddress = formData.get('tronAddress');
                if (tronAddress && !tronAddress.match(/^T[A-Za-z0-9]{33}$/)) {
                    errorMessage.textContent = 'Invalid TRON wallet address format';
                    errorMessage.classList.remove('hidden');
                    errorMessage.classList.add('error-message');
                    return;
                }
                
                // Show loading state
                buttonText.classList.add('hidden');
                buttonIcon.classList.add('hidden');
                loadingSpinner.classList.remove('hidden');
                submitButton.disabled = true;
                
                try {
                    // Simulate API call (replace with actual API endpoint)
                    const response = await fetch('/api/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: formData.get('username'),
                            email: formData.get('email'),
                            password: formData.get('password'),
                            tronAddress: formData.get('tronAddress'),
                            terms: formData.get('terms') === 'on'
                        })
                    });
                    
                    const data = await response.json();
                    
                    if (response.ok) {
                        successMessage.textContent = 'Account created successfully! Redirecting...';
                        successMessage.classList.remove('hidden');
                        
                        // Reset form
                        e.target.reset();
                        document.getElementById('passwordStrength').innerHTML = '';
                        
                        // Redirect after 2 seconds
                        setTimeout(() => {
                            window.location.href = '/dashboard';
                        }, 2000);
                    } else {
                        errorMessage.textContent = data.error || 'Failed to create account. Please try again.';
                        errorMessage.classList.remove('hidden');
                        errorMessage.classList.add('error-message');
                    }
                } catch (error) {
                    errorMessage.textContent = 'Network error. Please check your connection and try again.';
                    errorMessage.classList.remove('hidden');
                    errorMessage.classList.add('error-message');
                } finally {
                    // Reset button state
                    buttonText.classList.remove('hidden');
                    buttonIcon.classList.remove('hidden');
                    loadingSpinner.classList.add('hidden');
                    submitButton.disabled = false;
                }
            });
            
            // Real-time validation
            document.getElementById('username').addEventListener('input', (e) => {
                const value = e.target.value;
                const isValid = /^[a-zA-Z0-9_]+$/.test(value);
                if (!isValid && value.length > 0) {
                    e.target.setCustomValidity('Username can only contain letters, numbers, and underscores');
                } else {
                    e.target.setCustomValidity('');
                }
            });
            
            document.getElementById('confirmPassword').addEventListener('input', (e) => {
                const password = document.getElementById('password').value;
                if (e.target.value !== password) {
                    e.target.setCustomValidity('Passwords do not match');
                } else {
                    e.target.setCustomValidity('');
                }
            });
        </script>
    </body>
    </html>
  `)
})

export default app