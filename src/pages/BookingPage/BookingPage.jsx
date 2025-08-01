// import SeatMap from '~/components/SeatMap'
// import { mockSeats } from '~/utils/mock'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import NotFound from '../404/NotFound'
import { Box, Container } from '@mui/material'
import ResponsiveAppBar from '~/components/ResponsiveAppBar/ResponsiveAppBar'
import { Grid, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { PlaneTakeoff } from 'lucide-react'
import Icon from '@mui/material/Icon'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import dayjs from 'dayjs'
import LooksTwoIcon from '@mui/icons-material/LooksTwo';


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
      {flights && (flights.map((flight) => (
        <Box> Flight {flight}</Box>
      )))}

      <Container>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Box>
              <Box sx={{ backgroundColor: 'white', maxHeight: '300px', width: 'auto' ,borderRadius: '8px', boxShadow: 1, overflow: 'hidden'}}>
                <Box sx={{ borderBottom: '1px solid #ddd', display: 'flex', gap: 1, p: 2}}>
                  <PlaneTakeoff color='#5683e9' />
                  <Typography sx={{fontWeight: 'bold'}}>Your Flight</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    p: 2,
                    alignItems: 'center',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      width: 48,
                      height: 48,
                      backgroundColor: 'white'
                    }}
                  >
                    <LooksOneIcon sx={{ color: '#5683e9', fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Thu, 31 Jul 2025
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#0072ce' }}>
                      Ho C. M. City → Bangkok
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    p: 2,
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      width: 48,
                      height: 48,
                      backgroundColor: 'white'
                    }}
                  >
                    <LooksTwoIcon sx={{ color: '#5683e9', fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Thu, 31 Jul 2025
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#0072ce' }}>
                      Ho C. M. City → Bangkok
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{maxHeight: '300px', width: 'auto', boxShadow: 1, overflow: 'hidden'}}>
              <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, backgroundColor: '#f5f5f5'}}>
                <Typography variant="h6" sx={{fontWeight : 'bold'}}>Filter</Typography>
                <Typography variant="h8" sx={{color:'#5683e9', fontWeight:'medium'}}>Reset</Typography>
              </Box>
              <Box></Box>
              <Box></Box>
            </Box>
            <Box></Box>
          </Grid>
          <Grid size={8}>
            <Box sx={{ backgroundColor: 'black', height: '300px', width: 'auto'}}>
              <Typography color={'white'}>size=8</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default BookingPage
