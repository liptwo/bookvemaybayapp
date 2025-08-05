import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  InputAdornment,
  Autocomplete
} from '@mui/material'
import { ArrowLeftRight, MapPin } from 'lucide-react'
import { flightOptions } from '~/utils/constants'

// Dữ liệu mẫu cho Autocomplete
// Bạn nên thay thế bằng dữ liệu sân bay thực tế từ API hoặc một file khác
// const flightOptions = [
//   { label: 'Hà Nội (HAN) - Sân bay Quốc tế Nội Bài' },
//   { label: 'TP. Hồ Chí Minh (SGN) - Sân bay Quốc tế Tân Sơn Nhất' },
//   { label: 'Đà Nẵng (DAD) - Sân bay Quốc tế Đà Nẵng' },
//   { label: 'Nha Trang (CXR) - Sân bay Quốc tế Cam Ranh' },
//   { label: 'Phú Quốc (PQC) - Sân bay Quốc tế Phú Quốc' },
//   { label: 'Huế (HUI) - Sân bay Phú Bài' },
//   { label: 'Cần Thơ (VCA) - Sân bay Quốc tế Cần Thơ' },
//   { label: 'Đà Lạt (DLI) - Sân bay Liên Khương' },
//   { label: 'Hải Phòng (HPH) - Sân bay Quốc tế Cát Bi' },
//   { label: 'Vinh (VII) - Sân bay Vinh' }
//   // Thêm các sân bay khác nếu cần
// ]

const FlightSearchBox = ({ from = '', to = '', setFrom, setTo }) => {
  // const [departure, setDeparture] = useState(from) // Sử dụng null để Autocomplete nhận giá trị khởi tạo là không có gì
  // const [arrival, setArrival] = useState(to)

  const swapLocations = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, md: 2 }, // Khoảng cách nhỏ hơn trên mobile, lớn hơn trên desktop
        flexWrap: 'wrap', // Cho phép xuống dòng trên màn hình nhỏ
        backgroundColor: 'white',
        color: 'black',
        width: '70%' // Đảm bảo chiếm toàn bộ chiều rộng có sẵn
      }}
    >
      {/* Điểm đi */}
      <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 200, md: 260 } }}>
        {' '}
        {/* Điều chỉnh minWidth cho responsive */}
        <Typography
          variant='subtitle2'
          sx={{ color: 'text.secondary', mb: 0.5 }}
        >
          Điểm đi
        </Typography>
        <Autocomplete
          disablePortal
          options={flightOptions}
          value={from}
          onChange={(event, newValue) => setFrom(newValue)} // newValue có thể là null
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder='Chọn điểm khởi hành (VD: Hà Nội)'
              variant='outlined'
              size='small'
              sx={{
                backgroundColor: 'white',
                '& .MuiOutlinedInput-root': {
                  // Style cho InputBase (bao gồm InputAdornment và input)
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)' // Viền mặc định của Material-UI
                  },
                  '&:hover fieldset': {
                    borderColor: '#0194f3' // Viền khi hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0194f3', // Viền khi focus
                    borderWidth: '2px' // Tăng độ dày viền khi focus
                  },
                  '& .MuiInputBase-input': {
                    color: 'black' // Màu chữ input
                  },
                  '& .MuiInputAdornment-root': {
                    color: '#0194f3' // Màu icon
                  }
                }
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position='start'>
                    <MapPin size={18} />
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </Box>

      {/* Nút đổi chiều */}
      <IconButton
        onClick={swapLocations}
        sx={{
          color: '#0194f3',
          border: '1px solid #e0e0e0', // Thêm viền nhẹ
          borderRadius: '50%',
          p: 1,
          transition:
            'transform 0.4s ease-in-out, background-color 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: '#e3f2fd', // Màu nền khi hover
            transform: 'rotate(180deg)' // Xoay nhẹ khi hover
          },
          // Đặt nút swap ở vị trí trung tâm giữa 2 Autocomplete fields khi flexWrap hoạt động
          alignSelf: { xs: 'flex-end', sm: 'center' },
          my: { xs: 1, sm: 0 } // Khoảng cách trên mobile khi xuống dòng
        }}
        aria-label='Trao đổi điểm đi và điểm đến'
      >
        <ArrowLeftRight size={20} />
      </IconButton>

      {/* Điểm đến */}
      <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 200, md: 260 } }}>
        <Typography
          variant='subtitle2'
          sx={{ color: 'text.secondary', mb: 0.5 }}
        >
          Điểm đến
        </Typography>
        <Autocomplete
          disablePortal
          options={flightOptions}
          value={to}
          onChange={(event, newValue) => setTo(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder='Chọn điểm đến (VD: TP. Hồ Chí Minh)'
              variant='outlined'
              size='small'
              sx={{
                backgroundColor: 'white',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)'
                  },
                  '&:hover fieldset': {
                    borderColor: '#0194f3'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0194f3',
                    borderWidth: '2px'
                  },
                  '& .MuiInputBase-input': {
                    color: 'black'
                  },
                  '& .MuiInputAdornment-root': {
                    color: '#0194f3'
                  }
                }
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position='start'>
                    <MapPin size={18} />
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </Box>
    </Paper>
  )
}

export default FlightSearchBox
