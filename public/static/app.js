// Futuristic JavaScript for TRON MEGATEAM Landing Page
// Audio system now handled by mobile-audio.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        anchorPlacement: 'top-bottom'
    });

    // Initialize Matrix Rain Effect
    initMatrixRain();
    
    // Initialize Cyber Effects
    initCyberEffects();
    
    // Initialize Particle System
    initParticleSystem();

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.toggle('active');
            }
        });
    }

    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Add cyber effect on scroll
                addCyberGlitch();
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });

    // Enhanced navbar background on scroll
    const navbar = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'linear-gradient(90deg, rgba(10, 10, 10, 0.98) 0%, rgba(26, 26, 26, 0.98) 50%, rgba(10, 10, 10, 0.98) 100%)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'linear-gradient(90deg, rgba(10, 10, 10, 0.95) 0%, rgba(26, 26, 26, 0.95) 50%, rgba(10, 10, 10, 0.95) 100%)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 255, 255, 0.05)';
        }
        
        lastScroll = currentScroll;
    });

    // Matrix Rain Effect
    function initMatrixRain() {
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]|\\:";\'<>?,./-=+_`~';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        // Initialize drops
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function drawMatrix() {
            // Semi-transparent black background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // TRON Red text with minimal glow
            ctx.fillStyle = '#FF060A';
            ctx.shadowColor = '#FF060A';
            ctx.shadowBlur = 1;
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                // Reset drop to top randomly
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(drawMatrix, 50);
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Cyber Effects
    function initCyberEffects() {
        // Add glitch effect to buttons
        document.querySelectorAll('button, .cyber-button').forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.animation = 'glitch 0.3s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 300);
            });
        });
        
        // Add holographic effect to cards
        document.querySelectorAll('.cyber-card, .holographic-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.background = 'linear-gradient(45deg, rgba(255, 0, 128, 0.1), rgba(0, 255, 255, 0.1), rgba(255, 0, 128, 0.1))';
                this.style.animation = 'hologram 2s ease-in-out infinite';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.animation = '';
                this.style.background = '';
            });
        });
    }

    // Particle System
    function initParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.id = 'particle-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(particleContainer);
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'data-particle';
            
            const startX = Math.random() * window.innerWidth;
            const color = ['#FF060A', '#FF4444', '#CC0408', '#C0C0C0'][Math.floor(Math.random() * 4)];
            const size = Math.random() * 3 + 1;
            const duration = Math.random() * 3000 + 2000;
            
            particle.style.cssText = `
                position: absolute;
                left: ${startX}px;
                top: -10px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                box-shadow: 0 0 ${size * 1.5}px ${color};
                animation: dataStream ${duration}ms linear forwards;
            `;
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, duration);
        }
        
        // Create particles periodically
        setInterval(createParticle, 300);
    }

    // TRONScan API Integration for Real-Time Data
    initTronDataFetcher();
    
    // Initialize TRON Network Map
    initTronNetworkMap();

    console.log('🚀 TRON MEGATEAM Futuristic Interface Initialized! 🌐');
    console.log('⚡ Matrix protocols active...');
    console.log('🔮 Holographic systems online...');
    console.log('💎 Cyber enhancement complete!');
    console.log('🎵 Audio system loaded by mobile-audio.js');
});

// Cyber Glitch Effect
function addCyberGlitch() {
    const glitchElement = document.createElement('div');
    glitchElement.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%);
        pointer-events: none;
        z-index: 9999;
        animation: cyberScan 0.3s ease-out;
    `;
    
    document.body.appendChild(glitchElement);
    
    setTimeout(() => {
        glitchElement.remove();
    }, 300);
}

// Additional CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// TRONScan API Integration Functions
function initTronDataFetcher() {
    console.log('🔗 Initializing TRONScan API integration...');
    
    // OPTIMIZATION: Fetch data immediately instead of waiting 2 seconds
    // Show loading state while fetching
    showLoadingState();
    fetchTronNetworkData();
    
    // Also fetch network infrastructure data immediately
    setTimeout(fetchNetworkInfrastructureData, 1000);
    
    // Set up periodic updates every 30 seconds for more responsive data
    // (APIs can handle this frequency easily with parallel requests)
    setInterval(fetchTronNetworkData, 30000);
    
    // Set up periodic updates for network infrastructure every 60 seconds
    setInterval(fetchNetworkInfrastructureData, 60000);
}

// ENHANCED: Robust TRON network statistics loader with multiple fallbacks
async function fetchTronNetworkData() {
    console.log('📊 Starting TRON network data fetch...');
    const startTime = performance.now();
    
    try {
        // First try: Combined dashboard endpoint with caching
        console.log('🎯 Trying combined dashboard API...');
        const dashboardData = await cachedFetch('/api/tron/dashboard', 30000);
        
        if (dashboardData && !dashboardData.error) {
            const endTime = performance.now();
            console.log(`🚀 Dashboard API succeeded in ${(endTime - startTime).toFixed(0)}ms`);
            
            updateTronStats(dashboardData);
            return;
        } else {
            console.warn('⚠️ Dashboard API returned error or null, trying direct APIs...');
        }
        
    } catch (error) {
        console.error('❌ Dashboard API failed:', error.message);
    }
    
    try {
        // Fallback: Direct TRONScan APIs with sequential calls (rate limiting)
        console.log('🔄 Falling back to direct TRONScan APIs...');
        
        const endpoints = [
            'https://apilist.tronscanapi.com/api/system/tps', // TPS data
            'https://apilist.tronscanapi.com/api/block/latest', // Latest block
            'https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd&include_24hr_change=true&include_market_cap=true' // TRX price
        ];
        
        const results = {};
        
        for (const [index, url] of endpoints.entries()) {
            try {
                console.log(`🔄 Fetching ${url.split('/').pop()}...`);
                const data = await cachedFetch(url, 30000);
                
                if (data) {
                    if (url.includes('tps')) results.tps = data;
                    else if (url.includes('block')) results.block = data;
                    else if (url.includes('coingecko')) results.price = data.tron;
                }
                
                // Rate limiting: wait 350ms between requests
                if (index < endpoints.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 350));
                }
            } catch (fetchError) {
                console.error(`❌ Failed to fetch ${url}:`, fetchError.message);
            }
        }
        
        // Transform and update with available data
        const transformedData = transformDirectAPIData(results);
        updateTronStats(transformedData);
        
        console.log('✅ Direct API fallback completed with available data');
        
    } catch (error) {
        console.error('❌ All API fetches failed:', error);
        
        // Final fallback: Use static placeholder data
        console.log('🔧 Using static fallback data...');
        updateTronStats(getStaticFallbackData());
    }
}

// Transform direct API responses to match our data structure
function transformDirectAPIData(results) {
    return {
        tps: {
            current: results.tps?.data?.currentTps || results.tps?.tps || 45,
            max: results.tps?.data?.maxTps || results.tps?.maxTps || 2000
        },
        block: {
            height: results.block?.number || results.block?.height || 75830000,
            transactions: results.block?.nrOfTrx || results.block?.transactions || 156
        },
        price: {
            price: results.price?.usd || 0.341,
            change24h: results.price?.usd_24h_change || -0.5,
            marketCap: results.price?.usd_market_cap || 32300000000
        },
        transactions: {
            today: 9124874, // Static for now - would need additional API call
            change24h: -1.67,
            change7d: -7.05
        },
        accounts: {
            totalAccounts: 332000000,
            activeAccounts: 6640000
        }
    };
}

// Static fallback data when all APIs fail
function getStaticFallbackData() {
    console.log('📋 Returning static fallback data');
    return {
        tps: { current: 45, max: 2000 },
        block: { height: 75830000, transactions: 156 },
        price: { price: 0.341, change24h: -0.5, marketCap: 32300000000 },
        transactions: { today: 9124874, change24h: -1.67, change7d: -7.05 },
        accounts: { totalAccounts: 332000000, activeAccounts: 6640000 }
    };
}

// Fetch Current TPS (Transactions Per Second) via proxy API - OPTIMIZED
async function fetchTPS() {
    try {
        // Check cache first
        const cached = getCachedData('tps');
        if (cached) {
            console.log('📊 Using cached TPS data');
            return cached;
        }
        
        const response = await fetch('/api/tron/tps', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`TPS API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        const result = {
            current: data.current || 0,
            max: data.max || 0,
            blockHeight: data.blockHeight || 0,
            timestamp: data.timestamp || Date.now()
        };
        
        // Cache the result
        setCachedData('tps', result);
        return result;
    } catch (error) {
        console.error('TPS fetch error:', error);
        return { current: 0, max: 0, error: true };
    }
}

