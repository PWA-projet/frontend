export interface JwtI {
  token: {
    type: string;
    name: string | null;
    token: string;
    lastUsedAt: string | null;
    expiresAt: string;
  };
  id: number;
  email: string;
}
