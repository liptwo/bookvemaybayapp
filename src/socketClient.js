// Cầu hình Socket-io phía client tại đây và export ra biên socketIoInstance
// https://socket.io/how-to/use-with-react
import { io } from 'socket.io-client'
import { API_ROOT } from '~/utils/constants'

// Socket chính cho các tính năng khác
export const socketIoInstance = io(API_ROOT)

// Socket riêng cho chat
export const createChatSocket = (authData = null) => {
  const options = {
    path: '/socket.io/',
    transports: ['websocket', 'polling']
  }

  // Nếu có auth data (cho admin), thêm vào
  if (authData) {
    options.auth = authData
  }

  return io(`${API_ROOT}/chat`, options)
}

// Socket cho client chat (không cần auth)
export const chatSocket = createChatSocket()
