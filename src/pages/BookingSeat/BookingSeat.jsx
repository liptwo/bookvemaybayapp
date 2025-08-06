import { Container, Grid, Typography } from '@mui/material'
// import { Grid } from 'lucide-react'
import React from 'react'
import ResponsiveAppBar from '~/components/ResponsiveAppBar/ResponsiveAppBar'
import Countdown from 'react-countdown'
const Completionist = () => <span>Hết thời gian</span>

const BookingSeat = () => {
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />
    } else {
      // Render a countdown
      return (
        <div className='flex flex-row text-xl gap-2 justify-center items-center bg-amber-400 w-30 py-2'>
          <div className='text-bold '>{minutes}</div>
          :
          <div className='text-bold '>{seconds}</div>
        </div>
      )
    }
  }
  return (
    <Container disableGutters maxWidth='md'>
      <ResponsiveAppBar textColor={'black'} justResponeAppBar={true} />
      <Grid container spacing={10} className='mt-2 flex flex-row '>
        <Grid size={3} className='text-center flex gap-2 flex-col items-center   bg-gray-300 rounded-2xl h-[90vh]'>
          <Typography variant='h5' className=' pt-20'>Bạn có 10 phút để đặt chỗ</Typography>
          <Countdown date={Date.now() + 600000} renderer={renderer} />
          <Typography variant='h5' className='pt-22'>Mã đặt chỗ: </Typography>
        </Grid>
        <Grid size={9}>
          Hello
        </Grid>
      </Grid>
    </Container>
  )
}

export default BookingSeat
