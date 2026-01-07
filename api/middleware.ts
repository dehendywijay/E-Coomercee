// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = [
  '/api/auth*',

];

const AUTH_PROTECTED_MATCHERS = ['/api/user/profile*', '/api/store/account*']; // yang wajib lewat accessToken

function withCors(request: NextRequest, response?: NextResponse | Response) {
  const origin = request.headers.get('origin') || '*';

  
  const res = response ?? NextResponse.next();

  res.headers.set('Access-Control-Allow-Origin', origin);
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.headers.set('Access-Control-Allow-Credentials', 'true');
  res.headers.set('Access-Control-Max-Age', '86400');

  return res;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  if (request.method === 'OPTIONS') {
    const preflightResponse = new Response(null, { status: 200 });
    return withCors(request, preflightResponse);
  }

  const response = withCors(request);

  const needAuth = AUTH_PROTECTED_MATCHERS.some((base) =>
    pathname.startsWith(base)
  );

  if (!needAuth) {
    return response;
  }

 
  if (PUBLIC_PATHS.some((route) => pathname.startsWith(route))) {
    return response;
  }


  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized: Token tidak ditemukan' },
      { status: 401 }
    );
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    await jwtVerify(token, secret);
    if (payload.type !== "access") {
    return NextResponse.json(
      { error: "Forbidden: Token bukan access token" },
      { status: 403 }
    );
  }
    return response;
  } catch (err) {
    console.error(
      'JWT Verification Failed:',
      (err as Error).name,
      (err as Error).message
    );
    return NextResponse.json(
      { error: 'Forbidden: Token tidak valid' },
      { status: 403 }
    );
  }
}

// CORS untuk semua path, tapi auth cuma untuk /api/* dan /home/*
export const config = {
  matcher: ['/:path*'],
};
