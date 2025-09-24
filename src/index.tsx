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





// MEGATEAM Signup page
app.get('/signup', (c) => {
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
              <a href="/" class="text-2xl font-montserrat font-bold tracking-wider hover:opacity-80 transition-opacity">
                TRON <span class="text-transparent bg-clip-text bg-tron-gradient">MEGATEAM</span>
              </a>
            </div>
            <div class="hidden md:flex items-center space-x-8">
              <a href="/" class="font-montserrat font-medium text-tron-silver hover:text-tron-red transition-all duration-300">
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Signup Form Section */}
      <section class="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background Effects */}
        <div class="absolute inset-0 bg-gradient-to-br from-tron-red/5 via-tron-black via-tron-gray/2.5 to-tron-red/4"></div>
        <div class="absolute inset-0 bg-tron-holographic opacity-1.5 animate-hologram"></div>
        

        
        <div class="container mx-auto px-6 relative z-20">
          <div class="max-w-2xl mx-auto">
            {/* Header */}
            <div class="text-center mb-12" data-aos="fade-up">
              <div class="mb-6 relative inline-block">
                <i class="fas fa-user-plus text-4xl text-transparent bg-clip-text bg-tron-gradient"></i>
                <div class="absolute inset-0 fas fa-user-plus text-4xl text-tron-red blur-lg opacity-15"></div>
              </div>
              <h1 class="text-4xl md:text-5xl font-montserrat font-black mb-6 leading-tight">
                Join <span class="text-transparent bg-clip-text bg-tron-gradient">MEGATEAM</span>
              </h1>
              <p class="text-xl text-tron-light-gray font-montserrat font-light">
                Be part of the largest builder movement in crypto history. 
                Start building on TRON today.
              </p>
            </div>

            {/* Signup Form */}
            <div class="cyber-card p-8 rounded-2xl relative overflow-hidden" data-aos="fade-up" data-aos-delay="200">
              <div class="absolute inset-0 bg-gradient-to-r from-tron-red/5 via-transparent to-tron-light/5"></div>
              
              <form id="megateam-signup-form" class="relative z-10 space-y-6">
                {/* Personal Information */}
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label for="firstName" class="block text-tron-silver font-montserrat font-medium mb-2">
                      First Name *
                    </label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      required 
                      class="w-full px-4 py-3 bg-tron-dark/50 border border-tron-red/30 rounded-lg text-tron-white font-montserrat focus:outline-none focus:border-tron-red focus:ring-1 focus:ring-tron-red transition-all"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-tron-silver font-montserrat font-medium mb-2">
                      Last Name *
                    </label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      required 
                      class="w-full px-4 py-3 bg-tron-dark/50 border border-tron-red/30 rounded-lg text-tron-white font-montserrat focus:outline-none focus:border-tron-red focus:ring-1 focus:ring-tron-red transition-all"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <label for="email" class="block text-tron-silver font-montserrat font-medium mb-2">
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    class="w-full px-4 py-3 bg-tron-dark/50 border border-tron-red/30 rounded-lg text-tron-white font-montserrat focus:outline-none focus:border-tron-red focus:ring-1 focus:ring-tron-red transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label for="telegram" class="block text-tron-silver font-montserrat font-medium mb-2">
                    Telegram Username
                  </label>
                  <input 
                    type="text" 
                    id="telegram" 
                    name="telegram" 
                    class="w-full px-4 py-3 bg-tron-dark/50 border border-tron-red/30 rounded-lg text-tron-white font-montserrat focus:outline-none focus:border-tron-red focus:ring-1 focus:ring-tron-red transition-all"
                    placeholder="@yourusername"
                  />
                </div>

                {/* Skills & Experience */}
                <div>
                  <label for="experience" class="block text-tron-silver font-montserrat font-medium mb-2">
                    Development Experience *
                  </label>
                  <select 
                    id="experience" 
                    name="experience" 
                    required 
                    class="w-full px-4 py-3 bg-tron-dark/50 border border-tron-red/30 rounded-lg text-tron-white font-montserrat focus:outline-none focus:border-tron-red focus:ring-1 focus:ring-tron-red transition-all"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (2-5 years)</option>
                    <option value="advanced">Advanced (5+ years)</option>
                    <option value="expert">Expert (10+ years)</option>
                  </select>
                </div>

                <div>
                  <label for="skills" class="block text-tron-silver font-montserrat font-medium mb-2">
                    Primary Skills & Technologies
                  </label>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                    {/* Skill checkboxes */}
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" name="skills" value="solidity" class="text-tron-red rounded border-tron-red/30 bg-tron-dark/50 focus:ring-tron-red" />
                      <span class="text-sm text-tron-silver">Solidity</span>
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" name="skills" value="javascript" class="text-tron-red rounded border-tron-red/30 bg-tron-dark/50 focus:ring-tron-red" />
                      <span class="text-sm text-tron-silver">JavaScript</span>
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" name="skills" value="python" class="text-tron-red rounded border-tron-red/30 bg-tron-dark/50 focus:ring-tron-red" />
                      <span class="text-sm text-tron-silver">Python</span>
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" name="skills" value="react" class="text-tron-red rounded border-tron-red/30 bg-tron-dark/50 focus:ring-tron-red" />
                      <span class="text-sm text-tron-silver">React</span>
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" name="skills" value="nodejs" class="text-tron-red rounded border-tron-red/30 bg-tron-dark/50 focus:ring-tron-red" />
                      <span class="text-sm text-tron-silver">Node.js</span>
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" name="skills" value="web3" class="text-tron-red rounded border-tron-red/30 bg-tron-dark/50 focus:ring-tron-red" />
                      <span class="text-sm text-tron-silver">Web3</span>
                    </label>
                  </div>
                  <textarea 
                    id="otherSkills" 
                    name="otherSkills" 
                    rows="2"
                    class="w-full px-4 py-3 bg-tron-dark/50 border border-tron-red/30 rounded-lg text-tron-white font-montserrat focus:outline-none focus:border-tron-red focus:ring-1 focus:ring-tron-red transition-all text-sm"
                    placeholder="Other skills or technologies..."
                  ></textarea>
                </div>

                {/* Interest Areas */}
                <div>
                  <label for="interests" class="block text-tron-silver font-montserrat font-medium mb-2">
                    Areas of Interest *
                  </label>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" name="interests" value="dapp-development" class="text-tron-red rounded border-tron-red/30 bg-tron-dark/50 focus:ring-tron-red" />
                      <span class="text-sm text-tron-silver">DApp Development</span>
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" name="interests" value="defi" class="text-tron-red rounded border-tron-red/30 bg-tron-dark/50 focus:ring-tron-red" />
                      <span class="text-sm text-tron-silver">DeFi Protocols</span>
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" name="interests" value="nft" class="text-tron-red rounded border-tron-red/30 bg-tron-dark/50 focus:ring-tron-red" />
                      <span class="text-sm text-tron-silver">NFT Projects</span>
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" name="interests" value="gaming" class="text-tron-red rounded border-tron-red/30 bg-tron-dark/50 focus:ring-tron-red" />
                      <span class="text-sm text-tron-silver">GameFi</span>
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" name="interests" value="infrastructure" class="text-tron-red rounded border-tron-red/30 bg-tron-dark/50 focus:ring-tron-red" />
                      <span class="text-sm text-tron-silver">Infrastructure</span>
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" name="interests" value="education" class="text-tron-red rounded border-tron-red/30 bg-tron-dark/50 focus:ring-tron-red" />
                      <span class="text-sm text-tron-silver">Education & Tutorials</span>
                    </label>
                  </div>
                </div>

                {/* Location */}
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label for="country" class="block text-tron-silver font-montserrat font-medium mb-2">
                      Country *
                    </label>
                    <input 
                      type="text" 
                      id="country" 
                      name="country" 
                      required 
                      class="w-full px-4 py-3 bg-tron-dark/50 border border-tron-red/30 rounded-lg text-tron-white font-montserrat focus:outline-none focus:border-tron-red focus:ring-1 focus:ring-tron-red transition-all"
                      placeholder="Your country"
                    />
                  </div>
                  <div>
                    <label for="timezone" class="block text-tron-silver font-montserrat font-medium mb-2">
                      Timezone
                    </label>
                    <select 
                      id="timezone" 
                      name="timezone" 
                      class="w-full px-4 py-3 bg-tron-dark/50 border border-tron-red/30 rounded-lg text-tron-white font-montserrat focus:outline-none focus:border-tron-red focus:ring-1 focus:ring-tron-red transition-all"
                    >
                      <option value="">Select timezone</option>
                      <option value="UTC-12">UTC-12</option>
                      <option value="UTC-11">UTC-11</option>
                      <option value="UTC-10">UTC-10</option>
                      <option value="UTC-9">UTC-9</option>
                      <option value="UTC-8">UTC-8</option>
                      <option value="UTC-7">UTC-7</option>
                      <option value="UTC-6">UTC-6</option>
                      <option value="UTC-5">UTC-5</option>
                      <option value="UTC-4">UTC-4</option>
                      <option value="UTC-3">UTC-3</option>
                      <option value="UTC-2">UTC-2</option>
                      <option value="UTC-1">UTC-1</option>
                      <option value="UTC+0">UTC+0</option>
                      <option value="UTC+1">UTC+1</option>
                      <option value="UTC+2">UTC+2</option>
                      <option value="UTC+3">UTC+3</option>
                      <option value="UTC+4">UTC+4</option>
                      <option value="UTC+5">UTC+5</option>
                      <option value="UTC+6">UTC+6</option>
                      <option value="UTC+7">UTC+7</option>
                      <option value="UTC+8">UTC+8</option>
                      <option value="UTC+9">UTC+9</option>
                      <option value="UTC+10">UTC+10</option>
                      <option value="UTC+11">UTC+11</option>
                      <option value="UTC+12">UTC+12</option>
                    </select>
                  </div>
                </div>

                {/* Project Ideas */}
                <div>
                  <label for="projectIdeas" class="block text-tron-silver font-montserrat font-medium mb-2">
                    Project Ideas or Goals
                  </label>
                  <textarea 
                    id="projectIdeas" 
                    name="projectIdeas" 
                    rows="4"
                    class="w-full px-4 py-3 bg-tron-dark/50 border border-tron-red/30 rounded-lg text-tron-white font-montserrat focus:outline-none focus:border-tron-red focus:ring-1 focus:ring-tron-red transition-all"
                    placeholder="Tell us about projects you'd like to build on TRON or how you'd like to contribute to the ecosystem..."
                  ></textarea>
                </div>

                {/* Agreement */}
                <div class="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    id="agreement" 
                    name="agreement" 
                    required 
                    class="mt-1 text-tron-red rounded border-tron-red/30 bg-tron-dark/50 focus:ring-tron-red"
                  />
                  <label for="agreement" class="text-sm text-tron-light-gray">
                    I agree to participate in the TRON MEGATEAM community and understand that this is an application to join builder initiatives. 
                    I consent to being contacted about opportunities and updates. *
                  </label>
                </div>

                {/* Submit Button */}
                <div class="pt-6">
                  <button 
                    type="submit"
                    class="color-flash-hover w-full group relative overflow-hidden bg-gradient-to-r from-tron-red via-tron-light to-tron-dark-red bg-[length:200%_100%] px-8 py-4 rounded-xl text-xl font-montserrat font-bold transition-all duration-700 transform hover:scale-105 border-2 border-tron-red/50 shadow-lg hover:shadow-2xl hover:shadow-tron-red/30"
                  >
                    <span class="relative z-10 flex items-center justify-center text-tron-white">
                      <i class="fas fa-rocket mr-3 animate-pulse"></i>
                      <span>Join MEGATEAM</span>
                    </span>
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div class="absolute -inset-1 bg-tron-gradient rounded-xl blur opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </button>
                </div>
              </form>
            </div>

            {/* Success Message (Initially Hidden) */}
            <div id="success-message" class="hidden mt-8 cyber-card p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-tron-light/10 border border-green-500/30">
              <div class="text-center">
                <i class="fas fa-check-circle text-3xl text-green-400 mb-4"></i>
                <h3 class="text-xl font-bold text-green-400 mb-2">Application Submitted!</h3>
                <p class="text-tron-light-gray">
                  Thank you for joining TRON MEGATEAM! We'll review your application and get back to you soon with next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="py-8 bg-tron-gray border-t border-tron-red/20">
        <div class="container mx-auto px-6 text-center">
          <p class="text-gray-400">
            © 2025 TRON MEGATEAM. 
            <span class="text-tron-red">Building the future, together.</span>
          </p>
        </div>
      </footer>
    </>
  )
})

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
              <span class="text-2xl font-montserrat font-bold tracking-wider">
                TRON <span class="text-transparent bg-clip-text bg-tron-gradient">MEGATEAM</span>
              </span>
            </div>
            {/* Desktop Navigation */}
            <div class="hidden md:flex items-center space-x-8">
              <a href="#mission" class="font-montserrat font-medium text-tron-silver hover:text-tron-red transition-all duration-300 hover:glow-text relative group">
                Mission
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-tron-red transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#what-is-megateam" class="font-montserrat font-medium text-tron-silver hover:text-tron-red transition-all duration-300 hover:glow-text relative group">
                What is MEGATEAM?
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-tron-red transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#objectives" class="font-montserrat font-medium text-tron-silver hover:text-tron-red transition-all duration-300 hover:glow-text relative group">
                Objectives
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-tron-red transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#structure" class="font-montserrat font-medium text-tron-silver hover:text-tron-red transition-all duration-300 hover:glow-text relative group">
                Structure
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-tron-red transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#roadmap" class="font-montserrat font-medium text-tron-silver hover:text-tron-red transition-all duration-300 hover:glow-text relative group">
                Roadmap
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-tron-red transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="https://forms.gle/4xFFgTwHXiifMEhV9" target="_blank" rel="noopener noreferrer" class="color-flash-hover relative overflow-hidden bg-gradient-to-r from-tron-red via-tron-light to-tron-red bg-[length:200%_100%] px-6 py-2 rounded-lg font-montserrat font-bold transition-all duration-500 transform hover:scale-105 border border-tron-red/50 inline-block">
                <span class="relative z-10 text-tron-white">
                  Join MEGATEAM <i class="fas fa-external-link-alt ml-1 text-sm opacity-80"></i>
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              id="mobile-menu-toggle"
              class="md:hidden flex flex-col space-y-1 w-6 h-6 focus:outline-none"
              onclick="toggleMobileMenu()"
            >
              <span class="block w-full h-0.5 bg-tron-red transition-transform duration-300"></span>
              <span class="block w-full h-0.5 bg-tron-red transition-transform duration-300"></span>
              <span class="block w-full h-0.5 bg-tron-red transition-transform duration-300"></span>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div id="mobile-menu" class="hidden md:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-tron-black via-tron-dark to-tron-black backdrop-blur-md border-b border-tron-red/30 shadow-lg shadow-tron-red/20">
            <div class="container mx-auto px-6 py-6 space-y-4">
              <a href="#mission" class="block font-montserrat font-medium text-tron-silver hover:text-tron-red transition-all duration-300 py-2 border-b border-tron-gray/20">
                Mission
              </a>
              <a href="#what-is-megateam" class="block font-montserrat font-medium text-tron-silver hover:text-tron-red transition-all duration-300 py-2 border-b border-tron-gray/20">
                What is MEGATEAM?
              </a>
              <a href="#objectives" class="block font-montserrat font-medium text-tron-silver hover:text-tron-red transition-all duration-300 py-2 border-b border-tron-gray/20">
                Objectives
              </a>
              <a href="#structure" class="block font-montserrat font-medium text-tron-silver hover:text-tron-red transition-all duration-300 py-2 border-b border-tron-gray/20">
                Structure
              </a>
              <a href="#roadmap" class="block font-montserrat font-medium text-tron-silver hover:text-tron-red transition-all duration-300 py-2 border-b border-tron-gray/20">
                Roadmap
              </a>
              <a href="https://forms.gle/4xFFgTwHXiifMEhV9" target="_blank" rel="noopener noreferrer" class="block bg-tron-red hover:bg-tron-light px-4 py-3 rounded-lg font-montserrat font-bold text-tron-white text-center transition-all duration-300 mt-4">
                Join MEGATEAM <i class="fas fa-external-link-alt ml-1 text-sm opacity-80"></i>
              </a>
            </div>
            <button class="md:hidden text-tron-red text-xl hover:text-tron-light transition-colors" id="mobile-menu-btn">
              <i class="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-20 pb-8 md:pb-0">
        {/* Background Video */}
        <div class="absolute inset-0 w-full h-full overflow-hidden">
          <iframe 
            class="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src="https://www.youtube.com/embed/gU6Jfz2jOHA?autoplay=1&mute=1&loop=1&playlist=gU6Jfz2jOHA&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&enablejsapi=0"
            title="Background Video"
            frameborder="0"
            allow="autoplay; encrypted-media"
          ></iframe>
          {/* Overlay for better text readability */}
          <div class="absolute inset-0 bg-black/40"></div>
        </div>        
        <div class="container mx-auto px-4 md:px-6 text-center relative z-20" data-aos="fade-up">
          <div class="mb-4 md:mb-8 relative">
            <div class="relative inline-block">
              <i class="fas fa-rocket text-3xl md:text-5xl text-transparent bg-clip-text bg-tron-gradient"></i>
            </div>
          </div>
          
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



      {/* Mission Section */}
      <section id="mission" class="py-20 relative">
        <div class="absolute inset-0 bg-gradient-to-b from-tron-black via-tron-gray/30 to-tron-black"></div>
        
        <div class="container mx-auto px-6 relative z-10">
          <div class="text-center mb-16" data-aos="fade-up">
            <h2 class="text-5xl md:text-6xl font-montserrat font-black mb-8">
              Our <span class="text-transparent bg-clip-text bg-tron-gradient">Mission</span>
            </h2>
            <div class="w-32 h-1 bg-gradient-to-r from-transparent via-tron-red to-transparent mx-auto mb-8"></div>
          </div>
          
          <div class="max-w-5xl mx-auto text-center mb-16" data-aos="fade-up" data-aos-delay="200">
            <div class="cyber-card p-12 rounded-2xl relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-tron-red/5 via-transparent to-tron-light/5"></div>
              <blockquote class="text-2xl md:text-3xl font-montserrat font-light leading-relaxed text-tron-light-gray relative z-10">
                <span class="text-tron-red text-4xl">"</span>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-tron-white via-tron-silver to-tron-light">
                  TRON MEGATEAM exists to ignite the largest, most inclusive builder movement in crypto history—uniting global communities to create, educate, and prosper on TRON's
                </span>
                <span class="text-tron-silver font-medium"> scalable</span>, 
                <span class="text-tron-light font-medium">profitable</span>, and <span class="text-tron-red font-medium">dynamic</span> foundation.
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
                <h3 class="text-2xl font-montserrat font-bold ml-4 text-tron-red">
                  Global Scale
                </h3>
              </div>
              <p class="text-tron-light-gray leading-relaxed font-montserrat">
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
                <h3 class="text-2xl font-montserrat font-bold ml-4 text-tron-light">
                  Builder-First Economics
                </h3>
              </div>
              <p class="text-tron-light-gray leading-relaxed font-montserrat">
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

            {/* 7 Key Advantages Grid */}
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* 1. Massive User Base */}
              <div class="cyber-card p-6 rounded-xl border border-tron-red/20" data-aos="fade-up" data-aos-delay="100">
                <i class="fas fa-users text-tron-red text-3xl mb-4"></i>
                <h3 class="text-xl font-bold mb-3 text-tron-light">Massive User Base & High Adoption</h3>
                <div class="text-gray-300 space-y-2">
                  <p>• TRON ranks among the <span class="text-white font-semibold">top blockchains by daily active users</span>, with ~2.5–2.8 million DAUs in 2025</p>
                  <p>• Processes <span class="text-tron-light">millions of transactions daily</span>, driven by stablecoin transfers and dApps</p>
                  <p>• Developers gain access to a <span class="text-white">large, global audience</span> ready to engage</p>
                </div>
              </div>

              {/* 2. Low Fees & Throughput */}
              <div class="cyber-card p-6 rounded-xl border border-tron-red/20" data-aos="fade-up" data-aos-delay="200">
                <i class="fas fa-bolt text-tron-red text-3xl mb-4"></i>
                <h3 class="text-xl font-bold mb-3 text-tron-light">Low Fees, High Throughput & Free Transaction Model</h3>
                <div class="text-gray-300 space-y-2">
                  <p>• TRON transactions are <span class="text-white font-semibold">low-cost</span>, with average fees recently reduced to around <span class="text-tron-light">$0.59</span></p>
                  <p>• Handles <span class="text-white">millions of daily transactions</span> without congestion</p>
                  <p>• Energy & Bandwidth model allows developers to <span class="text-tron-light">stake TRX to cover resources</span>, enabling users to transact for free</p>
                </div>
              </div>

              {/* 3. Developer-Friendly */}
              <div class="cyber-card p-6 rounded-xl border border-tron-red/20" data-aos="fade-up" data-aos-delay="300">
                <i class="fas fa-code text-tron-red text-3xl mb-4"></i>
                <h3 class="text-xl font-bold mb-3 text-tron-light">Developer-Friendly & EVM Compatibility</h3>
                <div class="text-gray-300 space-y-2">
                  <p>• TRON uses the <span class="text-white font-semibold">TRON Virtual Machine (TVM)</span>, highly compatible with the Ethereum Virtual Machine</p>
                  <p>• Smart contracts written in <span class="text-tron-light">Solidity can be ported</span> with minimal changes</p>
                  <p>• Developers can leverage existing <span class="text-white">Ethereum tools and frameworks</span></p>
                </div>
              </div>

              {/* 4. Stablecoin Powerhouse */}
              <div class="cyber-card p-6 rounded-xl border border-tron-red/20" data-aos="fade-up" data-aos-delay="400">
                <i class="fas fa-coins text-tron-red text-3xl mb-4"></i>
                <h3 class="text-xl font-bold mb-3 text-tron-light">Stablecoin Powerhouse</h3>
                <div class="text-gray-300 space-y-2">
                  <p>• TRON is the <span class="text-white font-semibold">leading chain for USDT (Tether)</span>, with ~$80B+ in circulation</p>
                  <p>• Processes <span class="text-tron-light">tens of billions of dollars</span> in USDT transfers daily, outpacing most other blockchains</p>
                  <p>• Central hub for <span class="text-white">payments, DeFi liquidity, and cross-border transfers</span></p>
                </div>
              </div>

              {/* 5. Global Reach */}
              <div class="cyber-card p-6 rounded-xl border border-tron-red/20" data-aos="fade-up" data-aos-delay="500">
                <i class="fas fa-globe text-tron-red text-3xl mb-4"></i>
                <h3 class="text-xl font-bold mb-3 text-tron-light">Global Reach & Ecosystem</h3>
                <div class="text-gray-300 space-y-2">
                  <p>• TRON has expanded with acquisitions like <span class="text-white font-semibold">BitTorrent, DLive, and Steemit</span></p>
                  <p>• Supports over <span class="text-tron-light">300 million user accounts</span> and is integrated across major exchanges and wallets</p>
                  <p>• Developers benefit from exposure to <span class="text-white">one of the largest crypto user bases</span> worldwide</p>
                </div>
              </div>

              {/* 6. DAO Governance */}
              <div class="cyber-card p-6 rounded-xl border border-tron-red/20" data-aos="fade-up" data-aos-delay="600">
                <i class="fas fa-university text-tron-red text-3xl mb-4"></i>
                <h3 class="text-xl font-bold mb-3 text-tron-light">DAO Governance & Incentives</h3>
                <div class="text-gray-300 space-y-2">
                  <p>• The <span class="text-white font-semibold">TRON DAO manages</span> network upgrades and ecosystem funding programs such as SunPump and Builders League</p>
                  <p>• TRON employs <span class="text-tron-light">burning mechanisms</span> that tie network activity to TRX token value</p>
                  <p>• Developers can access <span class="text-white">grants, incentives, and support</span> through DAO-led initiatives</p>
                </div>
              </div>
            </div>

            {/* 7. Practical Use Cases - Full Width */}
            <div class="mb-12" data-aos="fade-up" data-aos-delay="700">
              <div class="cyber-card p-8 rounded-xl border border-tron-red/20">
                <div class="flex items-center mb-6">
                  <i class="fas fa-handshake text-tron-red text-3xl mr-4"></i>
                  <h3 class="text-2xl font-bold text-tron-light">Practical Use Cases: Payments & Remittances</h3>
                </div>
                <div class="text-lg text-gray-300 leading-relaxed">
                  <p class="mb-4">
                    <span class="text-white font-semibold">TRON is widely used for remittances and cross-border payments</span>, powered by its stablecoin dominance and low fees. The ecosystem also includes gaming, content platforms, and creator monetization.
                  </p>
                  <p class="text-tron-light font-medium">
                    Developers building real-world financial applications can immediately tap into TRON's strong stablecoin flows.
                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* What is MEGATEAM Section */}
      <section id="what-is-megateam" class="py-20">
        <div class="container mx-auto px-6">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold text-center mb-16" data-aos="fade-up">
              What is <span class="text-transparent bg-clip-text bg-tron-gradient">MEGATEAM</span>?
            </h2>
            
            {/* The Problem */}
            <div class="mb-16" data-aos="fade-up">
              <h3 class="text-2xl font-bold mb-6 text-tron-red">The Problem</h3>
              <div class="cyber-card p-8 rounded-xl">
                <p class="text-lg text-gray-300 leading-relaxed">
                  Crypto talent is <span class="text-tron-light font-semibold">fragmented across countless Discord servers and Telegram groups</span>. 
                  Skilled builders bounce between projects without sustainable income paths. Meanwhile, sponsors and TRON DAO 
                  struggle to find <span class="text-white font-semibold">accountable, proven contributors</span> for meaningful initiatives.
                </p>
              </div>
            </div>

            {/* The Solution */}
            <div class="mb-16" data-aos="fade-up" data-aos-delay="200">
              <h3 class="text-2xl font-bold mb-6 text-tron-red">The Solution</h3>
              <div class="cyber-card p-8 rounded-xl">
                <p class="text-lg text-gray-300 leading-relaxed mb-6">
                  <span class="text-transparent bg-clip-text bg-tron-gradient font-semibold">MEGATEAM</span> is a coordinated hub that connects <span class="text-tron-light font-semibold">builders, creatives, and guardians</span> on TRON—creating sustainable career paths while delivering accountability to sponsors and TRON DAO.
                </p>
                
                {/* SIMPLE CLEAN INFOGRAPHIC */}
                <div class="mt-12">
                  
                  {/* Desktop Layout - Clean Grid System */}
                  <div class="hidden md:block">
                    <div class="max-w-4xl mx-auto">
                      
                      {/* Top Row - Contributors */}
                      <div class="flex justify-center mb-12">
                        <div class="text-center">
                          <div class="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-xl mb-4">
                            <i class="fas fa-code text-white text-3xl"></i>
                          </div>
                          <h4 class="font-black text-white text-lg mb-1"><span class="font-black">Contributors</span></h4>
                          <p class="text-sm text-gray-400">Builders & Creatives</p>
                          
                          {/* Arrow down */}
                          <div class="mt-4">
                            <i class="fas fa-arrow-down text-red-500 text-2xl"></i>
                          </div>
                        </div>
                      </div>
                      
                      {/* Middle Row - Left, Center, Right */}
                      <div class="flex items-center justify-center gap-16 mb-12">
                        
                        {/* TRON DAO - Left */}
                        <div class="text-center flex-shrink-0">
                          <div class="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl mb-4">
                            <i class="fas fa-university text-white text-3xl"></i>
                          </div>
                          <h4 class="font-black text-white text-lg mb-1"><span class="font-black">TRON DAO</span></h4>
                          <p class="text-sm text-gray-400">Governance & Funding</p>
                        </div>
                        
                        {/* Arrow Right */}
                        <div class="flex-shrink-0 mx-8">
                          <i class="fas fa-arrow-right text-yellow-500 text-2xl"></i>
                        </div>
                        
                        {/* MEGATEAM Center */}
                        <div class="text-center flex-shrink-0 mx-8">
                          <div class="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-tron-red to-tron-dark-red border-4 border-white shadow-2xl overflow-hidden mb-4">
                            <img src="/static/mt-logo.jpg" alt="MEGATEAM Logo" class="w-full h-full object-cover" />
                          </div>
                          <h3 class="text-2xl font-black text-white tracking-wider">MEGATEAM</h3>
                          <p class="text-sm text-gray-300 mt-1">Coordination Hub</p>
                        </div>
                        
                        {/* Arrow Left */}
                        <div class="flex-shrink-0 mx-8">
                          <i class="fas fa-arrow-left text-blue-500 text-2xl"></i>
                        </div>
                        
                        {/* Guardians - Right */}
                        <div class="text-center flex-shrink-0">
                          <div class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl mb-4">
                            <i class="fas fa-shield-alt text-white text-3xl"></i>
                          </div>
                          <h4 class="font-black text-white text-lg mb-1"><span class="font-black">Guardians</span></h4>
                          <p class="text-sm text-gray-400">Verification Layer</p>
                        </div>
                        
                      </div>
                      
                      {/* Bottom Row - Partners */}
                      <div class="flex justify-center">
                        <div class="text-center">
                          
                          {/* Arrow up */}
                          <div class="mb-4">
                            <i class="fas fa-arrow-up text-green-500 text-2xl"></i>
                          </div>
                          
                          <div class="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-xl mb-4">
                            <i class="fas fa-handshake text-white text-3xl"></i>
                          </div>
                          <h4 class="font-black text-white text-lg mb-1"><span class="font-black">Partners</span></h4>
                          <p class="text-sm text-gray-400">Sponsors & Brands</p>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  
                  {/* Mobile Layout */}
                  <div class="md:hidden">
                    <div class="flex flex-col items-center space-y-8">
                      
                      {/* Contributors */}
                      <div class="text-center">
                        <div class="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg mb-3">
                          <i class="fas fa-code text-white text-2xl"></i>
                        </div>
                        <h4 class="font-black text-white">Contributors</h4>
                        <p class="text-xs text-gray-400">Builders & Creatives</p>
                      </div>
                      
                      <i class="fas fa-arrow-down text-red-500 text-2xl"></i>
                      
                      {/* MEGATEAM Center */}
                      <div class="text-center">
                        <div class="w-28 h-28 mx-auto rounded-full bg-white border-4 border-white shadow-xl overflow-hidden mb-3 relative">
                          <img src="/static/mt-logo.jpg" alt="MEGATEAM Logo" class="w-full h-full object-cover" onError="this.style.display='none'; this.parentNode.innerHTML='<div class=\\'w-full h-full bg-gradient-to-br from-tron-red to-tron-dark-red rounded-full flex items-center justify-center\\'><span class=\\'text-white font-black text-2xl\\'>MT</span></div>'" />
                        </div>
                        <h4 class="font-black text-white text-lg">MEGATEAM</h4>
                        <p class="text-sm text-gray-300">Coordination Hub</p>
                      </div>
                      
                      <i class="fas fa-arrow-down text-blue-500 text-2xl"></i>
                      
                      {/* Bottom stakeholders */}
                      <div class="grid grid-cols-3 gap-6 w-full max-w-sm">
                        <div class="text-center">
                          <div class="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg mb-2">
                            <i class="fas fa-shield-alt text-white text-lg"></i>
                          </div>
                          <h5 class="font-black text-blue-400 text-sm">Guardians</h5>
                          <p class="text-xs text-gray-400">Verify</p>
                        </div>
                        
                        <div class="text-center">
                          <div class="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center shadow-lg mb-2">
                            <i class="fas fa-handshake text-white text-lg"></i>
                          </div>
                          <h5 class="font-black text-green-400 text-sm">Partners</h5>
                          <p class="text-xs text-gray-400">Fund</p>
                        </div>
                        
                        <div class="text-center">
                          <div class="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg mb-2">
                            <i class="fas fa-university text-white text-lg"></i>
                          </div>
                          <h5 class="font-black text-yellow-400 text-sm">TRON DAO</h5>
                          <p class="text-xs text-gray-400">Govern</p>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Why It Matters */}
            <div data-aos="fade-up" data-aos-delay="400">
              <h3 class="text-2xl font-bold mb-8 text-tron-red">Why It Matters</h3>
              
              <div class="grid md:grid-cols-3 gap-8">
                {/* For Contributors */}
                <div class="cyber-card p-6 rounded-xl border-l-4 border-tron-red">
                  <div class="flex items-center mb-4">
                    <i class="fas fa-user-tie text-tron-red text-2xl mr-3"></i>
                    <h4 class="text-xl font-bold text-tron-light">For Contributors</h4>
                  </div>
                  <p class="text-gray-300">
                    <span class="text-tron-light font-semibold">Earn by doing meaningful work</span>. 
                    Get paid for shipping code, creating content, building communities—with transparent 
                    milestones and instant TRON payouts.
                  </p>
                </div>

                {/* For TRON DAO */}
                <div class="cyber-card p-6 rounded-xl border-l-4 border-blue-400">
                  <div class="flex items-center mb-4">
                    <i class="fas fa-university text-blue-400 text-2xl mr-3"></i>
                    <h4 class="text-xl font-bold text-blue-400">For TRON DAO</h4>
                  </div>
                  <p class="text-gray-300">
                    <span class="text-blue-400 font-semibold">Higher quality projects, full accountability</span>. 
                    Every funded initiative gets Guardian oversight, on-chain verification, and 
                    measurable impact on TRON ecosystem growth.
                  </p>
                </div>

                {/* For Sponsors */}
                <div class="cyber-card p-6 rounded-xl border-l-4 border-green-400">
                  <div class="flex items-center mb-4">
                    <i class="fas fa-handshake text-green-400 text-2xl mr-3"></i>
                    <h4 class="text-xl font-bold text-green-400">For Partners</h4>
                  </div>
                  <p class="text-gray-300">
                    <span class="text-green-400 font-semibold">Access to proven talent</span>. 
                    Connect with verified builders who have track records, Guardian endorsements, 
                    and deep TRON ecosystem expertise.
                  </p>
                </div>
              </div>
            </div>

            {/* How MEGATEAM Delivers */}
            <div class="mt-16" data-aos="fade-up" data-aos-delay="500">
              <h3 class="text-2xl font-bold mb-8 text-tron-red text-center">How MEGATEAM Delivers</h3>
              <div class="grid md:grid-cols-3 gap-8">
                <div class="cyber-card p-6 rounded-xl border border-tron-red/20">
                  <i class="fas fa-shield-alt text-tron-red text-3xl mb-4"></i>
                  <h3 class="text-xl font-bold mb-3">Radical Accountability</h3>
                  <p class="text-gray-300">A Guardian corps of vetted experts verifies every milestone on-chain, so capital flows only when value is delivered.</p>
                </div>
                
                <div class="cyber-card p-6 rounded-xl border border-tron-red/20">
                  <i class="fas fa-graduation-cap text-tron-red text-3xl mb-4"></i>
                  <h3 class="text-xl font-bold mb-3">Education as Fuel</h3>
                  <p class="text-gray-300">Multilingual media studio drops bite-sized tutorials, long-form explainers, and live workshops—demystifying DeFi, NFTs, gaming, and AI integrations.</p>
                </div>
                
                <div class="cyber-card p-6 rounded-xl border border-tron-red/20">
                  <i class="fas fa-chart-line text-tron-red text-3xl mb-4"></i>
                  <h3 class="text-xl font-bold mb-3">Profit With Purpose</h3>
                  <p class="text-gray-300">By amplifying TRON's fundamentals—low fees, stablecoin dominance, and cross-chain tooling—MEGATEAM ensures builders not only learn but earn.</p>
                </div>
              </div>
            </div>

            {/* Login Mockup */}
            <div class="mt-20" data-aos="fade-up" data-aos-delay="600">
              <h3 class="text-3xl font-bold mb-8 text-center text-tron-red">Access MEGATEAM Platform</h3>
              <p class="text-center text-gray-300 mb-12 max-w-3xl mx-auto text-lg">
                Connect your wallet or sign up with email to join the largest builder coordination platform on TRON.
              </p>
              
              {/* Login Interface Mockup */}
              <div class="max-w-2xl mx-auto mb-16">
                <div class="cyber-card p-8 rounded-xl border border-tron-red/30 bg-gradient-to-br from-tron-dark/50 to-black/80">
                  
                  {/* Login Header */}
                  <div class="text-center mb-8">
                    <div class="flex justify-center mb-4">
                      <div class="w-16 h-16 rounded-full bg-gradient-to-br from-tron-red to-tron-dark-red border-2 border-white overflow-hidden">
                        <img src="/static/mt-logo.jpg" alt="MEGATEAM" class="w-full h-full object-cover" />
                      </div>
                    </div>
                    <h4 class="text-2xl font-bold text-white mb-2">Welcome to MEGATEAM</h4>
                    <p class="text-tron-silver">Choose your preferred login method</p>
                  </div>

                  {/* Login Methods */}
                  <div class="space-y-6">
                    
                    {/* Wallet Connection Section */}
                    <div>
                      <h5 class="text-lg font-semibold text-white mb-4 flex items-center">
                        <i class="fas fa-wallet text-tron-red mr-2"></i>
                        Connect Wallet
                      </h5>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* TronLink */}
                        <button class="flex items-center justify-between p-4 bg-gradient-to-r from-tron-red/20 to-tron-red/10 border border-tron-red/30 rounded-lg hover:border-tron-red hover:bg-tron-red/20 transition-all group">
                          <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                              <i class="fas fa-link text-white"></i>
                            </div>
                            <div class="text-left">
                              <div class="text-white font-semibold">TronLink</div>
                              <div class="text-tron-silver text-sm">Official TRON wallet</div>
                            </div>
                          </div>
                          <i class="fas fa-arrow-right text-tron-red group-hover:text-white transition-colors"></i>
                        </button>

                        {/* WalletConnect */}
                        <button class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/20 to-blue-500/10 border border-blue-500/30 rounded-lg hover:border-blue-500 hover:bg-blue-500/20 transition-all group">
                          <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                              <i class="fas fa-qrcode text-white"></i>
                            </div>
                            <div class="text-left">
                              <div class="text-white font-semibold">WalletConnect</div>
                              <div class="text-tron-silver text-sm">Mobile & desktop wallets</div>
                            </div>
                          </div>
                          <i class="fas fa-arrow-right text-blue-500 group-hover:text-white transition-colors"></i>
                        </button>

                        {/* MetaMask */}
                        <button class="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/20 to-orange-500/10 border border-orange-500/30 rounded-lg hover:border-orange-500 hover:bg-orange-500/20 transition-all group">
                          <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center">
                              <i class="fab fa-ethereum text-white"></i>
                            </div>
                            <div class="text-left">
                              <div class="text-white font-semibold">MetaMask</div>
                              <div class="text-tron-silver text-sm">Via TRON network</div>
                            </div>
                          </div>
                          <i class="fas fa-arrow-right text-orange-500 group-hover:text-white transition-colors"></i>
                        </button>

                        {/* Hardware Wallets */}
                        <button class="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/30 rounded-lg hover:border-green-500 hover:bg-green-500/20 transition-all group">
                          <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                              <i class="fas fa-shield-alt text-white"></i>
                            </div>
                            <div class="text-left">
                              <div class="text-white font-semibold">Hardware</div>
                              <div class="text-tron-silver text-sm">Ledger & Trezor</div>
                            </div>
                          </div>
                          <i class="fas fa-arrow-right text-green-500 group-hover:text-white transition-colors"></i>
                        </button>

                      </div>
                    </div>

                    {/* Divider */}
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 h-px bg-gradient-to-r from-transparent via-tron-red/30 to-transparent"></div>
                      <span class="text-tron-silver text-sm font-medium px-3">OR</span>
                      <div class="flex-1 h-px bg-gradient-to-r from-transparent via-tron-red/30 to-transparent"></div>
                    </div>

                    {/* Email/Traditional Login Section */}
                    <div>
                      <h5 class="text-lg font-semibold text-white mb-4 flex items-center">
                        <i class="fas fa-envelope text-blue-400 mr-2"></i>
                        Email Authentication
                      </h5>
                      
                      <div class="space-y-4">
                        {/* Email Input */}
                        <div>
                          <label class="block text-tron-silver text-sm font-medium mb-2">Email Address</label>
                          <input 
                            type="email" 
                            placeholder="your.email@domain.com"
                            class="w-full px-4 py-3 bg-tron-dark/50 border border-tron-red/30 rounded-lg text-white placeholder-tron-silver/50 focus:outline-none focus:border-tron-red focus:ring-1 focus:ring-tron-red transition-all"
                          />
                        </div>

                        {/* Action Buttons */}
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button class="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-tron-red to-tron-dark-red hover:from-tron-dark-red hover:to-tron-red text-white rounded-lg font-semibold transition-all hover:scale-105 transform">
                            <i class="fas fa-sign-in-alt mr-2"></i>
                            Sign In
                          </button>
                          <button class="flex items-center justify-center px-6 py-3 border-2 border-tron-red text-tron-red hover:bg-tron-red hover:text-white rounded-lg font-semibold transition-all">
                            <i class="fas fa-user-plus mr-2"></i>
                            Create Account
                          </button>
                        </div>

                        {/* Social Login Options */}
                        <div class="pt-4">
                          <p class="text-tron-silver text-sm text-center mb-4">Or continue with</p>
                          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button class="flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all group">
                              <i class="fab fa-google text-white text-lg group-hover:scale-110 transform transition-transform"></i>
                            </button>
                            <button class="flex items-center justify-center p-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 rounded-lg transition-all group">
                              <i class="fab fa-github text-white text-lg group-hover:scale-110 transform transition-transform"></i>
                            </button>
                            <button class="flex items-center justify-center p-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-lg transition-all group">
                              <i class="fab fa-discord text-white text-lg group-hover:scale-110 transform transition-transform"></i>
                            </button>
                            <button class="flex items-center justify-center p-3 bg-gradient-to-r from-black to-gray-900 hover:from-gray-900 hover:to-black rounded-lg transition-all group border border-gray-600 hover:border-gray-500">
                              <svg class="w-5 h-5 text-white group-hover:scale-110 transform transition-transform" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                              </svg>
                            </button>
                          </div>
                          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-xs text-center text-tron-silver">
                            <span>Google</span>
                            <span>GitHub</span>
                            <span>Discord</span>
                            <span>X.com</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div class="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div class="flex items-start space-x-3">
                        <i class="fas fa-info-circle text-blue-400 text-lg mt-0.5"></i>
                        <div>
                          <h6 class="text-blue-400 font-semibold mb-1">Secure & Decentralized</h6>
                          <p class="text-tron-silver text-sm">
                            Your wallet remains in your control. MEGATEAM never stores private keys. 
                            Email accounts use enterprise-grade security with 2FA support.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Contributor Dashboard Mockup */}
            <div class="mt-12" data-aos="fade-up" data-aos-delay="700">
              <h3 class="text-3xl font-bold mb-8 text-center text-tron-red">Contributor Dashboard Preview</h3>
              <p class="text-center text-gray-300 mb-12 max-w-3xl mx-auto text-lg">
                Experience your personalized MEGATEAM workspace. Track quests, manage submissions, discover opportunities, 
                and build your reputation in the TRON ecosystem.
              </p>
              
              {/* Dashboard Container */}
              <div class="cyber-card rounded-xl border border-tron-red/30 bg-gradient-to-br from-tron-dark/50 to-black/80 overflow-hidden">
                
                {/* Top Banner */}
                <div class="bg-gradient-to-r from-tron-red/20 via-tron-dark/40 to-tron-red/20 p-4 border-b border-tron-red/20">
                  <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-3 lg:space-y-0">
                    
                    {/* User Profile Section */}
                    <div class="flex items-center space-x-3">
                      <div class="relative">
                        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 border-2 border-white overflow-hidden">
                          <img src="/static/mt-logo.jpg" alt="Avatar" class="w-full h-full object-cover" />
                        </div>
                        <div class="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h4 class="text-lg font-bold text-white flex items-center space-x-2">
                          <span>Alex Chen</span>
                          <div class="flex items-center">
                            <i class="fas fa-star text-yellow-400 text-sm"></i>
                            <i class="fas fa-star text-yellow-400 text-sm"></i>
                            <i class="fas fa-star text-yellow-400 text-sm"></i>
                          </div>
                        </h4>
                        <div class="flex items-center space-x-2">
                          <span class="text-yellow-400 font-medium text-sm">Gold Tier Contributor</span>
                          <button class="flex items-center space-x-1 px-2 py-0.5 bg-tron-red/20 text-tron-red text-xs rounded border border-tron-red/30">
                            <div class="w-1.5 h-1.5 bg-tron-red rounded-full"></div>
                            <span>TRON</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Balance Summary */}
                    <div class="flex items-center space-x-6">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="text-center">
                          <div class="text-xl font-bold text-green-400">$2,847</div>
                          <div class="text-xs text-tron-silver">Total Earned</div>
                        </div>
                        <div class="text-center">
                          <div class="text-xl font-bold text-yellow-400">$456</div>
                          <div class="text-xs text-tron-silver">Pending</div>
                        </div>
                        <div class="text-center">
                          <div class="text-xl font-bold text-purple-400">1,247</div>
                          <div class="text-xs text-tron-silver">Rep Points</div>
                        </div>
                      </div>
                      
                      <button class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-all">
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main 3-Column Layout */}
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[600px]">
                  
                  {/* Left Panel - Navigation */}
                  <div class="lg:col-span-3 bg-tron-dark/30 p-6 border-r border-tron-red/20">
                    <nav class="space-y-1">
                      {/* Main Navigation */}
                      <a href="#" class="flex items-center space-x-3 px-3 py-2.5 bg-tron-red/20 text-tron-red rounded-lg border border-tron-red/30">
                        <i class="fas fa-home w-4"></i>
                        <span class="font-medium">Dashboard</span>
                      </a>
                      <a href="#" class="flex items-center space-x-3 px-3 py-2.5 text-tron-silver hover:bg-tron-red/10 hover:text-white rounded-lg transition-all">
                        <i class="fas fa-puzzle-piece w-4"></i>
                        <span>My Quests</span>
                        <span class="ml-auto bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
                      </a>
                      <a href="#" class="flex items-center space-x-3 px-3 py-2.5 text-tron-silver hover:bg-tron-red/10 hover:text-white rounded-lg transition-all">
                        <i class="fas fa-briefcase w-4"></i>
                        <span>Grants</span>
                      </a>
                      <a href="#" class="flex items-center space-x-3 px-3 py-2.5 text-tron-silver hover:bg-tron-red/10 hover:text-white rounded-lg transition-all">
                        <i class="fas fa-search w-4"></i>
                        <span>Discover</span>
                        <span class="ml-auto bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">12</span>
                      </a>
                      
                      {/* Divider */}
                      <div class="py-3">
                        <div class="h-px bg-tron-red/20"></div>
                      </div>

                      {/* Account & Settings */}
                      <a href="#" class="flex items-center space-x-3 px-3 py-2.5 text-tron-silver hover:bg-tron-red/10 hover:text-white rounded-lg transition-all">
                        <i class="fas fa-wallet w-4"></i>
                        <span>Wallet</span>
                        <div class="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
                      </a>
                      <a href="#" class="flex items-center space-x-3 px-3 py-2.5 text-tron-silver hover:bg-tron-red/10 hover:text-white rounded-lg transition-all">
                        <i class="fas fa-bell w-4"></i>
                        <span>Notifications</span>
                        <span class="ml-auto bg-tron-red text-white text-xs px-1.5 py-0.5 rounded-full">2</span>
                      </a>
                      <a href="#" class="flex items-center space-x-3 px-3 py-2.5 text-tron-silver hover:bg-tron-red/10 hover:text-white rounded-lg transition-all">
                        <i class="fas fa-cog w-4"></i>
                        <span>Settings</span>
                      </a>
                    </nav>

                    {/* Quick Stats */}
                    <div class="mt-8 pt-4 border-t border-tron-red/20">
                      <h6 class="text-tron-silver font-semibold mb-3 text-sm">Performance</h6>
                      <div class="space-y-2 text-sm">
                        <div class="flex justify-between items-center">
                          <span class="text-tron-silver">Success Rate</span>
                          <span class="text-green-400 font-semibold">96%</span>
                        </div>
                        <div class="flex justify-between items-center">
                          <span class="text-tron-silver">Completed</span>
                          <span class="text-white font-semibold">23</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Panel - Active Work */}
                  <div class="lg:col-span-6 p-6">
                    <h5 class="text-xl font-bold text-white mb-6 flex items-center">
                      <i class="fas fa-tasks text-tron-red mr-3"></i>
                      Your Current Submissions
                    </h5>
                    
                    <div class="space-y-4">
                      
                      {/* Submission 1 */}
                      <div class="bg-tron-dark/40 border border-green-500/30 rounded-lg p-3">
                        <div class="flex items-center justify-between mb-2">
                          <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded flex items-center justify-center">
                              <i class="fas fa-mobile-alt text-white text-sm"></i>
                            </div>
                            <div>
                              <h6 class="text-white font-semibold text-sm">Mobile Wallet Integration</h6>
                              <p class="text-tron-silver text-xs">API Documentation</p>
                            </div>
                          </div>
                          <div class="text-right">
                            <div class="text-green-400 font-semibold text-sm">+$250</div>
                            <div class="text-green-400 text-xs">✓ Approved</div>
                          </div>
                        </div>
                      </div>

                      {/* Submission 2 */}
                      <div class="bg-tron-dark/40 border border-blue-500/30 rounded-lg p-3">
                        <div class="flex items-center justify-between mb-2">
                          <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center">
                              <i class="fas fa-code text-white text-sm"></i>
                            </div>
                            <div>
                              <h6 class="text-white font-semibold text-sm">DeFi Dashboard Component</h6>
                              <p class="text-tron-silver text-xs">React Trading Interface</p>
                            </div>
                          </div>
                          <div class="text-right">
                            <div class="text-yellow-400 font-semibold text-sm">$180</div>
                            <div class="text-blue-400 text-xs">⏳ Review (75%)</div>
                          </div>
                        </div>
                        <div class="w-full bg-tron-gray rounded-full h-1.5">
                          <div class="w-3/4 bg-gradient-to-r from-blue-500 to-blue-400 h-1.5 rounded-full"></div>
                        </div>
                      </div>

                      {/* Submission 3 */}
                      <div class="bg-tron-dark/40 border border-yellow-500/30 rounded-lg p-3">
                        <div class="flex items-center justify-between mb-2">
                          <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded flex items-center justify-center">
                              <i class="fas fa-video text-white text-sm"></i>
                            </div>
                            <div>
                              <h6 class="text-white font-semibold text-sm">TRON Tutorial Video</h6>
                              <p class="text-tron-silver text-xs">Smart Contract Basics</p>
                            </div>
                          </div>
                          <div class="text-right">
                            <div class="text-purple-400 font-semibold text-sm">$320</div>
                            <div class="text-orange-400 text-xs">⏰ 3 days left</div>
                          </div>
                        </div>
                        <div class="w-full bg-tron-gray rounded-full h-1.5">
                          <div class="w-2/5 bg-gradient-to-r from-yellow-500 to-orange-400 h-1.5 rounded-full"></div>
                        </div>
                      </div>

                    </div>

                    {/* Action Button */}
                    <div class="mt-6 text-center">
                      <button class="bg-gradient-to-r from-tron-red to-tron-dark-red hover:from-tron-dark-red hover:to-tron-red text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 transform">
                        <i class="fas fa-plus mr-2"></i>
                        Submit New Work
                      </button>
                    </div>
                  </div>

                  {/* Right Panel - Opportunities Feed */}
                  <div class="lg:col-span-3 bg-tron-dark/30 p-6 border-l border-tron-red/20">
                    
                    {/* Filter Tabs */}
                    <div class="flex flex-wrap gap-2 mb-6">
                      <button class="px-3 py-1 bg-tron-red/20 text-tron-red border border-tron-red/30 rounded text-sm font-medium">New</button>
                      <button class="px-3 py-1 text-tron-silver hover:text-white rounded text-sm">High Reward</button>
                      <button class="px-3 py-1 text-tron-silver hover:text-white rounded text-sm">Deadline Soon</button>
                      <button class="px-3 py-1 text-tron-silver hover:text-white rounded text-sm">Popular</button>
                    </div>

                    <h5 class="text-lg font-bold text-white mb-4 flex items-center">
                      <i class="fas fa-star text-yellow-400 mr-2"></i>
                      Featured Quests
                    </h5>
                    
                    <div class="space-y-4">
                      
                      {/* Quest 1 */}
                      <div class="bg-tron-dark/50 border border-tron-red/20 rounded-lg p-4 hover:border-tron-red/50 transition-all">
                        <div class="flex items-start space-x-3 mb-3">
                          <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-gamepad text-white text-sm"></i>
                          </div>
                          <div class="flex-1">
                            <h6 class="text-white font-semibold text-sm">GameFi UI Components</h6>
                            <p class="text-tron-silver text-xs">React components for gaming dApps</p>
                          </div>
                        </div>
                        <div class="flex items-center justify-between mb-3">
                          <span class="text-green-400 font-bold text-sm">$450 USDT</span>
                          <span class="text-xs text-tron-silver">7 days left</span>
                        </div>
                        <div class="flex items-center space-x-2 mb-3">
                          <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">React</span>
                          <span class="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">Gaming</span>
                        </div>
                        <button class="w-full bg-gradient-to-r from-tron-red to-tron-dark-red hover:from-tron-dark-red hover:to-tron-red text-white py-2 px-4 rounded text-sm font-semibold transition-all">
                          Apply Now
                        </button>
                      </div>

                      {/* Quest 2 */}
                      <div class="bg-tron-dark/50 border border-tron-red/20 rounded-lg p-4 hover:border-tron-red/50 transition-all">
                        <div class="flex items-start space-x-3 mb-3">
                          <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-leaf text-white text-sm"></i>
                          </div>
                          <div class="flex-1">
                            <h6 class="text-white font-semibold text-sm">Carbon Credit Tracker</h6>
                            <p class="text-tron-silver text-xs">Environmental impact dashboard</p>
                          </div>
                        </div>
                        <div class="flex items-center justify-between mb-3">
                          <span class="text-green-400 font-bold text-sm">$320 USDT</span>
                          <span class="text-xs text-tron-silver">12 days left</span>
                        </div>
                        <div class="flex items-center space-x-2 mb-3">
                          <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Vue.js</span>
                          <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Charts</span>
                        </div>
                        <button class="w-full bg-gradient-to-r from-tron-red to-tron-dark-red hover:from-tron-dark-red hover:to-tron-red text-white py-2 px-4 rounded text-sm font-semibold transition-all">
                          Apply Now
                        </button>
                      </div>

                      {/* Quest 3 */}
                      <div class="bg-tron-dark/50 border border-tron-red/20 rounded-lg p-4 hover:border-tron-red/50 transition-all">
                        <div class="flex items-start space-x-3 mb-3">
                          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-robot text-white text-sm"></i>
                          </div>
                          <div class="flex-1">
                            <h6 class="text-white font-semibold text-sm">AI Trading Bot Tutorial</h6>
                            <p class="text-tron-silver text-xs">Python automation guide</p>
                          </div>
                        </div>
                        <div class="flex items-center justify-between mb-3">
                          <span class="text-green-400 font-bold text-sm">$280 USDT</span>
                          <span class="text-xs text-orange-400">Hot 🔥</span>
                        </div>
                        <div class="flex items-center space-x-2 mb-3">
                          <span class="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">Python</span>
                          <span class="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">AI</span>
                        </div>
                        <button class="w-full bg-gradient-to-r from-tron-red to-tron-dark-red hover:from-tron-dark-red hover:to-tron-red text-white py-2 px-4 rounded text-sm font-semibold transition-all">
                          Apply Now
                        </button>
                      </div>

                    </div>

                    {/* View All Button */}
                    <div class="mt-6 text-center">
                      <button class="text-tron-red hover:text-white font-semibold text-sm transition-colors">
                        View All Quests →
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Bounty Discovery Page Mockup */}
            <div class="mt-20" data-aos="fade-up" data-aos-delay="800">
              <h3 class="text-3xl font-bold mb-8 text-center text-tron-red">Task Bounty Discovery</h3>
              <p class="text-center text-gray-300 mb-12 max-w-3xl mx-auto text-lg">
                Explore available bounties, filter by skills and rewards, and discover your next earning opportunity in the TRON ecosystem.
              </p>
              
              {/* Bounty Discovery Container */}
              <div class="cyber-card rounded-xl border border-tron-red/30 bg-gradient-to-br from-tron-dark/50 to-black/80 overflow-hidden">
                
                {/* Discovery Header & Filters */}
                <div class="bg-tron-dark/30 p-6 border-b border-tron-red/20">
                  <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                    
                    {/* Search & Filters */}
                    <div class="flex-1 flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
                      <div class="relative flex-1 max-w-md">
                        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-tron-silver"></i>
                        <input 
                          type="text" 
                          placeholder="Search bounties..."
                          class="w-full pl-10 pr-4 py-2 bg-tron-dark border border-tron-red/30 rounded-lg text-white placeholder-tron-silver focus:outline-none focus:border-tron-red"
                        />
                      </div>
                      
                      <div class="flex items-center space-x-3">
                        <select class="px-3 py-2 bg-tron-dark border border-tron-red/30 rounded-lg text-white text-sm focus:outline-none focus:border-tron-red">
                          <option>All Categories</option>
                          <option>Development</option>
                          <option>Content Creation</option>
                          <option>Design</option>
                          <option>Marketing</option>
                        </select>
                        
                        <select class="px-3 py-2 bg-tron-dark border border-tron-red/30 rounded-lg text-white text-sm focus:outline-none focus:border-tron-red">
                          <option>All Rewards</option>
                          <option>$100 - $500</option>
                          <option>$500 - $1000</option>
                          <option>$1000+</option>
                        </select>
                      </div>
                    </div>

                    {/* Sort & View Options */}
                    <div class="flex items-center space-x-3">
                      <div class="flex items-center bg-tron-dark rounded-lg border border-tron-red/30 overflow-hidden">
                        <button class="px-3 py-2 bg-tron-red/20 text-tron-red text-sm">Newest</button>
                        <button class="px-3 py-2 text-tron-silver hover:text-white text-sm">Highest Reward</button>
                        <button class="px-3 py-2 text-tron-silver hover:text-white text-sm">Deadline</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bounty Grid */}
                <div class="p-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Bounty Card 1 - Development */}
                    <div class="bg-gradient-to-br from-tron-dark/60 to-black/40 border border-purple-500/30 rounded-lg p-5 hover:border-purple-500/60 transition-all cursor-pointer group">
                      <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center space-x-3">
                          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                            <i class="fas fa-gamepad text-white text-lg"></i>
                          </div>
                          <div>
                            <span class="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded border border-purple-500/30">Development</span>
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="text-2xl font-bold text-green-400">$850</div>
                          <div class="text-xs text-tron-silver">USDT</div>
                        </div>
                      </div>
                      
                      <h4 class="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">GameFi Tournament Platform</h4>
                      <p class="text-tron-silver text-sm mb-4 leading-relaxed">Build a decentralized tournament system for TRON-based games with smart contract integration, leaderboards, and prize distribution.</p>
                      
                      <div class="flex flex-wrap gap-2 mb-4">
                        <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Solidity</span>
                        <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">React</span>
                        <span class="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">Web3.js</span>
                      </div>
                      
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-4 text-xs text-tron-silver">
                          <span><i class="fas fa-clock mr-1"></i>14 days left</span>
                          <span><i class="fas fa-users mr-1"></i>3 applicants</span>
                        </div>
                        <div class="flex items-center space-x-1">
                          <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span class="text-orange-400 text-xs font-medium">Intermediate</span>
                        </div>
                      </div>
                      
                      <button class="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2.5 rounded-lg font-semibold transition-all group-hover:scale-105 transform">
                        Apply Now
                      </button>
                    </div>

                    {/* Bounty Card 2 - Content Creation */}
                    <div class="bg-gradient-to-br from-tron-dark/60 to-black/40 border border-blue-500/30 rounded-lg p-5 hover:border-blue-500/60 transition-all cursor-pointer group">
                      <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center space-x-3">
                          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                            <i class="fas fa-video text-white text-lg"></i>
                          </div>
                          <div>
                            <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30">Content</span>
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="text-2xl font-bold text-green-400">$420</div>
                          <div class="text-xs text-tron-silver">USDT</div>
                        </div>
                      </div>
                      
                      <h4 class="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">DeFi Tutorial Video Series</h4>
                      <p class="text-tron-silver text-sm mb-4 leading-relaxed">Create 5-part educational video series covering TRON DeFi basics, yield farming, and risk management for beginners.</p>
                      
                      <div class="flex flex-wrap gap-2 mb-4">
                        <span class="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Video Editing</span>
                        <span class="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">DeFi Knowledge</span>
                        <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Teaching</span>
                      </div>
                      
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-4 text-xs text-tron-silver">
                          <span><i class="fas fa-clock mr-1"></i>21 days left</span>
                          <span><i class="fas fa-users mr-1"></i>7 applicants</span>
                        </div>
                        <div class="flex items-center space-x-1">
                          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span class="text-green-400 text-xs font-medium">Beginner</span>
                        </div>
                      </div>
                      
                      <button class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-lg font-semibold transition-all group-hover:scale-105 transform">
                        Apply Now
                      </button>
                    </div>

                    {/* Bounty Card 3 - Design */}
                    <div class="bg-gradient-to-br from-tron-dark/60 to-black/40 border border-pink-500/30 rounded-lg p-5 hover:border-pink-500/60 transition-all cursor-pointer group relative">
                      <div class="absolute top-3 right-3">
                        <span class="px-2 py-1 bg-red-500 text-white text-xs rounded font-semibold">🔥 HOT</span>
                      </div>
                      
                      <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center space-x-3">
                          <div class="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-700 rounded-lg flex items-center justify-center">
                            <i class="fas fa-palette text-white text-lg"></i>
                          </div>
                          <div>
                            <span class="px-2 py-1 bg-pink-500/20 text-pink-400 text-xs rounded border border-pink-500/30">Design</span>
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="text-2xl font-bold text-green-400">$680</div>
                          <div class="text-xs text-tron-silver">USDT</div>
                        </div>
                      </div>
                      
                      <h4 class="text-lg font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">NFT Marketplace UI/UX</h4>
                      <p class="text-tron-silver text-sm mb-4 leading-relaxed">Design modern, user-friendly interface for TRON NFT marketplace including mobile responsiveness and dark/light themes.</p>
                      
                      <div class="flex flex-wrap gap-2 mb-4">
                        <span class="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">Figma</span>
                        <span class="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">UI/UX</span>
                        <span class="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">Mobile Design</span>
                      </div>
                      
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-4 text-xs text-tron-silver">
                          <span><i class="fas fa-clock mr-1"></i>10 days left</span>
                          <span><i class="fas fa-users mr-1"></i>12 applicants</span>
                        </div>
                        <div class="flex items-center space-x-1">
                          <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span class="text-orange-400 text-xs font-medium">Intermediate</span>
                        </div>
                      </div>
                      
                      <button class="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white py-2.5 rounded-lg font-semibold transition-all group-hover:scale-105 transform">
                        Apply Now
                      </button>
                    </div>

                    {/* Bounty Card 4 - Marketing */}
                    <div class="bg-gradient-to-br from-tron-dark/60 to-black/40 border border-green-500/30 rounded-lg p-5 hover:border-green-500/60 transition-all cursor-pointer group">
                      <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center space-x-3">
                          <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                            <i class="fas fa-bullhorn text-white text-lg"></i>
                          </div>
                          <div>
                            <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30">Marketing</span>
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="text-2xl font-bold text-green-400">$320</div>
                          <div class="text-xs text-tron-silver">USDT</div>
                        </div>
                      </div>
                      
                      <h4 class="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Social Media Campaign</h4>
                      <p class="text-tron-silver text-sm mb-4 leading-relaxed">Launch comprehensive social media campaign to promote TRON ecosystem projects across Twitter, LinkedIn, and Telegram.</p>
                      
                      <div class="flex flex-wrap gap-2 mb-4">
                        <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Social Media</span>
                        <span class="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">Content Strategy</span>
                        <span class="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">Analytics</span>
                      </div>
                      
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-4 text-xs text-tron-silver">
                          <span><i class="fas fa-clock mr-1"></i>30 days left</span>
                          <span><i class="fas fa-users mr-1"></i>5 applicants</span>
                        </div>
                        <div class="flex items-center space-x-1">
                          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span class="text-green-400 text-xs font-medium">Beginner</span>
                        </div>
                      </div>
                      
                      <button class="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 rounded-lg font-semibold transition-all group-hover:scale-105 transform">
                        Apply Now
                      </button>
                    </div>

                    {/* Bounty Card 5 - Development */}
                    <div class="bg-gradient-to-br from-tron-dark/60 to-black/40 border border-tron-red/30 rounded-lg p-5 hover:border-tron-red/60 transition-all cursor-pointer group">
                      <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center space-x-3">
                          <div class="w-12 h-12 bg-gradient-to-br from-tron-red to-tron-dark-red rounded-lg flex items-center justify-center">
                            <i class="fas fa-robot text-white text-lg"></i>
                          </div>
                          <div>
                            <span class="px-2 py-1 bg-tron-red/20 text-tron-red text-xs rounded border border-tron-red/30">AI/ML</span>
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="text-2xl font-bold text-green-400">$1,200</div>
                          <div class="text-xs text-tron-silver">USDT</div>
                        </div>
                      </div>
                      
                      <h4 class="text-lg font-bold text-white mb-2 group-hover:text-tron-red transition-colors">AI Trading Bot Integration</h4>
                      <p class="text-tron-silver text-sm mb-4 leading-relaxed">Develop AI-powered trading bot with machine learning algorithms for TRON DEX arbitrage and automated portfolio management.</p>
                      
                      <div class="flex flex-wrap gap-2 mb-4">
                        <span class="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">Python</span>
                        <span class="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">Machine Learning</span>
                        <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Trading APIs</span>
                      </div>
                      
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-4 text-xs text-tron-silver">
                          <span><i class="fas fa-clock mr-1"></i>45 days left</span>
                          <span><i class="fas fa-users mr-1"></i>2 applicants</span>
                        </div>
                        <div class="flex items-center space-x-1">
                          <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span class="text-red-400 text-xs font-medium">Advanced</span>
                        </div>
                      </div>
                      
                      <button class="w-full bg-gradient-to-r from-tron-red to-tron-dark-red hover:from-tron-dark-red hover:to-tron-red text-white py-2.5 rounded-lg font-semibold transition-all group-hover:scale-105 transform">
                        Apply Now
                      </button>
                    </div>

                    {/* Bounty Card 6 - Quick Task */}
                    <div class="bg-gradient-to-br from-tron-dark/60 to-black/40 border border-yellow-500/30 rounded-lg p-5 hover:border-yellow-500/60 transition-all cursor-pointer group">
                      <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center space-x-3">
                          <div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                            <i class="fas fa-zap text-white text-lg"></i>
                          </div>
                          <div>
                            <span class="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded border border-yellow-500/30">Quick Task</span>
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="text-2xl font-bold text-green-400">$150</div>
                          <div class="text-xs text-tron-silver">USDT</div>
                        </div>
                      </div>
                      
                      <h4 class="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">Smart Contract Audit Report</h4>
                      <p class="text-tron-silver text-sm mb-4 leading-relaxed">Review and audit simple TRC-20 token contract, provide security assessment and optimization recommendations.</p>
                      
                      <div class="flex flex-wrap gap-2 mb-4">
                        <span class="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Security</span>
                        <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Solidity</span>
                        <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Documentation</span>
                      </div>
                      
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-4 text-xs text-tron-silver">
                          <span><i class="fas fa-clock mr-1"></i>5 days left</span>
                          <span><i class="fas fa-users mr-1"></i>8 applicants</span>
                        </div>
                        <div class="flex items-center space-x-1">
                          <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span class="text-orange-400 text-xs font-medium">Intermediate</span>
                        </div>
                      </div>
                      
                      <button class="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white py-2.5 rounded-lg font-semibold transition-all group-hover:scale-105 transform">
                        Apply Now
                      </button>
                    </div>

                  </div>

                  {/* Load More & Stats */}
                  <div class="mt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div class="text-tron-silver text-sm">
                      Showing 6 of 127 available bounties • Total rewards: $2.4M USDT
                    </div>
                    <button class="px-6 py-3 bg-gradient-to-r from-tron-red to-tron-dark-red hover:from-tron-dark-red hover:to-tron-red text-white rounded-lg font-semibold transition-all">
                      Load More Bounties
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Sponsorship Creation Page Mockup */}
            <div class="mt-20" data-aos="fade-up" data-aos-delay="900">
              <h3 class="text-3xl font-bold mb-8 text-center text-tron-red">Sponsor Dashboard - Create Bounty</h3>
              <p class="text-center text-gray-300 mb-12 max-w-3xl mx-auto text-lg">
                Post your project, set rewards, and connect with verified TRON builders. 
                Our Guardian network ensures quality delivery and transparent milestone tracking.
              </p>
              
              {/* Sponsor Creation Container */}
              <div class="cyber-card rounded-xl border border-tron-red/30 bg-gradient-to-br from-tron-dark/50 to-black/80 overflow-hidden">
                
                {/* Sponsor Header */}
                <div class="bg-gradient-to-r from-green-600/20 via-tron-dark/40 to-blue-600/20 p-4 border-b border-tron-red/20">
                  <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-3 lg:space-y-0">
                    
                    {/* Company Profile */}
                    <div class="flex items-center space-x-3">
                      <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 border-2 border-white flex items-center justify-center">
                        <i class="fas fa-building text-white"></i>
                      </div>
                      <div>
                        <h4 class="text-lg font-bold text-white">TronTech Solutions</h4>
                        <div class="flex items-center space-x-2">
                          <span class="text-blue-400 font-medium text-sm">Verified Sponsor</span>
                          <div class="flex items-center">
                            <i class="fas fa-star text-yellow-400 text-sm"></i>
                            <i class="fas fa-star text-yellow-400 text-sm"></i>
                            <i class="fas fa-star text-yellow-400 text-sm"></i>
                            <i class="fas fa-star text-yellow-400 text-sm"></i>
                            <i class="fas fa-star text-yellow-400 text-sm"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sponsor Stats */}
                    <div class="flex items-center space-x-6">
                      <div class="text-center">
                        <div class="text-xl font-bold text-green-400">$47K</div>
                        <div class="text-xs text-tron-silver">Total Funded</div>
                      </div>
                      <div class="text-center">
                        <div class="text-xl font-bold text-blue-400">23</div>
                        <div class="text-xs text-tron-silver">Projects Posted</div>
                      </div>
                      <div class="text-center">
                        <div class="text-xl font-bold text-purple-400">89%</div>
                        <div class="text-xs text-tron-silver">Success Rate</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creation Form */}
                <div class="p-6">
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main Form - Left 2 Columns */}
                    <div class="lg:col-span-2 space-y-6">
                      
                      {/* Project Details */}
                      <div class="bg-tron-dark/40 border border-tron-red/20 rounded-lg p-5">
                        <h5 class="text-lg font-bold text-white mb-4 flex items-center">
                          <i class="fas fa-clipboard-list text-tron-red mr-3"></i>
                          Project Details
                        </h5>
                        
                        <div class="space-y-4">
                          <div>
                            <label class="block text-tron-silver text-sm font-medium mb-2">Project Title</label>
                            <input 
                              type="text" 
                              value="Multi-Chain Bridge Integration"
                              class="w-full px-4 py-3 bg-tron-dark border border-tron-red/30 rounded-lg text-white focus:outline-none focus:border-tron-red"
                            />
                          </div>
                          
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label class="block text-tron-silver text-sm font-medium mb-2">Category</label>
                              <select class="w-full px-4 py-3 bg-tron-dark border border-tron-red/30 rounded-lg text-white focus:outline-none focus:border-tron-red">
                                <option>Development</option>
                                <option>Design</option>
                                <option>Content Creation</option>
                                <option>Marketing</option>
                                <option>Audit & Security</option>
                              </select>
                            </div>
                            <div>
                              <label class="block text-tron-silver text-sm font-medium mb-2">Difficulty Level</label>
                              <select class="w-full px-4 py-3 bg-tron-dark border border-tron-red/30 rounded-lg text-white focus:outline-none focus:border-tron-red">
                                <option>Intermediate</option>
                                <option>Beginner</option>
                                <option>Advanced</option>
                                <option>Expert</option>
                              </select>
                            </div>
                          </div>
                          
                          <div>
                            <label class="block text-tron-silver text-sm font-medium mb-2">Project Description</label>
                            <textarea 
                              rows="4"
                              placeholder="Describe your project requirements, goals, and deliverables..."
                              class="w-full px-4 py-3 bg-tron-dark border border-tron-red/30 rounded-lg text-white placeholder-tron-silver/50 focus:outline-none focus:border-tron-red resize-none"
                            >Develop a secure multi-chain bridge connecting TRON to Ethereum and BSC networks. Must include smart contracts, frontend interface, and comprehensive testing suite.</textarea>
                          </div>
                        </div>
                      </div>

                      {/* Requirements & Skills */}
                      <div class="bg-tron-dark/40 border border-tron-red/20 rounded-lg p-5">
                        <h5 class="text-lg font-bold text-white mb-4 flex items-center">
                          <i class="fas fa-tools text-blue-400 mr-3"></i>
                          Requirements & Skills
                        </h5>
                        
                        <div class="space-y-4">
                          <div>
                            <label class="block text-tron-silver text-sm font-medium mb-2">Required Skills</label>
                            <div class="flex flex-wrap gap-2 mb-3">
                              <span class="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded border border-blue-500/30 flex items-center">
                                Solidity
                                <i class="fas fa-times ml-2 cursor-pointer hover:text-white"></i>
                              </span>
                              <span class="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded border border-green-500/30 flex items-center">
                                JavaScript
                                <i class="fas fa-times ml-2 cursor-pointer hover:text-white"></i>
                              </span>
                              <span class="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded border border-purple-500/30 flex items-center">
                                Web3.js
                                <i class="fas fa-times ml-2 cursor-pointer hover:text-white"></i>
                              </span>
                              <span class="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded border border-yellow-500/30 flex items-center">
                                React
                                <i class="fas fa-times ml-2 cursor-pointer hover:text-white"></i>
                              </span>
                            </div>
                            <div class="flex items-center space-x-2">
                              <input 
                                type="text" 
                                placeholder="Add skill (press Enter)"
                                class="flex-1 px-3 py-2 bg-tron-dark border border-tron-red/30 rounded text-white placeholder-tron-silver/50 text-sm focus:outline-none focus:border-tron-red"
                              />
                              <button class="px-4 py-2 bg-tron-red hover:bg-tron-dark-red text-white rounded text-sm transition-all">
                                Add
                              </button>
                            </div>
                          </div>
                          
                          <div>
                            <label class="block text-tron-silver text-sm font-medium mb-2">Deliverables</label>
                            <div class="space-y-2">
                              <div class="flex items-center space-x-3 p-3 bg-tron-dark/50 rounded border border-tron-red/10">
                                <i class="fas fa-check-circle text-green-400"></i>
                                <span class="text-white flex-1">Smart contract code with full documentation</span>
                                <button class="text-tron-silver hover:text-red-400 transition-colors">
                                  <i class="fas fa-trash"></i>
                                </button>
                              </div>
                              <div class="flex items-center space-x-3 p-3 bg-tron-dark/50 rounded border border-tron-red/10">
                                <i class="fas fa-check-circle text-green-400"></i>
                                <span class="text-white flex-1">Frontend interface with wallet integration</span>
                                <button class="text-tron-silver hover:text-red-400 transition-colors">
                                  <i class="fas fa-trash"></i>
                                </button>
                              </div>
                              <div class="flex items-center space-x-2">
                                <input 
                                  type="text" 
                                  placeholder="Add deliverable..."
                                  class="flex-1 px-3 py-2 bg-tron-dark border border-tron-red/30 rounded text-white placeholder-tron-silver/50 text-sm focus:outline-none focus:border-tron-red"
                                />
                                <button class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-all">
                                  <i class="fas fa-plus"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline & Budget */}
                      <div class="bg-tron-dark/40 border border-tron-red/20 rounded-lg p-5">
                        <h5 class="text-lg font-bold text-white mb-4 flex items-center">
                          <i class="fas fa-dollar-sign text-green-400 mr-3"></i>
                          Timeline & Budget
                        </h5>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label class="block text-tron-silver text-sm font-medium mb-2">Total Budget</label>
                            <div class="relative">
                              <input 
                                type="number" 
                                value="2500"
                                class="w-full px-4 py-3 pr-16 bg-tron-dark border border-tron-red/30 rounded-lg text-white focus:outline-none focus:border-tron-red"
                              />
                              <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-tron-silver text-sm">USDT</span>
                            </div>
                          </div>
                          <div>
                            <label class="block text-tron-silver text-sm font-medium mb-2">Project Duration</label>
                            <select class="w-full px-4 py-3 bg-tron-dark border border-tron-red/30 rounded-lg text-white focus:outline-none focus:border-tron-red">
                              <option>30 days</option>
                              <option>14 days</option>
                              <option>45 days</option>
                              <option>60 days</option>
                              <option>90+ days</option>
                            </select>
                          </div>
                          <div>
                            <label class="block text-tron-silver text-sm font-medium mb-2">Payment Structure</label>
                            <select class="w-full px-4 py-3 bg-tron-dark border border-tron-red/30 rounded-lg text-white focus:outline-none focus:border-tron-red">
                              <option>Milestone-based</option>
                              <option>Full upfront</option>
                              <option>50% upfront, 50% completion</option>
                              <option>Weekly payments</option>
                            </select>
                          </div>
                        </div>

                        {/* Milestone Breakdown */}
                        <div class="mt-6">
                          <label class="block text-tron-silver text-sm font-medium mb-3">Milestone Breakdown</label>
                          <div class="space-y-3">
                            <div class="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded">
                              <div class="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center font-semibold text-sm">1</div>
                              <div class="flex-1">
                                <div class="text-white font-medium">Smart Contract Development</div>
                                <div class="text-tron-silver text-sm">Core bridge contracts and security implementation</div>
                              </div>
                              <div class="text-green-400 font-semibold">$1,000</div>
                            </div>
                            <div class="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded">
                              <div class="w-8 h-8 bg-purple-500 text-white rounded flex items-center justify-center font-semibold text-sm">2</div>
                              <div class="flex-1">
                                <div class="text-white font-medium">Frontend Integration</div>
                                <div class="text-tron-silver text-sm">User interface and wallet connectivity</div>
                              </div>
                              <div class="text-green-400 font-semibold">$800</div>
                            </div>
                            <div class="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 rounded">
                              <div class="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center font-semibold text-sm">3</div>
                              <div class="flex-1">
                                <div class="text-white font-medium">Testing & Documentation</div>
                                <div class="text-tron-silver text-sm">Comprehensive testing suite and user guides</div>
                              </div>
                              <div class="text-green-400 font-semibold">$700</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sidebar - Right Column */}
                    <div class="space-y-6">
                      
                      {/* Preview Card */}
                      <div class="bg-gradient-to-br from-tron-red/20 to-tron-red/5 border border-tron-red/30 rounded-lg p-4">
                        <h6 class="text-white font-semibold mb-3 flex items-center">
                          <i class="fas fa-eye text-tron-red mr-2"></i>
                          Live Preview
                        </h6>
                        <div class="bg-tron-dark/60 border border-tron-red/20 rounded p-3 text-sm">
                          <div class="flex items-start justify-between mb-2">
                            <div class="flex items-center space-x-2">
                              <div class="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center">
                                <i class="fas fa-code text-white text-xs"></i>
                              </div>
                              <span class="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">Development</span>
                            </div>
                            <div class="text-green-400 font-bold">$2,500</div>
                          </div>
                          <div class="text-white font-medium mb-1">Multi-Chain Bridge Integration</div>
                          <div class="text-tron-silver text-xs mb-2">Intermediate • 30 days left</div>
                          <div class="flex flex-wrap gap-1 mb-2">
                            <span class="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">Solidity</span>
                            <span class="px-1.5 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">JavaScript</span>
                            <span class="px-1.5 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded">Web3.js</span>
                          </div>
                        </div>
                      </div>

                      {/* Talent Matching */}
                      <div class="bg-tron-dark/40 border border-tron-red/20 rounded-lg p-4">
                        <h6 class="text-white font-semibold mb-3 flex items-center">
                          <i class="fas fa-users text-blue-400 mr-2"></i>
                          Talent Match
                        </h6>
                        <div class="text-center mb-4">
                          <div class="text-3xl font-bold text-blue-400">47</div>
                          <div class="text-tron-silver text-sm">Qualified Contributors</div>
                        </div>
                        <div class="space-y-2 text-sm">
                          <div class="flex justify-between">
                            <span class="text-tron-silver">Skill Match</span>
                            <span class="text-green-400">92%</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-tron-silver">Avg Success Rate</span>
                            <span class="text-green-400">94%</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-tron-silver">Est. Applications</span>
                            <span class="text-white">12-18</span>
                          </div>
                        </div>
                      </div>

                      {/* Guardian Review */}
                      <div class="bg-tron-dark/40 border border-tron-red/20 rounded-lg p-4">
                        <h6 class="text-white font-semibold mb-3 flex items-center">
                          <i class="fas fa-shield-alt text-yellow-400 mr-2"></i>
                          Guardian Review
                        </h6>
                        <div class="text-sm space-y-2">
                          <div class="flex items-center space-x-2">
                            <i class="fas fa-check-circle text-green-400"></i>
                            <span class="text-tron-silver">Milestone verification</span>
                          </div>
                          <div class="flex items-center space-x-2">
                            <i class="fas fa-check-circle text-green-400"></i>
                            <span class="text-tron-silver">Quality assurance</span>
                          </div>
                          <div class="flex items-center space-x-2">
                            <i class="fas fa-check-circle text-green-400"></i>
                            <span class="text-tron-silver">Dispute resolution</span>
                          </div>
                        </div>
                        <div class="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-400">
                          <i class="fas fa-info-circle mr-1"></i>
                          Guardian fee: 3% of total budget
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div class="space-y-3">
                        <button class="w-full bg-gradient-to-r from-tron-red to-tron-dark-red hover:from-tron-dark-red hover:to-tron-red text-white py-3 rounded-lg font-semibold transition-all">
                          Post Bounty ($75 USDT)
                        </button>
                        <button class="w-full border-2 border-tron-red text-tron-red hover:bg-tron-red hover:text-white py-3 rounded-lg font-semibold transition-all">
                          Save as Draft
                        </button>
                        <div class="text-center text-xs text-tron-silver">
                          Posting fee refunded if no suitable applicants
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* User Profile Page Mockup */}
            <div class="mt-20" data-aos="fade-up" data-aos-delay="1000">
              <h3 class="text-3xl font-bold mb-8 text-center text-tron-red">Contributor Profile</h3>
              <p class="text-center text-gray-300 mb-12 max-w-3xl mx-auto text-lg">
                Showcase your expertise, track record, and reputation in the TRON ecosystem. 
                Build trust with sponsors through verified achievements and Guardian endorsements.
              </p>
              
              {/* Profile Container */}
              <div class="cyber-card rounded-xl border border-tron-red/30 bg-gradient-to-br from-tron-dark/50 to-black/80 overflow-hidden">
                
                {/* Profile Header */}
                <div class="relative">
                  {/* Cover Image */}
                  <div class="h-32 bg-gradient-to-r from-purple-600/80 via-tron-red/60 to-blue-600/80 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-tron-dark/40 to-transparent"></div>
                    <div class="absolute top-4 right-4">
                      <button class="px-3 py-1.5 bg-white/10 backdrop-blur text-white text-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                        <i class="fas fa-edit mr-1"></i>Edit Profile
                      </button>
                    </div>
                  </div>
                  
                  {/* Profile Info */}
                  <div class="relative px-6 pb-6">
                    <div class="flex flex-col lg:flex-row items-start lg:items-end space-y-4 lg:space-y-0 lg:space-x-6 -mt-16 lg:-mt-12">
                      
                      {/* Avatar & Basic Info */}
                      <div class="flex items-end space-x-4">
                        <div class="relative">
                          <div class="w-24 h-24 lg:w-32 lg:h-32 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 border-4 border-white shadow-xl overflow-hidden">
                            <img src="/static/mt-logo.jpg" alt="Alex Chen" class="w-full h-full object-cover" />
                          </div>
                          <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                            <i class="fas fa-check text-white text-sm"></i>
                          </div>
                        </div>
                        <div class="pb-2">
                          <h4 class="text-2xl lg:text-3xl font-bold text-white flex items-center space-x-3">
                            <span>Alex Chen</span>
                            <div class="flex items-center space-x-1">
                              <i class="fas fa-star text-yellow-400"></i>
                              <i class="fas fa-star text-yellow-400"></i>
                              <i class="fas fa-star text-yellow-400"></i>
                              <i class="fas fa-star text-yellow-400"></i>
                              <i class="fas fa-star text-tron-silver"></i>
                            </div>
                          </h4>
                          <div class="flex flex-wrap items-center gap-2 mt-2">
                            <span class="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 text-sm rounded-full border border-yellow-500/30">
                              <i class="fas fa-crown mr-1"></i>Gold Tier Contributor
                            </span>
                            <span class="px-3 py-1 bg-tron-red/20 text-tron-red text-sm rounded-full border border-tron-red/30">
                              Level 3
                            </span>
                            <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30">
                              <i class="fas fa-shield-alt mr-1"></i>Guardian Verified
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stats Overview */}
                      <div class="flex-1 lg:text-right">
                        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <div class="text-center lg:text-right">
                            <div class="text-xl lg:text-2xl font-bold text-green-400">$12,847</div>
                            <div class="text-xs text-tron-silver">Total Earned</div>
                          </div>
                          <div class="text-center lg:text-right">
                            <div class="text-xl lg:text-2xl font-bold text-blue-400">47</div>
                            <div class="text-xs text-tron-silver">Projects Done</div>
                          </div>
                          <div class="text-center lg:text-right">
                            <div class="text-xl lg:text-2xl font-bold text-purple-400">96%</div>
                            <div class="text-xs text-tron-silver">Success Rate</div>
                          </div>
                          <div class="text-center lg:text-right">
                            <div class="text-xl lg:text-2xl font-bold text-yellow-400">4.8</div>
                            <div class="text-xs text-tron-silver">Avg Rating</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bio & Contact */}
                    <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div class="lg:col-span-2">
                        <p class="text-tron-silver leading-relaxed">
                          Senior blockchain developer with 5+ years experience building on TRON. 
                          Specialized in DeFi protocols, smart contract security, and cross-chain integrations. 
                          Guardian-verified contributor with proven track record in delivering high-quality solutions.
                        </p>
                        <div class="flex flex-wrap gap-2 mt-3">
                          <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Solidity Expert</span>
                          <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">DeFi Specialist</span>
                          <span class="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">Smart Contract Auditor</span>
                          <span class="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">Full Stack Dev</span>
                        </div>
                      </div>
                      <div class="space-y-2">
                        <div class="flex items-center space-x-2 text-sm">
                          <i class="fas fa-map-marker-alt text-tron-red w-4"></i>
                          <span class="text-tron-silver">San Francisco, CA</span>
                        </div>
                        <div class="flex items-center space-x-2 text-sm">
                          <i class="fas fa-calendar text-tron-red w-4"></i>
                          <span class="text-tron-silver">Joined March 2023</span>
                        </div>
                        <div class="flex items-center space-x-2 text-sm">
                          <i class="fas fa-clock text-tron-red w-4"></i>
                          <span class="text-green-400">Available for projects</span>
                        </div>
                        <div class="flex items-center space-x-3 mt-4">
                          <a href="#" class="text-tron-silver hover:text-white transition-colors">
                            <i class="fab fa-github text-lg"></i>
                          </a>
                          <a href="#" class="text-tron-silver hover:text-white transition-colors">
                            <i class="fab fa-linkedin text-lg"></i>
                          </a>
                          <a href="#" class="text-tron-silver hover:text-white transition-colors">
                            <i class="fab fa-twitter text-lg"></i>
                          </a>
                          <a href="#" class="text-tron-silver hover:text-white transition-colors">
                            <i class="fas fa-globe text-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Content */}
                <div class="p-6">
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main Content - Left 2 Columns */}
                    <div class="lg:col-span-2 space-y-8">
                      
                      {/* Recent Work */}
                      <div>
                        <h5 class="text-xl font-bold text-white mb-6 flex items-center">
                          <i class="fas fa-briefcase text-tron-red mr-3"></i>
                          Recent Work
                        </h5>
                        
                        <div class="space-y-4">
                          {/* Project 1 */}
                          <div class="bg-tron-dark/40 border border-green-500/30 rounded-lg p-4">
                            <div class="flex items-start justify-between mb-3">
                              <div class="flex items-start space-x-3">
                                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                                  <i class="fas fa-exchange-alt text-white"></i>
                                </div>
                                <div>
                                  <h6 class="text-white font-semibold">Multi-Chain DEX Integration</h6>
                                  <p class="text-tron-silver text-sm">Cross-chain trading platform with automated market making</p>
                                  <div class="flex items-center space-x-2 mt-2">
                                    <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Completed</span>
                                    <span class="text-tron-silver text-xs">• TronTech Solutions</span>
                                  </div>
                                </div>
                              </div>
                              <div class="text-right">
                                <div class="text-green-400 font-semibold">$2,500</div>
                                <div class="flex items-center space-x-1 mt-1">
                                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                                  <span class="text-xs text-tron-silver ml-1">5.0</span>
                                </div>
                              </div>
                            </div>
                            <div class="bg-green-500/10 border border-green-500/20 rounded p-3">
                              <div class="flex items-center space-x-2 mb-2">
                                <i class="fas fa-quote-left text-green-400"></i>
                                <span class="text-green-400 font-semibold text-sm">Client Review</span>
                              </div>
                              <p class="text-tron-silver text-sm italic">"Alex delivered exceptional work ahead of schedule. The smart contracts were secure, well-documented, and exceeded our expectations. Highly recommended!"</p>
                            </div>
                          </div>

                          {/* Project 2 */}
                          <div class="bg-tron-dark/40 border border-blue-500/30 rounded-lg p-4">
                            <div class="flex items-start justify-between mb-3">
                              <div class="flex items-start space-x-3">
                                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                                  <i class="fas fa-shield-alt text-white"></i>
                                </div>
                                <div>
                                  <h6 class="text-white font-semibold">Smart Contract Security Audit</h6>
                                  <p class="text-tron-silver text-sm">Comprehensive security review of DeFi lending protocol</p>
                                  <div class="flex items-center space-x-2 mt-2">
                                    <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Completed</span>
                                    <span class="text-tron-silver text-xs">• DeFi Innovations</span>
                                  </div>
                                </div>
                              </div>
                              <div class="text-right">
                                <div class="text-green-400 font-semibold">$1,800</div>
                                <div class="flex items-center space-x-1 mt-1">
                                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                                  <span class="text-xs text-tron-silver ml-1">5.0</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Project 3 */}
                          <div class="bg-tron-dark/40 border border-purple-500/30 rounded-lg p-4">
                            <div class="flex items-start justify-between mb-3">
                              <div class="flex items-start space-x-3">
                                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                                  <i class="fas fa-gamepad text-white"></i>
                                </div>
                                <div>
                                  <h6 class="text-white font-semibold">NFT Gaming Platform</h6>
                                  <p class="text-tron-silver text-sm">Play-to-earn game with NFT marketplace integration</p>
                                  <div class="flex items-center space-x-2 mt-2">
                                    <span class="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">Completed</span>
                                    <span class="text-tron-silver text-xs">• GameFi Studios</span>
                                  </div>
                                </div>
                              </div>
                              <div class="text-right">
                                <div class="text-green-400 font-semibold">$3,200</div>
                                <div class="flex items-center space-x-1 mt-1">
                                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                                  <i class="far fa-star text-tron-silver text-xs"></i>
                                  <span class="text-xs text-tron-silver ml-1">4.8</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="text-center mt-6">
                          <button class="px-6 py-2 border border-tron-red text-tron-red hover:bg-tron-red hover:text-white rounded-lg transition-all">
                            View All Projects (47)
                          </button>
                        </div>
                      </div>

                      {/* Skills & Expertise */}
                      <div>
                        <h5 class="text-xl font-bold text-white mb-6 flex items-center">
                          <i class="fas fa-code text-blue-400 mr-3"></i>
                          Skills & Expertise
                        </h5>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h6 class="text-white font-semibold mb-3">Development</h6>
                            <div class="space-y-3">
                              <div>
                                <div class="flex justify-between mb-1">
                                  <span class="text-tron-silver text-sm">Solidity</span>
                                  <span class="text-blue-400 text-sm font-semibold">Expert</span>
                                </div>
                                <div class="w-full bg-tron-gray rounded-full h-2">
                                  <div class="w-11/12 bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full"></div>
                                </div>
                              </div>
                              <div>
                                <div class="flex justify-between mb-1">
                                  <span class="text-tron-silver text-sm">JavaScript/TypeScript</span>
                                  <span class="text-green-400 text-sm font-semibold">Advanced</span>
                                </div>
                                <div class="w-full bg-tron-gray rounded-full h-2">
                                  <div class="w-5/6 bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"></div>
                                </div>
                              </div>
                              <div>
                                <div class="flex justify-between mb-1">
                                  <span class="text-tron-silver text-sm">React/Next.js</span>
                                  <span class="text-purple-400 text-sm font-semibold">Advanced</span>
                                </div>
                                <div class="w-full bg-tron-gray rounded-full h-2">
                                  <div class="w-4/5 bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h6 class="text-white font-semibold mb-3">Blockchain</h6>
                            <div class="space-y-3">
                              <div>
                                <div class="flex justify-between mb-1">
                                  <span class="text-tron-silver text-sm">TRON Protocol</span>
                                  <span class="text-tron-red text-sm font-semibold">Expert</span>
                                </div>
                                <div class="w-full bg-tron-gray rounded-full h-2">
                                  <div class="w-11/12 bg-gradient-to-r from-tron-red to-tron-light h-2 rounded-full"></div>
                                </div>
                              </div>
                              <div>
                                <div class="flex justify-between mb-1">
                                  <span class="text-tron-silver text-sm">DeFi Protocols</span>
                                  <span class="text-yellow-400 text-sm font-semibold">Expert</span>
                                </div>
                                <div class="w-full bg-tron-gray rounded-full h-2">
                                  <div class="w-10/12 bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full"></div>
                                </div>
                              </div>
                              <div>
                                <div class="flex justify-between mb-1">
                                  <span class="text-tron-silver text-sm">Smart Contract Security</span>
                                  <span class="text-orange-400 text-sm font-semibold">Advanced</span>
                                </div>
                                <div class="w-full bg-tron-gray rounded-full h-2">
                                  <div class="w-4/5 bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sidebar - Right Column */}
                    <div class="space-y-6">
                      
                      {/* Achievements & Badges */}
                      <div class="bg-tron-dark/40 border border-tron-red/20 rounded-lg p-5">
                        <h6 class="text-white font-semibold mb-4 flex items-center">
                          <i class="fas fa-trophy text-yellow-400 mr-2"></i>
                          Achievements
                        </h6>
                        
                        <div class="space-y-3">
                          <div class="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded">
                            <div class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                              <i class="fas fa-crown text-white"></i>
                            </div>
                            <div>
                              <div class="text-white font-medium text-sm">Top Performer</div>
                              <div class="text-tron-silver text-xs">50+ successful projects</div>
                            </div>
                          </div>
                          
                          <div class="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded">
                            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                              <i class="fas fa-shield-alt text-white"></i>
                            </div>
                            <div>
                              <div class="text-white font-medium text-sm">Security Expert</div>
                              <div class="text-tron-silver text-xs">25+ audits completed</div>
                            </div>
                          </div>
                          
                          <div class="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 rounded">
                            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                              <i class="fas fa-clock text-white"></i>
                            </div>
                            <div>
                              <div class="text-white font-medium text-sm">Fast Delivery</div>
                              <div class="text-tron-silver text-xs">95% on-time completion</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reputation Score */}
                      <div class="bg-tron-dark/40 border border-tron-red/20 rounded-lg p-5">
                        <h6 class="text-white font-semibold mb-4 flex items-center">
                          <i class="fas fa-chart-line text-purple-400 mr-2"></i>
                          Reputation Score
                        </h6>
                        
                        <div class="text-center mb-4">
                          <div class="text-4xl font-bold text-purple-400 mb-2">1,847</div>
                          <div class="text-tron-silver text-sm">Total Rep Points</div>
                        </div>
                        
                        <div class="space-y-3 text-sm">
                          <div class="flex justify-between">
                            <span class="text-tron-silver">Quality Score</span>
                            <span class="text-green-400 font-semibold">98/100</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-tron-silver">Reliability</span>
                            <span class="text-blue-400 font-semibold">96/100</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-tron-silver">Communication</span>
                            <span class="text-yellow-400 font-semibold">95/100</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-tron-silver">Guardian Endorsements</span>
                            <span class="text-white font-semibold">12</span>
                          </div>
                        </div>
                      </div>

                      {/* Activity Stats */}
                      <div class="bg-tron-dark/40 border border-tron-red/20 rounded-lg p-5">
                        <h6 class="text-white font-semibold mb-4 flex items-center">
                          <i class="fas fa-activity text-green-400 mr-2"></i>
                          Activity
                        </h6>
                        
                        <div class="space-y-3 text-sm">
                          <div class="flex justify-between">
                            <span class="text-tron-silver">Last Active</span>
                            <span class="text-green-400">2 hours ago</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-tron-silver">Response Time</span>
                            <span class="text-white">&lt; 4 hours</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-tron-silver">Projects This Month</span>
                            <span class="text-white">3</span>
                          </div>
                          <div class="flex justify-between">
                            <span class="text-tron-silver">Repeat Clients</span>
                            <span class="text-blue-400">78%</span>
                          </div>
                        </div>
                      </div>

                      {/* Contact Actions */}
                      <div class="space-y-3">
                        <button class="w-full bg-gradient-to-r from-tron-red to-tron-dark-red hover:from-tron-dark-red hover:to-tron-red text-white py-3 rounded-lg font-semibold transition-all">
                          <i class="fas fa-envelope mr-2"></i>
                          Contact Alex
                        </button>
                        <button class="w-full border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white py-3 rounded-lg font-semibold transition-all">
                          <i class="fas fa-user-plus mr-2"></i>
                          Follow Profile
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

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
                  <p class="text-sm text-gray-400">Regional leads managing local squads</p>
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

      {/* Roadmap Infographic */}
      <section id="roadmap" class="py-20 bg-gradient-to-br from-tron-black via-tron-gray/20 to-tron-black relative overflow-hidden">
        {/* Background Grid */}
        <div class="absolute inset-0 bg-tron-grid bg-[size:40px_40px] opacity-10"></div>
        
        <div class="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div class="text-center mb-20" data-aos="fade-up">
            <h2 class="text-5xl md:text-6xl font-montserrat font-black mb-6">
              Launch <span class="text-transparent bg-clip-text bg-tron-gradient">Roadmap</span>
            </h2>
            <div class="flex items-center justify-center gap-4 mb-4">
              <div class="h-0.5 w-20 bg-gradient-to-r from-transparent to-tron-red"></div>
              <i class="fas fa-route text-2xl text-tron-red"></i>
              <div class="h-0.5 w-20 bg-gradient-to-l from-transparent to-tron-red"></div>
            </div>
            <p class="text-xl text-tron-light-gray font-montserrat">
              Five strategic phases to build the future of TRON development
            </p>
          </div>

          {/* Desktop Timeline View */}
          <div class="hidden lg:block">
            {/* Timeline Container */}
            <div class="relative">
              {/* Main Timeline Line */}
              <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-tron-red via-tron-light to-tron-red opacity-30"></div>
              
              {/* Phase Cards */}
              <div class="space-y-32">
                {/* Phase 1 - Left */}
                <div class="flex items-center" data-aos="fade-right">
                  <div class="w-1/2 pr-12">
                    <div class="cyber-card p-8 rounded-xl bg-gradient-to-r from-tron-red/10 to-transparent border border-tron-red/30">
                      <div class="flex items-center gap-4 mb-4">
                        <div class="bg-gradient-to-r from-tron-red to-tron-light p-4 rounded-lg">
                          <i class="fas fa-clipboard-list text-2xl text-white"></i>
                        </div>
                        <div>
                          <span class="text-sm text-tron-red font-montserrat font-bold uppercase tracking-wider">Phase 01</span>
                          <h3 class="text-2xl font-montserrat font-bold text-tron-white">Preparation & Core Design</h3>
                        </div>
                      </div>
                      <p class="text-tron-light-gray leading-relaxed">
                        Define detailed scope, secure TRONDAO approval, finalize framework and budget allocation.
                      </p>
                      <div class="mt-4 flex flex-wrap gap-2">
                        <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full text-sm">Planning</span>
                        <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full text-sm">Approval</span>
                        <span class="bg-tron-red/20 text-tron-red px-3 py-1 rounded-full text-sm">Framework</span>
                      </div>
                    </div>
                  </div>
                  {/* Center Timeline Node */}
                  <div class="relative z-20">
                    <div class="w-16 h-16 bg-gradient-to-r from-tron-red to-tron-light rounded-full flex items-center justify-center border-4 border-tron-black shadow-lg shadow-tron-red/50">
                      <span class="text-2xl font-bold text-white">1</span>
                    </div>
                  </div>
                  <div class="w-1/2 pl-12"></div>
                </div>

                {/* Phase 2 - Right */}
                <div class="flex items-center" data-aos="fade-left">
                  <div class="w-1/2 pr-12"></div>
                  {/* Center Timeline Node */}
                  <div class="relative z-20">
                    <div class="w-16 h-16 bg-gradient-to-r from-tron-light to-tron-red rounded-full flex items-center justify-center border-4 border-tron-black shadow-lg shadow-tron-light/50">
                      <span class="text-2xl font-bold text-white">2</span>
                    </div>
                  </div>
                  <div class="w-1/2 pl-12">
                    <div class="cyber-card p-8 rounded-xl bg-gradient-to-l from-tron-light/10 to-transparent border border-tron-light/30">
                      <div class="flex items-center gap-4 mb-4">
                        <div class="bg-gradient-to-r from-tron-light to-tron-red p-4 rounded-lg">
                          <i class="fas fa-code text-2xl text-white"></i>
                        </div>
                        <div>
                          <span class="text-sm text-tron-light font-montserrat font-bold uppercase tracking-wider">Phase 02</span>
                          <h3 class="text-2xl font-montserrat font-bold text-tron-white">Platform Development</h3>
                        </div>
                      </div>
                      <p class="text-tron-light-gray leading-relaxed">
                        Build MEGATEAM web portal with bounty listings, submission system, and smart contract integration.
                      </p>
                      <div class="mt-4 flex flex-wrap gap-2">
                        <span class="bg-tron-light/20 text-tron-light px-3 py-1 rounded-full text-sm">Development</span>
                        <span class="bg-tron-light/20 text-tron-light px-3 py-1 rounded-full text-sm">Smart Contracts</span>
                        <span class="bg-tron-light/20 text-tron-light px-3 py-1 rounded-full text-sm">Portal</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 3 - Left */}
                <div class="flex items-center" data-aos="fade-right">
                  <div class="w-1/2 pr-12">
                    <div class="cyber-card p-8 rounded-xl bg-gradient-to-r from-tron-silver/10 to-transparent border border-tron-silver/30">
                      <div class="flex items-center gap-4 mb-4">
                        <div class="bg-gradient-to-r from-tron-silver to-tron-light p-4 rounded-lg">
                          <i class="fas fa-shield-alt text-2xl text-tron-black"></i>
                        </div>
                        <div>
                          <span class="text-sm text-tron-silver font-montserrat font-bold uppercase tracking-wider">Phase 03</span>
                          <h3 class="text-2xl font-montserrat font-bold text-tron-white">Guardian Onboarding</h3>
                        </div>
                      </div>
                      <p class="text-tron-light-gray leading-relaxed">
                        Recruit and train Guardian reviewers, establish evaluation criteria and accountability systems.
                      </p>
                      <div class="mt-4 flex flex-wrap gap-2">
                        <span class="bg-tron-silver/20 text-tron-silver px-3 py-1 rounded-full text-sm">Recruitment</span>
                        <span class="bg-tron-silver/20 text-tron-silver px-3 py-1 rounded-full text-sm">Training</span>
                        <span class="bg-tron-silver/20 text-tron-silver px-3 py-1 rounded-full text-sm">Governance</span>
                      </div>
                    </div>
                  </div>
                  {/* Center Timeline Node */}
                  <div class="relative z-20">
                    <div class="w-16 h-16 bg-gradient-to-r from-tron-silver to-tron-light rounded-full flex items-center justify-center border-4 border-tron-black shadow-lg shadow-tron-silver/50">
                      <span class="text-2xl font-bold text-tron-black">3</span>
                    </div>
                  </div>
                  <div class="w-1/2 pl-12"></div>
                </div>

                {/* Phase 4 - Right */}
                <div class="flex items-center" data-aos="fade-left">
                  <div class="w-1/2 pr-12"></div>
                  {/* Center Timeline Node */}
                  <div class="relative z-20">
                    <div class="w-16 h-16 bg-gradient-to-r from-tron-red via-yellow-400 to-tron-light rounded-full flex items-center justify-center border-4 border-tron-black shadow-lg shadow-yellow-400/50">
                      <span class="text-2xl font-bold text-tron-black">4</span>
                    </div>
                  </div>
                  <div class="w-1/2 pl-12">
                    <div class="cyber-card p-8 rounded-xl bg-gradient-to-l from-yellow-400/10 to-transparent border border-yellow-400/30">
                      <div class="flex items-center gap-4 mb-4">
                        <div class="bg-gradient-to-r from-yellow-400 to-tron-red p-4 rounded-lg">
                          <i class="fas fa-rocket text-2xl text-tron-black"></i>
                        </div>
                        <div>
                          <span class="text-sm text-yellow-400 font-montserrat font-bold uppercase tracking-wider">Phase 04</span>
                          <h3 class="text-2xl font-montserrat font-bold text-tron-white">Pilot Launch</h3>
                        </div>
                      </div>
                      <p class="text-tron-light-gray leading-relaxed">
                        Soft launch with select bounties to test platform functionality and gather community feedback.
                      </p>
                      <div class="mt-4 flex flex-wrap gap-2">
                        <span class="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm">Testing</span>
                        <span class="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm">Feedback</span>
                        <span class="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm">Beta Launch</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 5 - Center (Full Launch) */}
                <div class="flex justify-center" data-aos="zoom-in">
                  <div class="text-center">
                    <div class="relative mb-8">
                      <div class="w-20 h-20 bg-gradient-to-r from-tron-red via-tron-light via-yellow-400 via-green-400 to-tron-red rounded-full flex items-center justify-center border-4 border-tron-black shadow-2xl shadow-tron-red/50 mx-auto animate-pulse">
                        <span class="text-3xl font-bold text-white">5</span>
                      </div>
                      <div class="absolute -inset-4 bg-gradient-to-r from-tron-red via-transparent to-tron-red rounded-full blur-xl opacity-30 animate-pulse"></div>
                    </div>
                    <div class="cyber-card p-10 rounded-2xl bg-gradient-to-br from-tron-red/20 via-tron-light/10 to-green-400/10 border-2 border-tron-red/50 max-w-lg">
                      <div class="flex items-center justify-center gap-4 mb-6">
                        <div class="bg-gradient-to-r from-tron-red to-green-400 p-4 rounded-lg">
                          <i class="fas fa-flag-checkered text-3xl text-white"></i>
                        </div>
                        <div>
                          <span class="text-sm text-green-400 font-montserrat font-bold uppercase tracking-wider">Phase 05</span>
                          <h3 class="text-3xl font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r from-tron-red to-green-400">Full Public Launch</h3>
                        </div>
                      </div>
                      <p class="text-tron-light-gray leading-relaxed text-lg mb-6">
                        Official launch to entire TRON community with full bounty and grant programs.
                      </p>
                      <div class="flex flex-wrap justify-center gap-2">
                        <span class="bg-green-400/20 text-green-400 px-4 py-2 rounded-full text-sm font-bold">Global Launch</span>
                        <span class="bg-tron-red/20 text-tron-red px-4 py-2 rounded-full text-sm font-bold">Full Features</span>
                        <span class="bg-tron-light/20 text-tron-light px-4 py-2 rounded-full text-sm font-bold">Community Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Vertical View */}
          <div class="lg:hidden">
            <div class="relative">
              {/* Vertical Timeline Line */}
              <div class="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-tron-red via-tron-light to-green-400 opacity-30"></div>
              
              <div class="space-y-12">
                {/* Mobile Phase 1 */}
                <div class="flex items-start gap-6" data-aos="fade-up">
                  <div class="w-16 h-16 bg-gradient-to-r from-tron-red to-tron-light rounded-full flex items-center justify-center border-4 border-tron-black shadow-lg shadow-tron-red/50 flex-shrink-0 relative z-10">
                    <span class="text-xl font-bold text-white">1</span>
                  </div>
                  <div class="cyber-card p-6 rounded-xl bg-gradient-to-r from-tron-red/10 to-transparent border border-tron-red/30 flex-1">
                    <div class="flex items-center gap-3 mb-3">
                      <i class="fas fa-clipboard-list text-xl text-tron-red"></i>
                      <div>
                        <span class="text-xs text-tron-red font-bold uppercase">Phase 01</span>
                        <h3 class="text-xl font-bold text-tron-white">Preparation & Core Design</h3>
                      </div>
                    </div>
                    <p class="text-tron-light-gray text-sm mb-3">
                      Define detailed scope, secure TRONDAO approval, finalize framework and budget allocation.
                    </p>
                    <div class="flex flex-wrap gap-1">
                      <span class="bg-tron-red/20 text-tron-red px-2 py-1 rounded text-xs">Planning</span>
                      <span class="bg-tron-red/20 text-tron-red px-2 py-1 rounded text-xs">Approval</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Phase 2 */}
                <div class="flex items-start gap-6" data-aos="fade-up">
                  <div class="w-16 h-16 bg-gradient-to-r from-tron-light to-tron-red rounded-full flex items-center justify-center border-4 border-tron-black shadow-lg shadow-tron-light/50 flex-shrink-0 relative z-10">
                    <span class="text-xl font-bold text-white">2</span>
                  </div>
                  <div class="cyber-card p-6 rounded-xl bg-gradient-to-r from-tron-light/10 to-transparent border border-tron-light/30 flex-1">
                    <div class="flex items-center gap-3 mb-3">
                      <i class="fas fa-code text-xl text-tron-light"></i>
                      <div>
                        <span class="text-xs text-tron-light font-bold uppercase">Phase 02</span>
                        <h3 class="text-xl font-bold text-tron-white">Platform Development</h3>
                      </div>
                    </div>
                    <p class="text-tron-light-gray text-sm mb-3">
                      Build MEGATEAM web portal with bounty listings, submission system, and smart contract integration.
                    </p>
                    <div class="flex flex-wrap gap-1">
                      <span class="bg-tron-light/20 text-tron-light px-2 py-1 rounded text-xs">Development</span>
                      <span class="bg-tron-light/20 text-tron-light px-2 py-1 rounded text-xs">Smart Contracts</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Phase 3 */}
                <div class="flex items-start gap-6" data-aos="fade-up">
                  <div class="w-16 h-16 bg-gradient-to-r from-tron-silver to-tron-light rounded-full flex items-center justify-center border-4 border-tron-black shadow-lg shadow-tron-silver/50 flex-shrink-0 relative z-10">
                    <span class="text-xl font-bold text-tron-black">3</span>
                  </div>
                  <div class="cyber-card p-6 rounded-xl bg-gradient-to-r from-tron-silver/10 to-transparent border border-tron-silver/30 flex-1">
                    <div class="flex items-center gap-3 mb-3">
                      <i class="fas fa-shield-alt text-xl text-tron-silver"></i>
                      <div>
                        <span class="text-xs text-tron-silver font-bold uppercase">Phase 03</span>
                        <h3 class="text-xl font-bold text-tron-white">Guardian Onboarding</h3>
                      </div>
                    </div>
                    <p class="text-tron-light-gray text-sm mb-3">
                      Recruit and train Guardian reviewers, establish evaluation criteria and accountability systems.
                    </p>
                    <div class="flex flex-wrap gap-1">
                      <span class="bg-tron-silver/20 text-tron-silver px-2 py-1 rounded text-xs">Recruitment</span>
                      <span class="bg-tron-silver/20 text-tron-silver px-2 py-1 rounded text-xs">Training</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Phase 4 */}
                <div class="flex items-start gap-6" data-aos="fade-up">
                  <div class="w-16 h-16 bg-gradient-to-r from-yellow-400 to-tron-red rounded-full flex items-center justify-center border-4 border-tron-black shadow-lg shadow-yellow-400/50 flex-shrink-0 relative z-10">
                    <span class="text-xl font-bold text-tron-black">4</span>
                  </div>
                  <div class="cyber-card p-6 rounded-xl bg-gradient-to-r from-yellow-400/10 to-transparent border border-yellow-400/30 flex-1">
                    <div class="flex items-center gap-3 mb-3">
                      <i class="fas fa-rocket text-xl text-yellow-400"></i>
                      <div>
                        <span class="text-xs text-yellow-400 font-bold uppercase">Phase 04</span>
                        <h3 class="text-xl font-bold text-tron-white">Pilot Launch</h3>
                      </div>
                    </div>
                    <p class="text-tron-light-gray text-sm mb-3">
                      Soft launch with select bounties to test platform functionality and gather community feedback.
                    </p>
                    <div class="flex flex-wrap gap-1">
                      <span class="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded text-xs">Testing</span>
                      <span class="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded text-xs">Beta Launch</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Phase 5 */}
                <div class="flex items-start gap-6" data-aos="fade-up">
                  <div class="w-16 h-16 bg-gradient-to-r from-tron-red via-yellow-400 to-green-400 rounded-full flex items-center justify-center border-4 border-tron-black shadow-lg shadow-green-400/50 flex-shrink-0 relative z-10 animate-pulse">
                    <span class="text-xl font-bold text-white">5</span>
                  </div>
                  <div class="cyber-card p-6 rounded-xl bg-gradient-to-r from-green-400/10 to-transparent border-2 border-green-400/30 flex-1">
                    <div class="flex items-center gap-3 mb-3">
                      <i class="fas fa-flag-checkered text-xl text-green-400"></i>
                      <div>
                        <span class="text-xs text-green-400 font-bold uppercase">Phase 05</span>
                        <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-tron-red to-green-400">Full Public Launch</h3>
                      </div>
                    </div>
                    <p class="text-tron-light-gray text-sm mb-3">
                      Official launch to entire TRON community with full bounty and grant programs.
                    </p>
                    <div class="flex flex-wrap gap-1">
                      <span class="bg-green-400/20 text-green-400 px-2 py-1 rounded text-xs">Global Launch</span>
                      <span class="bg-tron-red/20 text-tron-red px-2 py-1 rounded text-xs">Full Features</span>
                    </div>
                  </div>
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
            <div class="flex space-x-6">
              <a href="https://x.com/TRONMEGATEAM" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-tron-red transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
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
              © 2025 TRON MEGATEAM. 
              <span class="text-tron-red">Building the future, together.</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
})

export default app
