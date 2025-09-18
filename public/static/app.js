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

// Main function to fetch all TRON network statistics - OPTIMIZED
async function fetchTronNetworkData() {
    try {
        console.log('📊 Fetching TRON network statistics...');
        
        // SUPER OPTIMIZATION: Use combined dashboard endpoint for fastest loading
        const startTime = performance.now();
        
        // Check cache first
        const cached = getCachedData('dashboard');
        if (cached) {
            console.log('📊 Using cached dashboard data');
            updateTronStats(cached);
            return;
        }
        
        // Fetch all data in single request
        const response = await fetch('/api/tron/dashboard');
        if (!response.ok) {
            throw new Error('Dashboard API failed, falling back to individual requests');
        }
        
        const dashboardData = await response.json();
        const endTime = performance.now();
        console.log(`🚀 Combined dashboard API completed in ${(endTime - startTime).toFixed(0)}ms`);
        
        // Cache the combined result
        setCachedData('dashboard', {
            tps: dashboardData.tps,
            block: dashboardData.block,
            transactions: dashboardData.transactions,
            price: dashboardData.price,
            accounts: dashboardData.accounts
        });
        
        // Update UI elements with fetched data
        updateTronStats({
            tps: dashboardData.tps,
            block: dashboardData.block,
            transactions: dashboardData.transactions,
            price: dashboardData.price,
            accounts: dashboardData.accounts
        });
        
        console.log('✅ TRON data updated successfully');
        
    } catch (error) {
        console.error('❌ Error fetching TRON data:', error);
        console.log('🔄 Falling back to individual API requests...');
        
        try {
            // Fallback: fetch individual APIs in parallel
            const [tpsData, blockData, transactionData, priceData, accountData] = await Promise.all([
                fetchTPS(),
                fetchLatestBlock(), 
                fetchDailyTransactions(),
                fetchTRXPrice(),
                fetchTronAccounts()
            ]);
            
            updateTronStats({
                tps: tpsData,
                block: blockData,
                transactions: transactionData,
                price: priceData,
                accounts: accountData
            });
            
            console.log('✅ Fallback API requests completed successfully');
        } catch (fallbackError) {
            console.error('❌ Fallback also failed:', fallbackError);
            handleTronDataError(fallbackError);
        }
    }
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

// OPTIMIZED: Update UI elements with TRON network statistics using batched DOM updates
function updateTronStats(data) {
    try {
        console.log('🔄 Updating TRON statistics in UI...');
        
        // PERFORMANCE OPTIMIZATION: Batch all DOM queries and updates
        const updateMap = {
            // TPS & Performance Stats
            'live-tps': {
                value: data.tps?.current ? data.tps.current.toLocaleString() : '0',
                fallback: '0'
            },
            'tron-max-tps': {
                value: data.tps?.max ? data.tps.max.toLocaleString() : '2,000',
                fallback: '2,000'
            },
            
            // Block Stats
            'live-block': {
                value: data.block?.height ? data.block.height.toLocaleString() : '0',
                fallback: '0'
            },
            'tron-block-tx': {
                value: data.block?.transactions ? data.block.transactions.toLocaleString() : '0',
                fallback: '0'
            },
            
            // Transaction Stats
            'live-daily-txns': {
                value: data.transactions?.today ? data.transactions.today.toLocaleString() : '0',
                fallback: '0'
            },
            
            // Transaction Change Percentages (with styling)
            'txn-change-24h': {
                value: data.transactions?.change24h != null ? 
                    `${data.transactions.change24h >= 0 ? '+' : ''}${data.transactions.change24h.toFixed(1)}%` : '--',
                className: data.transactions?.change24h != null ?
                    `text-sm font-medium ${data.transactions.change24h >= 0 ? 'text-green-400' : 'text-red-400'}` : 'text-sm font-medium text-gray-400',
                fallback: '--'
            },
            'txn-change-7d': {
                value: data.transactions?.change7d != null ? 
                    `${data.transactions.change7d >= 0 ? '+' : ''}${data.transactions.change7d.toFixed(1)}%` : '--',
                className: data.transactions?.change7d != null ?
                    `text-sm font-medium ${data.transactions.change7d >= 0 ? 'text-green-400' : 'text-red-400'}` : 'text-sm font-medium text-gray-400',
                fallback: '--'
            }
        
            
            // Additional Transaction Stats
            'tron-total-tx': {
                value: data.transactions?.totalTransactions ? 
                    formatLargeNumber(data.transactions.totalTransactions) : '8.5B+',
                fallback: '8.5B+'
            },
            
            // Price Stats
            'live-trx-price': {
                value: data.price?.price ? `$${data.price.price.toFixed(4)}` : '$0.0000',
                fallback: '$0.0000'
            },
            'price-change-24h': {
                value: data.price?.change24h != null ? 
                    `${data.price.change24h >= 0 ? '+' : ''}${data.price.change24h.toFixed(2)}%` : '--',
                className: data.price?.change24h != null ?
                    `text-sm font-medium ${data.price.change24h >= 0 ? 'text-green-400' : 'text-red-400'}` : 'text-sm font-medium text-gray-400',
                fallback: '--'
            },
            'price-change-30d': {
                value: data.price?.change30d != null ? 
                    `${data.price.change30d >= 0 ? '+' : ''}${data.price.change30d.toFixed(2)}%` : '--',
                className: data.price?.change30d != null ?
                    `text-sm font-medium ${data.price.change30d >= 0 ? 'text-green-400' : 'text-red-400'}` : 'text-sm font-medium text-gray-400',
                fallback: '--'
            },
            'price-change-1y': {
                value: data.price?.change1y != null ? 
                    `${data.price.change1y >= 0 ? '+' : ''}${data.price.change1y.toFixed(1)}%` : '--',
                className: data.price?.change1y != null ?
                    `text-sm font-medium ${data.price.change1y >= 0 ? 'text-green-400' : 'text-red-400'}` : 'text-sm font-medium text-gray-400',
                fallback: '--'
            },
            'trx-change': {
                value: data.price?.change24h != null ? 
                    `${data.price.change24h >= 0 ? '+' : ''}${data.price.change24h.toFixed(2)}%` : '0.00%',
                className: data.price?.change24h != null ?
                    (data.price.change24h >= 0 ? 'text-green-400' : 'text-red-400') : 'text-gray-400',
                fallback: '0.00%'
            },
            'trx-market-cap': {
                value: data.price?.marketCap ? formatLargeNumber(data.price.marketCap) : '$0',
                fallback: '$0'
            },
            'trx-volume': {
                value: data.price?.volume24h ? formatLargeNumber(data.price.volume24h) : '$0',
                fallback: '$0'
            },
            
            // Account Stats
            'live-total-accounts': {
                value: data.accounts?.totalAccounts ? formatLargeNumber(data.accounts.totalAccounts) : '250M+',
                fallback: '250M+'
            },
            'tron-active-accounts': {
                value: data.accounts?.activeAccounts ? formatLargeNumber(data.accounts.activeAccounts) : '2M+',
                fallback: '2M+'
            },
            
            // Network Health
            'tron-uptime': {
                value: '100%',
                fallback: '100%'
            },
            'last-update': {
                value: new Date().toLocaleTimeString(),
                fallback: '--'
            }
        };
        
        // BATCH DOM UPDATES: Single pass through all elements (huge performance gain!)
        const elementsToUpdate = Object.keys(updateMap);
        const elements = {}; // Cache DOM queries
        
        // Single batch DOM query
        elementsToUpdate.forEach(id => {
            elements[id] = document.getElementById(id);
        });
        
        // Single batch DOM update
        Object.entries(updateMap).forEach(([id, config]) => {
            const element = elements[id];
            if (element) {
                element.textContent = config.value || config.fallback;
                if (config.className) {
                    element.className = config.className;
                }
            }
        });
        
        console.log(`✅ UI updated with latest TRON data (${elementsToUpdate.length} elements in batch)`);
        
        // Performance logging
        const updateEndTime = performance.now();
        console.log(`🚀 DOM update completed in ${(updateEndTime - performance.now()).toFixed(1)}ms`);
        
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
            
            // Update Total Validators
            if (totalValidatorsElement) {
                const newValue = witnessesData.totalWitnesses || '127';
                totalValidatorsElement.textContent = newValue;
                totalValidatorsElement.innerHTML = newValue; // Force innerHTML update too
                console.log('✅ Updated total validators to:', newValue, '- Element content now:', totalValidatorsElement.textContent);
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

// ENHANCED: Dual-layer cache (Memory + localStorage) for offline support
const apiCache = new Map();
const CACHE_DURATION = 15000; // 15 seconds for memory cache
const OFFLINE_CACHE_DURATION = 300000; // 5 minutes for localStorage (offline grace)

function getCachedData(key) {
    // Check memory cache first (fastest)
    const memoryCache = apiCache.get(key);
    if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_DURATION) {
        console.log(`📋 Using memory cache for ${key}`);
        return memoryCache.data;
    }
    
    // Check localStorage for offline support
    try {
        const offlineCache = localStorage.getItem(`tron_${key}`);
        if (offlineCache) {
            const parsed = JSON.parse(offlineCache);
            if (Date.now() - parsed.timestamp < OFFLINE_CACHE_DURATION) {
                console.log(`💾 Using localStorage cache for ${key}`);
                // Also restore to memory cache
                apiCache.set(key, parsed);
                return parsed.data;
            } else {
                // Expired offline cache
                localStorage.removeItem(`tron_${key}`);
            }
        }
    } catch (e) {
        console.warn('localStorage cache error:', e);
    }
    
    return null;
}

function setCachedData(key, data) {
    const cacheObject = {
        data: data,
        timestamp: Date.now()
    };
    
    // Store in memory cache
    apiCache.set(key, cacheObject);
    
    // Store in localStorage for offline support
    try {
        localStorage.setItem(`tron_${key}`, JSON.stringify(cacheObject));
        console.log(`💾 Cached ${key} to localStorage for offline access`);
    } catch (e) {
        console.warn('localStorage storage error:', e);
    }
}

// OPTIMIZED: TRON Network Map Initialization with lazy loading
function initTronNetworkMap() {
    console.log('🗺️ Initializing TRON Network Map with lazy loading...');
    
    // Check if map container exists
    const mapContainer = document.getElementById('tron-world-map');
    if (!mapContainer) {
        console.warn('Map container not found, skipping map initialization');
        return;
    }
    
    // PERFORMANCE: Use Intersection Observer for lazy loading (only load when visible)
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('🗺️ Map container visible, loading Leaflet...');
                loadTronNetworkMap();
                mapObserver.unobserve(entry.target); // Load only once
            }
        });
    }, {
        rootMargin: '100px' // Start loading 100px before map becomes visible
    });
    
    mapObserver.observe(mapContainer);
}

