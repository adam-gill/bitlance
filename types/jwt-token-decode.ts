export type jwtTokenDecode = {
    user: {
        user_id: string;
        username: string;
        email: string;
        created_at: string;
        updatedAt: string;
        name: number;
        discord_handle?:string;
        role:string
  },
    iat: number,
    exp: number,
    jti: string

  }