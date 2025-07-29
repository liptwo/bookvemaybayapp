// import SeatMap from '~/components/SeatMap'
// import { mockSeats } from '~/utils/mock'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import NotFound from '../404/NotFound'

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
    <div className='flex w-[100vw] h-[100vh] flex-col justify-center items-center'>
      <h1 className='text-4xl font-bold py-2'>
        Chọn ghế cho chuyến đi {from} to {to}
        <br/>
        Hạng {sc}
        <br/>
        Ngày {date}
      </h1>
    </div>
  )
}
export default BookingPage
