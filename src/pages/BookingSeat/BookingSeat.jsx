import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Checkbox,
  Button
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import VHL from '../../asset/img/travellokaBg.webp'
import {
  Square,
  SquareMinus,
  SquareCheck,
  LifeBuoy,
  Armchair
} from 'lucide-react'
import { mockSeats } from '~/utils/mock'
import { getFlightAPI } from '~/apis'
import { useParams } from 'react-router-dom'
import SeatMap from './SeatMap/SeatMap'

import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { formatDuration } from '~/utils/fomatters'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/item/userSlice'
import Confirm from './Confirm'
import Success from './Success'
import { toast } from 'react-toastify'

const Completionist = () => <span>Hết thời gian</span>

const steps = ['Đặt vé', 'Chọn chỗ ngồi', 'Thanh toán']

const BookingSeat = () => {
  const currentUser = useSelector(selectCurrentUser)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mySeat, setMySeat] = useState(null)
  const flightId = useParams()
  // Initialize flight as an object to hold flight details, not an array
  const [flight, setFlight] = useState(null)

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await getFlightAPI(flightId.id)
        console.log(res) // ✅ dữ liệu JSON thực
        setFlight(res) // Set the flight object
      } catch (error) {
        console.error('Lỗi khi gọi API:', error)
      }
    }

    fetchFlight()
  }, [flightId])

  const [activeStep, setActiveStep] = React.useState(1)
  const [skipped, setSkipped] = React.useState(new Set())

  const isStepOptional = (step) => {
    return step === 1
  }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    if ( mySeat !== null) {
      let newSkipped = skipped
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values())
        newSkipped.delete(activeStep)
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      setSkipped(newSkipped)
    } else {
      toast.error('Vui lòng chọn ghế!')
    }

  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(1)
  }
  const handleSteps = (step) => {
    switch (step) {
      case 0:
        throw new Error('Step 1')
      case 1:
        return (
          <Container maxWidth='sm' className='mt-2 flex flex-col items-center'>
            <Grid container spacing={15}>
              <Grid size={{ xs: 12, md: 6 }}>
                <div className=' h-14 mt-2'>
                  <div className='flex bg-red-500 rounded-t-xl text-xl text-white justify-center py-2'>
                    Chọn ghế
                  </div>
                </div>
                <SeatMap
                  flightId={flightId.id}
                  userId={currentUser._id}
                  mySeat={mySeat}
                  setMySeat={setMySeat}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <div className='border-1 max-w-[600px] rounded-t-xl rounded-b-xl'>
                  <Typography
                    fontWeight={'bold'}
                    className='flex items-center justify-center bg-red-500 rounded-t-xl text-white'
                  >
                    Ghi chú
                  </Typography>
                  <div className='flex items-center justify-between p-4 rounded-lg'>
                    <div className='flex items-center gap-x-1'>
                      <Box className='w-5 border-2 border-black h-5 rounded'></Box>
                      Còn trống
                    </div>
                    <div className='flex items-center gap-x-1'>
                      <Box className='text-gray-400 bg-amber-100 w-5 border-2 border-black h-5 rounded'></Box>
                      Đã có người
                    </div>
                    <div className='flex items-center gap-x-1'>
                      <Box className='bg-green-600 text-white w-5 border-2 border-black h-5 rounded'></Box>
                      Đang chọn
                    </div>
                  </div>
                </div>
                <div className='mt-7 mb-2 border-1 p-5 rounded-xl'>
                  <div className='bg-red-500 mb-2 text-white flex justify-center rounded-2xl font-bold'>
                    Thông tin chuyến bay {flight?.flightNumber || '...'}
                  </div>
                  <div className='text-justify flex flex-col gap-3'>
                    <span>
                      Ngày khởi hành:{' '}
                      {flight?.arrivalDateTime
                        ? format(
                            new Date(flight.arrivalDateTime),
                            'dd-M-yyyy',
                            {
                              locale: vi
                            }
                          )
                        : 'N/A'}
                    </span>
                    <span>
                      Từ: {flight?.departureAirport || '...'} {'-->'}{' '}
                      {flight?.arrivalAirport || '...'}
                    </span>
                    <span>
                      Trong khoảng:{' '}
                      {flight?.duration
                        ? formatDuration(flight.duration)
                        : 'N/A'}
                    </span>
                    <span>
                      Cất cánh lúc:{' '}
                      {flight?.departureDateTime
                        ? format(new Date(flight.departureDateTime), 'HH:mm', {
                            locale: vi
                          })
                        : 'N/A'}
                    </span>
                    <span>
                      Đến nơi lúc:{' '}
                      {flight?.arrivalDateTime
                        ? format(new Date(flight.arrivalDateTime), 'HH:mm', {
                            locale: vi
                          })
                        : 'N/A'}
                    </span>
                  </div>
                </div>
                {/* Updated passenger and seat selection display */}
                <div className='mt-5 p-5 rounded-xl border-1'>
                  <div className='text-center font-bold bg-red-500 rounded-xl text-white'>
                    Thông tin hành khách
                  </div>
                  <Grid
                    container
                    spacing={4}
                    direction='row'
                    // justifyContent='center'
                    // alignItems='center'
                    className='py-2 border-b border-gray-300'
                  >
                    <Grid item xs={1}>
                      {/* Empty for alignment */}
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='subtitle1' className='font-bold'>
                        Tên hành khách
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant='subtitle1' className='font-bold'>
                        Ghế
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    direction='row'
                    alignItems='center'
                    className='py-2 '
                  >
                    <Grid item xs={1}>
                      <Checkbox defaultChecked />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='body1'>
                        {currentUser?.username || 'Đang tải...'}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant='body1'>
                        {mySeat ? mySeat : 'Chưa chọn'}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                {/* End of new passenger and seat selection display */}
                <div className='flex items-center gap-x-1.5'>
                  <div className='text-red-500'>Số ghế được phép chọn:</div>
                  <div>1</div>
                </div>
                <div className='flex items-center justify-center p-5'>
                  <Button
                    className=''
                    sx={{
                      backgroundColor: 'red',
                      color: 'white'
                    }}
                    onClick={handleNext}
                  >
                    Xác nhận đặt chỗ
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Container>
        )
      case 2:
        return (
          <Confirm
            flight={flight}
            mySeat={mySeat}
            user={currentUser}
            setIsSuccess={setIsSuccess}
          />
        )
      default:
        throw new Error('Unknown step')
    }
  }

  return (
    <div>
      <img src={VHL} alt='' className='fixed h-[100vh] w-full object-cover' />
      <div className='absolute inset-0'>
        <Container
          disableGutters
          maxWidth=''
          className='bg-transparent text-black'
        >
          <Container maxWidth='md' disableGutters>
            <Box
              className='items-end'
              sx={{ display: 'flex', height: '30px', width: '100%' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Typography
                  variant='h5'
                  noWrap
                  component='a'
                  sx={{
                    mr: 2,
                    display: {
                      xs: 'none',
                      md: 'flex',
                      color: 'white'
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
              </Box>
            </Box>
            <Grid container spacing={2} className=' flex flex-row '>
              <Grid size={12} className='bg-white rounded-xl shadow-lg'>
                {isSuccess ? (
                  <Success user={currentUser} flight={flight} />
                ) : (
                  <>
                    <Container
                      maxWidth='sm'
                      className='mt-2 flex flex-col items-center'
                    >
                      <Box className='w-full bg-white p-4'>
                        <Stepper activeStep={activeStep}>
                          {steps.map((label, index) => {
                            const stepProps = {}
                            const labelProps = {}
                            if (isStepOptional(index)) {
                              labelProps.optional = (
                                <Typography variant='caption'></Typography>
                              )
                            }
                            if (isStepSkipped(index)) {
                              stepProps.completed = false
                            }
                            return (
                              <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                              </Step>
                            )
                          })}
                        </Stepper>
                        <Divider className='w-full my-5 py-2' />
                      </Box>
                    </Container>

                    <div className='mb-5'>{handleSteps(activeStep)}</div>
                  </>
                )}
              </Grid>
            </Grid>
          </Container>
        </Container>
      </div>
    </div>
  )
}

export default BookingSeat
