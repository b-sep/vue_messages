export type LoginForm = {
  email_address: string
}

export type LoginResponse = {
  user_id: number
  user_name: string
  token: string
}

export type LoginAxiosResponse = {
  status: number
  data: LoginResponse | null
}
