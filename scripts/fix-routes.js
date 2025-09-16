#!/usr/bin/env node

/**
 * Fix _routes.json to exclude favicon files from worker routing
 * This ensures favicon files are served directly by Cloudflare Pages
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesPath = path.join(__dirname, '../dist/_routes.json');

if (fs.existsSync(routesPath)) {
  const routes = {
    version: 1,
    include: ["/*"],
    exclude: [
      "/static/*",
      "/favicon.ico",
      "/favicon.svg", 
      "/favicon-*.png",
      "/apple-touch-icon.png"
    ]
  };
  
  fs.writeFileSync(routesPath, JSON.stringify(routes));
  console.log('✅ Updated _routes.json to exclude favicon files');
} else {
  console.log('❌ _routes.json not found - run npm run build first');
}