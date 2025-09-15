'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const cookieStore = await cookies();
    const encodedToken = cookieStore.get('next-auth.session-token')?.value || cookieStore.get("__Secure-next-auth.session-token")?.value; 
    if (!encodedToken) 
      return null;

    try {
      const decodedToken = await decode({
        token: encodedToken,
        secret: process.env.AUTH_SECRET!,
      });
      return decodedToken!.token;
      // console.log('Decodedddddddd token', decodedToken!.token);
    } catch (error) {
      console.log('Token error: ', error);
      return null;
    }


}