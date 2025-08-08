// import React from 'react'
// import Box from '@mui/material/Box'
// import Stepper from '@mui/material/Stepper'
// import Step from '@mui/material/Step'
// import StepLabel from '@mui/material/StepLabel'
// import Typography from '@mui/material/Typography'
// // import FirstStep from "./FirstStep";
// import { useState, useEffect } from 'react'
// import { getFlightAPI } from '~/apis'
// import { useParams } from 'react-router-dom'
// // import SecondStep from "./SecondStep";
// import Confirm from './Confirm'
// import Success from './Success'
// // import { AppContext } from "../Context";
// import BookingSeat from './BookingSeat'
// import { useSelector } from 'react-redux'
// import { selectCurrentUser } from '~/redux/item/userSlice'
// import VHL from '../../asset/img/travellokaBg.webp'
// import {
//   Square,
//   SquareMinus,
//   SquareCheck,
//   LifeBuoy,
//   Armchair
// } from 'lucide-react'
// import { Container, Grid } from '@mui/material'

// // Step titles
// const labels = ['Đặt Vé', 'Đặt Chỗ', 'Thanh Toán']

// const StepForm = () => {
//   const currentUser = useSelector(selectCurrentUser)
//   const [mySeat, setMySeat] = useState(null)
//   const flightId = useParams()
//   // Initialize flight as an object to hold flight details, not an array
//   const [flight, setFlight] = useState(null)

//   useEffect(() => {
//     const fetchFlight = async () => {
//       try {
//         const res = await getFlightAPI(flightId.id)
//         console.log(res) // ✅ dữ liệu JSON thực
//         setFlight(res) // Set the flight object
//       } catch (error) {
//         console.error('Lỗi khi gọi API:', error)
//       }
//     }

//     fetchFlight()
//   }, [flightId])

//   const [activeStep, setActiveStep] = React.useState(1)
//   const [skipped, setSkipped] = React.useState(new Set())

//   const isStepOptional = (step) => {
//     return step === 1
//   }

//   const isStepSkipped = (step) => {
//     return skipped.has(step)
//   }

//   const handleNext = () => {
//     let newSkipped = skipped
//     if (isStepSkipped(activeStep)) {
//       newSkipped = new Set(newSkipped.values())
//       newSkipped.delete(activeStep)
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1)
//     setSkipped(newSkipped)
//   }

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1)
//   }

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       throw new Error("You can't skip a step that isn't optional.")
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1)
//     setSkipped((prevSkipped) => {
//       const newSkipped = new Set(prevSkipped.values())
//       newSkipped.add(activeStep)
//       return newSkipped
//     })
//   }

//   const handleReset = () => {
//     setActiveStep(1)
//   }

//   const handleSteps = (step) => {
//     switch (step) {
//     case 0:
//       throw new Error('Step 1')
//     case 1:
//       return (
//         <BookingSeat
//         />
//       )
//     case 2:
//       return <Confirm />
//     default:
//       throw new Error('Unknown step')
//     }
//   }
//   return (
//     <div>
//       <img
//         src={VHL}
//         alt=''
//         className='relative h-[100vh] w-full object-cover'
//       />
//       <div className='absolute inset-0'>
//         <Container
//           disableGutters
//           maxWidth=''
//           className='bg-transparent text-black'
//         >
//           <Container maxWidth='md' disableGutters>
//             <Box
//               className='items-end'
//               sx={{ display: 'flex', height: '30px', width: '100%' }}
//             >
//               <Box
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'row',
//                   justifyContent: 'center',
//                   alignItems: 'center'
//                 }}
//               >
//                 <Typography
//                   variant='h5'
//                   noWrap
//                   component='a'
//                   sx={{
//                     mr: 2,
//                     display: {
//                       xs: 'none',
//                       md: 'flex',
//                       color: 'white'
//                     },
//                     fontFamily: 'Aclonica',
//                     fontWeight: 800,
//                     letterSpacing: '.2rem',
//                     color: 'inherit',
//                     textDecoration: 'none',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   Booking
//                 </Typography>
//               </Box>
//             </Box>
//             <Grid container spacing={2} className=' flex flex-row '>
//               <Grid size={12} className='bg-white rounded-xl shadow-lg'>
//                 <Container
//                   maxWidth='sm'
//                   className='mt-2 flex flex-col items-center'
//                 >
//                   <Box className='w-full bg-white p-4'>
//                     {activeStep === labels.length ? (
//                       <Success />
//                     ) : (
//                       <>
//                         <Stepper
//                           activeStep={activeStep}
//                           sx={{ py: 3 }}
//                           alternativeLabel
//                         >
//                           {labels.map((label) => (
//                             <Step key={label}>
//                               <StepLabel>{label}</StepLabel>
//                             </Step>
//                           ))}
//                         </Stepper>

//                         {handleSteps(activeStep)}
//                       </>
//                     )}
//                   </Box>
//                 </Container>
//               </Grid>
//             </Grid>
//           </Container>
//         </Container>
//       </div>
//     </div>
//   )
// }

// export default StepForm