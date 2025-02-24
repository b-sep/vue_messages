import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { LoginForm, LoginResponse, LoginAxiosResponse } from '../types/api'

const api: AxiosInstance = axios.create({
  baseURL: 'http://0.0.0.0:3000/api',
  headers: { 'Accept': '*/*', 'Content-Type': 'application/json' }
})

// https://axios-http.com/docs/interceptors
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('voll@token')

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

export async function login(data: LoginForm): Promise<LoginAxiosResponse> {
  const response: AxiosResponse<LoginResponse> = await api.post<LoginResponse>('/session', { email_address: data.email_address })

  return {
    status: response.status,
    data: response.status === 201 ? response.data : null
  }
}
