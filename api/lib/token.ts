import { SignJWT } from 'jose';
import { TextEncoder } from 'util';


export async function createJoseToken(payload: { id: string; email: string }, expiresIn: string): Promise<string> {
 
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' }) 
        .setIssuedAt()
        .setExpirationTime(expiresIn) 
        .sign(secret); 
        
    return token;
}