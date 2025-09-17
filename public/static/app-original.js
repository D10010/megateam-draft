// Futuristic JavaScript for TRON MEGATEAM Landing Page

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

    // Cyber Scan Effect
    function addCyberScanEffect(element) {
        const scanLine = document.createElement('div');
        scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, #00FFFF 50%, transparent 100%);
            animation: cyberScan 1s ease-out;
            z-index: 10;
        `;
        
        element.style.position = 'relative';
        element.appendChild(scanLine);
        
        setTimeout(() => {
            scanLine.remove();
        }, 1000);
    }

    // Enhanced button interactions
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Add cyber ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(0, 255, 255, 0.5) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleAnimation 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add screen flash
            addScreenFlash();
        });
    });

    // Screen Flash Effect
    function addScreenFlash() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 6, 10, 0.1);
            pointer-events: none;
            z-index: 9998;
            animation: fadeIn 0.1s ease-out reverse;
        `;
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.remove();
        }, 100);
    }

    // Success Effect
    function addSuccessEffect() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 255, 0, 0.1);
            pointer-events: none;
            z-index: 9998;
            animation: fadeIn 0.3s ease-out reverse;
        `;
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.remove();
        }, 300);
    }

    // Error Message Display
    function showErrorMessage(message) {
        // Remove any existing error messages
        const existingError = document.getElementById('error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.className = 'mt-4 cyber-card p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-tron-red/10 border border-red-500/30';
        errorDiv.innerHTML = `
            <div class="text-center">
                <i class="fas fa-exclamation-triangle text-2xl text-red-400 mb-2"></i>
                <h3 class="text-lg font-bold text-red-400 mb-2">Submission Error</h3>
                <p class="text-tron-light-gray">${message}</p>
                <button onclick="this.parentElement.parentElement.remove()" class="mt-3 px-4 py-2 bg-tron-red hover:bg-tron-dark-red rounded-lg text-sm font-medium transition-colors">
                    Close
                </button>
            </div>
        `;
        
        // Insert after the form
        const signupForm = document.getElementById('megateam-signup-form');
        if (signupForm && signupForm.parentElement) {
            signupForm.parentElement.insertBefore(errorDiv, signupForm.nextSibling);
        }
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (errorDiv && errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 10000);
        
        // Add error flash effect
        addScreenFlash();
    }

    // Cursor Trail Effect
    function initCursorTrail() {
        let mouseX = 0, mouseY = 0;
        let trail = [];
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Create trail particle
            const particle = {
                x: mouseX,
                y: mouseY,
                life: 20,
                color: `hsl(${Math.random() * 60 + 180}, 100%, 50%)`
            };
            
            trail.push(particle);
            
            if (trail.length > 20) {
                trail.shift();
            }
        });
        
        function updateTrail() {
            trail.forEach((particle, index) => {
                particle.life--;
                if (particle.life <= 0) {
                    trail.splice(index, 1);
                } else {
                    const element = document.createElement('div');
                    element.style.cssText = `
                        position: fixed;
                        left: ${particle.x}px;
                        top: ${particle.y}px;
                        width: ${particle.life / 4}px;
                        height: ${particle.life / 4}px;
                        background: ${particle.color};
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 9999;
                        opacity: ${particle.life / 30};
                        box-shadow: 0 0 2px ${particle.color};
                    `;
                    
                    document.body.appendChild(element);
                    
                    setTimeout(() => {
                        element.remove();
                    }, 50);
                }
            });
            
            requestAnimationFrame(updateTrail);
        }
        
        updateTrail();
    }

    // Initialize cursor trail on desktop
    if (window.innerWidth > 768) {
        initCursorTrail();
    }

    // Keyboard navigation with cyber effects
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            addCyberGlitch();
        }
        
        // Arrow key navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            addScreenFlash();
        }
    });

    // Loading screen
    function showLoadingScreen() {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.innerHTML = `
            <div class="loading-spinner"></div>
        `;
        document.body.appendChild(loadingScreen);
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    }

    // Initialize loading screen
    showLoadingScreen();

    // MEGATEAM Signup Form Handler
    const signupForm = document.getElementById('megateam-signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(signupForm);
            const data = {};
            
            // Convert FormData to regular object
            for (let [key, value] of formData.entries()) {
                if (data[key]) {
                    // Handle multiple values (like checkboxes)
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            }
            
            // Handle checkbox arrays properly
            const checkboxGroups = ['skills', 'interests'];
            checkboxGroups.forEach(group => {
                const checkboxes = signupForm.querySelectorAll(`input[name="${group}"]:checked`);
                data[group] = Array.from(checkboxes).map(cb => cb.value);
            });
            
            // Basic validation
            const requiredFields = ['firstName', 'lastName', 'email', 'experience', 'country', 'agreement'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = signupForm.querySelector(`[name="${field}"]`);
                if (!data[field] || (field === 'agreement' && !input.checked)) {
                    isValid = false;
                    input.style.borderColor = '#FF060A';
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 3000);
                }
            });
            
            // Check at least one interest is selected
            if (!data.interests || data.interests.length === 0) {
                isValid = false;
                const interestSection = signupForm.querySelector('[name="interests"]').closest('div').parentElement;
                interestSection.style.borderLeft = '3px solid #FF060A';
                setTimeout(() => {
                    interestSection.style.borderLeft = '';
                }, 3000);
            }
            
            if (!isValid) {
                // Add error flash effect
                addScreenFlash();
                return;
            }
            
            // Show loading state
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <span class="relative z-10 flex items-center justify-center text-tron-white">
                    <i class="fas fa-spinner fa-spin mr-3"></i>
                    <span>Submitting...</span>
                </span>
            `;
            submitBtn.disabled = true;
            
            // Submit to backend API and Google Sheets
            fetch('/api/signup', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                console.log('MEGATEAM Signup Response:', result);
                
                if (result.success) {
                    // Hide form and show success message
                    signupForm.style.display = 'none';
                    document.getElementById('success-message').classList.remove('hidden');
                    
                    // Update success message with custom text if provided
                    if (result.message) {
                        const successText = document.querySelector('#success-message p');
                        if (successText) {
                            successText.textContent = result.message;
                        }
                    }
                    
                    // Add success effect
                    addSuccessEffect();
                } else {
                    // Show error message
                    showErrorMessage(result.error || 'Submission failed. Please try again.');
                    
                    // Reset submit button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                console.error('MEGATEAM Signup Error:', error);
                showErrorMessage('Network error. Please check your connection and try again.');
                
                // Reset submit button  
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    console.log('🚀 TRON MEGATEAM Futuristic Interface Initialized! 🌐');
    console.log('⚡ Matrix protocols active...');
    console.log('🔮 Holographic systems online...');
    console.log('💎 Cyber enhancement complete!');
});

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

// Mobile Menu Toggle Function
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerBtn = document.getElementById('mobile-menu-toggle');
    
    if (mobileMenu && hamburgerBtn) {
        // Toggle menu visibility
        mobileMenu.classList.toggle('hidden');
        
        // Animate hamburger button
        const spans = hamburgerBtn.querySelectorAll('span');
        if (mobileMenu.classList.contains('hidden')) {
            // Menu is closing - reset hamburger
            spans[0].style.transform = 'rotate(0) translateY(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translateY(0)';
        } else {
            // Menu is opening - animate to X
            spans[0].style.transform = 'rotate(45deg) translateY(6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
        }
        
        // Add cyber effect
        addCyberGlitch();
    }
}

