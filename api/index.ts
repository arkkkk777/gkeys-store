/**
 * Vercel Serverless Function Handler for Express Backend
 * 
 * This file serves as the entry point for all /api/* requests on Vercel.
 * Vercel automatically routes /api/* requests to this serverless function.
 * 
 * Note: Vercel strips the /api prefix before calling this function,
 * but Express app expects paths with /api prefix, so we need to handle this.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// Import Express app from backend
// Use dynamic import to avoid executing server startup code
import type { Express } from 'express';

let app: Express | null = null;

async function getApp(): Promise<Express> {
  if (!app) {
    // Import the compiled backend (will be in backend/dist/index.js after build)
    // For development, we can import from source
    try {
      // Try compiled version first (production)
      const backendModule = await import('../backend/dist/index.js');
      app = backendModule.default as Express;
    } catch {
      // Fallback to source (development)
      const backendModule = await import('../backend/src/index.js');
      app = backendModule.default as Express;
    }
  }
  return app;
}

/**
 * Vercel Serverless Function Handler
 * Handles all requests to /api/* routes
 * 
 * Note: Vercel strips /api prefix, but Express app expects /api prefix in routes.
 * We need to add /api back to the path before passing to Express.
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  try {
    const expressApp = await getApp();
    
    // Create Express-compatible request/response objects
    // Vercel's request/response are compatible with Express
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expressReq = req as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expressRes = res as any;
    
    // Vercel strips /api prefix, but Express routes expect /api prefix
    // Add /api back to the URL path
    if (expressReq.url && !expressReq.url.startsWith('/api')) {
      expressReq.url = '/api' + expressReq.url;
      expressReq.originalUrl = '/api' + (expressReq.originalUrl || expressReq.url);
    }
    
    // Handle the request with Express app
    expressApp(expressReq, expressRes);
  } catch (error) {
    console.error('Serverless function error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: {
          message: 'Internal server error',
          ...(process.env.NODE_ENV === 'development' && { 
            details: error instanceof Error ? error.message : String(error) 
          }),
        },
      });
    }
  }
}
