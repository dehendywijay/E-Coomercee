import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Debug: lihat request yang masuk
  console.log('Middleware executed for:', request.nextUrl.pathname)

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    const response = new Response(null, { status: 200 })
    setCorsHeaders(response)
    return response
  }

  // Apply CORS untuk semua API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    setCorsHeaders(response)
    return response
  }

  return NextResponse.next()
}

// Helper function untuk set CORS headers
function setCorsHeaders(response: Response) {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  response.headers.set('Access-Control-Max-Age', '86400') // 24 jam
}

// Konfigurasi untuk routes mana yang akan di-handle oleh middleware
export const config = {
  matcher: [
    '/api/:path*',        // Semua API routes
    '/((?!_next/static|_next/image|favicon.ico).*)', // Optional: semua routes kecuali static files
  ],
}