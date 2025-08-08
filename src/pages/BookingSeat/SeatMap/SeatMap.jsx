// src/components/SeatMap.jsx
import React, { useState, useEffect } from 'react'
// import io from 'socket.io-client'
import realPlane from '~/asset/img/headPlane.png'
import endPlane from '~/asset/img/endPlane.png'
import { socketIoInstance } from '~/socketClient'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/item/userSlice'
// const socket = io('http://localhost:3000')

const rows = 10
const seats = ['A', 'B', 'C', 'D', 'E', 'F'] // ABC | DEF

const SeatMap = ({ flightId, userId, mySeat, setMySeat }) => {

  // const userId = currentUser._id
  const [selected, setSelected] = useState(null)
  const [occupied, setOccupied] = useState([])
  const [seatData, setSeatData] = useState({})


  // useEffect(() => {
  //   socketIoInstance.on('seatUpdate', (data) => {
  //     setOccupied(data)
  //   })

  //   return () => {
  //     socketIoInstance.off('seatUpdate')
  //   }
  // }, [])

  // const handleSelect = (seat) => {
  //   if (occupied.includes(seat)) return
  //   setSelected(seat)
  //   socketIoInstance.emit('holdSeat', seat)
  // }

useEffect(() => {
    socketIoInstance.emit('join', { flightId, userId })

    socketIoInstance.on('seatUpdate', (data) => {
      setSeatData(data)
      const mySelected = Object.entries(data).find(
        ([_, val]) => val.userId === userId
      )
      setMySeat(mySelected ? mySelected[0] : null)
    })

    return () => {
      socketIoInstance.off('seatUpdate')
    }
  }, [])

  const handleSelect = (seat) => {
    // Nếu đã chọn rồi thì bỏ chọn ghế cũ, chọn mới
    socketIoInstance.emit('selectSeat', { seat })
  }

  const renderSeat = (seat) => {
    const info = seatData[seat]
    const isMine = info && info.userId === userId
    const isTaken = info && !isMine

    return (
      <div
        key={seat}
        onClick={() => {
          if (!isTaken) handleSelect(seat)
        }}
        className={`w-10 h-10 rounded text-center leading-10 cursor-pointer 
          ${isMine ? 'bg-green-500 text-white' : isTaken ? 'bg-red-500 text-white' : 'bg-gray-200'}
        `}
      >
        {seat}
      </div>
    )
  }

  return (


    <div className="flex flex-col items-center">
      {/* <h1 className="text-xl font-semibold mb-4">Chọn chỗ - chuyến {flightId}</h1> */}
      <img src={realPlane} className='w-[100px]'/>
      {[...Array(rows)].map((_, rowIdx) => {
        const rowNumber = rowIdx + 1
        return (
          <div key={rowIdx} className="flex space-x-2 mb-1">
            {seats.map((col, idx) => {
              const seat = `${rowNumber}${col}`
              return idx === 3 ? (
                <>
                  <div className="w-6" key={`aisle-${seat}`} />
                  {renderSeat(seat)}
                </>
              ) : (
                renderSeat(seat)
              )
            })}
          </div>
        )
      })}
      <img src={endPlane} className='w-[100px]'/>
      <p className="mt-4">Bạn đã chọn: <strong>{mySeat || 'Chưa chọn'}</strong></p>
    </div>
  )
}

export default SeatMap
