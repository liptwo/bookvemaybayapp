import React, { useState } from 'react'
import {
  Button,
  Box,
  Typography,
  IconButton,
  Popover,
  Divider
} from '@mui/material'
import {
  UserIcon,
  UsersIcon,
  BabyIcon,
  PlusIcon,
  MinusIcon,
  UsersRound
} from 'lucide-react'

const GuestSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const updateCount = (setter, value) => {
    setter((prev) => Math.max(0, prev + value))
  }

  return (
    <Box >
      <Button
        variant='outlined'
        className='border-2 !border-white !text-white'
        onClick={handleOpen}
      >
        <div className='mr-1'>
          <UsersRound size={18}></UsersRound>
        </div>
        {adults} Người lớn, {children} Trẻ em, {infants} Em bé
      </Button>
      <Popover
        disableScrollLock
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box p={2} width={300}>
          <Typography variant='h6' gutterBottom>
            Số hành khách
          </Typography>
          {[
            {
              label: 'Người lớn',
              icon: <UserIcon size={20} />,
              value: adults,
              set: setAdults,
              note: 'Từ 12 tuổi'
            },
            {
              label: 'Trẻ em',
              icon: <UsersIcon size={20} />,
              value: children,
              set: setChildren,
              note: 'Từ 2 - 11 tuổi'
            },
            {
              label: 'Em bé',
              icon: <BabyIcon size={20} />,
              value: infants,
              set: setInfants,
              note: 'Dưới 2 tuổi'
            }
          ].map((item, idx) => (
            <Box
              key={idx}
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              my={1}
            >
              <Box display='flex' alignItems='center'>
                {item.icon}
                <Box ml={1}>
                  <Typography>{item.label}</Typography>
                  <Typography fontSize={12} color='text.secondary'>
                    {item.note}
                  </Typography>
                </Box>
              </Box>
              <Box display='flex' alignItems='center'>
                <IconButton
                  onClick={() => updateCount(item.set, -1)}
                  disabled={item.value === 0}
                >
                  <MinusIcon size={16} />
                </IconButton>
                <Typography mx={1}>{item.value}</Typography>
                <IconButton onClick={() => updateCount(item.set, 1)}>
                  <PlusIcon size={16} />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Divider sx={{ my: 1 }} />
          <Button fullWidth variant='contained' onClick={handleClose}>
            Xong
          </Button>
        </Box>
      </Popover>
    </Box>
  )
}

export default GuestSelector
