// import { useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import Flight from '../Flight/Flight'
import { Typography } from '@mui/material'
import { createBookingAPI } from '~/apis'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/item/userSlice'
import { STATUS } from '~/utils/constants'
const DrawerConfirm = ({ flight, anchorBL, setAnchorBL }) => {
  // const [open, setOpen] = useState(false)
  const currentUser = useSelector(selectCurrentUser)
  const anchor = 'right'
  const toggleDrawer = (newOpen) => () => {
    setAnchorBL(newOpen)
  }
  const handleConfirm = async () => {
    const newBooking = {
      flightId: flight._id,
      status: STATUS.CONFIRMED,
      passengerName: currentUser.username,
      passengerEmail: currentUser.email
    }

    try {
      await createBookingAPI(newBooking)
      toggleDrawer(false)() // GỌI hàm đóng drawer
    } catch (error) {
      console.error('Booking failed:', error)
    }
  }

  const DrawerEL = (
    <Box
      className='flex flex-col px-2 gap-2'
      sx={{
        width: '700px',
        minHeight: '100vh', // 👈 Thêm dòng này để Drawer luôn full chiều cao
        backgroundColor: 'white' // 👈 Đảm bảo màu nền trắng (hoặc tuỳ bạn)
      }}
      role='presentation'
    >
      <div className='flex w-full items-end justify-end '>
        <Typography
          onClick={toggleDrawer(false)}
          className=' cursor-pointer text-2xl text-red-500 p-2'
        >
          X Close
        </Typography>
      </div>
      <Flight flight={flight} drawer={true}></Flight>
      <div className='flex items-end mt-8 justify-center'>
        <Button onClick={handleConfirm}>
          <Typography className='text-2xl bg-blue-400  rounded-2xl text-white p-4'>
            Xác nhận đặt
          </Typography>
        </Button>
      </div>
    </Box>
  )

  return (
    <>
      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
      <Drawer anchor={anchor} className='w-full' open={anchorBL} onClose={toggleDrawer(false)}>
        {DrawerEL}
      </Drawer>
    </>
  )
}

export default DrawerConfirm
