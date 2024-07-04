import NextAuth from "next-auth";
import { JwtPayload } from "next-auth/jwt";
declare module "next-auth"{
    interface Session{
        user: {
          data:{
            user_id: string;
            username: string;
            email: string;
            created_at: string;
            updatedAt: string;
            name: number;
            discord_handle?:string;
            role:string
          }      
          success: boolean;
          iat: number,
    exp: number,
    jti: string
         

          },
         
            
          
        }
    }


    // Define the interface for the token obtained from getToken
export interface TokenPayload extends JwtPayload {
  
    data:{
        user_id: string;
        username: string;
        email: string;
        created_at: string;
        updatedAt: string;
        name: number;
        discord_handle?:string;
        role:string
      }    
    
      success: boolean;
      iat: number,
      exp: number,
      jti: string
   
      
    
  
}