// Fetch Latest Block Information via proxy API
async function fetchLatestBlock() {
    try {
        const response = await fetch('/api/tron/block', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Block API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
            height: data.height || 0,
            hash: data.hash || '',
            transactions: data.transactions || 0,
            timestamp: data.timestamp || Date.now(),
            size: data.size || 0
        };
    } catch (error) {
        console.error('Block fetch error:', error);
        return { height: 0, transactions: 0, error: true };
    }
}

// Fetch Daily Transaction Statistics via proxy API
async function fetchDailyTransactions() {
    try {
        const response = await fetch('/api/tron/transactions', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Daily transactions API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
            today: data.today || 0,
            date: data.date || new Date().toISOString().split('T')[0],
            totalTransactions: data.totalTransactions || 0,
            usdtTransactions: data.usdtTransactions || 0,
            usdtVolume: data.usdtVolume || 0
        };
    } catch (error) {
        console.error('Daily transactions fetch error:', error);
        return { today: 0, totalTransactions: 0, error: true };
    }
}

// Fetch TRX Price and Market Data via proxy API - OPTIMIZED  
async function fetchTRXPrice() {
    try {
        // Check cache first
        const cached = getCachedData('price');
        if (cached) {
            console.log('📊 Using cached price data');
            return cached;
        }
        
        const response = await fetch('/api/tron/price', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Price API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        const result = {
            price: data.price || 0,
            volume24h: data.volume24h || 0,
            change24h: data.change24h || 0,
            marketCap: data.marketCap || 0,
            rank: data.rank || 0
        };
        
        // Cache the result
        setCachedData('price', result);
        return result;
    } catch (error) {
        console.error('Price fetch error:', error);
        return { price: 0, volume24h: 0, change24h: 0, error: true };
    }
}

// Fetch TRON Account Statistics via proxy API
async function fetchTronAccounts() {
    try {
        const response = await fetch('/api/tron/accounts', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Accounts API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
            totalAccounts: data.totalAccounts || 0,
            activeAccounts: data.activeAccounts || 0,
            newAccounts24h: data.newAccounts24h || 0
        };
    } catch (error) {
        console.error('Accounts fetch error:', error);
        return { totalAccounts: 0, activeAccounts: 0, error: true };
    }
}

// ENHANCED: Parse nested TRONScan API responses
function parseNestedApiData(rawData) {
    // Log the raw data shape for debugging
    console.log('🔍 Raw API data shape:', {
        hasData: !!rawData?.data,
        keys: Object.keys(rawData || {}),
        tpsShape: rawData?.tps || rawData?.data?.tps || 'not found',
        sample: JSON.stringify(rawData).substring(0, 200) + '...'
    });
    
    // Handle different TRONScan response structures
    const parsed = {};
    
    // Check if data is nested under 'data' property (common TRONScan pattern)
    const source = rawData?.data || rawData;
    
    // Parse TPS data from various possible structures
    if (source?.tps !== undefined) {
        parsed.tps = typeof source.tps === 'number' ? 
            { current: source.tps, max: source.maxTps || 2000 } : 
            source.tps;
    } else if (source?.currentTps !== undefined) {
        parsed.tps = { current: source.currentTps, max: source.maxTps || 2000 };
    } else if (rawData?.tps !== undefined) {
        parsed.tps = rawData.tps;
    }
    
    // Parse block data
    if (source?.block) {
        parsed.block = source.block;
    } else if (source?.latestBlock) {
        parsed.block = source.latestBlock;
    } else if (source?.blockHeight || source?.height) {
        parsed.block = {
            height: source.blockHeight || source.height,
            transactions: source.blockTransactions || source.transactions || 0
        };
    }
    
    // Parse transaction data  
    if (source?.transactions) {
        parsed.transactions = source.transactions;
    } else if (source?.dailyTransactions || source?.txnCount) {
        parsed.transactions = {
            today: source.dailyTransactions || source.txnCount,
            change24h: source.change24h || 0,
            change7d: source.change7d || 0
        };
    }
    
    // Parse price data
    if (source?.price) {
        parsed.price = source.price;
    } else if (source?.trxPrice || source?.currentPrice) {
        parsed.price = {
            price: source.trxPrice || source.currentPrice,
            change24h: source.priceChange24h || 0
        };
    }
    
    // Parse account data
    if (source?.accounts || source?.totalAccounts) {
        parsed.accounts = source.accounts || {
            totalAccounts: source.totalAccounts,
            activeAccounts: source.activeAccounts
        };
    }
    
    console.log('🔧 Parsed data shape:', {
        tps: parsed.tps?.current || 'missing',
        block: parsed.block?.height || 'missing', 
        transactions: parsed.transactions?.today || 'missing',
        price: parsed.price?.price || 'missing'
    });
    
    return parsed;
}

// OPTIMIZED: Update UI elements with TRON network statistics using batched DOM updates
// Enhanced formatter utility
function formatValue(val, type = 'number') {
    if (val === null || val === undefined || val === '') return '--';
    
    if (type === 'price' && typeof val === 'number') {
        return '$' + val.toFixed(4);
    }
    
    if (type === 'volume' && typeof val === 'number') {
        if (val >= 1e9) return '$' + (val / 1e9).toFixed(1) + 'B';
        if (val >= 1e6) return '$' + (val / 1e6).toFixed(1) + 'M';
        if (val >= 1e3) return '$' + (val / 1e3).toFixed(1) + 'K';
        return '$' + val.toFixed(2);
    }
    
    if (typeof val === 'number') {
        if (val >= 1e6) return (val / 1e6).toFixed(1) + 'M';
        if (val >= 1e3) return (val / 1e3).toFixed(1) + 'K';
        return val.toLocaleString();
    }
    
    return val.toString();
}

function updateTronStats(rawData) {
    try {
        console.log('🔄 Updating TRON statistics in UI...');
        
        // ENHANCED: Deep flatten all API data for comprehensive key mapping
        let allData = {};
        
        // Flatten the raw data recursively
        const flattenedRaw = flattenApiData(rawData.data || rawData);
        Object.assign(allData, flattenedRaw);
        
        // Also parse nested structure for backward compatibility
        const parsedData = parseNestedApiData(rawData);
        const flattenedParsed = flattenApiData(parsedData);
        Object.assign(allData, flattenedParsed);
        
        console.log('🔍 Flattened API keys:', Object.keys(allData).slice(0, 20));
        console.log('🔍 Key samples:', {
            tps_variants: Object.keys(allData).filter(k => k.includes('tps') || k.includes('current')),
            block_variants: Object.keys(allData).filter(k => k.includes('block') || k.includes('height')),
            price_variants: Object.keys(allData).filter(k => k.includes('price'))
        });
        
        // Deep flatten utility for recursive API data merging
        function flattenApiData(obj, prefix = '') {
            const flat = {};
            for (const [k, v] of Object.entries(obj)) {
                const key = prefix ? `${prefix}_${k}` : k;
                if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
                    Object.assign(flat, flattenApiData(v, key));
                } else {
                    flat[key] = v;
                }
            }
            return flat;
        }

        // Enhanced stat selectors with comprehensive API key variants
        const statSelectors = {
            // Core Performance Stats with all API variants
            'live-tps': { 
                keys: ['tps_current', 'tps', 'transactionCount', 'current', 'tpsCount', 'transactions_per_second'], 
                type: 'number',
                fallback: 0 
            },
            'live-block': { 
                keys: ['block_height', 'block', 'latestBlock', 'height', 'blockHeight', 'latest_block_height'], 
                type: 'number',
                fallback: 0 
            },
            'live-daily-txns': { 
                keys: ['transactions_today', 'transactions24h', 'txCount24h', 'txns', 'daily_transactions', 'txCount'], 
                type: 'number',
                fallback: 0 
            },
            'live-trx-price': { 
                keys: ['price_price', 'price', 'trxPrice', 'currentPrice', 'price_usd', 'usd_price'], 
                type: 'price',
                fallback: 0 
            },
            
            // Change percentages with flattened variants
            'txn-change-24h': { 
                keys: ['transactions_change24h', 'change24h', 'priceChange24h', 'txn_change_24h'], 
                type: 'percent',
                fallback: null 
            },
            'txn-change-7d': { 
                keys: ['transactions_change7d', 'change7d', 'weekChange', 'txn_change_7d'], 
                type: 'percent',
                fallback: null 
            },
            'price-change-24h': { 
                keys: ['price_change24h', 'priceChange24h', 'change24h', 'price_24h_change'], 
                type: 'percent',
                fallback: null 
            },
            'price-change-30d': { 
                keys: ['price_change30d', 'priceChange30d', 'monthChange', 'price_30d_change'], 
                type: 'percent',
                fallback: null 
            },
            'price-change-1y': { 
                keys: ['price_change1y', 'priceChange1y', 'yearChange', 'price_1y_change'], 
                type: 'percent',
                fallback: null 
            },
            
            // Volume and account stats with variants
            'live-usdt-volume': { 
                keys: ['transactions_usdtVolume', 'usdtVolume', 'volume24h', 'usdt_volume', 'usdtTxVolume'], 
                type: 'volume',
                fallback: 0 
            },
            'live-total-accounts': { 
                keys: ['accounts_totalAccounts', 'totalAccounts', 'accountCount', 'total_accounts', 'account_count'], 
                type: 'number',
                fallback: 0 
            }
        };

        // Helper function to get nested value by path
        function getNestedValue(obj, path) {
            return path.split('.').reduce((current, key) => current?.[key], obj);
        }

        // Enhanced batch DOM update with comprehensive flattened data
        let updatedCount = 0;
        
        Object.entries(statSelectors).forEach(([elementId, config]) => {
            const element = document.getElementById(elementId);
            if (!element) {
                console.warn(`⚠️ Missing element: ${elementId}`);
                return;
            }
            
            let value = config.fallback;
            
            // Try multiple flattened keys
            for (const key of config.keys) {
                // Try direct key access first (flattened)
                if (allData[key] !== undefined && allData[key] !== null && allData[key] !== '') {
                    value = allData[key];
                    console.log(`✅ Found ${elementId} value: ${value} (flattened key: ${key})`);
                    break;
                }
                // Try nested path as fallback
                const testValue = getNestedValue(allData, key);
                if (testValue !== undefined && testValue !== null && testValue !== '') {
                    value = testValue;
                    console.log(`✅ Found ${elementId} value: ${value} (nested key: ${key})`);
                    break;
                }
            }
            
            // Format and update element
            let displayValue;
            if (config.type === 'percent' && value !== null) {
                displayValue = `${value >= 0 ? '+' : ''}${parseFloat(value).toFixed(1)}%`;
                element.className = `text-sm font-medium ${value >= 0 ? 'text-green-400' : 'text-red-400'}`;
            } else {
                displayValue = formatValue(value, config.type);
                element.classList.remove('loading');
                element.classList.add('loaded');
            }
            
            element.textContent = displayValue;
            updatedCount++;
            console.log(`✅ Updated ${elementId}: ${displayValue}`);
        });

        console.log(`🏁 Enhanced DOM update complete - ${updatedCount} elements updated`);
        console.log('🔍 All available flattened keys:', Object.keys(allData).slice(0, 10));
        
        // Performance logging
        const updateEndTime = performance.now();
        console.log(`🚀 DOM update completed in ${(updateEndTime - performance.now()).toFixed(1)}ms`);
        
        // ENHANCED: Trigger map initialization after stats are loaded and updated
        setTimeout(() => {
            if (!globalMapLoaded) {
                console.log('🗺️ Stats loaded successfully, forcing direct map initialization...');
                
                // Force direct map loading without waiting for observers
                const mapContainer = document.getElementById('tron-world-map');
                if (mapContainer && typeof L === 'undefined') {
                    console.log('📦 Loading Leaflet directly for immediate map initialization...');
                    loadLeafletThenMap();
                } else if (mapContainer && typeof L !== 'undefined') {
                    console.log('📦 Leaflet available, initializing map immediately...');
                    initLeafletMap();
                }
                
                globalMapLoaded = true;
            }
        }, 2000);
        
        // Fetch and update network infrastructure data with small delay to ensure DOM is ready
        setTimeout(fetchNetworkInfrastructureData, 500);
        
        // Also call it again after a longer delay to ensure it persists
        setTimeout(fetchNetworkInfrastructureData, 2000);
        
    } catch (error) {
        console.error('❌ Error updating TRON stats UI:', error);
    }
}

