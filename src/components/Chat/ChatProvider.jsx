import React, { createContext, useContext, useState } from 'react'
import { useSelector } from 'react-redux'

const ChatContext = createContext()

export const useChatContext = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider')
  }
  return context
}

export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatType, setChatType] = useState('user') // 'user' | 'staff'
  const user = useSelector((state) => state.user?.currentUser)

  const openUserChat = () => {
    setChatType('user')
    setIsChatOpen(true)
  }

  const openStaffChat = () => {
    if (user?.role === 'admin') {
      setChatType('staff')
      setIsChatOpen(true)
    }
  }

  const closeChat = () => {
    setIsChatOpen(false)
  }

  const value = {
    isChatOpen,
    chatType,
    openUserChat,
    openStaffChat,
    closeChat,
    canAccessStaffChat: user?.role === 'admin'
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
