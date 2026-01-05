import { SignJWT } from 'jose';
import { TextEncoder } from 'util';


export async function createJoseToken(payload: { id: number; email: string; name: string}, expiresIn: string): Promise<string> {
 
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' }) 
        .setIssuedAt()
        .setExpirationTime(expiresIn) 
        .sign(secret); 
        
    return token;
}

export async function createJoseRefreshToken(payload: { id: number; email: string ; name: string}, expiresIn: string): Promise<string> {
 
    const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET!);
    
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' }) 
        .setIssuedAt()
        .setExpirationTime(expiresIn) 
        .sign(secret); 
        
    return token;
}

export async function createJoseTokenRefresh(payload: { id: number; email: string; name: string, storeid: bigint}, expiresIn: string): Promise<string> {
 
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' }) 
        .setIssuedAt()
        .setExpirationTime(expiresIn) 
        .sign(secret); 
        
    return token;
}