// Global flag to prevent multiple simultaneous infrastructure data fetches
let fetchingInfrastructureData = false;

// Fetch and update TRON Network Infrastructure data
async function fetchNetworkInfrastructureData() {
    // Prevent multiple simultaneous calls
    if (fetchingInfrastructureData) {
        console.log('🔗 Infrastructure data fetch already in progress, skipping...');
        return;
    }
    
    fetchingInfrastructureData = true;
    
    try {
        console.log('🔗 Fetching TRON network infrastructure data...');
        
        // Check if DOM elements exist first
        const totalValidatorsElement = document.getElementById('total-validators');
        const superRepsElement = document.getElementById('super-reps-count');
        const continentsElement = document.getElementById('continents-count');
        const networkHealthElement = document.getElementById('network-health');
        
        console.log('🔍 DOM elements check:', {
            totalValidators: !!totalValidatorsElement,
            superReps: !!superRepsElement,
            continents: !!continentsElement,
            networkHealth: !!networkHealthElement
        });
        
        // Fetch witnesses and nodes data in parallel
        const [witnessesResponse, nodesResponse] = await Promise.all([
            fetch('/api/tron/witnesses', {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            }),
            fetch('/api/tron/nodes', {
                method: 'GET', 
                headers: { 'Accept': 'application/json' }
            })
        ]);
        
        // Process witnesses data
        if (witnessesResponse.ok) {
            const witnessesData = await witnessesResponse.json();
            console.log('📊 Witnesses data:', { totalWitnesses: witnessesData.totalWitnesses });
            
            // Update Total Validators (Total Network Nodes per TRONScan.org)
            // NOTE: TRONScan shows 7,642 total nodes (witnesses API only returns 427 witnesses)
            if (totalValidatorsElement) {
                const witnessCount = witnessesData.totalWitnesses || 427;
                // Use actual total network node count from TRONScan blockchain explorer
                const totalNetworkNodes = 7642; // Current count from https://tronscan.org/#/blockchain/nodes (as of 2025-09-18)
                totalValidatorsElement.textContent = totalNetworkNodes.toLocaleString();
                totalValidatorsElement.innerHTML = totalNetworkNodes.toLocaleString(); // Force innerHTML update too
                console.log('✅ Updated total network nodes to:', totalNetworkNodes.toLocaleString(), '(witnesses:', witnessCount, ') - Element content now:', totalValidatorsElement.textContent);
            } else {
                console.warn('❌ total-validators element not found');
            }
            
            // Update Super Representatives count (always set to 27)
            if (superRepsElement) {
                superRepsElement.textContent = '27';
                superRepsElement.innerHTML = '27'; // Force innerHTML update too
                console.log('✅ Updated super reps to: 27 - Element content now:', superRepsElement.textContent);
            } else {
                console.warn('❌ super-reps-count element not found');
            }
        }
        
        // Process nodes data
        if (nodesResponse.ok) {
            const nodesData = await nodesResponse.json();
            console.log('📊 Nodes data:', { continents: nodesData.continents });
            
            // Update Continents count
            if (continentsElement) {
                const newValue = nodesData.continents || '7';
                continentsElement.textContent = newValue;
                continentsElement.innerHTML = newValue; // Force innerHTML update too
                console.log('✅ Updated continents to:', newValue, '- Element content now:', continentsElement.textContent);
            } else {
                console.warn('❌ continents-count element not found');
            }
        }
        
        // Update Network Health (always show as Healthy)
        if (networkHealthElement) {
            networkHealthElement.textContent = 'Healthy';
            networkHealthElement.innerHTML = 'Healthy'; // Force innerHTML update too
            networkHealthElement.className = 'text-xl sm:text-2xl font-black text-green-400 min-h-[2rem]';
            console.log('✅ Updated network health to: Healthy - Element content now:', networkHealthElement.textContent);
        } else {
            console.warn('❌ network-health element not found');
        }
        
        console.log('✅ Network infrastructure data updated');
        
    } catch (error) {
        console.error('❌ Error fetching network infrastructure data:', error);
        
        // Set fallback values
        const fallbackValues = {
            'total-validators': '127',
            'super-reps-count': '27', 
            'continents-count': '7',
            'network-health': 'Healthy'
        };
        
        Object.entries(fallbackValues).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
                element.innerHTML = value; // Force innerHTML update too
                if (id === 'network-health') {
                    element.className = 'text-xl sm:text-2xl font-black text-green-400 min-h-[2rem]';
                }
                console.log(`🔧 Set fallback value for ${id}: ${value} - Element content now:`, element.textContent);
            } else {
                console.warn(`❌ Fallback: ${id} element not found`);
            }
        });
    } finally {
        // Reset the flag to allow future calls
        fetchingInfrastructureData = false;
    }
}

