// import SeatMap from '~/components/SeatMap'
// import { mockSeats } from '~/utils/mock'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import NotFound from '../404/NotFound'
import { Box, Container } from '@mui/material'
import ResponsiveAppBar from '~/components/ResponsiveAppBar/ResponsiveAppBar'

function BookingPage() {
  // const tripId = 'trip-123' // ID chuyến đi ví dụ
  const [params] = useSearchParams()
  const [flights, setFlights] = useState([])

  const ap = params.get('ap') || ''
  const dt = params.get('dt') || ''
  const ps = params.get('ps') || ''
  const sc = params.get('sc') || 'ECONOMY'

  if (ap==='' || dt==='' || ps==='' || sc==='') {
    return <NotFound title={'Không tìm thấy chuyến bay này'}/>
  }

  const [from, to] = ap.split('.')
  const [date] = dt.split('.')
  const [adult, child, infant] = ps.split('.')

  useEffect(() => {
    // Giả sử gọi API backend
    fetch(`/api/flights?from=${from}&to=${to}&date=${date}&class=${sc}`)
      .then((res) => res.json())
      .then((data) => setFlights(data))
  }, [from, to, date, sc])

  return (
    <div className="bg-gradient-to-b from-[#eaf6ff] to-white min-h-screen pb-10 font-sans">
      <Container maxWidth='lg' className='relative h-43 z-10'> {/* Thêm relative z-10 để nội dung nằm trên ảnh */}
        <Box sx={{ height: 'auto', paddingTop: 2 }}> {/* Bỏ chiều cao cố định, thêm padding */}
          <ResponsiveAppBar textColor={'black'} />
        </Box>
      </Container>
      {/* <h1 className='text-4xl font-bold py-2'>
        Chọn ghế cho chuyến đi {from} to {to}
        <br/>
        Hạng {sc}
        <br/>
        Ngày {date}
      </h1> */}
      {flights && (flights.map((flight) => {
        <Box> Flight {flight}</Box>
      }))}
      Hello
    </div>
  )
}
export default BookingPage
