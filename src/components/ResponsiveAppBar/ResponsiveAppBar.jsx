import * as React from 'react'
// import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
// import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
// import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Badge, Divider } from '@mui/material'
// import AppBarNoLogo from './AppBarNoLogo'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAPI, selectCurrentUser } from '~/redux/item/userSlice'
import { useConfirm } from 'material-ui-confirm'
import { Bell } from 'lucide-react'
import Notifications from './Notifications/Notifications'

const pages = ['Hợp tác với chúng tôi', 'Khuyến mãi', 'Đã lưu']

function ResponsiveAppBar({ textColor, scrolled }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const currentUser = useSelector(selectCurrentUser)
  // console.log(currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [invisible, setInvisible] = React.useState(false)

  const handleBadgeVisibility = () => {
    setInvisible(true)
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleProfile = () => {
    navigate('/settings/account')
    setAnchorElUser(null)
  }
  const confirmLogout = useConfirm()
  const handleLogOut = async () => {
    confirmLogout({
      title: 'Log out of your account',
      // description: 'End your sesion?',
      confirmationText: 'Confirm Logout'
    })
      .then(() => {
        dispatch(logoutUserAPI())
      })
      .catch(() => {})
  }

  return (
    <Box sx={{ display: '', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* logo */}
        <Typography
          variant='h5'
          noWrap
          component='a'
          onClick={() => navigate('/')}
          // href='#app-bar-with-responsive-menu'
          sx={{
            mr: 2,
            display: {
              xs: 'none',
              md: 'flex',
              color: scrolled || textColor === 'black' ? 'black' : 'white'
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
        {/* menu */}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            // keepMounted
            // transformOrigin={{
            //   vertical: 'top',
            //   horizontal: 'left'
            // }}
            open={anchorElNav}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
              </MenuItem>
            ))}
            <Badge color='secondary' variant='dot' invisible={invisible}>
              <MenuItem key={'Đặt chỗ của tôi'} onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>
                  Đặt chỗ của tôi
                </Typography>
              </MenuItem>
            </Badge>
          </Menu>
        </Box>
        {/* menu responevise */}
        <Typography
          variant='h5'
          noWrap
          component='a'
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: scrolled ? 'black' : 'white'
            // textDecoration: 'none'
          }}
        >
          Booking
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'flex-end',
            gap: 3
          }}
        >
          {pages.map((page) => (
            <Box
              key={page}
              onClick={handleCloseNavMenu}
              sx={{
                cursor: 'pointer',
                my: 2,
                display: 'block',
                color: scrolled || textColor === 'black' ? 'black' : 'white',
                fontWeight: 600,
                fontSize: 13,
                fontFamily: 'Montserrat Variable'
              }}
            >
              {page}
            </Box>
          ))}
          {currentUser &&
          <Box
            // onClick={handleBadgeVisibility}
            key={'Đặt chỗ của tôi'}
            onClick={handleBadgeVisibility}
            sx={{
              cursor: 'pointer',
              my: 2,
              display: 'block',
              color: scrolled || textColor === 'black' ? 'black' : 'white',
              fontWeight: 600,
              fontSize: 13,
              fontFamily: 'Montserrat Variable'
              // '& :active' : {

              // }
            }}
          >
            <Notifications textColor={textColor} scrolled={scrolled}></Notifications>
          </Box>
          
          }
        </Box>
        {currentUser ? (
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={currentUser.displayName}
                  src={currentUser.avatar}
                />
              </IconButton>
            </Tooltip>
            <Menu
              disableScrollLock
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleProfile}>
                <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: 'center' }}>Account</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: 'center' }}>Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <>
            <Button
              onClick={() => {
                navigate('/login')
              }}
              sx={{
                ml: 3,
                backgroundColor:
                  scrolled || textColor === 'black' ? 'black' : 'white'
              }}
            >
              <Typography
                color={scrolled || textColor === 'black' ? 'white' : 'black'}
                sx={{
                  fontFamily: 'Montserrat Variable'
                }}
              >
                {' '}
                Đăng nhập{' '}
              </Typography>
            </Button>
            <Button
              nClick={() => {
                navigate('/register')
              }}
              sx={{
                ml: 2,
                border: '1px solid',
                borderColor:
                  scrolled || textColor === 'black' ? 'black' : 'white'
              }}
            >
              <Typography
                color={scrolled || textColor === 'black' ? 'black' : 'white'}
                sx={{
                  fontFamily: 'Montserrat Variable'
                }}
              >
                {' '}
                Đăng ký{' '}
              </Typography>
            </Button>
          </>
        )}
      </Box>
      {/* <Box sx={{ display: { xs: 'none', md: 'block' } }}> */}
      {/* </Box> */}
    </Box>
  )
}
export default ResponsiveAppBar
