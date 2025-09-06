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
      <nav class="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-tron-red/20">
        <div class="container mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <i class="fas fa-rocket text-tron-red text-2xl"></i>
              <span class="text-2xl font-bold">TRON <span class="text-tron-red">MEGATEAM</span></span>
            </div>
            <div class="hidden md:flex items-center space-x-8">
              <a href="#mission" class="hover:text-tron-red transition-colors">Mission</a>
              <a href="#objectives" class="hover:text-tron-red transition-colors">Objectives</a>
              <a href="#structure" class="hover:text-tron-red transition-colors">Structure</a>
              <a href="#roadmap" class="hover:text-tron-red transition-colors">Roadmap</a>
              <button class="bg-tron-red hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-colors">
                Join MEGATEAM
              </button>
            </div>
            <button class="md:hidden text-tron-red text-xl" id="mobile-menu-btn">
              <i class="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div class="absolute inset-0 bg-gradient-to-br from-tron-red/10 via-black to-tron-gray/20"></div>
        <div class="container mx-auto px-6 text-center relative z-10" data-aos="fade-up">
          <div class="mb-8">
            <i class="fas fa-rocket text-tron-red text-6xl mb-6 animate-bounce-slow"></i>
          </div>
          <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Build Everywhere.<br />
            Earn Anywhere.<br />
            <span class="text-tron-red">Together on TRON.</span>
          </h1>
          <p class="text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Join the largest, most inclusive builder movement in crypto history. 
            Unite with global communities to create, educate, and prosper on TRON's 
            superior, profitable, and sustainable foundation.
          </p>
          <div class="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button class="bg-tron-red hover:bg-red-700 px-8 py-4 rounded-lg text-xl font-bold transition-all transform hover:scale-105">
              <i class="fas fa-play mr-3"></i>Start Building Now
            </button>
            <button class="border border-tron-red text-tron-red hover:bg-tron-red hover:text-white px-8 py-4 rounded-lg text-xl font-bold transition-all">
              <i class="fas fa-download mr-3"></i>Read Full Proposal
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section class="py-20 bg-tron-gray/30">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div data-aos="fade-up" data-aos-delay="100">
              <div class="text-4xl font-bold text-tron-red mb-2" id="stat-hubs">40</div>
              <div class="text-gray-400">Regional Hubs</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <div class="text-4xl font-bold text-tron-red mb-2" id="stat-squads">150</div>
              <div class="text-gray-400">City Squads</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <div class="text-4xl font-bold text-tron-red mb-2" id="stat-deliverables">3,000+</div>
              <div class="text-gray-400">Funded Deliverables</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="400">
              <div class="text-4xl font-bold text-tron-red mb-2" id="stat-funding">$40M</div>
              <div class="text-gray-400">USDD Funding</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" class="py-20">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16" data-aos="fade-up">
            <h2 class="text-4xl md:text-5xl font-bold mb-6">
              Our <span class="text-tron-red">Mission</span>
            </h2>
            <div class="w-24 h-1 bg-tron-red mx-auto mb-8"></div>
          </div>
          
          <div class="max-w-4xl mx-auto text-center" data-aos="fade-up" data-aos-delay="200">
            <blockquote class="text-2xl md:text-3xl font-light italic leading-relaxed mb-12 text-gray-300">
              "TRON MEGATEAM exists to ignite the largest, most inclusive builder movement in crypto history—uniting global communities to create, educate, and prosper on the TRON blockchain's superior, profitable, and sustainable foundation."
            </blockquote>
          </div>

          <div class="grid md:grid-cols-2 gap-12 mt-16">
            <div data-aos="fade-right">
              <h3 class="text-2xl font-bold mb-6 text-tron-red">
                <i class="fas fa-globe mr-3"></i>Global Scale
              </h3>
              <p class="text-gray-300 leading-relaxed">
                From Lagos to Lima, Berlin to Bangalore, Boston to San Francisco—MEGATEAM launches 
                hubs and city squads that speak the local language, host IRL hack-nights, and funnel 
                micro-grants directly to grassroots talent.
              </p>
            </div>
            <div data-aos="fade-left">
              <h3 class="text-2xl font-bold mb-6 text-tron-red">
                <i class="fas fa-coins mr-3"></i>Builder-First Economics
              </h3>
              <p class="text-gray-300 leading-relaxed">
                With the industry's deepest bounty & grant engine, contributors earn real TRX/USDD 
                for shipping code, content, art, or events—turning passion into sustainable income.
              </p>
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
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">40 Regional Hubs</span>
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">150 City Squads</span>
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">3,000+ Funded Deliverables</span>
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
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">1,000 Learning Assets</span>
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">1M+ Course Completions</span>
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
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">≥ $40M USDD Paid Out</span>
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">Bounties & Grants</span>
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
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">+50% YoY Active Wallets</span>
                  <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full">+30 Flagship dApps</span>
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
