// import SeatMap from '~/components/SeatMap'
// import { mockSeats } from '~/utils/mock'

function BookingPage() {
  const tripId = 'trip-123' // ID chuyến đi ví dụ
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-4xl font-bold py-2'>Chọn ghế cho chuyến đi {tripId}</h1>
    </div>
  )
}
export default BookingPage
