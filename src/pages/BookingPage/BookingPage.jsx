// import SeatMap from '~/components/SeatMap'
// import { mockSeats } from '~/utils/mock'

import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import NotFound from '../404/NotFound'
import { Box, Container, Grid, Typography } from '@mui/material'
// import ResponsiveAppBar from '~/components/ResponsiveAppBar/ResponsiveAppBar'
import AppBarCustom from '~/components/ResponsiveAppBar/AppBarCustom'
import ListFlight from './ListFlight'
import { useDispatch } from 'react-redux'
import { fetchFlightsAPI } from '~/redux/item/useFlight'
// import DrawerConfirm from './DrawerConfirm/DrawerConfirm'
// import { selectCurrentUser } from '~/redux/user/userSlice'
// import { toast } from 'react-toastify'

function BookingPage() {
  // const tripId = 'trip-123' // ID chuyến đi ví dụ
  const [params] = useSearchParams()

  const dispatch = useDispatch()
  const ap = params.get('ap') || ''
  const dt = params.get('dt') || ''
  const ps = params.get('ps') || ''
  const sc = params.get('sc') || 'ECONOMY'

  if (ap === '' || dt === '' || ps === '' || sc === '') {
    return <NotFound title={'Không tìm thấy chuyến bay này'} />
  }

  const [from, to] = ap.split('.')
  const [date] = dt.split('.')
  const [adult, child, infant] = ps.split('.')

  useEffect(() => {
    // Giả sử gọi API backend
    const query = `departureAirport=${from}&arrivalAirport=${to}&departureDate=${date}&class=${sc}`
    dispatch(fetchFlightsAPI(query))
  }, [])

  return (
    <div className='min-h-screen font-sans bg-[#f7f9fa]'>
      {/* <Container maxWidth='lg' className='relative h-110 z-10'>
        {' '}
        {/* Thêm relative z-10 để nội dung nằm trên ảnh */}
      {/* <Box sx={{ height: 'auto', paddingTop: 2 }}>
          {' '}
          Bỏ chiều cao cố định, thêm padding */}
      <AppBarCustom textColor={'black'} justResponeAppBar={true} />
      {/* </Box> */}
      {/* </Container> */}
      {/* <h1 className='text-4xl font-bold py-2'>
        Chọn ghế cho chuyến đi {from} to {to}
        <br/>
        Hạng {sc}
        <br/>
        Ngày {date}
      </h1> */}
      <Container className='pt-25'>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Box
              sx={{ borderRadius:2, backgroundColor: 'white', height: '300px', width: 'auto' }}
            >
              {/* <Typography color={'white'}>size=8</Typography> */}
            </Box>
          </Grid>
          <Grid size={8}>
            <ListFlight />
          </Grid>
        </Grid>
      </Container>

      
      {/* {flights && (flights.map((flight) => {
        <Box> Flight {flight}</Box>
      }))}
      Hello */}
    </div>
  )
}
export default BookingPage
