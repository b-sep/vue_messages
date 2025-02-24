import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios'
import type {
  CreateMessageApiResponse,
  GetMessagesResponse,
  LoginForm,
  LoginResponse,
  LoginApiResponse,
  GetMessagesApiResponse,
  MessageForm,
  CreateMessageResponse
} from '../types/api'

const api: AxiosInstance = axios.create({
  baseURL: 'http://0.0.0.0:3000/api',
  headers: { 'Accept': '*/*', 'Content-Type': 'application/json' },
  validateStatus: (status) => {
    return status < 500;
  }
})

// https://axios-http.com/docs/interceptors
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('voll@token')

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

export async function login(data: LoginForm): Promise<LoginApiResponse> {
  const response: AxiosResponse<LoginResponse> = await api.post<LoginResponse>('/session', { email_address: data.email_address })

  return {
    status: response.status,
    data: response.status === 201 ? response.data : null
  }
}

export async function createMessage(data: MessageForm): Promise<CreateMessageApiResponse> {
  const formData = { message: { recipient: data.message.recipient, content: data.message.content }}

  const response: AxiosResponse<CreateMessageResponse> = await api.post<CreateMessageResponse>('/messages', formData)

  return {
    status: response.status,
    data: response.data
  }
}

export async function getMessages(userId: string): Promise<GetMessagesApiResponse> {
  const response: AxiosResponse<GetMessagesResponse> = await api.get(`/messages/${userId}`)

  return {
    status: response.status,
    data: response.status === 200 ? response.data : null
  }
}
