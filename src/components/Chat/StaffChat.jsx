import { Avatar, Grid } from '@mui/material'
import {
  Ellipsis,
  MessageCircle,
  Settings,
  Image,
  Link,
  Send,
  X
} from 'lucide-react'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { useChat } from '~/hooks/useChat'
import { useSelector } from 'react-redux'

const StaffChat = () => {
  const [messageInput, setMessageInput] = useState('')
  const [filter, setFilter] = useState('all') // 'all' | 'unread'

  // Lấy thông tin user từ Redux store
  const user = useSelector((state) => state.user?.currentUser)

  // Khởi tạo chat hook cho admin
  const {
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    loadOpenConversations,
    loadConversationHistory,
    sendMessage
  } = useChat('admin', user?._id)

  // Load danh sách cuộc trò chuyện khi component mount
  useEffect(() => {
    if (user?._id) {
      loadOpenConversations()
    }
  }, [user?._id, loadOpenConversations])

  // Format thời gian
  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return 'Vừa xong'
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ`
    } else {
      return date.toLocaleDateString('vi-VN')
    }
  }

  // Lọc cuộc trò chuyện theo filter
  const filteredConversations = conversations.filter((conv) => {
    if (filter === 'unread') {
      return conv.status === 'pending'
    }
    return true
  })

  // Xử lý gửi tin nhắn
  const handleSendMessage = () => {
    if (!messageInput.trim() || !currentConversation) return

    sendMessage(messageInput.trim())
    setMessageInput('')
  }
  // const updateStatus = async (id) => {
  //   try {
  //     await loadConversationHistory(id)
  //   } catch (error) {
  //     console.error('Error loading conversation:', error)
  //   }
  // }
  // Xử lý chọn cuộc trò chuyện
  const handleSelectConversation = async (conversation) => {
    try {
      await loadConversationHistory(conversation._id)
    } catch (error) {
      console.error('Error loading conversation:', error)
    }
  }

  // Xử lý đóng cuộc trò chuyện
  const handleCloseConversation = () => {
    // TODO: Implement close conversation
    console.log('Close conversation')
  }

  // Xử lý rời khỏi cuộc trò chuyện
  const handleLeaveConversation = () => {
    // TODO: Implement leave conversation
    console.log('Leave conversation')
  }

  // Xử lý key press trong input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className='bg-white flex flex-row text-black h-screen'>
      <div item size={1} className='bg-blue-600 px-2 flex flex-col justify-between items-center py-4'>
        <div className='flex flex-col items-center gap-y-4'>
          <div className='cursor-pointer  hover:brightness-95'>
            <Avatar src={user?.avatar || '/broken-image.jpg'} />
          </div>
          {/* <div className='cursor-pointer hover:bg-[#e7baba] p-1 rounded-full'>
            <MessageCircle size={30}></MessageCircle>
          </div> */}
        </div>
        <div className='hover:cursor-pointer hover:bg-[#ecafaf] p-1 rounded-full'>
          <Settings size={30}></Settings>
        </div>
      </div>

      <div size={3} className='border-r w-[250px] border-r-[#ccc]'>
        <div className='flex items-center px-2 justify-between border-b border-b-[#ccc]'>
          <div className='flex  items-center gap-3 text-sm font-medium'>
            <div
              className={`hover:bg-amber-400 p-2 rounded-2xl cursor-pointer ${
                filter === 'all' ? 'text-blue-600' : ''
              }`}
              onClick={() => setFilter('all')}
            >
              Tất cả
            </div>
            <div
              className={`hover:bg-amber-400 p-2 rounded-2xl  cursor-pointer ${
                filter === 'unread' ? 'text-blue-600' : ''
              }`}
              onClick={() => setFilter('unread')}
            >
              Chưa đọc
            </div>
          </div>
          <div className='hover:cursor-pointer hover:bg-[#7c7979] p-1 rounded-full'>
            <Ellipsis></Ellipsis>
          </div>
        </div>

        <div className='flex flex-col overflow-auto'>
          {loading ? (
            <div className='p-4 text-center text-gray-500'>Đang tải...</div>
          ) : filteredConversations.length === 0 ? (
            <div className='p-4 text-center text-gray-500'>
              Không có cuộc trò chuyện nào
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation._id}
                className={`flex items-center gap-x-1.5 p-2 hover:cursor-pointer hover:bg-[#cdcbcb] rounded ${
                  currentConversation?._id === conversation._id
                    ? 'bg-blue-100'
                    : ''
                }`}
                onClick={() => handleSelectConversation(conversation)}
              >
                <div>
                  <Avatar
                    alt={conversation.clientInfo?.name}
                    src='/static/images/avatar/1.jpg'
                  />
                </div>
                <div className='flex w-full'>
                  <div className='grow-1 justify-between'>
                    <div className='font-medium'>
                      {conversation.clientInfo?.name}
                    </div>
                    {/* <div className='text-sm text-gray-600'>
                      {conversation.status === 'pending'
                        ? 'Đang chờ'
                        : conversation.status === 'active'
                          ? 'Đang hoạt động'
                          : 'Đã đóng'}
                    </div> */}
                  </div>
                  <div className='text-sm text-gray-500'>
                    {formatTime(conversation.createdAt)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className=' w-full h-full'>
        {currentConversation ? (
          <>
            <div className='flex w-full p-2 gap-x-1 items-center justify-between border-b border-b-[#ccc] pb-2'>
              <div className='flex items-center gap-x-2'>
                <Avatar
                  alt={currentConversation.clientInfo?.name}
                  src='/static/images/avatar/1.jpg'
                />
                <div className='font-medium'>
                  {currentConversation.clientInfo?.name}
                </div>
                {/* <div className='text-sm text-gray-500'>
                  {currentConversation.status === 'pending'
                    ? 'Đang chờ'
                    : currentConversation.status === 'active'
                      ? 'Đang hoạt động'
                      : 'Đã đóng'}
                </div> */}
              </div>
              <div className='flex gap-x-1'>
                <button
                  onClick={handleLeaveConversation}
                  className='hover:bg-gray-200 p-1 rounded'
                  title='Rời khỏi cuộc trò chuyện'
                >
                  <X size={16} />
                </button>
                <button
                  onClick={handleCloseConversation}
                  className='hover:bg-gray-200 p-1 rounded'
                  title='Đóng cuộc trò chuyện'
                >
                  <Ellipsis size={16} />
                </button>
              </div>
            </div>

            <div>
              {/* Chat Messages */}
              <div className='bg-[#ebecf0]  h-[450px] overflow-y-auto p-2 overflow-y-auto'>
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex items-center gap-x-1 ${
                      message.senderRole === 'admin' ? 'justify-end' : ''
                    } mb-2`}
                  >
                    {message.senderRole !== 'admin' && (
                      <Avatar alt='Client' src='/static/images/avatar/1.jpg' />
                    )}
                    <div
                      className={`shadow-lg ${
                        message.senderRole === 'admin' ? 'bg-blue-500 text-white' : 'bg-white'
                      }  rounded px-3 py-2 inline-block max-w-[70%] `}
                    >
                      <div>{message.content}</div>
                      <div className={`text-[10px]  ${
                        message.senderRole === 'admin' ? 'text-gray-200' : 'text-gray-500'
                      }`}>
                        {new Date(message.createdAt).toLocaleTimeString(
                          'vi-VN',
                          {
                            hour: '2-digit',
                            minute: '2-digit'
                          }
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className=''>
                <div className='flex items-center gap-x-3 border-b border-b-[#ccc]'>
                  <div className='hover:cursor-pointer hover:bg-[#cdcccc] rounded p-1'>
                    <Image></Image>
                  </div>
                  <div className='hover:cursor-pointer hover:bg-[#cdcccc] rounded p-1'>
                    <Link></Link>
                  </div>
                  <div className='hover:cursor-pointer hover:bg-[#cdcccc] rounded p-1'>
                    <Ellipsis></Ellipsis>
                  </div>
                </div>
                <div className='flex items-center gap-x-2 py-3 px-2'>
                  <input
                    type='text'
                    placeholder='Nhập tin nhắn'
                    className='flex-1 px-3 py-2 outline-none border border-gray-300 rounded-lg'
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    onClick={handleSendMessage}
                    className='bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700'
                    disabled={!messageInput.trim()}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='flex items-center justify-center h-full text-gray-500'>
            Chọn một cuộc trò chuyện để bắt đầu
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className='fixed top-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-lg'>
          {error}
        </div>
      )}
    </div>
  )
}

export default StaffChat
