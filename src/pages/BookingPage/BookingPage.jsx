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
            <Box sx={{ borderRadius: '8px', boxShadow: 1, height: '100%' ,display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}> 
              <Box sx ={{ }} >
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
                        <Typography sx={{ color:'#687176' }}>4.969.030 VND</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', backgroundColor: '#f7fcff', padding: 1, alignItems: 'center', gap: 1 }}>
                    <Checkbox {...label} defaultChecked />
                    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAANlBMVEVHcEzZHyvdIy/YHyrZICrbICvaICvaICvZHyrZHyrZHyrZHyrZHyrbIizZICvaICvZHyrYHypPw55uAAAAEnRSTlMAjg3/Vx43Q9TG6+G0KHtopfUqA8k5AAAA9ElEQVR4AX3TVwKDIBQF0QtDVSnuf7HplRDPL8OzomNGR6zBac6H6EyCPF00Cw/rbOzGyyavUeAlF+WggXusVRekBvP9XdaZvsL4DEVcBZvgUb7ZEFIwAN7x0IbZRgAxcrUZ957sXEyS1IAsADe5dyttwO0yRaP7pgUQYCRfe7VjIGC1QFDjKk6C7AEbuLO/wXYNlGHJgPkX7HC75fw/2NUy9KMgA/EoUE9NR8E3oKocBCuQAUycB5UH3wHBqsmIxxcnCbpGHaDdQucgalCDvFXcgVXr7DwkcuZqkXl8pfl9GhkImoqtRZWVZDVnQ+370ou+nQFRkwnS24ReyQAAAABJRU5ErkJggg=="
                        alt="Hình ảnh Air China"
                        style={{ Width: '25px', maxHeight:'25px' }} // tuỳ chỉnh kích thước nếu cần
                      />
                      <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
                        <Typography sx={{ fontWeight:'bold' }}>Air China</Typography>
                        <Typography sx={{ color:'#687176' }}>9.330.411 VND</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', backgroundColor: '#f7fcff', padding: 1, alignItems: 'center', gap: 1 }}>
                    <Checkbox {...label} defaultChecked />
                    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAn1BMVEUxJWfmAB////8yJmjmBiHkAADmABonGGIvImYNAFgAAFUpGmMtH2XmABQ0KGkXAFv40NHc2+L75ucfDF94dJX39/nlAAtdV4FzbpGwrsAjEmDKydScmbD0r7HmHitpY4rrZWq7ucj63N06Mmzr6u72wMJWUH398vLpSVD0triopblRSnroOUJIP3SCfpvrX2TxmZznLznviYzqUlntdnpKZamlAAAB7UlEQVRIiZXW2XaDIBAAUCSCG0oSs5po9mZps7TN/39btQqYg9GBpzzknhmGcQBFPdMVcG82H6AeMlpu4s8WOF+GMOHLccFwagQDb/mvcD8jJtBbldHwmlAbDpm3Kdk2nFgWHDq7fekOhFoGMPkoGT4TyzKAybRy/dJBofNZuWPlgJBFlcOn0Ah6g9cNQiG/iICUmkAmNlgLCIIyUfxFTWAwE26oAkKgCpjCoOu6/zsUR5/3dgiAAY+ujLO8pBsJbdoN+apIcHF1UCLdsZbpO8irDxZPY1mal9q8gc5I/Hnsq0y33TAey3/f9vJnvxtGt6Wg8ixAEAXxFWsLkGq+/L0GAcUp6jrWIOQ48mT1VLEFaAA3aoB3QMtJ+MgySrPv+8/5iB+AJlewmKKUhhNCfh8TAGQVrH30Yc29L45onpdTh0Bv33AGoHNcVLlm1AzG8wo+QzPo3PTqgKC7a2o0AJTVeekXCEzE3D80hnwP1eBvrGvLXJWDOG0K2QLV6G8K2XYFyJBNu2yDavivJ0awNv2plmz7bcXFWW61ZNshE+2jb7PjfpTPFE12XaxK9gk1gSgQTzg8zECjQ+3TE18mfhKjxwPiUxE0f99SA4iYPxI0pSSEw3yn/lQ0w+FECmujCLZY7K8uZfMe0zu17T/MaiLtAnZtrwAAAABJRU5ErkJggg=="
                        alt="Hình ảnh Air Macau"
                        style={{ Width: '25px', maxHeight:'25px' }} // tuỳ chỉnh kích thước nếu cần
                      />
                      <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
                        <Typography sx={{ fontWeight:'bold' }}>Air Macau</Typography>
                        <Typography sx={{ color:'#687176' }}>8.598.446 VND</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', backgroundColor: '#f7fcff', padding: 1, alignItems: 'center', gap: 1 }}>
                    <Checkbox {...label} defaultChecked />
                    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAC6CgRnAAAAzFBMVEX////+/v7+/v/+/////v8GMo///v4HM44AK4wGMpAAKYwAKIkAKokCL40gRZn6+/5zir+/yeOvutoAIYcAGYLI0ucPOI/t7/dXcrGEmsczVaEHNI3CzOJmgbt+lMLr7fUES5/Y3+1CXqhDYqMAabyQo85IbKwAgtYoTKDg5fFCX6IARJ0Dn+6erdSqutwAZLssuPdierlqy/au3vkIrO/i8/wzvPEApe4BccHT8PoAjNen4PYtUaADWqxZxfE6W6UAeMKO2fUAldnF7PnmK/tbAAAB/ElEQVQokR1Si3KbMBBcQEK8jqcB2xgcILbj+FGTuk2bOHGb/v8/9aSbQRq0ut09zULYXBaXWYWFsgoll1I+bMsWwrVcW9iOA6CeL5YRI41SBuPrrqsJGExXqFtJiguah88tyzFt3RxrIL+TahpoKVfLORZjmYztbpEgSRv1AG5xLdvSm4u+CsO8D4cMKMdHOI7WYjvclbSbKlza89kIIbY7sHXYEOAF7RMyKvL+aZ/fnw9HCGPB4g8nCgaciwH5vgqjbxewbwFXY9khCIsJi6JcxSTV7oX1XNvRg+3HVdZWsznaWzJ4dDh+Zxm271hIppx7+y5eYCqnMPq4/oBw2Q23dVWS5AnDeY1nj2j3U9sTmvFM4TzZxGnJjrOGqDm+MMZiNsrlVM0mpDNvyMrY8+nh9Z3dWwzVY4l+mKVoi4AaZqRf19+AGW/e8iBJF26wDRjwSb5dEs0JbIottM1yecLokS95gk/9Ig4y5al6EaQ16m5z80hKemQ5AQfrm+cHi1qPDdxC8rnvjeXYcTJ6vvQOdRqvz+kUSakpXy8OdAgiX/l+cO6zuik8bpI+fVw/zeObUElvxOmuA8aYpD/Xv+DRKjKYlP3JZE//VF/Xf4ALUlJnSoZtHZMyGFPq6VxIgzFP3BpE+oopP/lNbPC5MjGmyFxivebr+q5z9B+zyylYW10ktgAAAABJRU5ErkJggg=="
                        alt="Hình ảnh All Nippon Airways"
                        style={{ Width: '25px', maxHeight:'25px' }} // tuỳ chỉnh kích thước nếu cần
                      />
                      <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
                        <Typography sx={{ fontWeight:'bold' }}>All Nippon Airways</Typography>
                        <Typography sx={{ color:'#687176' }}>83.520.446 VND</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', backgroundColor: '#f7fcff', padding: 1, alignItems: 'center', gap: 1 }}>
                    <Checkbox {...label} defaultChecked />
                    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABiUlEQVR4AaTSM3htQRQF4P1s27Zf1MRWFxtNbHSx29i2bdtOmti2eXJ3vkwTo1gHM/OPgU9X+Ew5MdBS9LwdG+r+nOREeBuFuBvRYo3B7xNhWoJpaJkkJtgj/1g48RLrzdgor7zoEG+KJC7UZSw+xFXuWDhBVMshOtZ/AyGOXBRrOjuYLRy9UMREfzgGjrvJwBIYza42ih0gnCv8101VvKGoypfG2OZQnHSBwy0W+NfipbWbOwrlh9bKPs4ixjeOju0OxAnAmRML3FTmO47R8YD//VT9i3XE26n6mEPaHjgy4hRg6R1meNmDiHQwlvpzaTjpryVpvwfHA2cm4jL41zsD1xfXNB/145TLg7gnHJRVJwHc8u6C3zti9h2ZYApgpdSIrR3hC3AZvQY+m5/AOQ5vI3F71kxw75V3s043pVoJ/AguFOYLOLMRjAEa/EamXXKJfg4xvuVeOQz8uO2+sgMJHiLTJwGcNnaA5z0GWxNcBuI7yk5ZAsJaTFMWgZwMw0ADcinMjZgYAN3AgtyWYtvLAAAAAElFTkSuQmCC"
                        alt="Hình ảnh Asiana Airlines"
                        style={{ Width: '25px', maxHeight:'25px' }} // tuỳ chỉnh kích thước nếu cần
                      />
                      <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
                        <Typography sx={{ fontWeight:'bold' }}>Asiana Airlines</Typography>
                        <Typography sx={{ color:'#687176' }}>8.598.446 VND</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', backgroundColor: '#f7fcff', padding: 1, alignItems: 'center', gap: 1 }}>
                    <Checkbox {...label} defaultChecked />
                    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAApVBMVEVHcEw1Fo01F440Fo41F440Fo4rEpM0FI41F44zF441Fo4yE481F441F441F46IeG32XiUuDpE4KIyppVQtBpGNh2e+k0h8enK3kk3zPC3hXDz/MCz/NC3cYD3/Liv3PjGRoGH/My3LgUH+Oir+OCk1F44pAJJ7iG//JSn/NS7/NS5IRYT/NS7/LyZdZHveYz/qVzn/MCr/LCeabGIdFpi0Y1K0Z0/x9YNaAAAAN3RSTlMABawOl3YV1jnq//NYKsh+B//Co9iwXqClj7irDKbqsrH8jMxvHeq6+rkX2b1G0NLVkYraa+OHCApvuAAAAL5JREFUeAGc0kUWwyAQANB4wsTdve52/7OVrmFoG7b/MS6xT1ZUCX+aCPWlKMxpmAaOFhGgBir+0bRRlDXAfzoECIauCaDJSBsegO0HfKT/wijmoksAIEkzfhPUzLwoOT9dmi/08riqG8ZU7WNp3HZ9wBkphOZQ9N1YMyjrtJZhmsdxXDEf1x5sttOO2v7AaSM8FuOpCc7U2J/h5dph29DDy+2O7jE5Xh/40ZHnjF/dK3rPVEUAd7ozMdNF5gMASk0Mx8pTBD0AAAAASUVORK5CYII="
                        alt="Hình ảnh Bangkok Airways"
                        style={{ Width: '25px', maxHeight:'25px' }} // tuỳ chỉnh kích thước nếu cần
                      />
                      <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
                        <Typography sx={{ fontWeight:'bold' }}>Bangkok Airways</Typography>
                        <Typography sx={{ color:'#687176' }}>5.590.905 VND</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', backgroundColor: '#f7fcff', padding: 1, alignItems: 'center', gap: 1 }}>
                    <Checkbox {...label} defaultChecked />
                    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAbFBMVEX////3+vrl7OzR4OH09/eyy8yUtrnc5+ibur2qxceJrbC/09Vtmp5dkJNllZkvcnfU3+AFYWchaG5XhooAVlxGgIWEqq0AS1IAXWMAWmAAUlk6d3yTrrGHpqhMfoIAVFuhuLoARExkjZF5m57T9CbhAAAAkklEQVR4Ab3SRQKEMAwFUNzdIjjc/4xjW5qO87evmsT4LqapQcvWoOMamni+BoPAkTGMYhntxLNEdNIskLdGeSJrUVap/J+6adpOQguQuJe+OzAiwSjo1CDizIP6T/lNbwzTUljHFRPjPTTzCkcd4KGN+mqLkHgeHHUpZshD9bBsK+yF0LZ1kgro14PYb6cwzssVh74I58kuKhkAAAAASUVORK5CYII="
                        alt="Hình ảnh Cathay Pacific"
                        style={{ Width: '25px', maxHeight:'25px' }} // tuỳ chỉnh kích thước nếu cần
                      />
                      <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
                        <Typography sx={{ fontWeight:'bold' }}>Cathay Pacific</Typography>
                        <Typography sx={{ color:'#687176' }}>5.201.860</Typography>
                      </Box>
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
