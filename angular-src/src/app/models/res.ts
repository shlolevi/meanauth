export interface ResMessage {
  success?: string,
  token?: string,
  user?: {
    username: string,
    email: string
  },
  msg?: string
}
