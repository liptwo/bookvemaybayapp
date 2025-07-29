import React from 'react'

const NotFound = ( { title = '' }) => {
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center text-5xl'>
      {title !== '' ? (
        title
      ) : (
        'Không tìm thấy trang này'
      )}
    </div>
  )
}

export default NotFound