// Close mobile menu when clicking on links
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a[href^="#"]');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburgerBtn = document.getElementById('mobile-menu-toggle');
            
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        });
    });

    // TRONScan API Integration for Real-Time Data
    initTronDataFetcher();
    
    // Initialize TRON Network Map
    initTronNetworkMap();
});

// TRONScan API Integration Functions
function initTronDataFetcher() {
    console.log('🔗 Initializing TRONScan API integration...');
    
    // Fetch initial data after a short delay to let the page load
    setTimeout(fetchTronNetworkData, 2000);
    
    // Set up periodic updates every 60 seconds (reduced frequency to respect rate limits)
    setInterval(fetchTronNetworkData, 60000);
}

// Main function to fetch all TRON network statistics
async function fetchTronNetworkData() {
    try {
        console.log('📊 Fetching TRON network statistics...');
        
        // Fetch data sequentially to respect TRONScan API rate limits (3 RPS max)
        const tpsData = await fetchTPS();
        await sleep(400); // Wait 400ms between requests to stay under 3 RPS
        
        const blockData = await fetchLatestBlock();
        await sleep(400);
        
        const transactionData = await fetchDailyTransactions();
        await sleep(400);
        
        const priceData = await fetchTRXPrice();
        await sleep(400);
        
        const accountData = await fetchTronAccounts();
        
        // Update UI elements with fetched data
        updateTronStats({
            tps: tpsData,
            block: blockData,
            transactions: transactionData,
            price: priceData,
            accounts: accountData
        });
        
        console.log('✅ TRON data updated successfully');
        
    } catch (error) {
        console.error('❌ Error fetching TRON data:', error);
        handleTronDataError(error);
    }
}

// Fetch Current TPS (Transactions Per Second) via proxy API
async function fetchTPS() {
    try {
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
        
        return {
            current: data.current || 0,
            max: data.max || 0,
            blockHeight: data.blockHeight || 0,
            timestamp: data.timestamp || Date.now()
        };
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

// Fetch TRX Price and Market Data via proxy API
async function fetchTRXPrice() {
    try {
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
        
        return {
            price: data.price || 0,
            volume24h: data.volume24h || 0,
            change24h: data.change24h || 0,
            marketCap: data.marketCap || 0,
            rank: data.rank || 0
        };
    } catch (error) {
        console.error('Price fetch error:', error);
        return { price: 0, volume24h: 0, change24h: 0, error: true };
    }
}

// Update UI elements with fetched TRON statistics
function updateTronStats(data) {
    // Update Current TPS
    const tpsElement = document.getElementById('live-tps');
    if (tpsElement && data.tps) {
        const tpsValue = data.tps.error ? 'N/A' : data.tps.current.toLocaleString();
        tpsElement.textContent = tpsValue;
        
        // Add pulse animation for live updates
        if (!data.tps.error) {
            tpsElement.classList.add('animate-pulse');
            setTimeout(() => tpsElement.classList.remove('animate-pulse'), 1000);
        }
    }
    
    // Update Latest Block Height
    const blockElement = document.getElementById('live-block');
    if (blockElement && data.block) {
        const blockValue = data.block.error ? 'N/A' : `#${data.block.height.toLocaleString()}`;
        blockElement.textContent = blockValue;
        
        if (!data.block.error) {
            blockElement.classList.add('animate-pulse');
            setTimeout(() => blockElement.classList.remove('animate-pulse'), 1000);
        }
    }
    
    // Update Daily Transactions
    const transactionsElement = document.getElementById('live-daily-txns');
    if (transactionsElement && data.transactions) {
        const transValue = data.transactions.error ? 'N/A' : data.transactions.today.toLocaleString();
        transactionsElement.textContent = transValue;
        
        if (!data.transactions.error) {
            transactionsElement.classList.add('animate-pulse');
            setTimeout(() => transactionsElement.classList.remove('animate-pulse'), 1000);
        }
    }
    
    // Update TRX Price
    const priceElement = document.getElementById('live-trx-price');
    if (priceElement && data.price) {
        if (data.price.error) {
            priceElement.textContent = 'N/A';
        } else {
            const price = data.price.price;
            const change = data.price.change24h;
            const changeColor = change >= 0 ? 'text-green-400' : 'text-red-400';
            const changeSymbol = change >= 0 ? '+' : '';
            
            priceElement.innerHTML = `
                $${price.toFixed(4)}
                <span class="text-sm ${changeColor} ml-2">
                    ${changeSymbol}${change.toFixed(2)}%
                </span>
            `;
            
            priceElement.classList.add('animate-pulse');
            setTimeout(() => priceElement.classList.remove('animate-pulse'), 1000);
        }
    }
    
    // Update USDT Volume (show USD value, not transaction count)
    const usdtElement = document.getElementById('live-usdt-volume');
    if (usdtElement && data.transactions) {
        if (data.transactions.error) {
            usdtElement.textContent = 'N/A';
        } else {
            // Show volume in billions for better readability
            const volume = data.transactions.usdtVolume || 0;
            const volumeInBillions = (volume / 1000000000).toFixed(2);
            usdtElement.textContent = `$${volumeInBillions}B`;
        }
        
        if (!data.transactions.error && data.transactions.usdtVolume) {
            usdtElement.classList.add('animate-pulse');
            setTimeout(() => usdtElement.classList.remove('animate-pulse'), 1000);
        }
    }
    
    // Update Total Accounts (show in millions for readability)
    const accountsElement = document.getElementById('live-total-accounts');
    if (accountsElement && data.accounts) {
        if (data.accounts.error) {
            accountsElement.textContent = 'N/A';
        } else {
            // Show accounts in millions for better readability  
            const accounts = data.accounts.totalAccounts || 0;
            const accountsInMillions = (accounts / 1000000).toFixed(1);
            accountsElement.textContent = `${accountsInMillions}M`;
        }
        
        if (!data.accounts.error) {
            accountsElement.classList.add('animate-pulse');
            setTimeout(() => accountsElement.classList.remove('animate-pulse'), 1000);
        }
    }
    
    // Update timestamp indicators
    const timestampElements = document.querySelectorAll('.tron-data-timestamp');
    timestampElements.forEach(element => {
        element.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
        element.classList.add('text-xs', 'text-tron-light-gray', 'opacity-70');
    });
    
    // Show network health indicator
    updateNetworkHealthIndicator(data);
}

// Log network data quality for debugging
function updateNetworkHealthIndicator(data) {
    const hasErrors = data.tps?.error || data.block?.error || data.transactions?.error || data.price?.error || data.accounts?.error;
    
    if (hasErrors) {
        console.log('⚠️ Partial TRON data loaded - some APIs failed');
    } else {
        console.log('✅ All TRON data loaded successfully');
    }
}

// Handle API errors gracefully with fallback data
function handleTronDataError(error) {
    console.error('🚨 TRON Data Error:', error);
    
    // Check if it's a rate limit error
    const isRateLimit = error.toString().includes('rate exceeded') || error.toString().includes('500');
    
    if (isRateLimit) {
        console.log('⏱️ Rate limit detected, showing demo data...');
        // Show demo data during rate limits
        showDemoTronData();
    } else {
        // Show loading state for other errors
        const errorElements = [
            'live-tps',
            'live-block', 
            'live-daily-txns',
            'live-trx-price',
            'live-usdt-volume',
            'live-total-accounts'
        ];
        
        errorElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = 'Loading...';
                element.classList.add('animate-pulse', 'text-yellow-400');
            }
        });
    }
    
    // Log status for debugging
    if (isRateLimit) {
        console.log('⚠️ TRONScan API rate limited, showing demo data');
    } else {
        console.log('❌ TRONScan API connection issues');
    }
    
    // Retry after 2 minutes for rate limits, 1 minute for other errors
    const retryDelay = isRateLimit ? 120000 : 60000;
    setTimeout(() => {
        console.log('🔄 Retrying TRON data fetch...');
        fetchTronNetworkData();
    }, retryDelay);
}

