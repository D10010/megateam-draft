// public/static/app.js - Full Refactored Version
let mapLoaded = false;
let allMarkers = [];
let filteredNodes = [];
let map; // Global map instance

// Deep flatten for dotted keys (e.g., tps.current → tps: 45)
function deepFlatten(obj, prefix = '') {
  const flat = {};
  for (const [k, v] of Object.entries(obj || {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      Object.assign(flat, deepFlatten(v, key));
    } else {
      flat[k] = v; // Top-level too
    }
  }
  return flat;
}

// Format values (numbers to K/M, % for changes)
function formatValue(val) {
  if (typeof val === 'number') {
    if (val >= 1e9) return (val / 1e9).toFixed(1) + 'B';
    if (val >= 1e6) return (val / 1e6).toFixed(1) + 'M';
    if (val >= 1e3) return (val / 1e3).toFixed(1) + 'K';
    if (val < 1 && val > 0) return val.toFixed(2);
    return val.toLocaleString();
  }
  return val || '--';
}

// Cached fetch with logs
async function cachedFetch(url, ttl = 30000) {
  console.log('🔍 Fetch start:', url);
  const cacheKey = `tron_${btoa(url)}`;
  let cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    const { data, ts } = JSON.parse(cached);
    if (Date.now() - ts < ttl) {
      console.log('✅ Cache hit');
      return data;
    }
  }
  try {
    const res = await fetch(url);
    console.log('📡 Response:', res.status, res.ok ? 'OK' : 'FAIL');
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    console.log('📦 Raw shape:', Object.keys(data));
    const toCache = { data, ts: Date.now() };
    sessionStorage.setItem(cacheKey, JSON.stringify(toCache));
    return data;
  } catch (e) {
    console.error('❌ Fetch error:', e);
    return null;
  }
}

// Load & assign stats
async function loadTRONStats() {
  const data = await cachedFetch('/api/tron/dashboard');
  let allData = {};
  if (data && Object.keys(data).length > 0) {
    allData = deepFlatten(data);
    console.log('🔍 Flattened keys:', Object.keys(allData));
  } else {
    // Force full mocks
    allData = {
      tps: 45, block: 75850596, transactions24h: 9124874, volume24h: 35000000000,
      trxPrice: 0.341, usdtVolume: 35000000000, totalAccounts: 300000000,
      totalValidators: 427, superReps: 27, continents: 7, exchanges: 200, independent: 200
    };
    console.log('🔄 Full mocks assigned');
  }

  const statSelectors = {
    'tps': { selector: '.stat-tps', key: 'current' }, // From tps.current
    'block': { selector: '.stat-block', key: 'height' }, // From block.height
    'txns-24h': { selector: '.stat-txns-24h', key: 'today' }, // From transactions.today
    'volume-24h': { selector: '.stat-volume-24h', key: 'usdtVolume' }, // From transactions.usdtVolume
    'trx-price': { selector: '.stat-trx-price', key: 'price' }, // From price.price
    'usdt-volume': { selector: '.stat-usdt-volume', key: 'usdtVolume' },
    'total-accounts': { selector: '.stat-accounts', key: 'totalAccounts' }, // From accounts.totalAccounts
    'total-validators': { selector: '.stat-validators', key: 'totalValidators' },
    'super-reps': { selector: '.stat-super-reps', key: 'superReps' },
    'continents': { selector: '.stat-continents', key: 'continents' },
    'exchanges': { selector: '.stat-exchanges', key: 'exchanges' },
    'independent': { selector: '.stat-independent', key: 'independent' }
  };

  Object.entries(statSelectors).forEach(([id, { selector, key }]) => {
    const el = document.querySelector(selector);
    if (!el) return console.warn(`No ${selector}`);
    const value = allData[key];
    el.textContent = value !== undefined ? formatValue(value) : '--';
    el.classList.remove('loading');
    el.classList.add('loaded');
    console.log(`✅ Assigned ${id}: ${value || '--'}`);
  });
}

