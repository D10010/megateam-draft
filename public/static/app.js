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
            usdtVolume: 330000000 + Math.floor(Math.random() * 50000000), // ~$330-380M daily volume
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