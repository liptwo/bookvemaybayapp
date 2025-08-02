// import SeatMap from '~/components/SeatMap'
// import { mockSeats } from '~/utils/mock'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import NotFound from '../404/NotFound'
import { Box, Container } from '@mui/material'
import ResponsiveAppBar from '~/components/ResponsiveAppBar/ResponsiveAppBar'
import { Grid, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Check, PlaneTakeoff } from 'lucide-react'
import Icon from '@mui/material/Icon'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import dayjs from 'dayjs'
import { ChevronUp } from 'lucide-react'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Checkbox from '@mui/material/Checkbox'
import { CheckBox } from '@mui/icons-material'


function BookingPage() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
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
            <Box sx ={{ pb:2 }} >
              <Box sx={{ backgroundColor: 'white', maxHeight: '300px', width: 'auto', borderRadius: '8px', boxShadow: 1, overflow: 'hidden' }}>
                <Box sx={{ borderBottom: '1px solid #ddd', display: 'flex', gap: 1, p: 2 }}>
                  <PlaneTakeoff color='#5683e9' />
                  <Typography sx={{ fontWeight: 'bold' }}>Your Flight</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    p: 2,
                    alignItems: 'center',
                    borderBottom: '1px solid #ddd'
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
                    alignItems: 'center'
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
            <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', maxHeightheight: '300', borderBottom: '1px solid #ddd', overflowY: 'auto' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1, backgroundColor: '#f7fcff' }}>
                <Typography variant="h6" sx={{ fontWeight : 'bold' }}>Filter :</Typography>
                <Typography variant="h8" sx={{ color:'#5683e9', fontWeight:'medium' }}>Reset</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1, backgroundColor: '#f7fcff' }}>
                <Typography variant='h6'>No. of Transit </Typography>
                <ChevronUp/>
              </Box>
              <Box sx={{}}>
                <Box sx ={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1, backgroundColor: '#f7fcff' }}>
                  <Box sx = {{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox {...label} defaultChecked />
                    <Typography sx={{ fontWeight:'700' }}>Direct</Typography>
                  </Box>
                  <Typography>1.442.750 VND </Typography>
                </Box>
                <Box sx ={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1, backgroundColor: '#f7fcff' }}>
                  <Box sx = {{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox {...label} defaultChecked />
                    <Typography sx={{ fontWeight:'700' }}>1 transit(s)</Typography>
                  </Box>
                  <Typography>3.640.755 VND </Typography>
                </Box>
                <Box sx ={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1, backgroundColor: '#f7fcff' }}>
                  <Box sx = {{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox {...label} disabled checked />
                    <Typography sx={{ fontWeight:'700', color:'#bdbdbd'
                    }}>2+ transits</Typography>
                  </Box>
                  {/* <Typography>1.442.750 VND </Typography> */}
                </Box>

              </Box>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, backgroundColor: '#f7fcff' }}>
                  <Typography sx={{ fontWeight:'bold' }}> Airline</Typography>
                  <ChevronUp/>
                </Box>
                <Box sx={{ display: 'flex', backgroundColor: '#f7fcff', padding: 1, alignItems: 'center', gap: 1 }}>
                  <Checkbox {...label} defaultChecked />
                  <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAMAAAC7faEHAAAAaVBMVEX////PkjP8+PLNjSr9+vbOkC/+/fvOjy3pzKDy4sjTm0T16dbguXzhun/47+H58ufw3cDWoVDbrmju2LfetXXYp1rlxZL269rbrWbdsm/t1rHjv4f05tHLiSLVoE3kw47RlzznyZnGfg7zjsOgAAACKUlEQVQ4jY2U6ZKrIBCFm31RQURcIZp5/4cczDIxXjN3zh+r9Ks+3ccGgFOp8vz9UV2yf+KCrP6C+QBV/QdOT2BG/F/sKvBM/W/O1BgLMbVQWpjlZ64TyEGfarDGwOg/ltOCEQ8zh1gPwIdPs0iCkAj5aQbTAvAwnZe7CIQQqSEYaQDyxK474xRDG1eBUTlDNRQAQziJB+sNJJsZhbEDXF9huZgjFuW6caKsKSwKJuhlblIGeuBCuvkiQnoeInCqIfpccT5wBbqL5A8eVzaPDb7MU787q+rBsTBh6AYeOZR9BJjehuYuPTgkkodWZUu4JY3HQ3rsUS+53LrRhep5hEyWu2yoX26p6GHxcZuwHXBDLUwNwPzirCPkUW5d3TDLvDdB9gvwPFT34uqf5rKvICQFkCs4z7dZXwtGrWY/zE2piHhBIAvg8NqGks7kbqpdCMPQNEGC+lJxhKuh8Yn1YrjXW0NTykn1t4Zkw12hGMY/P64igj2j20TQpekKwGXFV52NHzIrQwcJkhwoR8e0uxk6csRuv1lhIxPZ7X6ZTrkx903cbqtq9o/vFhGyFqXdCfF+2RuzZ4ZphvayW4BxDeLZfVbOMITQjGNTQh9fmF2FuCeCXCvr3pqiULXqrX0/QlM2ZYToRWFqptbpTPtoMKX8jRsES6jqwVyD+GJt/eGeojqxDlN5ISkFz8+hTcFZvKxJiPX8lngKw7TmEyl08SuWpbqQU1O/Id+IGCBVT9v1XAAAAABJRU5ErkJggg=="
                      alt="Hình ảnh Air Cambodia"
                      style={{ Width: '25px', maxHeight:'25px' }} // tuỳ chỉnh kích thước nếu cần
                    />
                    <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
                      <Typography sx={{ fontWeight:'bold' }}>Air Cambodia</Typography>
                      <Typography sx={{ color:'#bdbdbd' }}>8.130.145 VND</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', backgroundColor: '#f7fcff', padding: 1, alignItems: 'center', gap: 1 }}>
                  <Checkbox {...label} defaultChecked />
                  <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAMAAAC7faEHAAAAolBMVEXaDinaDSjbEy3YBCPZCCX7y5f/3aLcBibcFy7nWlX2q4T7yZb3s4nscmPeJTbfLDv5wJH/+LL/8q7/6qn/4qX91p3xkHXhOEHteWfjQUfoW1b/5qftbWH4t4vw3Zy8akz0oH7tzJKohlGndUivfVCrjFXPLjW7V0G1lF+9iVy+oWnSOjzIZE3IqnHPiGPLmmvRhmPRvYDXfWHWyIjaRUXanHNU5txIAAAAz0lEQVQ4je3Q2Q6CQAwF0HZmZAYXcEEQx31lVVz4/19TE6MBQ+iDb3ofm5PctgCUICOxv/u+Q8R6h1wohfxDlpxAs9lqtDsWL9Gi43a31x84jh66nijIgkNrZPpjt6EdQxvtiYVVTvFH1HjqaEPP5rKqF5+3oL8wlqs1wwr3mgpub1bbnaxx98j9NthT3C4IwndxpUMWBlEsax3IJEoTiovT9FDfe3/mkeRAZKezIDh+vlxJLsuRsh/LLQEE59kcCA6YAJIrbfFzDklhwEhRN49JC8cAzySnAAAAAElFTkSuQmCC"
                      alt="Hình ảnh Air Cambodia"
                      style={{ Width: '25px', maxHeight:'25px' }} // tuỳ chỉnh kích thước nếu cần
                    />
                    <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
                      <Typography sx={{ fontWeight:'bold' }}>Air India</Typography>
                      <Typography sx={{ color:'#bdbdbd' }}>60.205.897 VND</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', backgroundColor: '#f7fcff', padding: 1, alignItems: 'center', gap: 1 }}>
                  <Checkbox {...label} defaultChecked />
                  <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAMAAAC7faEHAAAAaVBMVEX////PkjP8+PLNjSr9+vbOkC/+/fvOjy3pzKDy4sjTm0T16dbguXzhun/47+H58ufw3cDWoVDbrmju2LfetXXYp1rlxZL269rbrWbdsm/t1rHjv4f05tHLiSLVoE3kw47RlzznyZnGfg7zjsOgAAACKUlEQVQ4jY2U6ZKrIBCFm31RQURcIZp5/4cczDIxXjN3zh+r9Ks+3ccGgFOp8vz9UV2yf+KCrP6C+QBV/QdOT2BG/F/sKvBM/W/O1BgLMbVQWpjlZ64TyEGfarDGwOg/ltOCEQ8zh1gPwIdPs0iCkAj5aQbTAvAwnZe7CIQQqSEYaQDyxK474xRDG1eBUTlDNRQAQziJB+sNJJsZhbEDXF9huZgjFuW6caKsKSwKJuhlblIGeuBCuvkiQnoeInCqIfpccT5wBbqL5A8eVzaPDb7MU787q+rBsTBh6AYeOZR9BJjehuYuPTgkkodWZUu4JY3HQ3rsUS+53LrRhep5hEyWu2yoX26p6GHxcZuwHXBDLUwNwPzirCPkUW5d3TDLvDdB9gvwPFT34uqf5rKvICQFkCs4z7dZXwtGrWY/zE2piHhBIAvg8NqGks7kbqpdCMPQNEGC+lJxhKuh8Yn1YrjXW0NTykn1t4Zkw12hGMY/P64igj2j20TQpekKwGXFV52NHzIrQwcJkhwoR8e0uxk6csRuv1lhIxPZ7X6ZTrkx903cbqtq9o/vFhGyFqXdCfF+2RuzZ4ZphvayW4BxDeLZfVbOMITQjGNTQh9fmF2FuCeCXCvr3pqiULXqrX0/QlM2ZYToRWFqptbpTPtoMKX8jRsES6jqwVyD+GJt/eGeojqxDlN5ISkFz8+hTcFZvKxJiPX8lngKw7TmEyl08SuWpbqQU1O/Id+IGCBVT9v1XAAAAABJRU5ErkJggg=="
                      alt="Hình ảnh Air Cambodia"
                      style={{ Width: '25px', maxHeight:'25px' }} // tuỳ chỉnh kích thước nếu cần
                    />
                    <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
                      <Typography sx={{ fontWeight:'bold' }}>Air Cambodia</Typography>
                      <Typography sx={{ color:'#bdbdbd' }}>8.130.145 VND</Typography>
                    </Box>
                  </Box>
                </Box>
                
              </Box>

            </Box>
          </Grid>
          <Grid size={8}>
            <Box sx={{ backgroundColor: 'black', height: '300px', width: 'auto' }}>
              <Typography color={'white'}>size=8</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default BookingPage
