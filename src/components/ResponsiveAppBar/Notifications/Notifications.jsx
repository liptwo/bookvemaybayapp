import { useEffect, useState } from 'react'
import moment from 'moment'
import Badge from '@mui/material/Badge'
import { Bell } from 'lucide-react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/item/userSlice'
import { socketIoInstance } from '~/socketClient'
import { useNavigate } from 'react-router-dom'
import {
  addNotifications,
  fecthNotiAPI,
  selectCurrentNoti
} from '~/redux/item/useNoti'
import { Link } from '@mui/material'

function Notifications({textColor, scrolled}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // lấy dữ liệu
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget)
    setNewNotification(false)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const notifications = useSelector(selectCurrentNoti)
  const currentUser = useSelector(selectCurrentUser)
  const [newNotification, setNewNotification] = useState(false)
  // fecth danh sách các lời mời
  // useEffect(() => {
  //   dispatch(fecthBookingSeatAPI())

  //   // tạo một cái function xử lý khi nhận được sự kiện realtime BE_USER_INVITED_TO_BOARD từ phía server gửi về
  //   const onReceiveNewInvitation = (invitation) => {
  //     // nếu thằng user đang đăng nhập hiện tại mà chúng ta lưu trong redux chính là thằng invitee trong bản
  //     // ghi invitation
  //     if (invitation.inviteeId === currentUser._id) {
  //       // bước 1 thêm bản ghi invitation mới vào trong redux
  //       dispatch(addNotifications(invitation))
  //       // bước 2 cập nhập newNotification đang có thông báo đến
  //       setNewNotification(true)
  //     }
  //   }
  //   socketIoInstance.on('BE_USER_INVITED_TO_BOARD', onReceiveNewInvitation)
  //   return () => {
  //     // clean up sự kiện để chặn việc bị đăng ký lặp lại sự kiện
  //     socketIoInstance.off('BE_USER_INVITED_TO_BOARD', onReceiveNewInvitation)
  //   }
  // }, [dispatch, currentUser._id])

  // const updateBoardInvitation = (status, invitationId) => {
  //   // console.log('status: ', status, invitationId)
  //   dispatch(updateBoardInvitationAPI({ invitationId, status })).then((res) => {
  //     // console.log(res)
  //     if (
  //       res.payload.boardInvitation.status === BOARD_INVITATION_STATUS.ACCEPTED
  //     ) {
  //       navigate(`/boards/${res.payload.boardInvitation.boardId}`)
  //     }
  //   })
  // }
  useEffect(() => {
    // fecth danh sách các lời mời
    dispatch(fecthNotiAPI(currentUser._id))

    const onReceiveNewInvitation = (noti) => {
      console.log('New notification:', noti)
      // Cập nhật state để hiển thị thông báo mới
      // setNewNotification(prev => [notification, ...prev])
      // bước 1 thêm bản ghi invitation mới vào trong redux
      dispatch(addNotifications(noti))
      // bước 2 cập nhập newNotification đang có thông báo đến
      setNewNotification(true)
    }
    if (currentUser) {
      // Tham gia phòng riêng
      socketIoInstance.emit('user:join-room', currentUser._id)

      // Lắng nghe sự kiện đặt vé thành công
      socketIoInstance.on('booking:success', onReceiveNewInvitation)
    }
    return () => {
      // clean up sự kiện để chặn việc bị đăng ký lặp lại sự kiện
      socketIoInstance.off('booking:success', onReceiveNewInvitation)
    }
  }, [dispatch, currentUser])
  return (
    <Box>
      <Tooltip title='Đặt chỗ của tôi'>
        <Badge
          color='warning'
          // variant="none"
          variant= { newNotification? 'dot': 'none' }
          sx={{ cursor: 'pointer' }}
          id='basic-button-open-notification'
          aria-controls={open ? 'basic-notification-drop-down' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <Bell color={ scrolled || textColor === 'black' ? 'black': 'white'} size={18} />
        </Badge>
      </Tooltip>

      <Menu
        disableScrollLock
        sx={{ mt: 2 }}
        id='basic-notification-drop-down'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
      >
        {notifications?.length === 0 && (
          <MenuItem sx={{ minWidth: 200 }}>
            You do not have any new notifications.
          </MenuItem>
        )}
        {notifications?.map((noti, index) => (
          <Box key={index}>
            <MenuItem
              sx={{
                minWidth: 200,
                maxWidth: 360,
                overflowY: 'auto'
              }}
            >
              <Box
                sx={{
                  maxWidth: '100%',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                {/* Nội dung của thông báo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box>
                    {noti?.message}
                  </Box>
                </Box>
                <Link href={`/flight/seat/${noti?.bookingDetails._id}`}> Nhấn vào đây để đến trang đặt vé</Link>
                {/* Thời gian của thông báo */}
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant='span' sx={{ fontSize: '13px' }}>
                    {moment(noti?.timestamp).format('llll')}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            {/* Cái đường kẻ Divider sẽ không cho hiện nếu là phần tử cuối */}
            {index !== notifications?.length - 1 && <Divider />}
          </Box>
        ))}
      </Menu>
    </Box>
  )
}

export default Notifications