// Load TRON Network Map with Leaflet.js
async function loadTronNetworkMap() {
    try {
        console.log('🌐 Loading TRON network nodes map...');
        
        // Check if map container exists
        const mapContainer = document.getElementById('tron-world-map');
        if (!mapContainer) {
            console.warn('Map container not found, skipping map initialization');
            return;
        }
        
        // Initialize Leaflet map
        const map = L.map('tron-world-map').setView([20, 0], 2);
        
        // Add dark tile layer for cyber theme
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);
        
        // Custom control for zoom buttons (moved to bottom left to avoid overlay collision)
        map.zoomControl.setPosition('bottomleft');
        
        // Fetch TRON node data from API
        const nodeData = await fetchTronNodeData();
        
        if (nodeData && nodeData.length > 0) {
            // Create marker cluster group for better performance
            const markers = L.markerClusterGroup({
                iconCreateFunction: function(cluster) {
                    const count = cluster.getChildCount();
                    let className = 'tron-cluster-small';
                    
                    if (count > 50) className = 'tron-cluster-large';
                    else if (count > 10) className = 'tron-cluster-medium';
                    
                    return L.divIcon({
                        html: `<div><span>${count}</span></div>`,
                        className: `tron-cluster ${className}`,
                        iconSize: [40, 40]
                    });
                },
                spiderfyOnMaxZoom: true,
                showCoverageOnHover: false,
                zoomToBoundsOnClick: true
            });
            
            // Add nodes to map
            nodeData.forEach(node => {
                if (node.lat && node.lng) {
                    const marker = L.circleMarker([node.lat, node.lng], {
                        radius: 6,
                        fillColor: node.type === 'super_representative' ? '#FF060A' : 
                                 node.type === 'validator' ? '#FF4444' : '#00FFFF',
                        color: '#ffffff',
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                    
                    // Add popup with node information
                    marker.bindPopup(`
                        <div class="tron-node-popup">
                            <h3>${node.name || 'TRON Node'}</h3>
                            <p><strong>Type:</strong> ${formatNodeType(node.type)}</p>
                            <p><strong>Location:</strong> ${node.country || 'Unknown'}</p>
                            ${node.city ? `<p><strong>City:</strong> ${node.city}</p>` : ''}
                            <p><strong>Status:</strong> <span class="status-active">Active</span></p>
                        </div>
                    `);
                    
                    markers.addLayer(marker);
                }
            });
            
            map.addLayer(markers);
            
            // Update node statistics
            updateNodeStatistics(nodeData);
            
            console.log(`✅ Loaded ${nodeData.length} TRON network nodes`);
            
        } else {
            console.warn('No node data received, showing fallback message');
            showFallbackMapMessage(map);
        }
        
    } catch (error) {
        console.error('❌ Error loading TRON network map:', error);
        showMapError();
    }
}

// Fetch TRON node data from proxy API
async function fetchTronNodeData() {
    try {
        console.log('📡 Fetching TRON node data...');
        
        const response = await fetch('/api/tron/nodes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Nodes API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Ensure we have proper node data structure
        if (data && Array.isArray(data)) {
            return data.map(node => ({
                name: node.name || node.address || 'Unknown Node',
                type: node.type || 'full_node',
                lat: parseFloat(node.lat || node.latitude),
                lng: parseFloat(node.lng || node.longitude),
                country: node.country,
                city: node.city,
                continent: node.continent,
                status: node.status || 'active'
            })).filter(node => node.lat && node.lng && !isNaN(node.lat) && !isNaN(node.lng));
        }
        
        return [];
    } catch (error) {
        console.error('Node data fetch error:', error);
        return [];
    }
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
    
    // Update total nodes (correct number: 7,617 total nodes, not just 427 witnesses)
    const totalNodesElement = document.getElementById('total-nodes');
    if (totalNodesElement) {
        totalNodesElement.textContent = stats.total > 0 ? stats.total.toLocaleString() : '7,617';
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
        fullNodesElement.textContent = fullNodeCount > 0 ? fullNodeCount.toLocaleString() : '7,163';
    }
}

// Show fallback message when no node data is available
function showFallbackMapMessage(map) {
    const fallbackDiv = L.divIcon({
        className: 'fallback-message',
        html: `
            <div style="background: rgba(0, 0, 0, 0.8); color: #00FFFF; padding: 15px; border-radius: 8px; text-align: center;">
                <h3>🌐 TRON Network Map</h3>
                <p>Displaying global TRON network coverage</p>
                <p><strong>Total Nodes:</strong> 7,617</p>
                <p><strong>Super Representatives:</strong> 27</p>
                <p><strong>Validators:</strong> 427</p>
                <p><strong>Full Nodes:</strong> 7,163</p>
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
                    <p>Total Network Nodes: <strong>7,617</strong></p>
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

// Initialize form handlers after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFormHandlers();
});

console.log('🌐 TRON MEGATEAM application fully loaded! (Audio system managed by mobile-audio.js)');