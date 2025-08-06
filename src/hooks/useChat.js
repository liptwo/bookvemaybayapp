import { useState, useEffect, useCallback } from 'react'
import { createChatSocket } from '~/socketClient'
import {
  startConversationAPI,
  getConversationHistoryAPI,
  getOpenConversationsAPI
} from '~/apis/chatAPI'

export const useChat = (userRole = 'client', userId = null) => {
  const [socket, setSocket] = useState(null)
  const [conversations, setConversations] = useState([])
  const [currentConversation, setCurrentConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Tạo socket
  useEffect(() => {
    const authData =
      userRole === 'admin' && userId ? { userId, userRole: 'admin' } : null
    const chatSocket = createChatSocket(authData)
    setSocket(chatSocket)

    return () => chatSocket.disconnect()
  }, [userRole, userId])

  // Lắng nghe events
  useEffect(() => {
    if (!socket) return

    // Tin nhắn mới
    socket.on('new-message', (message) => {
      setMessages((prev) => [...prev, message])
    })

    // Cuộc trò chuyện mới (admin)
    socket.on('new-conversation', (conversation) => {
      console.log('🔔 Admin received new conversation:', conversation)
      setConversations((prev) => [conversation, ...prev])
    })

    // // Error events
    // socket.on('error', (error) => {
    //   setError(error.message)
    // })

    return () => {
      socket.off('new-message')
      socket.off('new-conversation')
      // socket.off('error')
    }
  }, [socket, userRole])

  // Bắt đầu cuộc trò chuyện (client)
  const startConversation = useCallback(
    async (clientData) => {
      try {
        setLoading(true)
        const conversation = await startConversationAPI(clientData)
        setCurrentConversation(conversation)

        if (socket) {
          socket.emit('join-conversation', { conversationId: conversation._id })
        }

        return conversation
      } catch (error) {
        setError(error.message)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [socket]
  )

  // Lấy lịch sử tin nhắn
  const loadConversationHistory = useCallback(
    async (conversationId) => {
      try {
        setLoading(true)
        const { conversation, messages } = await getConversationHistoryAPI(
          conversationId
        )

        setCurrentConversation(conversation)
        setMessages(messages)

        if (socket) {
          socket.emit('join-conversation', { conversationId })
        }

        return { conversation, messages }
      } catch (error) {
        setError(error.message)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [socket]
  )

  // Lấy danh sách cuộc trò chuyện (admin)
  const loadOpenConversations = useCallback(async () => {
    if (userRole !== 'admin') return

    try {
      setLoading(true)
      const conversations = await getOpenConversationsAPI()
      setConversations(conversations)
      return conversations
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }, [userRole])

  // Gửi tin nhắn
  const sendMessage = useCallback(
    (content) => {
      if (!socket || !currentConversation) return

      socket.emit('send-message', {
        conversationId: currentConversation._id,
        content
      })
    },
    [socket, currentConversation]
  )

  return {
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    startConversation,
    loadConversationHistory,
    loadOpenConversations,
    sendMessage,
    clearError: () => setError(null)
  }
}