// Show demo data when APIs are rate-limited
function showDemoTronData() {
    const currentTime = Date.now();
    const demoData = {
        tps: {
            current: 85 + Math.floor(Math.random() * 50), // 85-135 TPS
            max: 1035,
            error: false
        },
        block: {
            height: 75824000 + Math.floor((currentTime - 1758130000000) / 3000), // Simulated block progression
            transactions: 200 + Math.floor(Math.random() * 400), // 200-600 transactions per block
            error: false
        },
        transactions: {
            today: 5500000 + Math.floor(Math.random() * 500000), // ~5.5-6M daily
            usdtTransactions: 2200000 + Math.floor(Math.random() * 400000), // ~2.2-2.6M USDT daily  
            usdtVolume: 35000000000 + Math.floor(Math.random() * 5000000000), // ~$35-40B daily volume (real TRONScan data)
            error: false
        },
        price: {
            price: 0.2345 + (Math.random() - 0.5) * 0.01, // ~$0.23 with small variations
            change24h: -2 + (Math.random() * 8), // -2% to +6% range
            error: false
        },
        accounts: {
            totalAccounts: 332000000, // ~332M total accounts (from TRONScan)
            activeDaily: 229000, // ~229K new accounts daily
            error: false
        }
    };
    
    console.log('📊 Displaying demo TRON data during rate limit...');
    updateTronStats(demoData);
}

// Format large numbers for display
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
}

// Format blockchain time to readable format
function formatBlockTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    
    if (diffSecs < 60) {
        return `${diffSecs}s ago`;
    } else if (diffSecs < 3600) {
        return `${Math.floor(diffSecs / 60)}m ago`;
    } else if (diffSecs < 86400) {
        return `${Math.floor(diffSecs / 3600)}h ago`;
    } else {
        return `${Math.floor(diffSecs / 86400)}d ago`;
    }
}

// Helper function to add delays between API calls
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
            activeDaily: data.activeDaily || 0,
            timestamp: data.timestamp || Date.now()
        };
    } catch (error) {
        console.error('Accounts fetch error:', error);
        return { totalAccounts: 0, activeDaily: 0, error: true };
    }
}

console.log('🌐 TRONScan API integration loaded successfully!');

// Audio system is now handled by mobile-audio.js
// This prevents conflicts with the new mobile-first audio implementation

// Initialize HTML5 Audio
function initializeAudioSystem() {
    backgroundAudio = document.getElementById('background-audio');
    
    if (backgroundAudio) {
        console.log(`🎵 Initializing HTML5 Audio System (Mobile: ${isMobile})`);
        
        // Set initial properties
        backgroundAudio.volume = 0; // Start at 0 volume (muted)
        backgroundAudio.muted = true;
        backgroundAudio.loop = true;
        
        // Add event listeners
        backgroundAudio.addEventListener('loadstart', () => console.log('📥 Audio loading started'));
        backgroundAudio.addEventListener('canplay', () => {
            console.log('✅ Audio can play');
            audioInitialized = true;
            updateAudioControlVisibility();
        });
        backgroundAudio.addEventListener('error', (e) => {
            console.error('❌ Audio error:', e);
            showAudioNotification('Audio unavailable', 'fas fa-exclamation-triangle', 'text-red-400');
        });
        backgroundAudio.addEventListener('play', () => console.log('▶️ Audio started playing'));
        backgroundAudio.addEventListener('pause', () => console.log('⏸️ Audio paused'));
        
        // Setup audio controls
        setupAudioControls();
        
        // For mobile, wait for user interaction
        if (isMobile) {
            addInteractionListeners();
            updateAudioControlVisibility();
        } else {
            // On desktop, try to load audio immediately
            loadAudioSource();
        }
    } else {
        console.warn('⚠️ Audio element not found');
    }
}

// Load audio source after user interaction (mobile requirement)
function loadAudioSource() {
    if (backgroundAudio && !audioInitialized) {
        console.log('📥 Loading audio source...');
        
        // Use a royalty-free background music URL or local file
        // For demo, using a simple test audio file
        backgroundAudio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBzOH0fPMeSEELIHO8tiJOQgZZ7zs6J5NEA5Po+HwuGUcBjiGz/TNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELIHO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/TNeSEELIHO8tiJOQgZaLzs6J1NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELIHO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEELYDO8tiJOQgZaLzs6J5NEA5Po+HwuGUcBjiGz/PNeSEE';
        
        backgroundAudio.load(); // Reload with new source
    }
}

// Track user interaction for mobile audio unlock
function trackUserInteraction() {
    if (!userHasInteracted) {
        userHasInteracted = true;
        console.log('👆 User interaction detected - audio unlocked');
        
        // Load audio source after interaction
        loadAudioSource();
        
        // For mobile, try to initialize audio after interaction
        if (isMobile) {
            setTimeout(() => {
                if (backgroundAudio && !audioInitialized) {
                    console.log('📱 Attempting to initialize audio after interaction...');
                    backgroundAudio.play().then(() => {
                        backgroundAudio.pause(); // Immediately pause, just to unlock
                        backgroundAudio.currentTime = 0;
                        audioInitialized = true;
                        updateAudioControlVisibility();
                        console.log('✅ Mobile audio unlocked');
                    }).catch(e => {
                        console.warn('⚠️ Mobile audio unlock failed:', e);
                    });
                }
            }, 100);
        }
    }
}

// Add interaction listeners for mobile
function addInteractionListeners() {
    const events = ['touchstart', 'touchend', 'mousedown', 'keydown', 'click'];
    events.forEach(event => {
        document.addEventListener(event, trackUserInteraction, { once: true, passive: true });
    });
}

// Audio ready event handler
function onAudioReady() {
    console.log(`✅ HTML5 Audio ready (Mobile: ${isMobile})`);
    setupAudioControls();
    updateAudioControlVisibility();
}

// Audio error handler
function onAudioError(error) {
    console.warn('⚠️ HTML5 Audio error:', error);
    showAudioNotification('Audio unavailable', 'fas fa-exclamation-triangle', 'text-red-400');
}

// Audio ended handler (for looping)
function onAudioEnded() {
    if (backgroundAudio && !isAudioMuted) {
        backgroundAudio.currentTime = 0;
        backgroundAudio.play().catch(e => console.warn('Auto-replay failed:', e));
    }
}

// Setup audio control button
function setupAudioControls() {
    const audioBtn = document.getElementById('audio-control-btn');
    if (audioBtn) {
        audioBtn.addEventListener('click', toggleAudio);
        console.log('🔊 Audio controls setup complete');
        
        // Add keyboard shortcut (M for mute)
        document.addEventListener('keydown', (event) => {
            if (event.key.toLowerCase() === 'm' && !event.ctrlKey && !event.altKey) {
                toggleAudio();
            }
        });
    }
}

