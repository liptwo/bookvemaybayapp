import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { CalendarDays } from 'lucide-react'
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns'
import vi from 'date-fns/locale/vi'
import { toast } from 'react-toastify'

export default function FlightDatePick() {
  const [startDate, setStartDate] = useState(new Date())
  const [returnDate, setReturnDate] = useState(new Date())
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showReturnPicker, setShowReturnPicker] = useState(false)
  const [isRoundTrip, setIsRoundTrip] = useState(false)


  return (
    <div className='flex flex-row gap-4 text-white items-center'>
      <div className='flex flex-col gap-0.5'>
        <span className='text-black'>Ngày khởi hành</span>
        <div className='flex items-center bg-white rounded-full text-black overflow-hidden w-fit'>
          {/* Ngày đi */}
          <div
            className='flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100'
            onClick={() => {
              setShowStartPicker((prev) => !prev)
              setShowReturnPicker(false)
            }}
          >
            <CalendarDays className='text-blue-500' />
            <span>{startDate && !isNaN(startDate) ? format(startDate, 'd \'thg\' M yyyy', { locale: vi }) : '--/--/----'}</span>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className='border-l border-gray-300 h-6' />
      {/* Ngày về + khứ hồi */}
      <div className='flex flex-col gap-0.5'>
        <label className='flex items-center gap-1 cursor-pointer'>
          <input
            type='checkbox'
            // defaultChecked={false}
            className='accent-blue-600'
            checked={isRoundTrip}
            onChange={(e) => {
              setIsRoundTrip(e.target.checked)
              if (!e.target.checked) {
                setShowReturnPicker(false)
              }
            }}
          />
          <span className='text-black'>Khứ hồi</span>
        </label>
        <div
          className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 text-black overflow-hidden w-fit rounded-full ${!isRoundTrip ? 'opacity-50 pointer-events-none' : ''}`}
          onClick={() => {
            if (isRoundTrip) {
              setShowReturnPicker((prev) => !prev)
              setShowStartPicker(false)
            }
          }}
        >
          <CalendarDays className='text-blue-500' />
          <span>{returnDate && !isNaN(returnDate) ? format(returnDate, 'd \'thg\' M yyyy', { locale: vi }) : '--/--/----'}</span>
        </div>
      </div>

      {/* Date pickers (nên đặt ngoài layout chính để tránh lỗi lồng thẻ) */}
      {showStartPicker && (
        <div className='bg-white absolute text-black p-2 shadow-2xl z-50 rounded-xl border border-gray-200'>
          <DayPicker
            mode='single'
            selected={startDate}
            onSelect={(date) => {
              if (date) setStartDate(date)
              setShowStartPicker(false)
            }}
            locale={vi}
          />
        </div>
      )}
      {isRoundTrip && showReturnPicker && (
        <div className='bg-white fixed text-black p-2 shadow-2xl z-50 rounded-xl border border-gray-200'>
          <DayPicker
            mode='single'
            selected={returnDate}
            onSelect={(date) => {
              if (date > startDate) {
                setReturnDate(date)
                setShowReturnPicker(false)
              }
              else if (date === undefined) {
                setShowReturnPicker(false)
              }
              else {
                toast.error('Ngày về không đúng')
              }
            }}
            locale={vi}
          />
        </div>
      )}
    </div>
  )
}
