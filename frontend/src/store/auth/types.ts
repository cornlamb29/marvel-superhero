export interface UserJWTPayload {
  id: number,
  email: string,
  iat?: number,
  exp?: number
}
