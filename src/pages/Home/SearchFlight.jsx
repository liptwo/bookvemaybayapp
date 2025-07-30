import { Button, Typography } from '@mui/material'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import AnimatedLetters from '~/components/AnimatedLetters/AnimatedLetters'
import FlightDatePick from '~/components/FlightDatePick/FlightDatePick'
import FlightSearchBox from '~/components/FlightSearchBox/FlightSearchBox'
import GuestSelector from '~/components/GuestSelector/GuestSelector'
import SelectChairType from '~/components/SelectChairType/SelectChairType'
import { flightOptions } from '~/utils/constants'

const SearchFlight = () => {

  const navigate = useNavigate()
  const [from, setFrom] = useState(flightOptions[0])
  const [to, setTo] = useState(flightOptions[1])
  const [date, setDate] = useState(Date.now())
  const [passengers, setPassengers] = useState({ adults: 0, children: 0, infants: 0 })
  const [seatClass, setSeatClass] = useState('ECONOMY')

  const handleSearch = () => {
    const query = new URLSearchParams({
      ap: `${from.id}.${to.id}`,
      dt: `${date}`,
      ps: `${passengers.adults}.${passengers.children}.${passengers.infants}`,
      sc: seatClass
    }).toString()

    navigate(`/flight?${query}`)
  }


  return (
    <div className='  mt-50 '>
      <Typography fontFamily={'Montserrat Variable'} fontWeight={700} variant='h4' fontSize={30} color='white' className='flex items-center justify-center p-5 pb-10' >From Southeast Asia to the World, All Yours.</Typography>
      <div className='flex flex-col md:flex-row justify-between items-center gap-y-4 md:gap-y-0 animate-fade-in'>
        <div>
          <Button
            className='!mr-2 !rounded-full !py-2 !px-6 !bg-[#0194f3] !text-white  !font-bold shadow-lg hover:!bg-[#007acc] hover:scale-105 transition-all duration-300 !drop-shadow-md border-2 border-transparent hover:!border-[#0194f3]'
            variant='contained'
          >
            Một chiều / Khứ hồi
          </Button>
          <Button
            className='!text-[#0194f3] !bg-white !rounded-full !text-base !py-2 !px-6 !font-bold border-2 border-[#0194f3] hover:!bg-[#eaf6ff] hover:!border-[#007acc] hover:scale-105 transition-all duration-300'
            variant='text'
          >
            Nhiều thành phố
          </Button>
        </div>
        <div className='flex items-center gap-x-3'>
          {' '}
          {/* Thêm gap-x */}
          <GuestSelector passengers={passengers} setPassengers={setPassengers} />
          <SelectChairType seatClass={seatClass} setSeatClass={setSeatClass} />
        </div>
      </div>

      <div className='mt-5 z-10 flex flex-col md:flex-row items-center justify-between gap-3 py-10 px-4 bg-white rounded-2xl shadow-2xl animate-fade-in-up'>
        <FlightSearchBox from={from} to={to} setFrom={setFrom} setTo={setTo} />
        <FlightDatePick date={date} setDate={setDate} />
        <Button onClick={handleSearch}
          className='!text-white !rounded-full !p-4 !bg-gradient-to-r from-[#0194f3] to-[#20648c] hover:from-[#007acc] hover:to-[#1a4e6b] !transition-all !font-bold !text-sm shadow-xl hover:scale-105 duration-300'>
          {' '}
          {/* Điều chỉnh padding, thêm hover */}
          <Search size={20} className='mr-1' /> Tìm kiếm{' '}
          {/* Thêm chữ Tìm kiếm */}
        </Button>
      </div>
    </div>
  )
}

export default SearchFlight
