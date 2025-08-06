import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// Bắt đầu cuộc trò chuyện mới (client)
export const startConversationAPI = async (clientData) => {
  try {
    console.log('Calling startConversationAPI with:', clientData)
    const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/chat/start`, clientData)
    // if (!request.ok) {
    //   throw new Error(`Failed to start conversation: ${request.status}`)
    // }
    // const data = await request.json()
    // console.log('Start conversation response:', data)
    return request.data
  } catch (error) {
    // console.error('Start conversation error:', error)
    toast.error('Không thể bắt đầu cuộc trò chuyện', { theme: 'colored' })
    throw error
  }
}

// Lấy lịch sử tin nhắn
export const getConversationHistoryAPI = async (conversationId) => {
  try {
    console.log('Calling getConversationHistoryAPI with conversationId:', conversationId)
    const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/chat/${conversationId}/history`)
    console.log('Get conversation history response:', request.data)
    return request.data
  } catch (error) {
    console.error('Get conversation history error:', error)
    toast.error('Không thể tải lịch sử tin nhắn', { theme: 'colored' })
    throw error
  }
}

// Lấy danh sách cuộc trò chuyện đang mở (admin)
export const getOpenConversationsAPI = async () => {
  try {
    console.log('Calling getOpenConversationsAPI')
    const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/chat/open`)
    console.log('Get open conversations response:', request.data)
    return request.data
  } catch (error) {
    console.error('Get open conversations error:', error)
    console.error('Error response:', error.response?.data)
    console.error('Error status:', error.response?.status)
    toast.error('Không thể tải danh sách cuộc trò chuyện', { theme: 'colored' })
    throw error
  }
}