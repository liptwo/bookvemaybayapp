import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:8080') // Địa chỉ của Node.js server

function SeatMap({ tripId, initialSeats }) {
  const [seats, setSeats] = useState(initialSeats)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [messageDisplay, setMessageDisplay] = useState('')
  // const socketID = socket.id
  // console.log(seats)
  useEffect(() => {
    // 1. Tham gia vào room của chuyến xe
    socket.emit('join-trip-room', tripId)

    // 2. Lắng nghe cập nhật trạng thái ghế từ server
    const handleSeatUpdate = (updatedSeat) => {
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.number === updatedSeat.number
            ? {
                ...seat,
                status: updatedSeat.status,
                selector: updatedSeat.selector
              }
            : seat
        )
      )
    }

    socket.on('seat-updated', handleSeatUpdate)

    // 3. Cleanup: Rời khỏi room và ngắt listener khi component bị unmount
    return () => {
      socket.off('seat-updated', handleSeatUpdate)
      // Có thể thêm sự kiện leave-room nếu cần
    }
  }, [tripId])

  const handleSelectSeat = (seat) => {
    // Logic kiểm tra ghế có được phép chọn không
    // ...
    const { number, status } = seat
    const selector = seat.selector
    const selectorClient = socket.id
    // console.log(seat, selector)
    // Gửi sự kiện chọn ghế lên server
    if (status === 'available') {
      setMessageDisplay(`Chọn ghế thành công ${number}`)
      socket.emit('select-seat', { tripId, number, selector: selectorClient })
      // setSelectedSeats([...selectedSeats, number])
      return
    }
    if (status === 'selecting' && selector === selectorClient) {
      setMessageDisplay(`Đã bỏ chọn ghế ${number}`)
      socket.emit('seat-de-select', { tripId, number })
      // setSelectedSeats(selectedSeats.filter(n => n !== number))
      return
    }

    setMessageDisplay('Ghế đã có người chọn')
    return

    // Cập nhật UI tạm thời
    // setSelectedSeats([...selectedSeats, number])
  }

  return (
    <>
      {messageDisplay && <h5 className='text-xl'>{messageDisplay}</h5>}
      <div className='grid grid-cols-5 gap-1 w-[600px] border rounded-2xl '>
        {seats.map((seat) => (
          <div
            key={seat.number}
            className='flex justify-center items-center p-[10px]
            m-[5px] min-w-[50px] max-w-[100px] font-bold'
            onClick={() => handleSelectSeat(seat)}
            disabled={seat.status === 'booked'}
            style={{
              // padding: '20px',
              // margin: '20px',
              // minWidth: '100px',
              // maxWidth: '200px',
              // fontSize: '50px',
              backgroundColor:
                seat.status === 'booked'
                  ? 'red'
                  : seat.status === 'selecting'
                    ? 'orange'
                    : 'green'
            }}
          >
            {seat.number}
          </div>
        ))}
      </div>
    </>
  )
}

export default SeatMap
