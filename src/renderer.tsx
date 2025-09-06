import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TRON MEGATEAM - Building the Future Together</title>
        <meta name="description" content="Join the largest, most inclusive builder movement in crypto history. Build, earn, and prosper on the TRON blockchain with MEGATEAM." />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Custom Styles */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Custom Tailwind Config */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    'tron-red': '#FF060A',
                    'tron-blue': '#00D4FF',
                    'tron-purple': '#9D4EDD',
                    'tron-green': '#39FF14',
                    'tron-dark': '#0A0A0A',
                    'tron-gray': '#1A1A1A',
                    'cyber-blue': '#00FFFF',
                    'neon-pink': '#FF0080',
                    'electric-purple': '#8A2BE2'
                  },
                  fontFamily: {
                    'orbitron': ['Orbitron', 'monospace'],
                    'exo': ['Exo 2', 'sans-serif'],
                    'rajdhani': ['Rajdhani', 'sans-serif']
                  },
                  animation: {
                    'fade-in': 'fadeIn 0.6s ease-in-out',
                    'slide-up': 'slideUp 0.8s ease-out',
                    'bounce-slow': 'bounce 2s infinite',
                    'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
                    'matrix-rain': 'matrixRain 20s linear infinite',
                    'hologram': 'hologram 3s ease-in-out infinite',
                    'glitch': 'glitch 0.3s ease-in-out infinite',
                    'float': 'float 6s ease-in-out infinite',
                    'rotate-3d': 'rotate3d 20s linear infinite',
                    'cyber-scan': 'cyberScan 2s linear infinite'
                  },
                  backgroundImage: {
                    'cyber-grid': "linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)",
                    'neon-gradient': 'linear-gradient(45deg, #FF060A, #00D4FF, #9D4EDD, #39FF14)',
                    'holographic': 'linear-gradient(45deg, #ff0080, #00ffff, #ff0080, #00ffff)',
                    'matrix-bg': 'radial-gradient(ellipse at center, rgba(0, 255, 0, 0.1) 0%, transparent 70%)'
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body class="bg-tron-dark text-white font-exo antialiased overflow-x-hidden relative">
        {/* Cyber Grid Background */}
        <div class="fixed inset-0 bg-cyber-grid bg-[size:50px_50px] opacity-30 pointer-events-none z-0"></div>
        
        {/* Matrix Rain Canvas */}
        <canvas id="matrix-canvas" class="fixed inset-0 pointer-events-none z-10 opacity-20"></canvas>
        
        {/* Floating Geometric Shapes */}
        <div class="fixed inset-0 pointer-events-none z-10">
          <div class="absolute top-20 left-10 w-32 h-32 border border-cyber-blue opacity-20 animate-rotate-3d"></div>
          <div class="absolute top-40 right-20 w-24 h-24 border border-tron-red opacity-30 animate-float" style="animation-delay: 2s;"></div>
          <div class="absolute bottom-40 left-1/4 w-20 h-20 border border-neon-pink opacity-25 animate-rotate-3d" style="animation-delay: 4s;"></div>
          <div class="absolute top-1/3 right-1/3 w-16 h-16 border border-tron-green opacity-20 animate-float" style="animation-delay: 1s;"></div>
        </div>
        {children}
        
        {/* Scripts */}
        <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
        <link href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" rel="stylesheet" />
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
