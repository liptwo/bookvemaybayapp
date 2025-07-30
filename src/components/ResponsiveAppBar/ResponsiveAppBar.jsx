import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Divider } from '@mui/material'
import AppBarNoLogo from './AppBarNoLogo'
import { useNavigate } from 'react-router-dom'

const pages = [
  'Hợp tác với chúng tôi',
  'Khuyến mãi',
  'Đã lưu',
  'Đặt chỗ của tôi'
]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function ResponsiveAppBar( { textColor }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [scrolled, setScrolled] = React.useState(false)
  const navigate = useNavigate()
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 35) // scroll xuống 50px là đổi màu
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

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

  return (
    <AppBar
      position='fixed'
      sx={{
        transition: 'background-color 0.3s',
        backgroundColor: scrolled || textColor === 'black' ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        boxShadow: scrolled || textColor === 'black' ? 2 : 'none',
        backdropFilter: scrolled || textColor === 'black' ? 'blur(6px)' : 'none',

      }}
    >
      <Container maxWidth='lg'>
        <Toolbar disableGutters className='mx-2 min-h-30'>
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
                      <Typography sx={{ textAlign: 'center' }}>
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              {/* menu responevise */}
              <Typography
                variant='h5'
                noWrap
                component='a'
                href='#app-bar-with-responsive-menu'
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: scrolled ? '':'white'
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
                      fontFamily: 'Montserrat Variable',
                      // '& :active' : {

                      // }
                    }}
                  >
                    {page}
                  </Box>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0, ml:1}}>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt='Senpai'
                      src='/static/images/avatar/2.jpg'
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  disableScrollLock
                  sx={{ mt:'45px' }}
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
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: 'center' }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
            {/* <Box sx={{ display: { xs: 'none', md: 'block' } }}> */}
            {/* </Box> */}
          </Box>
        </Toolbar>
      </Container>
      <Divider sx={{
        // borderBottomWidth: '2px',
        opacity: 0.15,
        borderColor: scrolled || textColor === 'black' ? 'black' : 'gray'
      }}/>
      <AppBarNoLogo textColor={textColor} />

      <Divider sx={{
        // borderBottomWidth: '0.5px',
        opacity: scrolled ? 0 : 0.15,
        borderColor: scrolled || textColor === 'black' ? 'black' : 'gray'
      }}/>
    </AppBar>
  )
}
export default ResponsiveAppBar
