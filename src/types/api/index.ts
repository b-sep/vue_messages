interface Message {
  content: string
}

interface ReceivedMessage extends Message {
  from: string
  received_at: string
}

interface SendedMessage extends Message {
  sended_at: string
  to: string
}

export type Messages = {
  sended_messages: Array<SendedMessage>
  received_messages: Array<ReceivedMessage>
}

export type LoginForm = {
  email_address: string
}

export type MessageForm = {
  message: { recipient: string, content: string }
}

export type LoginResponse = {
  user_id: number
  user_name: string
  token: string
}

export type GetMessagesResponse = {
  messages: Messages
}

export type CreateMessageResponse = {
  error: string
}

export type LoginApiResponse = {
  status: number
  data: LoginResponse | null
}

export type GetMessagesApiResponse = {
  status: number
  data: GetMessagesResponse | null
}

export type CreateMessageApiResponse = {
  status: number
  data: CreateMessageResponse | null
}
