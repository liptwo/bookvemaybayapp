import { Box, Typography } from '@mui/material'
import React from 'react'

import Flight from './Flight/Flight'
import { useSelector } from 'react-redux'
import { selectCurrentFlights } from '~/redux/item/useFlight'
import { toast } from 'react-toastify'
import { selectCurrentUser } from '~/redux/item/userSlice'
import { useState } from 'react'
import DrawerConfirm from './DrawerConfirm/DrawerConfirm'
import { useNavigate } from 'react-router-dom'
const ListFlight = () => {

  const flights = useSelector(selectCurrentFlights)
  const [anchorBL, setAnchorBL] = useState(false)
  const currentUser = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  const handleOpenDrawer = () => {
    if (currentUser) {
      setAnchorBL(true)
    } else {
      toast.warning('Please sign in before continue')
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }
  if (!flights || flights.length === 0) {
    return <div>Không tìm thấy chuyến bay nào.</div>
  }
  return (
    <>
      <Typography
        className='py-2 '
        color='black'
        fontWeight={800}
        variant='h6'
        fontFamily={'Montserrat Variable'}
      >
        Tất cả các chuyến bay
      </Typography>
      <Box className='flex flex-col gap-7'>
        {flights.map(((fl, i) => (
          <div key={i}>
            <Flight handleOpenDrawer={handleOpenDrawer} flight={fl}/>
            <DrawerConfirm flight={fl} anchorBL={anchorBL} setAnchorBL={setAnchorBL} ></DrawerConfirm>
          </div>
        )))}
      </Box>
    </>
  )
}

export default ListFlight
