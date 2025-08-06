import React from 'react'
import { MessageCircle } from 'lucide-react'
import { useChatContext } from './ChatProvider'

const ChatButton = ({ type = 'user' }) => {
  const { openUserChat, openStaffChat, canAccessStaffChat } = useChatContext()

  const handleClick = () => {
    if (type === 'staff' && canAccessStaffChat) {
      openStaffChat()
    } else {
      openUserChat()
    }
  }

  return (
    <button
      onClick={handleClick}
      className='fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 shadow-lg z-40'
      title={type === 'staff' ? 'Staff Chat' : 'Customer Support'}
    >
      <MessageCircle size={24} />
    </button>
  )
}

export default ChatButton