// Format large numbers for better readability
function formatLargeNumber(num) {
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toLocaleString();
}

// Handle API errors gracefully
function handleTronDataError(error) {
    console.error('🚨 TRON data fetch failed:', error);
    
    // Show fallback data or error message
    const errorElements = {
        'tron-tps': '0',
        'tron-max-tps': '2,000',
        'tron-block': '~65M',
        'tron-daily-tx': '~8M',
        'tron-total-tx': '8.5B+',
        'trx-price': '$0.0000',
        'trx-change': '0.00%',
        'tron-accounts': '250M+',
        'tron-uptime': '100%'
    };
    
    Object.entries(errorElements).forEach(([id, fallback]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = fallback;
            element.style.opacity = '0.6';
        }
    });
    
    // Show error notification
    showNotification('Unable to fetch live TRON data. Showing fallback values.', 'warning');
}

// OPTIMIZED: Show loading state for better UX using batched DOM operations
function showLoadingState() {
    const loadingElements = [
        'live-tps', 'live-block', 'live-daily-txns', 'live-trx-price',
        'price-change-24h', 'price-change-30d', 'price-change-1y',
        'txn-change-24h', 'txn-change-7d',
        'total-validators', 'super-reps-count', 'continents-count', 'network-health',
        'live-total-accounts', 'trx-change', 'trx-market-cap', 'trx-volume'
    ];
    
    // PERFORMANCE: Batch DOM queries and updates
    const elements = {};
    loadingElements.forEach(id => {
        elements[id] = document.getElementById(id);
    });
    
    // Single pass update with loading state
    Object.values(elements).forEach(element => {
        if (element) {
            element.innerHTML = '<div class="animate-pulse text-tron-red">...</div>';
        }
    });
    
    console.log(`⏳ Loading state applied to ${Object.keys(elements).length} elements`);
}

// Alias for compatibility
const setLoadingState = showLoadingState;

// ENHANCED: Robust cached fetch utility with retry and fallback
async function cachedFetch(url, ttl = 30000) { // 30s TTL
    console.log('🔄 Attempting fetch:', url);
    const cacheKey = `tron_cache_${btoa(url)}`; // Base64 for safe key
    
    // Check sessionStorage first (short-term)
    let cached = sessionStorage.getItem(cacheKey);
    if (cached) {
        try {
            const { data, ts } = JSON.parse(cached);
            if (Date.now() - ts < ttl) {
                console.log('📋 Session cache hit for', cacheKey.substring(0, 20) + '...');
                return data;
            }
        } catch (e) {
            console.warn('Session cache parse error:', e);
            sessionStorage.removeItem(cacheKey);
        }
    }
    
    // Fallback to localStorage
    cached = localStorage.getItem(cacheKey);
    if (cached) {
        try {
            const { data, ts } = JSON.parse(cached);
            if (Date.now() - ts < ttl) {
                console.log('💾 Local cache hit for', cacheKey.substring(0, 20) + '...');
                sessionStorage.setItem(cacheKey, cached); // Sync to session
                return data;
            }
        } catch (e) {
            console.warn('Local cache parse error:', e);
            localStorage.removeItem(cacheKey);
        }
    }
    
    // Fresh fetch with retry
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            console.log(`🚀 Fetch attempt ${attempt} for ${url}`);
            const res = await fetch(url, { 
                headers: { 
                    'User-Agent': 'MEGATEAM/1.0',
                    'Accept': 'application/json'
                },
                cache: 'no-cache' // Force fresh data
            });
            
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }
            
            const data = await res.json();
            
            // Cache successful response
            const toCache = { data, ts: Date.now() };
            try {
                sessionStorage.setItem(cacheKey, JSON.stringify(toCache));
                localStorage.setItem(cacheKey, JSON.stringify(toCache));
                console.log('💾 Fresh data cached for', cacheKey.substring(0, 20) + '...');
            } catch (cacheError) {
                console.warn('Cache storage failed:', cacheError);
            }
            
            return data;
            
        } catch (error) {
            console.error(`❌ Fetch attempt ${attempt} failed:`, error.message);
            if (attempt === 3) {
                console.warn('🚨 All retries failed; returning null for fallback');
                return null; // Trigger fallback in update
            }
            // Exponential backoff
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
    
    return null; // Final fallback
}

// Legacy cache functions for backwards compatibility
function getCachedData(key) {
    return cachedFetch(`/api/tron/${key}`, 15000);
}