// Map init
async function initLeafletMap() {
  const mapEl = document.getElementById('validator-map');
  if (!mapEl) return console.warn('Map el missing');
  mapEl.style.height = '600px';
  map = L.map(mapEl).setView([1.3521, 103.8198], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  const data = await cachedFetch('/api/stats?type=supernode') || { data: [] };
  allMarkers = [];
  const nodes = data.data || [];
  nodes.forEach(node => {
    const [lat, lng] = getGeo(node);
    if (lat && lng && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
      const popup = `<b>${node.name || 'SR'}</b><br>Type: ${node.type || 'Super Rep'}<br>Site: <a href="${node.url || '#'}" target="_blank">Link</a>`;
      const marker = L.marker([lat, lng]).bindPopup(popup);
      allMarkers.push({ marker, type: node.type || 'Super Rep' });
    }
  });
  filteredNodes = [...allMarkers];
  updateMapMarkers(map, filteredNodes);
  if (allMarkers.length === 0) addDemoMarkers(map);
  console.log(`🎯 Plotted ${filteredNodes.length} nodes`);
  mapEl.parentElement.classList.remove('initializing');
  mapEl.parentElement.classList.add('loaded');
}

function getGeo(node) {
  return [parseFloat(node.latitude || node.lat || node.location?.lat), parseFloat(node.longitude || node.lng || node.location?.lng)];
}

function updateMapMarkers(map, nodes) {
  map.eachLayer(layer => { if (layer instanceof L.Marker) map.removeLayer(layer); });
  nodes.forEach(({ marker }) => marker.addTo(map));
  console.log(`🔄 Updated ${nodes.length} markers`);
}

function addDemoMarkers(map) {
  const demos = [
    { lat: 1.3521, lng: 103.8198, name: 'Singapore Hub' },
    { lat: 37.7749, lng: -122.4194, name: 'SF Hub' },
    { lat: 35.9375, lng: 14.3754, name: 'Malta Exchange' }
  ];
  demos.forEach(d => L.marker([d.lat, d.lng]).addTo(map).bindPopup(d.name));
}

function bindFilters() {
  const filters = {
    'all': () => allMarkers,
    'super-reps': () => allMarkers.filter(n => n.type === 'Super Rep'),
    'exchanges': () => allMarkers.filter(n => n.type === 'Exchange'),
    'cloud': () => allMarkers.filter(n => n.type === 'Cloud')
  };
  document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
      const type = button.dataset.filter || 'all';
      console.log(`📍 Filter: ${type}`);
      filteredNodes = filters[type]() || allMarkers;
      updateMapMarkers(map, filteredNodes);
      document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
  console.log('🔗 Filters bound');
}

// Initialize AOS animations
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      anchorPlacement: 'top-bottom'
    });
  }
}

// Initialize Matrix Rain Effect
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const characters = '10101010TRONMEGATEAM';
  const fontSize = 10;
  const columns = canvas.width / fontSize;
  const drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#FF060A';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = characters[Math.floor(Math.random() * characters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 33);
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Initialize Cyber Effects
function initCyberEffects() {
  // Add cyber glow to buttons
  document.querySelectorAll('button, .btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.boxShadow = '0 0 20px rgba(255, 6, 10, 0.5)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.boxShadow = '';
    });
  });
}

// Initialize Particle System
function initParticleSystem() {
  // Simple particle system for background
  const particles = [];
  const numParticles = 50;
  
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5
    });
  }
  
  function animateParticles() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
      if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
    });
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
  }
}

// Smooth scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
        }
      }
    });
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready');
  
  // Initialize all components
  initAOS();
  initMatrixRain();
  initCyberEffects();
  initParticleSystem();
  initMobileMenu();
  initSmoothScrolling();
  
  // Load stats first
  loadTRONStats();
  setInterval(loadTRONStats, 30000); // Refresh every 30 seconds
  
  // Initialize map with intersection observer
  const container = document.querySelector('.map-container');
  if (container) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMap();
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: '200px' });
    observer.observe(container);
  } else {
    loadMap(); // Force if no container
  }
  
  // Bind filters after map loads
  setTimeout(bindFilters, 1500);
});

function loadMap() {
  if (mapLoaded) return;
  mapLoaded = true;
  
  // Check if Leaflet is already loaded
  if (typeof L !== 'undefined') {
    console.log('📄 Leaflet already loaded');
    initLeafletMap().then(() => console.log('🗺️ Map ready'));
    return;
  }
  
  // Load Leaflet dynamically
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  script.onload = () => {
    console.log('📄 Leaflet loaded');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    initLeafletMap().then(() => console.log('🗺️ Map ready'));
  };
  script.onerror = () => console.error('Leaflet fail');
  document.head.appendChild(script);
}