import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TRON MEGATEAM - Building the Future Together</title>
        <meta name="description" content="Join the largest, most inclusive builder movement in crypto history. Build, earn, and prosper on the TRON blockchain with MEGATEAM." />
        {/* Favicon - Multiple formats for better browser support */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TRON MEGATEAM" />
        <meta property="og:title" content="TRON MEGATEAM - Building the Future Together" />
        <meta property="og:description" content="Join the largest, most inclusive builder movement in crypto history. Build, earn, and prosper on the TRON blockchain with MEGATEAM." />
        <meta property="og:image" content="https://tron-megateam.pages.dev/thumbnail.jpg" />
        <meta property="og:image:secure_url" content="https://tron-megateam.pages.dev/thumbnail.jpg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="TRON MEGATEAM Logo - MT" />
        <meta property="og:url" content="https://www.megateam.network" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="TRON MEGATEAM - Building the Future Together" />
        <meta name="twitter:description" content="Join the largest, most inclusive builder movement in crypto history. Build, earn, and prosper on the TRON blockchain with MEGATEAM." />
        <meta name="twitter:image" content="https://tron-megateam.pages.dev/thumbnail.jpg" />
        
        {/* Additional Messaging App Support */}
        <meta property="telegram:channel" content="@tronmegateam" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="twitter:image:alt" content="MEGATEAM Logo - MT" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#FF060A" />
        <meta name="msapplication-TileColor" content="#FF060A" />
        <meta name="keywords" content="TRON, blockchain, cryptocurrency, DeFi, Web3, builder, developer, MEGATEAM, TRX, USDT" />
        <meta name="author" content="TRON MEGATEAM" />
        <link rel="canonical" href="https://www.megateam.network" />
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Custom Styles */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        {/* Custom Tailwind Config */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    'tron-red': '#FF060A',
                    'tron-light': '#FF4444',
                    'tron-dark-red': '#CC0408',
                    'tron-black': '#000000',
                    'tron-dark': '#111111',
                    'tron-gray': '#333333',
                    'tron-light-gray': '#666666',
                    'tron-white': '#FFFFFF',
                    'tron-silver': '#C0C0C0',
                    'gold-400': '#FBBF24',
                    'gold-500': '#F59E0B',
                    'gold-600': '#D97706'
                  },
                  fontFamily: {
                    'montserrat': ['Montserrat', 'sans-serif'],
                    'sans': ['Montserrat', 'sans-serif']
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
                    'cyber-scan': 'cyberScan 2s linear infinite',
                    'tron-glow': 'tronGlow 2s ease-in-out infinite alternate'
                  },
                  backgroundImage: {
                    'tron-grid': "linear-gradient(rgba(255, 6, 10, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 6, 10, 0.1) 1px, transparent 1px)",
                    'tron-gradient': 'linear-gradient(45deg, #FF060A, #FF4444, #CC0408)',
                    'tron-holographic': 'linear-gradient(45deg, #FF060A, #FF4444, #FF060A, #CC0408)',
                    'tron-radial': 'radial-gradient(ellipse at center, rgba(255, 6, 10, 0.2) 0%, transparent 70%)'
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body class="bg-tron-black text-tron-white font-montserrat antialiased overflow-x-hidden relative">
        {/* TRON Grid Background */}
        <div class="fixed inset-0 bg-tron-grid bg-[size:50px_50px] opacity-30 pointer-events-none z-0"></div>
        
        {/* Matrix Rain Canvas */}
        <canvas id="matrix-canvas" class="fixed inset-0 pointer-events-none z-10 opacity-15"></canvas>
        

        {children}
        
        {/* Scripts */}
        <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
        <link href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" rel="stylesheet" />
        <script src="/static/navigation.js"></script>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