function setCachedData(key, data) {
    const cacheKey = `tron_cache_${btoa(`/api/tron/${key}`)}`;
    const toCache = { data, ts: Date.now() };
    try {
        sessionStorage.setItem(cacheKey, JSON.stringify(toCache));
        localStorage.setItem(cacheKey, JSON.stringify(toCache));
    } catch (e) {
        console.warn('Legacy cache storage error:', e);
    }
}

// ENHANCED: Robust TRON Network Map Initialization with multiple triggers
let globalMapLoaded = false; // Global flag to prevent multiple initializations

function initTronNetworkMap() {
    console.log('🗺️ Initializing TRON Network Map with enhanced lazy loading...');
    
    // Check if map is already loaded globally
    if (globalMapLoaded) {
        console.log('📍 Map already loaded globally, skipping initialization');
        return;
    }
    
    // Check if map container exists
    const mapContainer = document.getElementById('tron-world-map');
    if (!mapContainer) {
        console.warn('❌ Map container (#tron-world-map) not found, skipping map initialization');
        return;
    }
    
    console.log('✅ Map container found, setting up observers...');
    
    let mapLoaded = false;
    
    // Enhanced map loader function
    const loadMap = () => {
        if (mapLoaded || globalMapLoaded) {
            console.log('📍 Map already loaded, skipping...');
            return;
        }
        
        mapLoaded = true;
        globalMapLoaded = true; // Set global flag
        console.log('🗺️ Triggering map load...');
        
        // Add loading class for visual feedback
        mapContainer.classList.add('map-loading');
        mapContainer.classList.remove('map-initializing');
        
        if (typeof L === 'undefined') {
            console.log('📦 Leaflet not loaded, loading dynamically...');
            loadLeafletThenMap();
        } else {
            console.log('📦 Leaflet already available, initializing map...');
            initLeafletMap();
        }
    };
    
    // PERFORMANCE: Use Intersection Observer for lazy loading
    if ('IntersectionObserver' in window) {
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                console.log('👁️ Map intersection observed:', entry.isIntersecting, 'ratio:', entry.intersectionRatio);
                if (entry.isIntersecting && entry.intersectionRatio > 0) {
                    console.log('🎯 Map container visible, triggering load...');
                    loadMap();
                    mapObserver.unobserve(entry.target); // Load only once
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% visible
            rootMargin: '200px' // Earlier preload for faster map loading
        });
        
        mapObserver.observe(mapContainer);
        console.log('👁️ IntersectionObserver set up for map container');
    } else {
        console.warn('⚠️ IntersectionObserver not supported, using fallbacks');
    }
    
    // Fallback triggers for better compatibility
    const fallbackTriggers = [
        // Trigger on scroll past a certain point
        () => {
            const triggerScroll = () => {
                const rect = mapContainer.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // If map is within viewport or close to it (200px trigger)
                if (rect.top < windowHeight + 200) {
                    console.log('📜 Scroll trigger activated for map');
                    loadMap();
                    window.removeEventListener('scroll', triggerScroll);
                }
            };
            
            window.addEventListener('scroll', triggerScroll, { passive: true });
            // Initial check in case map is already in view
            setTimeout(triggerScroll, 100);
        },
        
        // Trigger on resize
        () => {
            const triggerResize = () => {
                console.log('📐 Resize trigger activated for map');
                loadMap();
                window.removeEventListener('resize', triggerResize);
            };
            
            window.addEventListener('resize', triggerResize, { once: true });
        },
        
        // Emergency trigger after 5 seconds
        () => {
            setTimeout(() => {
                if (!mapLoaded) {
                    console.log('⏰ Emergency timeout trigger activated for map');
                    loadMap();
                }
            }, 5000);
        }
    ];
    
    // Activate all fallback triggers
    fallbackTriggers.forEach(trigger => trigger());
}

// Load Leaflet library and marker cluster plugin dynamically
function loadLeafletThenMap() {
    // Add CSS first
    if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);
        console.log('🎨 Leaflet CSS loaded');
    }
    
    // Add MarkerCluster CSS
    if (!document.querySelector('link[href*="MarkerCluster"]')) {
        const clusterCSS = document.createElement('link');
        clusterCSS.rel = 'stylesheet';
        clusterCSS.href = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css';
        document.head.appendChild(clusterCSS);
        
        const clusterDefaultCSS = document.createElement('link');
        clusterDefaultCSS.rel = 'stylesheet';
        clusterDefaultCSS.href = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css';
        document.head.appendChild(clusterDefaultCSS);
        console.log('🎨 Leaflet MarkerCluster CSS loaded');
    }
    
    // Load Leaflet JavaScript first
    if (!document.querySelector('script[src*="leaflet.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        script.crossOrigin = '';
        script.onload = () => {
            console.log('📦 Leaflet JavaScript loaded successfully');
            loadMarkerClusterPlugin();
        };
        script.onerror = () => {
            console.error('❌ Failed to load Leaflet JavaScript');
            showMapError('Failed to load mapping library');
        };
        document.head.appendChild(script);
        console.log('📦 Loading Leaflet JavaScript...');
    } else {
        loadMarkerClusterPlugin();
    }
}

// Load MarkerCluster plugin after Leaflet is loaded
function loadMarkerClusterPlugin() {
    if (!document.querySelector('script[src*="markercluster"]')) {
        const clusterScript = document.createElement('script');
        clusterScript.src = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js';
        clusterScript.onload = () => {
            console.log('📦 Leaflet MarkerCluster plugin loaded successfully');
            initLeafletMap();
        };
        clusterScript.onerror = () => {
            console.error('❌ Failed to load MarkerCluster plugin');
            showMapError('Failed to load clustering library');
        };
        document.head.appendChild(clusterScript);
        console.log('📦 Loading Leaflet MarkerCluster plugin...');
    } else {
        initLeafletMap();
    }
}

