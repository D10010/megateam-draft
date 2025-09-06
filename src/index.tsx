import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'
import { renderer } from './renderer'

const app = new Hono()

// Enable CORS for API endpoints
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))

app.use(renderer)

// Main landing page
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
              <span class="text-2xl font-orbitron font-bold tracking-wider">
                TRON <span class="text-transparent bg-clip-text bg-tron-gradient">MEGATEAM</span>
              </span>
            </div>
            <div class="hidden md:flex items-center space-x-8">
              <a href="#mission" class="font-rajdhani font-medium text-tron-silver hover:text-tron-red transition-all duration-300 hover:glow-text relative group">
                Mission
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-tron-red transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#objectives" class="font-rajdhani font-medium text-tron-silver hover:text-tron-red transition-all duration-300 hover:glow-text relative group">
                Objectives
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-tron-red transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#structure" class="font-rajdhani font-medium text-tron-silver hover:text-tron-red transition-all duration-300 hover:glow-text relative group">
                Structure
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-tron-red transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#roadmap" class="font-rajdhani font-medium text-tron-silver hover:text-tron-red transition-all duration-300 hover:glow-text relative group">
                Roadmap
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-tron-red transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button class="relative overflow-hidden bg-gradient-to-r from-tron-red via-tron-light to-tron-red bg-[length:200%_100%] hover:bg-right-bottom px-6 py-2 rounded-lg font-rajdhani font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-tron-red/50 border border-tron-red/50">
                <span class="relative z-10 text-tron-white">Join MEGATEAM</span>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
            <button class="md:hidden text-tron-red text-xl hover:text-tron-light transition-colors" id="mobile-menu-btn">
              <i class="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Animated Background */}
        <div class="absolute inset-0 bg-gradient-to-br from-tron-red/20 via-tron-black via-tron-gray/10 to-tron-red/15"></div>
        
        {/* TRON Holographic Overlay */}
        <div class="absolute inset-0 bg-tron-holographic opacity-5 animate-hologram"></div>
        
        {/* TRON Scan Lines */}
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute w-full h-0.5 bg-tron-red opacity-30 animate-cyber-scan"></div>
        </div>
        
        {/* 3D Geometric Elements with TRON Colors */}
        <div class="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-tron-red/20 rotate-45 animate-rotate-3d"></div>
        <div class="absolute bottom-1/4 right-1/4 w-48 h-48 border-2 border-tron-light/20 rotate-12 animate-float"></div>
        
        <div class="container mx-auto px-6 text-center relative z-20" data-aos="fade-up">
          <div class="mb-8 relative">
            <div class="relative inline-block">
              <i class="fas fa-rocket text-6xl text-transparent bg-clip-text bg-tron-gradient"></i>
              <div class="absolute inset-0 fas fa-rocket text-6xl text-tron-red blur-lg opacity-30"></div>
            </div>
            <div class="absolute -inset-4 bg-tron-red/5 rounded-full blur-xl animate-pulse"></div>
          </div>
          
          <h1 class="text-5xl md:text-8xl font-orbitron font-black mb-8 leading-tight tracking-wider">
            <span class="inline-block transform hover:scale-105 transition-transform duration-300 text-tron-white">Build</span>{" "}
            <span class="text-transparent bg-clip-text bg-tron-gradient">Everywhere</span>
            <br />
            <span class="inline-block transform hover:scale-105 transition-transform duration-300 text-tron-white">Earn</span>{" "}
            <span class="text-transparent bg-clip-text bg-tron-holographic animate-hologram">Anywhere</span>
            <br />
            <span class="text-tron-silver font-black">Together on </span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-tron-red via-tron-light to-tron-dark-red relative">
              TRON
              <span class="absolute inset-0 text-tron-red blur-sm opacity-30">TRON</span>
            </span>
          </h1>
          
          <div class="relative mb-12">
            <p class="text-xl md:text-2xl text-tron-light-gray max-w-5xl mx-auto leading-relaxed font-exo font-light">
              <span class="text-tron-red font-medium">Initialize</span> the largest, most inclusive builder movement in crypto history. 
              <span class="text-tron-light font-medium">Connect</span> with global communities to create, educate, and prosper on TRON's 
              <span class="text-tron-silver font-medium">superior</span>, profitable, and sustainable foundation.
            </p>
            <div class="absolute -inset-2 bg-gradient-to-r from-transparent via-tron-red/10 to-transparent rounded-lg blur-sm opacity-30"></div>
          </div>
          
          <div class="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button class="group relative overflow-hidden bg-gradient-to-r from-tron-red via-tron-light to-tron-dark-red bg-[length:200%_100%] hover:bg-right-bottom px-10 py-5 rounded-xl text-xl font-orbitron font-bold transition-all duration-700 transform hover:scale-110 hover:rotate-1 border-2 border-tron-red/50 shadow-lg hover:shadow-2xl hover:shadow-tron-red/30">
              <span class="relative z-10 flex items-center text-tron-white">
                <i class="fas fa-play mr-3 animate-pulse"></i>
                <span>Initialize Protocol</span>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div class="absolute -inset-1 bg-tron-gradient rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </button>
            
            <button class="group relative overflow-hidden border-2 border-tron-red bg-transparent hover:bg-tron-red/10 px-10 py-5 rounded-xl text-xl font-orbitron font-bold transition-all duration-500 transform hover:scale-105 hover:-rotate-1 hover:shadow-lg hover:shadow-tron-red/30">
              <span class="relative z-10 flex items-center text-tron-red group-hover:text-tron-light">
                <i class="fas fa-download mr-3 animate-bounce"></i>
                <span>Access Documentation</span>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-tron-red/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
          
          {/* Floating Data Particles with TRON Colors */}
          <div class="absolute inset-0 pointer-events-none">
            <div class="absolute top-20 left-20 w-2 h-2 bg-tron-red rounded-full animate-float opacity-60" style="animation-delay: 0s;"></div>
            <div class="absolute top-40 right-32 w-1 h-1 bg-tron-light rounded-full animate-float opacity-80" style="animation-delay: 1s;"></div>
            <div class="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-tron-silver rounded-full animate-float opacity-70" style="animation-delay: 2s;"></div>
            <div class="absolute bottom-20 right-1/4 w-1 h-1 bg-tron-dark-red rounded-full animate-float opacity-60" style="animation-delay: 3s;"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section class="py-20 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-tron-black via-tron-gray/50 to-tron-black"></div>
        <div class="absolute inset-0 tron-grid opacity-20"></div>
        
        <div class="container mx-auto px-6 relative z-10">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center cyber-card p-8 rounded-xl" data-aos="fade-up" data-aos-delay="100">
              <div class="text-5xl font-orbitron font-black text-transparent bg-clip-text bg-tron-gradient mb-4 stat-glow" id="stat-hubs">40</div>
              <div class="text-tron-red font-rajdhani font-medium uppercase tracking-wider">Regional Hubs</div>
              <div class="w-full h-0.5 bg-gradient-to-r from-transparent via-tron-red to-transparent mt-2 opacity-50"></div>
            </div>
            
            <div class="text-center cyber-card p-8 rounded-xl" data-aos="fade-up" data-aos-delay="200">
              <div class="text-5xl font-orbitron font-black text-transparent bg-clip-text bg-tron-gradient mb-4 stat-glow" id="stat-squads">150</div>
              <div class="text-tron-light font-rajdhani font-medium uppercase tracking-wider">City Squads</div>
              <div class="w-full h-0.5 bg-gradient-to-r from-transparent via-tron-light to-transparent mt-2 opacity-50"></div>
            </div>
            
            <div class="text-center cyber-card p-8 rounded-xl" data-aos="fade-up" data-aos-delay="300">
              <div class="text-5xl font-orbitron font-black text-transparent bg-clip-text bg-tron-gradient mb-4 stat-glow" id="stat-deliverables">3,000+</div>
              <div class="text-tron-silver font-rajdhani font-medium uppercase tracking-wider">Funded Deliverables</div>
              <div class="w-full h-0.5 bg-gradient-to-r from-transparent via-tron-silver to-transparent mt-2 opacity-50"></div>
            </div>
            
            <div class="text-center cyber-card p-8 rounded-xl" data-aos="fade-up" data-aos-delay="400">
              <div class="text-5xl font-orbitron font-black text-transparent bg-clip-text bg-tron-gradient mb-4 stat-glow" id="stat-funding">$40M</div>
              <div class="text-tron-dark-red font-rajdhani font-medium uppercase tracking-wider">TRX Funding</div>
              <div class="w-full h-0.5 bg-gradient-to-r from-transparent via-tron-dark-red to-transparent mt-2 opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" class="py-20 relative">
        <div class="absolute inset-0 bg-gradient-to-b from-tron-black via-tron-gray/30 to-tron-black"></div>
        
        <div class="container mx-auto px-6 relative z-10">
          <div class="text-center mb-16" data-aos="fade-up">
            <h2 class="text-5xl md:text-6xl font-orbitron font-black mb-8">
              Our <span class="text-transparent bg-clip-text bg-tron-gradient">Mission</span>
            </h2>
            <div class="w-32 h-1 bg-gradient-to-r from-transparent via-tron-red to-transparent mx-auto mb-8"></div>
          </div>
          
          <div class="max-w-5xl mx-auto text-center mb-16" data-aos="fade-up" data-aos-delay="200">
            <div class="cyber-card p-12 rounded-2xl relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-tron-red/5 via-transparent to-tron-light/5"></div>
              <blockquote class="text-2xl md:text-3xl font-exo font-light leading-relaxed text-tron-light-gray relative z-10">
                <span class="text-tron-red text-4xl">"</span>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-tron-white via-tron-silver to-tron-light">
                  TRON MEGATEAM exists to ignite the largest, most inclusive builder movement in crypto history
                </span>
                —uniting global communities to create, educate, and prosper on TRON's 
                <span class="text-tron-silver font-medium">superior</span>, 
                <span class="text-tron-light font-medium">profitable</span>, and 
                <span class="text-tron-red font-medium">sustainable</span> foundation.
                <span class="text-tron-red text-4xl">"</span>
              </blockquote>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-12">
            <div class="cyber-card p-8 rounded-xl" data-aos="fade-right">
              <div class="flex items-center mb-6">
                <div class="relative">
                  <i class="fas fa-globe text-3xl text-tron-red"></i>
                  <div class="absolute inset-0 fas fa-globe text-3xl text-tron-red blur-sm opacity-25"></div>
                </div>
                <h3 class="text-2xl font-orbitron font-bold ml-4 text-tron-red">
                  Global Scale
                </h3>
              </div>
              <p class="text-tron-light-gray leading-relaxed font-exo">
                From <span class="text-tron-silver">Lagos</span> to <span class="text-tron-light">Lima</span>, 
                <span class="text-tron-red">Berlin</span> to <span class="text-tron-silver">Bangalore</span>, 
                <span class="text-tron-red">Boston</span> to <span class="text-tron-light">San Francisco</span>—MEGATEAM launches 
                hubs and city squads that speak the local language, host IRL hack-nights, and funnel 
                micro-grants directly to grassroots talent.
              </p>
              <div class="w-full h-0.5 bg-gradient-to-r from-transparent via-tron-red to-transparent mt-4 opacity-50"></div>
            </div>
            
            <div class="cyber-card p-8 rounded-xl" data-aos="fade-left">
              <div class="flex items-center mb-6">
                <div class="relative">
                  <i class="fas fa-coins text-3xl text-tron-light"></i>
                  <div class="absolute inset-0 fas fa-coins text-3xl text-tron-light blur-sm opacity-25"></div>
                </div>
                <h3 class="text-2xl font-orbitron font-bold ml-4 text-tron-light">
                  Builder-First Economics
                </h3>
              </div>
              <p class="text-tron-light-gray leading-relaxed font-exo">
                With the industry's deepest <span class="text-tron-silver">bounty & grant engine</span>, 
                contributors earn real <span class="text-tron-red font-medium">TRX/USDT</span> 
                for shipping code, content, art, or events—turning 
                <span class="text-tron-light">passion</span> into <span class="text-tron-silver">sustainable income</span>.
              </p>
              <div class="w-full h-0.5 bg-gradient-to-r from-transparent via-tron-light to-transparent mt-4 opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Narrative */}
      <section class="py-20 bg-tron-gray/30">
        <div class="container mx-auto px-6">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold text-center mb-16" data-aos="fade-up">
              Why <span class="text-tron-red">TRON</span>?
            </h2>
            
            <div class="text-lg leading-relaxed text-gray-300 mb-12" data-aos="fade-up">
              <p class="mb-6">
                Since Bitcoin's genesis, enthusiasts have dreamed of a network that is accessible, 
                low-cost, lightning-fast, and profitable for builders at every level. 
                <span class="text-white font-semibold">TRON quietly became that network</span>—powering 
                more USDT transfers than any chain on earth, leading in stablecoin velocity, and 
                delivering an unparalleled energy-rental model that lets developers run at near-zero gas cost.
              </p>
              <p class="text-xl font-semibold text-tron-red">Yet billions still don't know that story.</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="bg-black/50 p-6 rounded-lg border border-tron-red/20" data-aos="fade-up" data-aos-delay="100">
                <i class="fas fa-shield-alt text-tron-red text-3xl mb-4"></i>
                <h3 class="text-xl font-bold mb-3">Radical Accountability</h3>
                <p class="text-gray-300">A Guardian corps of vetted experts verifies every milestone on-chain, so capital flows only when value is delivered.</p>
              </div>
              
              <div class="bg-black/50 p-6 rounded-lg border border-tron-red/20" data-aos="fade-up" data-aos-delay="200">
                <i class="fas fa-graduation-cap text-tron-red text-3xl mb-4"></i>
                <h3 class="text-xl font-bold mb-3">Education as Fuel</h3>
                <p class="text-gray-300">Multilingual media studio drops bite-sized tutorials, long-form explainers, and live workshops—demystifying DeFi, NFTs, gaming, and AI integrations.</p>
              </div>
              
              <div class="bg-black/50 p-6 rounded-lg border border-tron-red/20" data-aos="fade-up" data-aos-delay="300">
                <i class="fas fa-chart-line text-tron-red text-3xl mb-4"></i>
                <h3 class="text-xl font-bold mb-3">Profit With Purpose</h3>
                <p class="text-gray-300">By amplifying TRON's fundamentals—low fees, stablecoin dominance, and cross-chain tooling—MEGATEAM ensures builders not only learn but earn.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section id="objectives" class="py-20">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold text-center mb-16" data-aos="fade-up">
            Year-1 <span class="text-tron-red">Objectives</span>
          </h2>
          
          <div class="max-w-6xl mx-auto">
            <div class="grid gap-8">
              {/* Scale */}
              <div class="border border-tron-red/30 rounded-lg p-8 bg-black/30" data-aos="fade-right">
                <div class="flex items-center mb-4">
                  <i class="fas fa-expand-arrows-alt text-tron-red text-2xl mr-4"></i>
                  <h3 class="text-2xl font-bold">Scale</h3>
                </div>
                <p class="text-gray-300 mb-4">Stage the largest community activation in crypto history.</p>
                <div class="flex flex-wrap gap-4 text-sm">
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">Regional Hubs</span>
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">City Squads</span>
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">Funded Deliverables</span>
                </div>
              </div>

              {/* Education */}
              <div class="border border-tron-red/30 rounded-lg p-8 bg-black/30" data-aos="fade-left">
                <div class="flex items-center mb-4">
                  <i class="fas fa-book-open text-tron-red text-2xl mr-4"></i>
                  <h3 class="text-2xl font-bold">Education</h3>
                </div>
                <p class="text-gray-300 mb-4">Make TRON fundamentals common knowledge on every continent.</p>
                <div class="flex flex-wrap gap-4 text-sm">
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">Learning Assets</span>
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">Course Completions</span>
                </div>
              </div>

              {/* Economic Impact */}
              <div class="border border-tron-red/30 rounded-lg p-8 bg-black/30" data-aos="fade-right">
                <div class="flex items-center mb-4">
                  <i class="fas fa-dollar-sign text-tron-red text-2xl mr-4"></i>
                  <h3 class="text-2xl font-bold">Economic Impact</h3>
                </div>
                <p class="text-gray-300 mb-4">Put real earnings in the hands of global builders.</p>
                <div class="flex flex-wrap gap-4 text-sm">
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">USDT Funding</span>
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">TRX Funding</span>
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">Energy / Bandwidth</span>
                </div>
              </div>

              {/* Network Growth */}
              <div class="border border-tron-red/30 rounded-lg p-8 bg-black/30" data-aos="fade-left">
                <div class="flex items-center mb-4">
                  <i class="fas fa-network-wired text-tron-red text-2xl mr-4"></i>
                  <h3 class="text-2xl font-bold">Network Growth</h3>
                </div>
                <p class="text-gray-300 mb-4">Translate community energy into on-chain traction.</p>
                <div class="flex flex-wrap gap-4 text-sm">
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">Active Wallets Growth</span>
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">Flagship dApps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structure Section */}
      <section id="structure" class="py-20 bg-tron-gray/30">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold text-center mb-16" data-aos="fade-up">
            Governance <span class="text-tron-red">Structure</span>
          </h2>
          
          <div class="max-w-4xl mx-auto">
            <div class="bg-black/50 rounded-lg p-8 border border-tron-red/20" data-aos="fade-up">
              <div class="text-center mb-8">
                <i class="fas fa-sitemap text-tron-red text-4xl mb-4"></i>
                <h3 class="text-2xl font-bold">Hybrid Governance Model</h3>
                <p class="text-gray-300 mt-4">Combining TRON DAO oversight with grassroots community leadership</p>
              </div>
              
              <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center">
                  <i class="fas fa-crown text-tron-red text-2xl mb-3"></i>
                  <h4 class="font-bold mb-2">Global Council</h4>
                  <p class="text-sm text-gray-400">Strategic oversight and program direction</p>
                </div>
                
                <div class="text-center">
                  <i class="fas fa-users text-tron-red text-2xl mb-3"></i>
                  <h4 class="font-bold mb-2">Regional Hubs</h4>
                  <p class="text-sm text-gray-400">20 regional leads managing local squads</p>
                </div>
                
                <div class="text-center">
                  <i class="fas fa-shield-alt text-tron-red text-2xl mb-3"></i>
                  <h4 class="font-bold mb-2">Guardian Committee</h4>
                  <p class="text-sm text-gray-400">Independent audits of bounties and grants</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section class="py-20">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold text-center mb-16" data-aos="fade-up">
            MEGATEAM <span class="text-tron-red">Platform</span>
          </h2>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div class="bg-tron-gray/30 p-6 rounded-lg border border-tron-red/20" data-aos="fade-up" data-aos-delay="100">
              <i class="fas fa-tasks text-tron-red text-3xl mb-4"></i>
              <h3 class="text-xl font-bold mb-3">Unified Opportunities</h3>
              <p class="text-gray-300">Discover bounties, grants, and quests all in one place. Filter by category, type, and reward amount.</p>
            </div>
            
            <div class="bg-tron-gray/30 p-6 rounded-lg border border-tron-red/20" data-aos="fade-up" data-aos-delay="200">
              <i class="fas fa-user-circle text-tron-red text-3xl mb-4"></i>
              <h3 class="text-xl font-bold mb-3">Builder Profiles</h3>
              <p class="text-gray-300">Track your contributions, earned rewards, and build your reputation with badges and levels.</p>
            </div>
            
            <div class="bg-tron-gray/30 p-6 rounded-lg border border-tron-red/20" data-aos="fade-up" data-aos-delay="300">
              <i class="fas fa-wallet text-tron-red text-3xl mb-4"></i>
              <h3 class="text-xl font-bold mb-3">Instant Payouts</h3>
              <p class="text-gray-300">Receive TRX, USDD, or other TRON tokens directly to your wallet upon task completion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" class="py-20 bg-tron-gray/30">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-bold text-center mb-16" data-aos="fade-up">
            Launch <span class="text-tron-red">Roadmap</span>
          </h2>
          
          <div class="max-w-4xl mx-auto">
            <div class="space-y-8">
              {/* Phase 1 */}
              <div class="flex items-start gap-6" data-aos="fade-right">
                <div class="bg-tron-red text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 class="text-2xl font-bold mb-2">Preparation & Core Design</h3>
                  <p class="text-gray-300 mb-2">Month 1</p>
                  <p class="text-gray-400">Define detailed scope, secure TRONDAO approval, finalize framework and budget allocation.</p>
                </div>
              </div>

              {/* Phase 2 */}
              <div class="flex items-start gap-6" data-aos="fade-left">
                <div class="bg-tron-red text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 class="text-2xl font-bold mb-2">Platform Development</h3>
                  <p class="text-gray-300 mb-2">Months 2-3</p>
                  <p class="text-gray-400">Build MEGATEAM web portal with bounty listings, submission system, and smart contract integration.</p>
                </div>
              </div>

              {/* Phase 3 */}
              <div class="flex items-start gap-6" data-aos="fade-right">
                <div class="bg-tron-red text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 class="text-2xl font-bold mb-2">Guardian Onboarding</h3>
                  <p class="text-gray-300 mb-2">Month 3</p>
                  <p class="text-gray-400">Recruit and train Guardian reviewers, establish evaluation criteria and accountability systems.</p>
                </div>
              </div>

              {/* Phase 4 */}
              <div class="flex items-start gap-6" data-aos="fade-left">
                <div class="bg-tron-red text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 class="text-2xl font-bold mb-2">Pilot Launch</h3>
                  <p class="text-gray-300 mb-2">Month 4</p>
                  <p class="text-gray-400">Soft launch with select bounties to test platform functionality and gather community feedback.</p>
                </div>
              </div>

              {/* Phase 5 */}
              <div class="flex items-start gap-6" data-aos="fade-right">
                <div class="bg-tron-red text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 class="text-2xl font-bold mb-2">Full Public Launch</h3>
                  <p class="text-gray-300 mb-2">Month 6</p>
                  <p class="text-gray-400">Official launch to entire TRON community with full bounty and grant programs.</p>
                </div>
              </div>
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
              <button class="bg-tron-red hover:bg-red-700 px-8 py-4 rounded-lg text-xl font-bold transition-all transform hover:scale-105">
                <i class="fas fa-rocket mr-3"></i>Join MEGATEAM
              </button>
              <button class="border border-tron-red text-tron-red hover:bg-tron-red hover:text-white px-8 py-4 rounded-lg text-xl font-bold transition-all">
                <i class="fas fa-file-alt mr-3"></i>Read Documentation
              </button>
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
            <div class="flex space-x-6">
              <a href="#" class="text-gray-400 hover:text-tron-red transition-colors">
                <i class="fab fa-twitter text-2xl"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-tron-red transition-colors">
                <i class="fab fa-discord text-2xl"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-tron-red transition-colors">
                <i class="fab fa-telegram text-2xl"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-tron-red transition-colors">
                <i class="fab fa-github text-2xl"></i>
              </a>
            </div>
          </div>
          <div class="text-center mt-6 pt-6 border-t border-gray-700">
            <p class="text-gray-400">
              © 2024 TRON MEGATEAM. Prepared by Dylan Gillis (SunnyD). 
              <span class="text-tron-red">Building the future, together.</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
})

export default app
