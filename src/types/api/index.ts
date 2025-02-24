export type LoginForm = {
  email_address: string
}

export type LoginResponse = {
  token?: string
}

export type LoginAxiosResponse = {
  status: number
  data: LoginResponse
}
