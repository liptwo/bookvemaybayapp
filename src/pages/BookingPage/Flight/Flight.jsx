import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { format } from 'date-fns'
import vietjet from '~/asset/img/vietjet.png'
import { vi } from 'date-fns/locale'
import { formatDuration } from '~/utils/fomatters'
const Flight = ({ handleOpenDrawer, flight, drawer = false }) => {
  const newFlight = {
    ...flight,
    departureDateTime: format(flight.departureDateTime, 'HH:mm', {
      locale: vi
    }),
    arrivalDateTime: format(flight.arrivalDateTime, 'HH:mm', { locale: vi })
  }
  return (
    <Box
      className=' flex flex-col w-full bg-white rounded-2xl'
      sx={{ boxShadow: 2, height: 'auto' }}
    >
      <Box
        className='flex p-5 justify-between items-center'
        sx={{ width: 'full' }}
      >
        <Box className='flex gap-3 items-center'>
          <img
            src={vietjet}
            alt='Viet Jet'
            className='w-10 h-10 object-cover'
          />
          <Typography
            fontFamily={'Montserrat Variable'}
            fontWeight={'600'}
            fontSize={14}
          >
            {' '}
            VietJet Air{' '}
          </Typography>
        </Box>
        <Box className='flex flex-row items-center gap-10'>
          {/* info of flight */}
          <div className='flex flex-row gap-10'>
            <div className='flex flex-col'>
              <Typography
                fontFamily={'Montserrat Variable'}
                fontWeight={'700'}
                fontSize={14}
              >
                {newFlight.departureDateTime}
              </Typography>
              <Typography
                fontWeight={'700'}
                className='flex justify-start text-gray-500'
              >
                {newFlight.departureAirport}
              </Typography>
            </div>
            <div className='flex flex-col items-center'>
              <Typography
                fontFamily={'Montserrat Variable'}
                fontWeight={'600'}
                fontSize={11}
                className='text-gray-500'
              >
                {formatDuration(newFlight.duration)}
              </Typography>
              <div className='flex flex-row items-center gap-1'>
                <div className='w-5 rounded-2xl h-[2px] opacity-35 bg-gray-500' />
                <Typography fontWeight={'700'} fontSize={11} color='gray'>
                  {' '}
                  Bay thẳng{' '}
                </Typography>
                <div className='w-5 rounded-2xl h-[2px] opacity-35 bg-gray-500' />
              </div>
            </div>
            <div className='flex flex-col '>
              <Typography
                fontFamily={'Montserrat Variable'}
                fontWeight={'700'}
                fontSize={14}
              >
                {newFlight.arrivalDateTime}
              </Typography>
              <Typography
                fontWeight={'700'}
                className='flex items-end justify-end text-gray-500'
              >
                {newFlight.arrivalAirport}
              </Typography>
            </div>
          </div>
          {/* Price */}
          <div className=' h-full flex flex-row items-center'>
            <Typography
              className='text-red-500'
              fontFamily={'Montserrat Variable'}
              fontWeight={'700'}
              fontSize={14}
            >
              1.456.382 VND
            </Typography>
            <span className='text-gray-400 font-bold'>/khách</span>
          </div>
        </Box>
      </Box>
      <Box className='flex flex-row justify-between items-center w-full px-20 mb-2'>
        {drawer ? (
          <></>
        ) : (
          <>
            <Typography
              className='text-gray-500 cursor-pointer'
              fontFamily={'Montserrat Variable'}
              fontWeight={'700'}
              fontSize={12}
            >
              Chi tiết
            </Typography>
            <Button
              onClick={handleOpenDrawer}
              sx={{
                ml: 3,
                backgroundColor: '#0091f2',
                '&:hover': {
                  backgroundColor: '#0072cf'
                }
                // scrolled || textColor === 'black' ? 'black' : 'white'
              }}
            >
              <Typography
                color='white'
                fontFamily={'Montserrat Variable'}
                fontWeight={'700'}
                fontSize={10}
                sx={{
                  paddingX: 3
                }}
              >
                {' '}
                Chọn{' '}
              </Typography>
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}

export default Flight
