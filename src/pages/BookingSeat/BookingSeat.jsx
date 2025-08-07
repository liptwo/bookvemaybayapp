import { Box, Container, Divider, Grid, Typography } from '@mui/material'
// import { Grid } from 'lucide-react'
import React from 'react'
import ResponsiveAppBar from '~/components/ResponsiveAppBar/ResponsiveAppBar'
import Countdown from 'react-countdown'
import VHL from '../../asset/img/VHL.webp'
import { Square, SquareMinus, SquareCheck, LifeBuoy, Armchair } from 'lucide-react'
import { mockSeats } from '~/utils/mock'
const Completionist = () => <span>Hết thời gian</span>

const BookingSeat = () => {
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />
    } else {
      // Render a countdown
      return (
        <div className='flex flex-row rounded-2xl text-xl gap-2 justify-center text-white items-center bg-amber-400 w-30 py-2'>
          <div className='text-bold '>{minutes}</div>
          :
          <div className='text-bold '>{seconds}</div>
        </div>
      )
    }
  }
  return (
    <div>
      <img src={VHL} alt="" className='relative h-[100vh] w-full object-cover' />
      <div className='absolute inset-0'>
        <Container disableGutters maxWidth='' className='bg-transparent text-black'>
          <Container maxWidth='lg'>
            <ResponsiveAppBar textColor={'black'} justResponeAppBar={true} />
          </Container>
          <Container>
            <Grid container spacing={10} className='mt-2 flex flex-row '>
              <Grid size={3} className='text-center flex gap-2 flex-col items-center   bg-white shadow-lg rounded-2xl h-[50vh]'>
                <Typography variant='h6' className='bg-red-500 rounded-t-lg w-full text-white font-bold p-2'>Thông tin đặt chỗ</Typography>
                <Typography variant='h6' className=''>Bạn có 10 phút để đặt chỗ</Typography>
                <Countdown date={Date.now() + 600000} renderer={renderer} />
                <Typography variant='h6' className=''>Mã đặt chỗ: C3</Typography>
              </Grid>
              <Grid size={9} className='bg-white rounded-2xl shadow-lg'>
                <Container maxWidth='sm'>
                  <div className='flex items-center justify-between p-8 shadow-lg rounded-lg'>
                    <div className='flex items-center gap-x-1'>
                      <Square></Square>
                      Còn trống
                    </div>
                    <div className='flex items-center gap-x-1'>
                      <SquareMinus className='text-gray-400'></SquareMinus>
                      Đã có người
                    </div>
                    <div className='flex items-center gap-x-1'>
                      <SquareCheck className='text-green-600'></SquareCheck>
                      Đang chọn
                    </div>
                  </div>
                  <div className='mb-5'>
                    <Grid container spacing={3}>
                      <Grid size={6}>
                        <div className=' h-14'>
                          <div className='flex text-xl justify-center py-2'>
                            Chọn ghế
                          </div>
                        </div>
                        <Grid container spacing={1.3} className='shadow-lg rounded  p-4 bg-[#e6e4e4c8]'>
                          {
                            mockSeats.map((seat, index) => (
                              <Grid size={4}>
                                <div className={`${seat.status === 'available' ? 'bg-[#ccc]' : 'bg-amber-600'} rounded text-center hover:cursor-pointer hover:brightness-90`}>
                                  {seat.number}
                                </div>
                              </Grid>
                            ))
                          }
                        </Grid>
                      </Grid>
                      <Grid size={6}>
                        <div className='mt-7 mb-2'>
                          <div className='bg-red-500 mb-2 text-white flex justify-center rounded-2xl font-bold'>
                            Xin lưu ý
                          </div>
                          <div className='text-justify'>
                            Booking lưu ý chỗ ngöi lối thoát hiểm quý khách đã đặt
                            trước có thể thay đổi mà không cần thông báo. Chỗ
                            ngõi lối thoát hiểm chỉ được sắp xếp cho những hành
                            khách người lớn (từ 15 đến 65 tuối) và có kha năng hỗ
                            trợ hành khách khác trong trưởng hợp khấn cấp. Hành
                            khách bị hạn chế về khả năng nghe nhìn, hành khách
                            tàn tật, hành khách trẻ em (dưới 15 tuổi) hoặc hành
                            khách lớn tuối (trên 65 tuổi), hành khách đi kèm trẻ
                            nhỏ và phụ nữ mang thai không được sắp xếp chỗ ngõi
                            này.
                          </div>
                        </div>
                        <div className='flex items-center gap-x-1.5'>
                          <div className='text-red-500'>
                            Số ghế đã chọn:
                          </div>
                          <div>
                            1
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Container>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </div>
    </div>

  )
}

export default BookingSeat