// Toggle audio function
function toggleAudio() {
    if (!backgroundAudio) {
        console.warn('⚠️ Audio element not found');
        return;
    }
    
    // Track interaction for mobile
    trackUserInteraction();
    
    try {
        // For mobile, ensure audio is unlocked first
        if (isMobile && !userHasInteracted) {
            console.log('📱 Mobile audio requires user interaction first...');
            showAudioNotification('Tap to enable audio', 'fas fa-hand-pointer', 'text-yellow-400');
            return;
        }
        
        if (isAudioMuted) {
            // Unmute and play
            backgroundAudio.muted = false;
            backgroundAudio.volume = isMobile ? 0.3 : 0.5; // Lower volume on mobile
            
            // Try to play the audio
            const playPromise = backgroundAudio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isAudioMuted = false;
                    console.log(`🔊 Audio unmuted and playing (Mobile: ${isMobile})`);
                    showAudioNotification('Audio Enabled', 'fas fa-volume-up', 'text-green-400');
                    updateAudioIcon();
                }).catch(error => {
                    console.warn('⚠️ Audio play failed:', error);
                    showAudioNotification('Audio blocked by browser', 'fas fa-exclamation-circle', 'text-yellow-400');
                });
            }
        } else {
            // Mute and pause
            backgroundAudio.muted = true;
            backgroundAudio.pause();
            isAudioMuted = true;
            console.log(`🔇 Audio muted (Mobile: ${isMobile})`);
            
            // Show temporary notification
            showAudioNotification('Audio Muted', 'fas fa-volume-mute', 'text-gray-400');
            updateAudioIcon();
        }
    } catch (error) {
        console.error('❌ Error toggling audio:', error);
        showAudioNotification('Audio unavailable', 'fas fa-exclamation-triangle', 'text-red-400');
    }
}

// Update audio icon
function updateAudioIcon() {
    const audioIcon = document.getElementById('audio-icon');
    if (audioIcon) {
        const baseClass = 'text-sm sm:text-lg group-hover:scale-110 transition-transform duration-300';
        
        if (isMobile && !audioInitialized) {
            audioIcon.className = `fas fa-hand-pointer ${baseClass}`;
        } else {
            audioIcon.className = isAudioMuted 
                ? `fas fa-volume-mute ${baseClass}`
                : `fas fa-volume-up ${baseClass}`;
        }
    }
}

// Update audio control visibility and state
function updateAudioControlVisibility() {
    const audioBtn = document.getElementById('audio-control-btn');
    if (audioBtn) {
        if (isMobile && !audioInitialized) {
            audioBtn.title = 'Tap to enable audio';
            audioBtn.classList.add('animate-pulse');
        } else {
            audioBtn.title = isAudioMuted ? 'Unmute audio (Press M)' : 'Mute audio (Press M)';
            audioBtn.classList.remove('animate-pulse');
        }
    }
    updateAudioIcon();
}