// ENHANCED: Initialize Leaflet map with supernode data fetching and flexible coordinate extraction
async function initLeafletMap() {
    try {
        console.log('🌐 Initializing enhanced Leaflet map with supernode support...');
        
        const mapContainer = document.getElementById('tron-world-map');
        if (!mapContainer) {
            console.error('❌ Map container not found during Leaflet init');
            return;
        }
        
        // Clear any previous content and reset container
        mapContainer.innerHTML = '';
        mapContainer._leaflet_id = null; // Clear Leaflet's internal reference
        
        // Remove loading class, add loaded class
        mapContainer.classList.remove('map-loading', 'map-initializing');
        mapContainer.classList.add('map-loaded');
        
        // Initialize Leaflet map with error handling
        let map;
        try {
            map = L.map('tron-world-map', {
                center: [20, 0],
                zoom: 2,
                zoomControl: false, // We'll add it positioned later
                attributionControl: true
            });
            
            console.log('✅ Leaflet map instance created');
        } catch (mapError) {
            console.error('❌ Failed to create Leaflet map:', mapError);
            // Try to remove and recreate the container
            const parent = mapContainer.parentNode;
            const newContainer = document.createElement('div');
            newContainer.id = 'tron-world-map';
            newContainer.className = mapContainer.className;
            parent.replaceChild(newContainer, mapContainer);
            
            try {
                map = L.map('tron-world-map', {
                    center: [20, 0],
                    zoom: 2,
                    zoomControl: false,
                    attributionControl: true
                });
                console.log('✅ Leaflet map created after container reset');
            } catch (secondError) {
                console.error('❌ Failed to create map after reset:', secondError);
                showMapError('Failed to initialize map');
                return;
            }
        }
        
        // Add zoom control in bottom left
        L.control.zoom({
            position: 'bottomleft'
        }).addTo(map);
        
        // Add dark tile layer with fallback
        try {
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19,
                errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' // Transparent fallback
            }).addTo(map);
            console.log('🗺️ Tile layer added successfully');
        } catch (tileError) {
            console.error('❌ Tile layer error:', tileError);
            // Fallback to OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19
            }).addTo(map);
            console.log('🔄 Using OpenStreetMap fallback tiles');
        }
        
        // ENHANCED: Fetch supernode data using the proxy API endpoint
        console.log('📡 Fetching supernode validator data via proxy API...');
        const data = await cachedFetch('/api/stats?type=supernode', 60000); // Use proxy endpoint
        console.log('🗺️ Supernode raw:', data);
        
        let nodeCount = 0;
        
        if (data && (data.data || data).length > 0) {
            const nodes = data.data || data;
            
            console.log(`🎯 Processing ${nodes.length} supernode validators for map plotting...`);
            
            // Create markers array - simplified approach without clustering for compatibility
            const markers = [];
            
            nodes.forEach((node, i) => {
                // ENHANCED: Flexible coordinate extraction - try common key patterns
                const lat = node.latitude || node.lat || node.location?.lat || node.geo?.lat || node.coordinates?.latitude || 0;
                const lng = node.longitude || node.lng || node.location?.lng || node.geo?.lng || node.coordinates?.longitude || 0;
                
                console.log(`🔍 Node ${i} coordinate extraction:`, {
                    name: node.name || `Node-${i}`,
                    original: { lat: node.lat, lng: node.lng, latitude: node.latitude, longitude: node.longitude },
                    extracted: { lat, lng },
                    hasCoords: !!(lat && lng && lat !== 0 && lng !== 0)
                });
                
                // Only add valid coordinates
                if (lat && lng && lat !== 0 && lng !== 0 && !isNaN(lat) && !isNaN(lng)) {
                    try {
                        // Enhanced marker styling based on node rank/type
                        const isTopValidator = node.rank <= 27 || node.isActive === true || node.isJobs === true;
                        const markerColor = isTopValidator ? '#FF060A' : '#FF4444'; // TRON Red for top validators
                        const markerSize = isTopValidator ? 8 : 6;
                        
                        const marker = L.circleMarker([lat, lng], {
                            radius: markerSize,
                            fillColor: markerColor,
                            color: '#ffffff',
                            weight: isTopValidator ? 2 : 1,
                            opacity: 1,
                            fillOpacity: 0.8
                        });
                        
                        // Enhanced popup with validator information
                        const nodeName = node.name || node.address || `Validator ${i + 1}`;
                        const nodeRank = node.rank || i + 1;
                        const nodeVotes = node.votes ? node.votes.toLocaleString() : 'N/A';
                        const nodeType = isTopValidator ? 'Super Representative' : 'Validator';
                        
                        marker.bindPopup(`
                            <div class="tron-node-popup" style="font-family: 'Montserrat', sans-serif;">
                                <h3 style="color: #FF060A; margin-bottom: 8px; font-size: 16px;">${nodeName}</h3>
                                <p style="margin: 4px 0; color: #333;"><strong>Type:</strong> ${nodeType}</p>
                                <p style="margin: 4px 0; color: #333;"><strong>Rank:</strong> #${nodeRank}</p>
                                <p style="margin: 4px 0; color: #333;"><strong>Votes:</strong> ${nodeVotes}</p>
                                <p style="margin: 4px 0; color: #333;"><strong>Status:</strong> <span style="color: #00FF00;">Active</span></p>
                                ${node.url ? `<p style="margin: 4px 0; color: #333;"><strong>Website:</strong> <a href="${node.url}" target="_blank" style="color: #FF060A;">${node.url.substring(0, 30)}...</a></p>` : ''}
                                <p style="margin: 6px 0 0 0; font-size: 12px; color: #666;">Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}</p>
                            </div>
                        `);
                        
                        // Add marker directly to map
                        marker.addTo(map);
                        markers.push(marker);
                        nodeCount++;
                        
                        console.log(`📍 Added validator pin ${nodeCount}:`, { 
                            name: nodeName, 
                            coords: [lat, lng], 
                            rank: nodeRank,
                            type: nodeType
                        });
                        
                    } catch (markerError) {
                        console.error(`❌ Failed to create marker for node ${i}:`, markerError, node);
                    }
                } else {
                    // For nodes without coordinates, add to known locations with slight randomization
                    const fallbackLocations = [
                        { lat: 37.7749, lng: -122.4194 }, // San Francisco
                        { lat: 40.7128, lng: -74.0060 },  // New York
                        { lat: 51.5074, lng: -0.1278 },   // London
                        { lat: 35.6762, lng: 139.6503 },  // Tokyo
                        { lat: 1.3521, lng: 103.8198 },   // Singapore
                        { lat: 52.5200, lng: 13.4050 },   // Berlin
                        { lat: -33.8688, lng: 151.2093 }  // Sydney
                    ];
                    
                    const fallback = fallbackLocations[i % fallbackLocations.length];
                    const randomLat = fallback.lat + (Math.random() - 0.5) * 0.5;
                    const randomLng = fallback.lng + (Math.random() - 0.5) * 0.5;
                    
                    try {
                        const marker = L.circleMarker([randomLat, randomLng], {
                            radius: 5,
                            fillColor: '#888888',
                            color: '#ffffff',
                            weight: 1,
                            opacity: 0.7,
                            fillOpacity: 0.6
                        });
                        
                        const nodeName = node.name || node.address || `Validator ${i + 1}`;
                        marker.bindPopup(`
                            <div class="tron-node-popup">
                                <h3>${nodeName}</h3>
                                <p><strong>Type:</strong> Validator</p>
                                <p><strong>Status:</strong> Active (Approx. Location)</p>
                                <p style="font-size: 12px; color: #666;">Note: Actual coordinates not available</p>
                            </div>
                        `);
                        
                        // Add marker directly to map
                        marker.addTo(map);
                        markers.push(marker);
                        nodeCount++;
                        
                    } catch (fallbackError) {
                        console.warn(`⚠️ Failed to add fallback marker for node ${i}:`, fallbackError);
                    }
                }
            });
            
            // Markers already added to map individually
            
            console.log(`🎯 Plotted ${nodeCount} validators on world map`);
            
        } else {
            console.warn('⚠️ No supernode data received, adding static fallback pins...');
            
            // Static fallback: Add demo pins for major TRON validator locations
            const staticValidators = [
                { name: 'TRON Foundation', lat: 1.3521, lng: 103.8198, rank: 1 },
                { name: 'Binance Staking', lat: 35.9375, lng: 14.3754, rank: 2 },
                { name: 'Huobi Pool', lat: 1.3521, lng: 103.8198, rank: 3 },
                { name: 'OKEx Pool', lat: 35.9375, lng: 14.3754, rank: 4 },
                { name: 'Poloniex', lat: 40.7128, lng: -74.0060, rank: 5 },
                { name: 'TRON Europe', lat: 52.5200, lng: 13.4050, rank: 6 },
                { name: 'TRON Asia', lat: 35.6762, lng: 139.6503, rank: 7 },
                { name: 'BitTorrent', lat: 37.7749, lng: -122.4194, rank: 8 }
            ];
            
            staticValidators.forEach((validator, i) => {
                const marker = L.circleMarker([validator.lat, validator.lng], {
                    radius: 8,
                    fillColor: '#FF060A',
                    color: '#ffffff',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                });
                
                marker.bindPopup(`
                    <div class="tron-node-popup">
                        <h3>${validator.name}</h3>
                        <p><strong>Type:</strong> Super Representative</p>
                        <p><strong>Rank:</strong> #${validator.rank}</p>
                        <p><strong>Status:</strong> <span style="color: #00FF00;">Active</span></p>
                    </div>
                `);
                
                map.addLayer(marker);
                nodeCount++;
            });
            
            console.log(`🎯 Added ${nodeCount} static fallback validator pins`);
        }
        
        // Update statistics with actual plotted count
        updateMapStatistics(nodeCount);
        
        console.log(`✅ TRON validator map initialization complete! ${nodeCount} validators plotted`);
        
    } catch (error) {
        console.error('❌ Error initializing enhanced TRON validator map:', error);
        showMapError('Failed to load validator map');
    }
}

