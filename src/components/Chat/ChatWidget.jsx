import React from 'react'
import { useChatContext } from './ChatProvider'
import UserChat from './UserChat'
import StaffChat from './StaffChat'
import { X } from 'lucide-react'

const ChatWidget = () => {
  const { isChatOpen, chatType, closeChat } = useChatContext()

  if (!isChatOpen) return null

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      <div className='relative'>
        {/* Close button */}
        <button
          onClick={closeChat}
          className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10'
        >
          <X size={16} />
        </button>

        {/* Chat interface */}
        {chatType === 'user' ? <UserChat /> : <></>}
      </div>
    </div>
  )
}

export default ChatWidget
