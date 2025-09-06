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
        
        {/* Custom Tailwind Config */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    'tron-red': '#FF060A',
                    'tron-dark': '#1A1A1A',
                    'tron-gray': '#2A2A2A'
                  },
                  animation: {
                    'fade-in': 'fadeIn 0.6s ease-in-out',
                    'slide-up': 'slideUp 0.8s ease-out',
                    'bounce-slow': 'bounce 2s infinite'
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body class="bg-black text-white font-sans antialiased">
        {children}
        
        {/* Scripts */}
        <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
        <link href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" rel="stylesheet" />
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