// Show temporary audio notification
function showAudioNotification(message, iconClass, textColorClass) {
    // Remove existing notification
    const existing = document.getElementById('audio-notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.id = 'audio-notification';
    notification.className = `fixed top-20 right-4 z-50 bg-tron-black/90 backdrop-blur-sm border border-tron-red/50 rounded-lg px-4 py-2 flex items-center space-x-2 shadow-lg animate-fade-in`;
    notification.innerHTML = `
        <i class="${iconClass} ${textColorClass}"></i>
        <span class="text-white text-sm font-medium">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 2 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 2000);
}

// Add mobile-specific welcome message
function showMobileAudioWelcome() {
    if (isMobile) {
        setTimeout(() => {
            showAudioNotification('Tap 🔇 to enable audio', 'fas fa-info-circle', 'text-blue-400');
        }, 3000);
    }
}

// Audio functionality is now handled by mobile-audio.js
// This section has been removed to prevent conflicts

// TRON Network Map Functionality
let tronNetworkMap = null;
let witnessData = [];
let mapMarkers = [];
let currentFilter = 'all';

// Initialize TRON Network Map
function initTronNetworkMap() {
    console.log('🗺️ Initializing TRON Network Map...');
    
    // Check if we're on the page with the map
    const mapContainer = document.getElementById('tron-world-map');
    if (!mapContainer) {
        console.log('ℹ️ Map container not found on this page');
        return;
    }
    
    // Fetch witness data and initialize map
    setTimeout(() => {
        fetchTronWitnessData();
    }, 1000);
    
    // Set up map control event listeners
    setupMapControls();
}

// Fetch complete TRON network data (witnesses + full nodes)
async function fetchTronWitnessData() {
    try {
        console.log('📡 Fetching complete TRON network data...');
        
        const response = await fetch('/api/tron/network-overview', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Network API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Complete network data received:', data);
        
        witnessData = data.nodes || [];
        
        // Update network statistics with correct numbers
        updateNetworkStatsCorrect(data);
        
        // Also update with a delay to ensure DOM is ready
        setTimeout(() => {
            updateNetworkStatsCorrect(data);
        }, 1000);
        
        // Initialize the map with all network data
        initializeWorldMap(witnessData);
        
    } catch (error) {
        console.error('❌ Error fetching network data:', error);
        showMapError();
    }
}

// Update network statistics with correct numbers
function updateNetworkStatsCorrect(data) {
    const stats = data.statistics || {};
    
    // Add mobile detection for debugging
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log(`📱 Mobile device detected: ${isMobile}`);
    
    // Total nodes (should be 7,617)
    const totalElement = document.getElementById('total-validators');
    if (totalElement) {
        const nodeCount = (stats.totalNodes || 0).toLocaleString();
        totalElement.textContent = nodeCount;
        totalElement.style.visibility = 'visible'; // Ensure visibility on mobile
        totalElement.style.opacity = '1';
        console.log(`✅ Updated total-validators element to: ${nodeCount} (Mobile: ${isMobile})`);
    } else {
        console.warn('❌ Could not find total-validators element');
        // Try to find it again after a short delay (mobile timing issue)
        setTimeout(() => {
            const retryElement = document.getElementById('total-validators');
            if (retryElement) {
                const nodeCount = (stats.totalNodes || 0).toLocaleString();
                retryElement.textContent = nodeCount;
                retryElement.style.visibility = 'visible';
                retryElement.style.opacity = '1';
                console.log(`✅ Retry successful: Updated total-validators element to: ${nodeCount}`);
            }
        }, 1000);
    }
    
    // Count by type from actual node data
    const allNodes = data.nodes || [];
    const superReps = allNodes.filter(n => n.type === 'super-representative').length;
    const validators = allNodes.filter(n => n.type === 'validator').length;  
    const exchanges = allNodes.filter(n => n.location && n.location.type === 'exchange').length;
    const cloud = allNodes.filter(n => n.location && n.location.type === 'cloud').length;
    const fullNodes = allNodes.filter(n => n.type === 'full-node').length;
    
    // Update counts
    const exchangeElement = document.getElementById('exchange-count');
    if (exchangeElement) {
        exchangeElement.textContent = exchanges.toString();
    }
    
    const independentElement = document.getElementById('independent-count');
    if (independentElement) {
        // Show full nodes count as "independent"
        independentElement.textContent = (stats.fullNodes || fullNodes).toLocaleString();
    }
    
    // Count continents
    const continentsElement = document.getElementById('continents-count');
    if (continentsElement) {
        const continentsCount = (stats.continents || 0).toString();
        continentsElement.textContent = continentsCount;
        continentsElement.style.visibility = 'visible';
        continentsElement.style.opacity = '1';
        console.log(`✅ Updated continents-count to: ${continentsCount} (Mobile: ${isMobile})`);
    }
    
    // Ensure super-reps-count is visible (it's hardcoded to 27 but ensure it's visible)
    const superRepsElement = document.getElementById('super-reps-count');
    if (superRepsElement) {
        superRepsElement.style.visibility = 'visible';
        superRepsElement.style.opacity = '1';
        console.log(`✅ Ensured super-reps-count visibility (Mobile: ${isMobile})`);
    }
    
    // Ensure network-health is visible
    const networkHealthElement = document.getElementById('network-health');
    if (networkHealthElement) {
        networkHealthElement.style.visibility = 'visible';
        networkHealthElement.style.opacity = '1';
        console.log(`✅ Ensured network-health visibility (Mobile: ${isMobile})`);
    }
    
    console.log(`📊 Network stats updated: ${stats.totalNodes} total nodes, ${superReps} SRs, ${validators} validators, ${stats.fullNodes} full nodes`);
}

// Keep the old function for backwards compatibility
function updateNetworkStats(data) {
    updateNetworkStatsCorrect(data);
}

// Initialize world map using Leaflet.js for professional visualization
function initializeWorldMap(witnesses) {
    const mapContainer = document.getElementById('tron-world-map');
    const loadingOverlay = document.getElementById('map-loading');
    
    if (!mapContainer) return;
    
    // Load Leaflet.js library dynamically
    if (!window.L) {
        console.log('📦 Loading Leaflet libraries...');
        
        // Add Leaflet CSS
        const leafletCSS = document.createElement('link');
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        leafletCSS.onload = () => console.log('✅ Leaflet CSS loaded');
        document.head.appendChild(leafletCSS);
        
        // Add MarkerCluster CSS
        const clusterCSS = document.createElement('link');
        clusterCSS.rel = 'stylesheet';
        clusterCSS.href = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css';
        document.head.appendChild(clusterCSS);
        
        const clusterDefaultCSS = document.createElement('link');
        clusterDefaultCSS.rel = 'stylesheet';
        clusterDefaultCSS.href = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css';
        document.head.appendChild(clusterDefaultCSS);
        
        // Add Leaflet JS
        const leafletJS = document.createElement('script');
        leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        leafletJS.onload = () => {
            console.log('✅ Leaflet JS loaded');
            // Add MarkerCluster JS after Leaflet loads
            const clusterJS = document.createElement('script');
            clusterJS.src = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js';
            clusterJS.onload = () => {
                console.log('✅ MarkerCluster loaded');
                // Small delay to ensure everything is ready
                setTimeout(() => {
                    initializeLeafletMap(witnesses, loadingOverlay);
                }, 100);
            };
            clusterJS.onerror = () => {
                console.error('❌ Failed to load MarkerCluster');
                fallbackToBasicMap(witnesses, loadingOverlay);
            };
            document.head.appendChild(clusterJS);
        };
        leafletJS.onerror = () => {
            console.error('❌ Failed to load Leaflet');
            fallbackToBasicMap(witnesses, loadingOverlay);
        };
        document.head.appendChild(leafletJS);
    } else {
        initializeLeafletMap(witnesses, loadingOverlay);
    }
}

// Initialize Leaflet map with professional styling
function initializeLeafletMap(witnesses, loadingOverlay) {
    try {
        console.log('🚀 Starting Leaflet map initialization...');
        console.log('📊 Witnesses data length:', witnesses?.length || 0);
        
        // Clear any existing map instance
        const mapContainer = document.getElementById('tron-world-map');
        if (mapContainer) {
            mapContainer.innerHTML = '';
            console.log('🧹 Cleared existing map container');
        }
        // Create the map with dark theme (disable default zoom control)
        tronNetworkMap = L.map('tron-world-map', {
            center: [20, 0],
            zoom: 2,
            minZoom: 2,
            maxZoom: 8,
            zoomControl: false, // Disable default zoom control
            worldCopyJump: true,
            maxBounds: [[-90, -180], [90, 180]],
            maxBoundsViscosity: 0.5
        });
        
        // Add custom zoom control to bottom left
        L.control.zoom({
            position: 'bottomleft'
        }).addTo(tronNetworkMap);
        
        console.log('🗺️ Map container initialized with custom zoom controls');
        
        // Add custom dark tile layer
        const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap contributors © CARTO',
            subdomains: 'abcd',
            maxZoom: 8
        });
        
        tileLayer.on('tileerror', function(error) {
            console.warn('⚠️ Tile loading error:', error);
        });
        
        tileLayer.addTo(tronNetworkMap);
        console.log('🗺️ Tile layer added successfully');
        
        // Add TRON-themed overlay
        addTronThemeOverlay();
        
        // Add witness markers with clustering
        addProfessionalWitnessMarkers(witnesses);
        
        // Add map event listeners
        setupMapEventListeners();
        
        // Show statistics overlay
        showMapStatsOverlay();
        
        // Hide loading overlay with animation
        setTimeout(() => {
            if (loadingOverlay) {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }
        }, 1000);
        
        console.log('🗺️ Professional Leaflet map initialized with TRON theme');
        
    } catch (error) {
        console.error('❌ Error initializing Leaflet map:', error);
        fallbackToBasicMap(witnesses, loadingOverlay);
    }
}

// Add TRON-themed overlay to the map
function addTronThemeOverlay() {
    // Create custom control for TRON branding
    const tronBranding = L.control({ position: 'bottomright' });
    tronBranding.onAdd = function() {
        const div = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
        div.style.background = 'linear-gradient(45deg, #FF060A, #FF4444)';
        div.style.padding = '5px 10px';
        div.style.borderRadius = '5px';
        div.style.color = 'white';
        div.style.fontSize = '12px';
        div.style.fontWeight = 'bold';
        div.innerHTML = 'TRON Network';
        return div;
    };
    tronBranding.addTo(tronNetworkMap);
    
    // Add custom CSS for TRON theme
    const tronMapStyle = document.createElement('style');
    tronMapStyle.textContent = `
        .leaflet-container {
            background: linear-gradient(45deg, #0a0a0a, #1a1a1a) !important;
        }
        
        .leaflet-control-zoom {
            background: rgba(255, 6, 10, 0.1) !important;
            border: 1px solid rgba(255, 6, 10, 0.3) !important;
        }
        
        .leaflet-control-zoom a {
            background: rgba(0, 0, 0, 0.8) !important;
            color: #FF060A !important;
            border: 1px solid rgba(255, 6, 10, 0.3) !important;
        }
        
        .leaflet-control-zoom a:hover {
            background: rgba(255, 6, 10, 0.2) !important;
        }
        
        .tron-marker {
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(255, 6, 10, 0.6);
            animation: tronPulse 2s ease-in-out infinite alternate;
        }
        
        .tron-marker.super-rep {
            animation: tronSuperPulse 1.5s ease-in-out infinite alternate;
            box-shadow: 0 0 25px rgba(255, 6, 10, 0.8);
        }
        
        @keyframes tronPulse {
            0% { box-shadow: 0 0 10px rgba(255, 6, 10, 0.4); }
            100% { box-shadow: 0 0 20px rgba(255, 6, 10, 0.8); }
        }
        
        @keyframes tronSuperPulse {
            0% { 
                box-shadow: 0 0 15px rgba(255, 6, 10, 0.6);
                transform: scale(1);
            }
            100% { 
                box-shadow: 0 0 30px rgba(255, 6, 10, 1);
                transform: scale(1.1);
            }
        }
        
        .leaflet-popup-content-wrapper {
            background: linear-gradient(135deg, #000000, #1a1a1a) !important;
            color: white !important;
            border: 1px solid rgba(255, 6, 10, 0.5) !important;
            box-shadow: 0 4px 20px rgba(255, 6, 10, 0.3) !important;
        }
        
        .leaflet-popup-tip {
            background: #000000 !important;
            border-color: rgba(255, 6, 10, 0.5) !important;
        }
    `;
    document.head.appendChild(tronMapStyle);
}

// Add professional witness markers with clustering and animations
function addProfessionalWitnessMarkers(witnesses) {
    if (!tronNetworkMap || !witnesses) return;
    
    // Clear existing markers
    mapMarkers = [];
    
    // Create marker cluster group if available
    let markersLayer;
    if (window.L && L.markerClusterGroup) {
        markersLayer = L.markerClusterGroup({
            maxClusterRadius: 80,
            iconCreateFunction: function(cluster) {
                const count = cluster.getChildCount();
                let className = 'marker-cluster-';
                
                if (count < 10) {
                    className += 'small';
                } else if (count < 100) {
                    className += 'medium';  
                } else {
                    className += 'large';
                }
                
                return L.divIcon({
                    html: `<div class="cluster-inner bg-gradient-to-br from-tron-red to-tron-dark-red text-white rounded-full flex items-center justify-center font-bold border-2 border-white shadow-lg"><span>${count}</span></div>`,
                    className: `marker-cluster ${className}`,
                    iconSize: L.point(40, 40)
                });
            }
        });
    } else {
        markersLayer = L.layerGroup();
    }
    
    witnesses.forEach((witness, index) => {
        // Skip nodes without valid coordinates
        const lat = witness.location?.lat || witness.lat;
        const lng = witness.location?.lng || witness.lng;
        
        if (!lat || !lng || lat === 0 || lng === 0) {
            console.log('⚠️ Skipping node with invalid coordinates:', witness.name || witness.id);
            return;
        }
        
        // Determine marker styling based on node type
        let markerColor, markerSize, markerClass, iconName;
        
        if (witness.type === 'super-representative') {
            markerColor = '#FF060A';
            markerSize = 16;
            markerClass = 'super-rep';
            iconName = 'crown';
        } else if (witness.type === 'validator') {
            markerColor = '#F59E0B';
            markerSize = 12;
            markerClass = 'validator';
            iconName = 'shield-alt';
        } else if (witness.location && witness.location.type === 'exchange') {
            markerColor = '#3B82F6';
            markerSize = 12;
            markerClass = 'exchange';
            iconName = 'exchange-alt';
        } else if (witness.location && witness.location.type === 'cloud') {
            markerColor = '#10B981';
            markerSize = 12;
            markerClass = 'cloud';
            iconName = 'cloud';
        } else if (witness.type === 'full-node') {
            markerColor = '#6B7280';
            markerSize = 8;
            markerClass = 'full-node';
            iconName = 'circle';
        } else {
            markerColor = '#9CA3AF';
            markerSize = 10;
            markerClass = 'independent';
            iconName = 'server';
        }
        
        // Create custom marker icon
        const customIcon = L.divIcon({
            className: `tron-marker ${markerClass}`,
            html: `
                <div class="relative flex items-center justify-center w-${markerSize} h-${markerSize}" style="width: ${markerSize}px; height: ${markerSize}px;">
                    <div class="absolute inset-0 rounded-full" style="background: ${markerColor}; box-shadow: 0 0 ${markerSize}px ${markerColor}40;"></div>
                    <i class="fas fa-${iconName} text-white text-xs relative z-10"></i>
                </div>
            `,
            iconSize: [markerSize, markerSize],
            iconAnchor: [markerSize/2, markerSize/2],
            popupAnchor: [0, -markerSize/2]
        });
        
        // Create marker using validated coordinates
        const marker = L.marker([lat, lng], {
            icon: customIcon,
            title: witness.name || witness.id
        });
        
        // Create rich popup content
        const popupContent = createWitnessPopupContent(witness);
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'tron-popup'
        });
        
        // Add marker events
        marker.on('mouseover', function(e) {
            showNodeInfoPanel(witness);
            this.openPopup();
        });
        
        marker.on('mouseout', function(e) {
            setTimeout(() => {
                if (!this.getPopup().isOpen()) {
                    hideNodeInfoPanel();
                }
            }, 100);
        });
        
        marker.on('click', function(e) {
            showDetailedNodeInfo(witness);
        });
        
        // Store marker data
        marker.witnessData = witness;
        mapMarkers.push({
            marker: marker,
            witness: witness,
            visible: true
        });
        
        // Add to layer
        markersLayer.addLayer(marker);
    });
    
    // Add markers layer to map
    tronNetworkMap.addLayer(markersLayer);
    window.markersLayer = markersLayer;
    
    console.log(`🎯 Added ${witnesses.length} professional markers to map`);
    
    // Update visible nodes count
    updateVisibleNodesCount();
}

// Create rich popup content for all node types
function createWitnessPopupContent(node) {
    let badgeContent = '';
    let nodeInfo = '';
    
    if (node.type === 'super-representative') {
        badgeContent = `<span class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold">Super Representative #${node.rank}</span>`;
        nodeInfo = `
            <div class="flex items-center gap-2">
                <i class="fas fa-vote-yea text-tron-light w-4"></i>
                <span>${formatLargeNumber(node.votes)} votes</span>
            </div>
            ${node.efficiency ? `
                <div class="flex items-center gap-2">
                    <i class="fas fa-percentage text-green-400 w-4"></i>
                    <span>${node.efficiency}% efficiency</span>
                </div>
            ` : ''}
        `;
    } else if (node.type === 'validator') {
        badgeContent = `<span class="bg-gray-600 text-white px-2 py-1 rounded-full text-xs">Validator #${node.rank}</span>`;
        nodeInfo = node.votes ? `
            <div class="flex items-center gap-2">
                <i class="fas fa-vote-yea text-tron-light w-4"></i>
                <span>${formatLargeNumber(node.votes)} votes</span>
            </div>
        ` : '';
    } else if (node.type === 'full-node') {
        badgeContent = `<span class="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">Full Node</span>`;
        nodeInfo = `
            <div class="flex items-center gap-2">
                <i class="fas fa-network-wired text-blue-400 w-4"></i>
                <span>Network Participant</span>
            </div>
            ${node.ip ? `
                <div class="flex items-center gap-2">
                    <i class="fas fa-server text-gray-400 w-4"></i>
                    <span class="text-xs font-mono">${node.ip}</span>
                </div>
            ` : ''}
        `;
    }
    
    const typeIcon = node.location ? getAdvancedTypeIcon(node.location.type) : '<i class="fas fa-server text-gray-400 text-lg"></i>';
    const nodeTitle = node.name || (node.ip ? `Node ${node.ip}` : `${node.type} Node`);
    
    // Location info - handle both witness and full node location formats
    const locationCountry = node.location ? node.location.country : node.country;
    const locationRegion = node.location ? node.location.region : '';
    const locationCity = node.city || '';
    
    const locationText = locationCity && locationRegion ? 
        `${locationCity}, ${locationCountry}` : 
        locationRegion ? `${locationCountry}, ${locationRegion}` : locationCountry;
    
    return `
        <div class="space-y-3 text-sm">
            <div class="border-b border-tron-red/30 pb-2">
                <div class="flex items-center gap-2 mb-2">
                    ${typeIcon}
                    <span class="font-bold text-white text-lg">${nodeTitle}</span>
                </div>
                ${badgeContent}
            </div>
            
            <div class="space-y-2 text-gray-300">
                <div class="flex items-center gap-2">
                    <i class="fas fa-map-marker-alt text-tron-red w-4"></i>
                    <span>${locationText || 'Unknown Location'}</span>
                </div>
                
                ${nodeInfo}
                
                ${node.url ? `
                    <div class="flex items-center gap-2">
                        <i class="fas fa-link text-blue-400 w-4"></i>
                        <a href="${node.url}" target="_blank" class="text-blue-400 hover:text-blue-300 truncate max-w-48 text-xs">${node.url}</a>
                    </div>
                ` : ''}
            </div>
            
            <div class="pt-2 border-t border-gray-700">
                <button onclick="focusOnNode('${node.address || node.id}')" class="w-full bg-gradient-to-r from-tron-red to-tron-dark-red px-3 py-2 rounded-lg text-white text-xs font-medium hover:from-tron-dark-red hover:to-tron-red transition-all">
                    <i class="fas fa-crosshairs mr-1"></i>Focus on Node
                </button>
            </div>
        </div>
    `;
}

// Add CSS animations for map effects
function addMapAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes mapPulse {
            0% {
                r: 6;
                opacity: 0.8;
            }
            50% {
                r: 12;
                opacity: 0.3;
            }
            100% {
                r: 6;
                opacity: 0.8;
            }
        }
        
        .witness-marker:hover {
            transform-origin: center;
            animation: markerBounce 0.3s ease-out;
        }
        
        @keyframes markerBounce {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    `;
    
    if (!document.getElementById('map-animations')) {
        style.id = 'map-animations';
        document.head.appendChild(style);
    }
}

// Show witness tooltip
function showWitnessTooltip(event, witness) {
    // Remove existing tooltip
    hideWitnessTooltip();
    
    const tooltip = document.createElement('div');
    tooltip.id = 'witness-tooltip';
    tooltip.className = 'absolute z-50 bg-tron-black border border-tron-red/50 rounded-lg p-4 text-sm shadow-lg shadow-tron-red/20';
    tooltip.style.pointerEvents = 'none';
    
    const rankText = witness.rank <= 27 ? `Super Representative #${witness.rank}` : `Candidate #${witness.rank}`;
    const typeIcon = getTypeIcon(witness.location.type);
    
    tooltip.innerHTML = `
        <div class="space-y-2">
            <div class="flex items-center gap-2">
                ${typeIcon}
                <span class="font-bold text-tron-light">${witness.name}</span>
            </div>
            <div class="text-xs text-gray-400">${rankText}</div>
            <div class="text-xs text-gray-300">
                <i class="fas fa-map-marker-alt text-tron-red mr-1"></i>
                ${witness.location.country}, ${witness.location.region}
            </div>
            <div class="text-xs text-gray-300">
                <i class="fas fa-vote-yea text-tron-light mr-1"></i>
                ${witness.votes.toLocaleString()} votes
            </div>
            ${witness.url ? `<div class="text-xs text-blue-400 truncate max-w-48">${witness.url}</div>` : ''}
        </div>
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip near cursor
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = (rect.left + window.scrollX + 20) + 'px';
    tooltip.style.top = (rect.top + window.scrollY - 10) + 'px';
}

// Hide witness tooltip
function hideWitnessTooltip() {
    const tooltip = document.getElementById('witness-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Get icon for witness type
function getTypeIcon(type) {
    const icons = {
        'exchange': '<i class="fas fa-exchange-alt text-blue-400"></i>',
        'cloud': '<i class="fas fa-cloud text-green-400"></i>',
        'ecosystem': '<i class="fas fa-rocket text-yellow-400"></i>',
        'regional': '<i class="fas fa-globe text-gray-400"></i>',
        'unknown': '<i class="fas fa-server text-gray-400"></i>'
    };
    
    return icons[type] || icons['unknown'];
}

// Setup map control buttons
function setupMapControls() {
    const controls = [
        { id: 'show-all-nodes', filter: 'all' },
        { id: 'show-super-reps', filter: 'super-reps' },
        { id: 'show-exchanges', filter: 'exchange' },
        { id: 'show-cloud', filter: 'cloud' }
    ];
    
    controls.forEach(control => {
        const button = document.getElementById(control.id);
        if (button) {
            button.addEventListener('click', () => {
                filterMapMarkers(control.filter);
                updateActiveButton(control.id);
            });
        }
    });
}

// Filter map markers based on criteria
function filterMapMarkers(filter) {
    currentFilter = filter;
    
    mapMarkers.forEach(marker => {
        const witness = marker.witness;
        let show = false;
        
        switch (filter) {
            case 'all':
                show = true;
                break;
            case 'super-reps':
                show = witness.rank <= 27;
                break;
            case 'exchange':
                show = witness.location.type === 'exchange';
                break;
            case 'cloud':
                show = witness.location.type === 'cloud';
                break;
        }
        
        marker.element.style.display = show ? 'block' : 'none';
    });
    
    console.log(`🔍 Filtered map to show: ${filter}`);
}

// Update active button styling
function updateActiveButton(activeId) {
    const buttons = ['show-all-nodes', 'show-super-reps', 'show-exchanges', 'show-cloud'];
    
    buttons.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            if (id === activeId) {
                button.classList.add('ring-2', 'ring-tron-red');
                button.style.transform = 'scale(1.05)';
            } else {
                button.classList.remove('ring-2', 'ring-tron-red');
                button.style.transform = 'scale(1)';
            }
        }
    });
}

// Show map error state
function showMapError() {
    const mapContainer = document.getElementById('tron-world-map');
    const loadingOverlay = document.getElementById('map-loading');
    
    if (mapContainer && loadingOverlay) {
        loadingOverlay.innerHTML = `
            <div class="text-center">
                <i class="fas fa-exclamation-triangle text-yellow-400 text-3xl mb-4"></i>
                <p class="text-yellow-400 text-lg mb-2">Network Data Unavailable</p>
                <p class="text-gray-400 text-sm">Unable to load TRON validator data at this time</p>
                <button onclick="fetchTronWitnessData()" class="mt-4 px-4 py-2 bg-tron-red hover:bg-tron-dark-red rounded-lg text-sm font-medium transition-colors">
                    <i class="fas fa-sync mr-2"></i>Retry
                </button>
            </div>
        `;
    }
}

// Advanced type icon with animations
function getAdvancedTypeIcon(type) {
    const icons = {
        'exchange': '<i class="fas fa-exchange-alt text-blue-400 text-lg animate-pulse"></i>',
        'cloud': '<i class="fas fa-cloud text-green-400 text-lg"></i>',
        'ecosystem': '<i class="fas fa-rocket text-yellow-400 text-lg"></i>',
        'regional': '<i class="fas fa-globe text-purple-400 text-lg"></i>',
        'unknown': '<i class="fas fa-server text-gray-400 text-lg"></i>'
    };
    
    return icons[type] || icons['unknown'];
}

// Show node information panel
function showNodeInfoPanel(witness) {
    const panel = document.getElementById('node-info-panel');
    const content = document.getElementById('node-info-content');
    
    if (!panel || !content) return;
    
    const rankBadge = witness.rank <= 27 ? 
        '<div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold mb-2">SR #' + witness.rank + '</div>' :
        '<div class="bg-gray-600 text-white px-2 py-1 rounded-full text-xs mb-2">Candidate #' + witness.rank + '</div>';
    
    content.innerHTML = `
        <div class="space-y-2">
            ${rankBadge}
            <div class="font-bold text-tron-light">${witness.name}</div>
            <div class="text-xs text-gray-300">${witness.location.country}</div>
            <div class="text-xs">
                <span class="text-gray-400">Votes:</span>
                <span class="text-tron-light ml-1">${formatLargeNumber(witness.votes)}</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2">
                <div class="bg-gradient-to-r from-tron-red to-tron-light h-2 rounded-full" style="width: ${witness.efficiency}%"></div>
            </div>
            <div class="text-xs text-center text-gray-400">${witness.efficiency}% efficiency</div>
        </div>
    `;
    
    panel.classList.remove('hidden');
}

// Hide node information panel
function hideNodeInfoPanel() {
    const panel = document.getElementById('node-info-panel');
    if (panel) {
        panel.classList.add('hidden');
    }
}

// Show map statistics overlay
function showMapStatsOverlay() {
    const overlay = document.getElementById('map-stats-overlay');
    if (overlay) {
        overlay.classList.remove('hidden');
        updateVisibleNodesCount();
    }
}

// Update visible nodes count
function updateVisibleNodesCount() {
    const countElement = document.getElementById('visible-nodes-count');
    if (countElement) {
        const visibleCount = mapMarkers.filter(m => m.visible).length;
        countElement.textContent = visibleCount.toLocaleString();
    }
}

// Update active filter display
function updateActiveFilterDisplay(filterName) {
    const filterElement = document.getElementById('active-filter');
    if (filterElement) {
        filterElement.textContent = filterName;
    }
}

// Setup map event listeners
function setupMapEventListeners() {
    if (!tronNetworkMap) return;
    
    // Map view change events
    tronNetworkMap.on('zoomend moveend', function() {
        updateVisibleNodesCount();
    });
    
    // Click on map to hide info panel
    tronNetworkMap.on('click', function() {
        hideNodeInfoPanel();
    });
}

// Enhanced filter function for professional markers
function filterMapMarkers(filter) {
    currentFilter = filter;
    
    if (!window.markersLayer) return;
    
    mapMarkers.forEach(markerData => {
        const witness = markerData.witness;
        let show = false;
        
        switch (filter) {
            case 'all':
                show = true;
                break;
            case 'super-reps':
                show = witness.rank <= 27;
                break;
            case 'exchange':
                show = witness.location.type === 'exchange';
                break;
            case 'cloud':
                show = witness.location.type === 'cloud';
                break;
        }
        
        // Update marker visibility
        markerData.visible = show;
        
        if (show) {
            window.markersLayer.addLayer(markerData.marker);
        } else {
            window.markersLayer.removeLayer(markerData.marker);
        }
    });
    
    // Update filter display and counts
    const filterNames = {
        'all': 'All Nodes',
        'super-reps': 'Super Representatives', 
        'exchange': 'Exchanges',
        'cloud': 'Cloud Providers'
    };
    
    updateActiveFilterDisplay(filterNames[filter] || 'Unknown');
    updateVisibleNodesCount();
    
    console.log(`🔍 Filtered map to show: ${filter} (${mapMarkers.filter(m => m.visible).length} nodes)`);
}

// Enhanced map controls setup
function setupMapControls() {
    const controls = [
        { id: 'show-all-nodes', filter: 'all' },
        { id: 'show-super-reps', filter: 'super-reps' },
        { id: 'show-exchanges', filter: 'exchange' },
        { id: 'show-cloud', filter: 'cloud' }
    ];
    
    controls.forEach(control => {
        const button = document.getElementById(control.id);
        if (button) {
            button.addEventListener('click', () => {
                filterMapMarkers(control.filter);
                updateActiveButton(control.id);
            });
        }
    });
    
    // Additional controls
    const resetButton = document.getElementById('reset-view');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            if (tronNetworkMap) {
                tronNetworkMap.setView([20, 0], 2);
            }
        });
    }
    
    const toggleLabelsButton = document.getElementById('toggle-labels');
    if (toggleLabelsButton) {
        toggleLabelsButton.addEventListener('click', () => {
            toggleNodeLabels();
        });
    }
    
    const clusterButton = document.getElementById('cluster-nodes');
    if (clusterButton) {
        clusterButton.addEventListener('click', () => {
            toggleClustering();
        });
    }
}

// Fallback to basic map if Leaflet fails
function fallbackToBasicMap(witnesses, loadingOverlay) {
    console.log('⚠️ Falling back to basic map implementation');
    
    const mapContainer = document.getElementById('tron-world-map');
    if (!mapContainer) return;
    
    mapContainer.innerHTML = `
        <div class="w-full h-full bg-gradient-to-br from-tron-black via-tron-dark to-tron-gray flex items-center justify-center">
            <div class="text-center">
                <i class="fas fa-globe-americas text-tron-red text-6xl mb-4 animate-pulse"></i>
                <h3 class="text-xl font-bold text-tron-light mb-2">TRON Network Overview</h3>
                <p class="text-gray-300 text-sm mb-4">Interactive map temporarily unavailable</p>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div class="bg-tron-black/50 p-3 rounded-lg">
                        <div class="text-tron-red font-bold">${witnesses.filter(w => w.rank <= 27).length}</div>
                        <div class="text-gray-400">Super Representatives</div>
                    </div>
                    <div class="bg-tron-black/50 p-3 rounded-lg">
                        <div class="text-tron-light font-bold">${witnesses.length}</div>
                        <div class="text-gray-400">Total Validators</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

// Focus on specific node (called from popup)
function focusOnNode(address) {
    const markerData = mapMarkers.find(m => m.witness.address === address);
    if (markerData && tronNetworkMap) {
        const lat = markerData.witness.location.lat;
        const lng = markerData.witness.location.lng;
        tronNetworkMap.setView([lat, lng], 6);
        markerData.marker.openPopup();
    }
}

// Toggle node labels (placeholder for future enhancement)
function toggleNodeLabels() {
    console.log('🏷️ Toggle labels feature - coming soon');
}

// Toggle clustering (placeholder for future enhancement)  
function toggleClustering() {
    console.log('🔗 Toggle clustering feature - coming soon');
}

// Show detailed node information (placeholder for future enhancement)
function showDetailedNodeInfo(witness) {
    console.log('📋 Detailed node info for:', witness.name);
    // Could open a modal or sidebar with detailed information
}

// Format large numbers for better readability
function formatLargeNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
}

console.log('🗺️ Professional TRON Network Map functionality loaded!');