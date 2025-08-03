import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Box } from '@mui/material' // Import Box để bọc và thêm padding/margin
import { TYPESEATS } from '~/utils/constants'

export default function SelectChairType( {seatClass, setSeatClass}) {
  // const [type, setType] = React.useState('')

  const handleChange = (event) => {
    setSeatClass(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 150 }}>
      {' '}
      {/* Bọc FormControl trong Box để dễ dàng kiểm soát kích thước */}
      <FormControl
        fullWidth
        size='small' // Sử dụng size="small" để làm cho trường nhập liệu nhỏ gọn hơn
        sx={{
          '& .MuiInputLabel-root': {
            // Style cho InputLabel (placeholder)
            color: 'white', // Màu chữ nhãn
            '&.Mui-focused': {
              color: 'white' // Màu chữ nhãn khi focus
            }
          },
          '& .MuiOutlinedInput-root': {
            // Style cho toàn bộ phần Input
            color: 'white', // Màu chữ của giá trị đã chọn
            '& fieldset': {
              borderColor: 'white' // Màu viền mặc định
            },
            '&:hover fieldset': {
              borderColor: 'white' // Màu viền khi hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white' // Màu viền khi focus
            },
            '& .MuiSvgIcon-root': {
              // Style cho icon mũi tên xuống
              color: 'white' // Màu icon mũi tên
            }
          },
          '& .MuiList-root': {
            // Style cho popover (menu item list)
            backgroundColor: 'white', // Đảm bảo màu nền của menu là trắng
            color: 'black' // Đảm bảo màu chữ của menu item là đen
          }
        }}
      >
        <InputLabel id='chair-type-select-label'>Chọn ghế ngồi</InputLabel>
        <Select
          labelId='chair-type-select-label'
          id='chair-type-select'
          value={seatClass}
          label='Chọn ghế ngồi' // Quan trọng: label cần được truyền vào Select khi variant là 'outlined' hoặc 'filled'
          onChange={handleChange}
          MenuProps={{
            disableScrollLock: true, // Đúng vị trí
            PaperProps: {
              sx: {
                backgroundColor: 'white', // Đảm bảo nền của dropdown là trắng
                color: 'black', // Đảm bảo chữ trong dropdown là đen
                borderRadius: 2 // Bo góc cho dropdown
              }
            }
          }}
        >
          {/* MenuItems sẽ tự động kế thừa màu chữ từ Popover nếu không set riêng */}
          {Object.entries(TYPESEATS).map(([key, label]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
