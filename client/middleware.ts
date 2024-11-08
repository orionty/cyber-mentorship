import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Custom middleware logic for handling public routes
export function middleware(request: NextRequest) {
  // Add any custom logic here, such as handling cookies, checking headers, etc.
  
  return NextResponse.next();
}

// Configuration to match routes (replace this as needed)
export const config = {
  matcher: [
    '/',                    // Root path is public
    '/api/uploadthing',     // Public API route
    '/api/webhook',         // Public API route
    // Add any other public routes here
  ],
};