// ENHANCED: Fetch TRON node data with robust caching and fallbacks
async function fetchTronNodeDataEnhanced() {
    console.log('📡 Starting enhanced TRON node data fetch...');
    
    // Try multiple data sources with caching
    const dataSources = [
        '/api/tron/nodes',
        'https://api.tronscan.org/api/node',
        '/api/tron/witnesses'  // Fallback to witness data
    ];
    
    for (let i = 0; i < dataSources.length; i++) {
        const url = dataSources[i];
        console.log(`🔄 Trying data source ${i + 1}/${dataSources.length}: ${url}`);
        
        try {
            const data = await cachedFetch(url, 60000); // 1 minute cache
            
            if (data && Array.isArray(data) && data.length > 0) {
                console.log(`✅ Got ${data.length} nodes from ${url}`);
                
                // Enhanced coordinate extraction with detailed logging
                console.log('🔍 Raw node data sample:', data.slice(0, 2));
                
                const processedData = data.map((node, index) => {
                    // Try multiple coordinate key patterns
                    const lat = node.lat || node.latitude || node.geo?.lat || node.location?.lat || node.coordinates?.lat;
                    const lng = node.lng || node.longitude || node.geo?.lng || node.location?.lng || node.coordinates?.lng || 
                               node.lon || node.location?.lon || node.coordinates?.lon;
                    
                    const processedNode = {
                        name: node.name || node.address || node.url || `Node-${index}`,
                        type: determineNodeType(node),
                        lat: lat ? parseFloat(lat) : generateRandomLat(),
                        lng: lng ? parseFloat(lng) : generateRandomLng(),
                        country: node.country || node.location?.country || 'Unknown',
                        city: node.city || node.location?.city || null,
                        continent: node.continent || null,
                        status: node.status || node.isJobs || 'active',
                        hasRealCoords: !!(lat && lng)
                    };
                    
                    if (index < 3) {
                        console.log(`🔍 Node ${index} coord extraction:`, {
                            original: { lat: node.lat, lng: node.lng, latitude: node.latitude, longitude: node.longitude },
                            processed: { lat: processedNode.lat, lng: processedNode.lng, hasReal: processedNode.hasRealCoords }
                        });
                    }
                    
                    return processedNode;
                }).filter(node => {
                    const isValid = node.lat && node.lng && 
                        !isNaN(node.lat) && !isNaN(node.lng) &&
                        Math.abs(node.lat) <= 90 && Math.abs(node.lng) <= 180;
                    
                    if (!isValid && node.name) {
                        console.warn(`⚠️ Invalid coords for ${node.name}:`, { lat: node.lat, lng: node.lng });
                    }
                    
                    return isValid;
                });
                
                if (processedData.length > 0) {
                    console.log(`✅ Processed ${processedData.length} valid nodes`);
                    return processedData;
                }
            } else {
                console.warn(`⚠️ No valid data from ${url}`);
            }
        } catch (error) {
            console.warn(`❌ Failed to fetch from ${url}:`, error.message);
        }
    }
    
    // Ultimate fallback: Generate synthetic representative data
    console.log('🔄 Generating fallback node data...');
    return generateFallbackNodeData();
}

// Determine node type from various API formats
function determineNodeType(node) {
    if (node.type) return node.type;
    if (node.isJobs === true || node.status === 'super_representative') return 'super_representative';
    if (node.isWitness || node.witness) return 'validator';
    return 'full_node';
}

// Generate random coordinates with geographic distribution
function generateRandomLat() {
    return (Math.random() - 0.5) * 160; // -80 to +80 degrees
}

function generateRandomLng() {
    return (Math.random() - 0.5) * 360; // -180 to +180 degrees
}

// Generate fallback node data for demonstration
function generateFallbackNodeData() {
    console.log('🎲 Generating synthetic TRON network nodes...');
    
    const majorCities = [
        { name: 'New York', lat: 40.7128, lng: -74.0060, country: 'USA' },
        { name: 'London', lat: 51.5074, lng: -0.1278, country: 'UK' },
        { name: 'Tokyo', lat: 35.6762, lng: 139.6503, country: 'Japan' },
        { name: 'Singapore', lat: 1.3521, lng: 103.8198, country: 'Singapore' },
        { name: 'Frankfurt', lat: 50.1109, lng: 8.6821, country: 'Germany' },
        { name: 'Sydney', lat: -33.8688, lng: 151.2093, country: 'Australia' },
        { name: 'Toronto', lat: 43.6532, lng: -79.3832, country: 'Canada' },
        { name: 'Seoul', lat: 37.5665, lng: 126.9780, country: 'South Korea' },
        { name: 'Mumbai', lat: 19.0760, lng: 72.8777, country: 'India' },
        { name: 'São Paulo', lat: -23.5505, lng: -46.6333, country: 'Brazil' },
        { name: 'Dubai', lat: 25.2048, lng: 55.2708, country: 'UAE' },
        { name: 'Hong Kong', lat: 22.3193, lng: 114.1694, country: 'Hong Kong' },
        { name: 'Berlin', lat: 52.5200, lng: 13.4050, country: 'Germany' },
        { name: 'Paris', lat: 48.8566, lng: 2.3522, country: 'France' },
        { name: 'Moscow', lat: 55.7558, lng: 37.6173, country: 'Russia' },
        { name: 'Beijing', lat: 39.9042, lng: 116.4074, country: 'China' },
        { name: 'Lagos', lat: 6.5244, lng: 3.3792, country: 'Nigeria' },
        { name: 'Mexico City', lat: 19.4326, lng: -99.1332, country: 'Mexico' },
        { name: 'Cairo', lat: 30.0444, lng: 31.2357, country: 'Egypt' },
        { name: 'Istanbul', lat: 41.0082, lng: 28.9784, country: 'Turkey' }
    ];
    
    const nodes = [];
    
    // Add super representatives (27 total)
    for (let i = 0; i < 27; i++) {
        const city = majorCities[i % majorCities.length];
        nodes.push({
            name: `TRON SR ${i + 1}`,
            type: 'super_representative',
            lat: city.lat + (Math.random() - 0.5) * 0.1, // Small variation
            lng: city.lng + (Math.random() - 0.5) * 0.1,
            country: city.country,
            city: city.name,
            status: 'active'
        });
    }
    
    // Add validators (400 distributed globally)
    for (let i = 0; i < 400; i++) {
        const city = majorCities[Math.floor(Math.random() * majorCities.length)];
        nodes.push({
            name: `Validator ${i + 1}`,
            type: 'validator',
            lat: city.lat + (Math.random() - 0.5) * 2, // Wider distribution
            lng: city.lng + (Math.random() - 0.5) * 2,
            country: city.country,
            city: city.name,
            status: 'active'
        });
    }
    
    // Add some full nodes (100 for performance)
    for (let i = 0; i < 100; i++) {
        nodes.push({
            name: `Full Node ${i + 1}`,
            type: 'full_node',
            lat: generateRandomLat(),
            lng: generateRandomLng(),
            country: 'Global',
            city: null,
            status: 'active'
        });
    }
    
    console.log(`🎲 Generated ${nodes.length} synthetic nodes (27 SRs, 400 validators, 100 full nodes)`);
    return nodes;
}

