import { Container, Typography } from '@mui/material'
import React from 'react'

const Success = () => {
  return (
    <div className='flex items-center flex-col justify-center h-screen'>
      {/* <Container maxWidth='lg' className='mt-2  flex flex-col items-center'> */}
        Đặt thành công rồi Vé của bạn là
        <div className='flex flex-col rounded-xl bg-blue-300 w-[70%] h-[40vh] my-2 '>
          <Typography
            className='flex items-center justify-center p-2'
            variant='h5'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: {
                xs: 'none',
                md: 'flex',
                color: 'black'
              },
              fontFamily: 'Aclonica',
              fontWeight: 800,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            Booking
          </Typography>
          <div>Tên: {}</div>
          <div>
            <div></div>
          </div>
        </div>
      {/* </Container> */}
    </div>
  )
}

export default Success
