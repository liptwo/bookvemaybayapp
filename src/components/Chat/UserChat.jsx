import * as React from 'react'
import { useState } from 'react'
import {
  ChevronLeft,
  AlignJustify,
  Image,
  Link,
  Smile,
  Send
} from 'lucide-react'
import { useChat } from '~/hooks/useChat'
import { Avatar } from '@mui/material'
import { selectCurrentUser } from '~/redux/item/userSlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const UserChat = () => {
  const [messageInput, setMessageInput] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: ''
  })
  const [showStartForm, setShowStartForm] = useState(true)

  // Khởi tạo chat hook cho client
  const {
    currentConversation,
    messages,
    loading,
    error,
    startConversation,
    sendMessage
  } = useChat('client')

  // Xử lý bắt đầu cuộc trò chuyện
  const handleStartConversation = async (e) => {
    e.preventDefault()
    if (!clientInfo.name.trim() || !clientInfo.email.trim()) return

    try {
      startConversation(clientInfo)
      setShowStartForm(false)
      setShowChat(true)
    } catch (error) {
      console.error('Error starting conversation:', error)
    }
  }

  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    if (currentUser) {
      const info = {
        name: currentUser.username,
        email: currentUser.email
      }

      setClientInfo(info)
      console.log('client info', info)
      // handleStartConversation(info)
    }
  }, [currentUser])

  // Xử lý gửi tin nhắn
  const handleSendMessage = () => {
    if (!messageInput.trim() || !currentConversation) return

    sendMessage(messageInput.trim())
    setMessageInput('')
  }

  // Xử lý key press trong input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      console.log('Enter key pressed', messageInput)
      handleSendMessage()
    }
  }

  // Format thời gian
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className='w-[350px] h-[450px] bg-white rounded-2xl shadow-xl'>
      <div className='bg-[#f25555] text-white flex rounded-t-2xl items-center justify-between p-2 h-13'>
        <div
          className='hover:cursor-pointer hover:bg-[#878686] rounded-full p-1'
          onClick={() => setShowChat(false)}
        >
          <ChevronLeft size={20}></ChevronLeft>
        </div>
        <span className='text-bold text-xl'>Chat Với Nhân Viên Để Hỗ Trợ</span>
        <div className='hover:cursor-pointer hover:bg-[#878686] rounded-full p-1'>
          <AlignJustify size={20}></AlignJustify>
        </div>
      </div>

      {!showChat ? (
        // Form bắt đầu cuộc trò chuyện
        <div className='p-4'>
          {showStartForm ? (
            <form onSubmit={handleStartConversation} className='space-y-4'>
              <div>
                <label className='block text-xl font-medium text-gray-700 mb-1'>
                  Họ tên
                </label>
                <input
                  type='text'
                  value={clientInfo.name}
                  onChange={(e) =>
                    setClientInfo((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className='w-full text-xl px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Nhập họ tên của bạn'
                  required
                />
              </div>
              <div>
                <label className='block text-xl font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <input
                  type='email'
                  value={clientInfo.email}
                  onChange={(e) =>
                    setClientInfo((prev) => ({
                      ...prev,
                      email: e.target.value
                    }))
                  }
                  className='w-full text-xl px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Nhập email của bạn'
                  required
                />
              </div>
              <button
                type='submit'
                disabled={loading}
                className='w-full bg-blue-600 text-xl mt-10 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50'
              >
                {loading ? 'Đang kết nối...' : 'Bắt đầu chat'}
              </button>
            </form>
          ) : (
            <div className='text-center py-8'>
              <div className='text-green-600 text-xl mb-2'>
                ✓ Đã kết nối thành công!
              </div>
              <button
                onClick={() => setShowChat(true)}
                className='bg-blue-600 text-xl mt-5 text-white py-2 px-4 rounded-lg hover:bg-blue-700'
              >
                Tiếp tục chat
              </button>
            </div>
          )}
        </div>
      ) : (
        // Chat interface
        <>
          <div className='h-120 bg-gray-50 p-3 overflow-y-auto'>
            {messages.length === 0 ? (
              <div className='text-center text-xl text-gray-500 py-8'>
                Chào mừng! Hãy bắt đầu cuộc trò chuyện.
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex items-start gap-2 mb-3 ${
                    message.senderRole === 'client'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  {message.senderRole !== 'client' && (
                    <Avatar
                      alt='Admin'
                      src='/static/images/avatar/1.jpg'
                      sx={{ width: 32, height: 32 }}
                    />
                  )}
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-lg ${
                      message.senderRole === 'client'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className='text-xl'>{message.content}</div>
                    <div
                      className={`text-xs mt-1 ${
                        message.senderRole === 'client'
                          ? 'text-blue-100'
                          : 'text-gray-500'
                      }`}
                    >
                      {formatTime(message.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className='flex pt-3 p-2 gap-x-1 border-t border-t-[#ccc]'>
            <div className='grow-1 flex items-center gap-x-2'>
              <input
                type='text'
                placeholder='Nhập phản hồi'
                className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className='bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50'
              >
                <Send size={16} />
              </button>
            </div>
            <div className='flex items-center gap-x-1'>
              <div className='hover:cursor-pointer hover:bg-gray-100 p-1 rounded'>
                <Image size={20}></Image>
              </div>
              <div className='hover:cursor-pointer hover:bg-gray-100 p-1 rounded'>
                <Link size={20}></Link>
              </div>
              <div className='hover:cursor-pointer hover:bg-gray-100 p-1 rounded'>
                <Smile size={20}></Smile>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Error Display */}
      {error && (
        <div className='fixed top-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-lg z-50'>
          {error}
        </div>
      )}
    </div>
  )
}

export default UserChat
