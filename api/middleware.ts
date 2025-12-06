
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = [
    '/api/login',
    '/api/register'
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    let response: NextResponse | Response;

    const origin = request.headers.get('origin') || '*'
    
    if (request.method === 'OPTIONS') {
        response = new Response(null, { status: 200 });
    } else {
        response = NextResponse.next();
    }
    
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    response.headers.set('Access-Control-Max-Age', '86400')

    if (request.method === 'OPTIONS') {
        return response; 
    }
    
    if (PUBLIC_PATHS.some((route) => pathname.startsWith(route))) {
        return response; 
    }
    
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ error: "Unauthorized: Token tidak ditemukan" }, { status: 401 });
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        await jwtVerify(token, secret);

    } catch (err) {
         console.error('JWT Verification Failed:', (err as Error).name, (err as Error).message);
        return NextResponse.json({ error: "Forbidden: Token tidak valid" }, { status: 403 });
    }
}


export const config = {
    // Middleware akan dijalankan untuk semua path di bawah /api/ dan /home/
    matcher: ['/api/:pathname*', '/home/:pathname*'],
}