// Legacy function for backwards compatibility
async function fetchTronNodeData() {
    return await fetchTronNodeDataEnhanced();
}

// Format node type for display
function formatNodeType(type) {
    switch (type) {
        case 'super_representative':
            return 'Super Representative';
        case 'validator':
            return 'Validator';
        case 'full_node':
            return 'Full Node';
        default:
            return 'Network Node';
    }
}

// Update node statistics display
function updateNodeStatistics(nodeData) {
    const stats = {
        total: nodeData.length,
        superRepresentatives: nodeData.filter(n => n.type === 'super_representative').length,
        validators: nodeData.filter(n => n.type === 'validator').length,
        fullNodes: nodeData.filter(n => n.type === 'full_node').length
    };
    
    // Update total nodes (correct number: 7,642 total nodes per TRONScan blockchain explorer)
    const totalNodesElement = document.getElementById('total-nodes');
    if (totalNodesElement) {
        totalNodesElement.textContent = stats.total > 0 ? stats.total.toLocaleString() : '7,642';
    }
    
    // Update super representatives count
    const srNodesElement = document.getElementById('sr-nodes');
    if (srNodesElement) {
        srNodesElement.textContent = stats.superRepresentatives > 0 ? stats.superRepresentatives : '27';
    }
    
    // Update validators count
    const validatorNodesElement = document.getElementById('validator-nodes');
    if (validatorNodesElement) {
        validatorNodesElement.textContent = stats.validators > 0 ? stats.validators : '427';
    }
    
    // Update full nodes count
    const fullNodesElement = document.getElementById('full-nodes');
    if (fullNodesElement) {
        const fullNodeCount = Math.max(stats.fullNodes, stats.total - stats.superRepresentatives - stats.validators);
        fullNodesElement.textContent = fullNodeCount > 0 ? fullNodeCount.toLocaleString() : '7,188';
    }
}

// ENHANCED: Update map statistics with plotted validator count
function updateMapStatistics(plottedCount) {
    console.log(`📊 Updating map statistics with ${plottedCount} plotted validators`);
    
    // Update visible nodes count in map overlay
    const visibleNodesElement = document.getElementById('visible-nodes-count');
    if (visibleNodesElement) {
        visibleNodesElement.textContent = plottedCount.toLocaleString();
    }
    
    // Show map statistics overlay
    const mapStatsOverlay = document.getElementById('map-stats-overlay');
    if (mapStatsOverlay) {
        mapStatsOverlay.classList.remove('hidden');
    }
    
    // Hide map loading overlay
    const mapLoading = document.getElementById('map-loading');
    if (mapLoading) {
        mapLoading.style.display = 'none';
    }
    
    console.log(`✅ Map statistics updated - showing ${plottedCount} validators`);
}

// Show fallback message when no node data is available
function showFallbackMapMessage(map) {
    const fallbackDiv = L.divIcon({
        className: 'fallback-message',
        html: `
            <div style="background: rgba(0, 0, 0, 0.8); color: #00FFFF; padding: 15px; border-radius: 8px; text-align: center;">
                <h3>🌐 TRON Network Map</h3>
                <p>Displaying global TRON network coverage</p>
                <p><strong>Total Nodes:</strong> 7,642</p>
                <p><strong>Super Representatives:</strong> 27</p>
                <p><strong>Validators:</strong> 427</p>
                <p><strong>Full Nodes:</strong> 7,188</p>
            </div>
        `,
        iconSize: [300, 150],
        iconAnchor: [150, 75]
    });
    
    L.marker([20, 0], { icon: fallbackDiv }).addTo(map);
}

// Show map error message
function showMapError() {
    const mapContainer = document.getElementById('tron-world-map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div class="map-error" style="display: flex; align-items: center; justify-content: center; height: 400px; background: rgba(0, 0, 0, 0.8); color: #FF060A; text-align: center; border-radius: 8px;">
                <div>
                    <h3>⚠️ Map Loading Error</h3>
                    <p>Unable to load TRON network map.</p>
                    <p>Total Network Nodes: <strong>7,642</strong></p>
                </div>
            </div>
        `;
    }
}

// Notification system
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'error':
            notification.style.background = 'linear-gradient(45deg, #FF060A, #CC0408)';
            break;
        case 'warning':
            notification.style.background = 'linear-gradient(45deg, #FF8C00, #FFA500)';
            break;
        case 'success':
            notification.style.background = 'linear-gradient(45deg, #00FF00, #32CD32)';
            break;
        default:
            notification.style.background = 'linear-gradient(45deg, #00FFFF, #0080FF)';
    }
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; margin-left: 10px;">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after duration
    if (duration > 0) {
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);
    }
}

// Form handling for email notifications
function initFormHandlers() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
    });
}

async function handleFormSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        // Show loading state
        const submitButton = event.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        // Submit to Google Sheets via API
        const response = await fetch('/api/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showNotification('✅ Form submitted successfully! You will receive a confirmation email.', 'success');
            event.target.reset();
        } else {
            throw new Error('Form submission failed');
        }
        
        // Restore button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification('❌ Failed to submit form. Please try again.', 'error');
        
        // Restore button state
        const submitButton = event.target.querySelector('button[type="submit"]');
        submitButton.textContent = 'Submit';
        submitButton.disabled = false;
    }
}

// Initialize TRON data systems
async function initializeTronDataSystems() {
    console.log('🔧 Initializing TRON data systems...');
    
    // Set loading state for all elements
    setLoadingState();
    
    // Start fetching TRON network data immediately
    fetchTronNetworkData().catch(error => {
        console.error('❌ Initial TRON data fetch failed:', error);
    });
    
    // Also fetch network infrastructure data immediately
    setTimeout(() => {
        fetchNetworkInfrastructureData().catch(error => {
            console.error('❌ Network infrastructure fetch failed:', error);
        });
    }, 1000);
    
    // Set up periodic updates every 30 seconds for more responsive data
    setInterval(() => {
        fetchTronNetworkData().catch(error => {
            console.error('❌ Periodic TRON data fetch failed:', error);
        });
    }, 30000);
    
    // Set up periodic updates for network infrastructure every 60 seconds
    setInterval(() => {
        fetchNetworkInfrastructureData().catch(error => {
            console.error('❌ Periodic network infrastructure fetch failed:', error);
        });
    }, 60000);
    
    console.log('✅ TRON data systems initialized with error handling');
}

// Initialize form handlers after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing TRON MEGATEAM...');
    
    // Initialize form handlers
    initFormHandlers();
    
    // Initialize TRON network statistics (non-blocking)
    console.log('📊 Starting TRON network data initialization...');
    initializeTronDataSystems().catch(error => {
        console.error('❌ TRON data systems initialization failed:', error);
    });
    
    // Initialize TRON network map (non-blocking)
    console.log('🗺️ Starting TRON network map initialization...');
    setTimeout(() => {
        initTronNetworkMap();
    }, 2000); // Delay map initialization to let stats load first
    
    console.log('✅ All TRON systems initialization started!');
});

console.log('🌐 TRON MEGATEAM application fully loaded! (Audio system managed by mobile-audio.js)');