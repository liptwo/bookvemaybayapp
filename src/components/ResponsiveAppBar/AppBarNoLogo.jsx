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
import { Hotel, Plane, CarTaxiFront, Volleyball } from 'lucide-react'

const pages = [
  {
    title: 'Khách sạn',
    icon: <Hotel />
  },
  {
    title: 'Vé máy bay',
    icon: <Plane />
  },
  {
    title: 'Đưa đón sân bay',
    icon: <CarTaxiFront />
  },
  {
    title: 'Hoạt động & vui chơi',
    icon: <Volleyball />
  }
]

function AppBarNoLogo() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  //   const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 35) // scroll xuống 50px là đổi màu
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar
      position=''
      sx={{
        xs: { dislay: 'none' },
        backgroundColor: 'transparent',
        boxShadow: 'none',
        backdropFilter: 'none'
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar disableGutters className='h-10 min-h-'>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              {/* <MenuIcon /> */}
            {/* </IconButton> */}
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page, i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        border: '1px solid white'
                      },
                      ...(page.title === 'Vé máy bay' && { backgroundColor: 'white', color: 'black' })
                    }}
                  >
                    {page.icon}
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, i) => (
              <Button
                key={i}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  px: 2,
                  py:1,
                  color: scrolled ? 'black' : 'white',
                  gap: 0.5,
                  display: 'flex',
                  fontWeight: 700,
                  borderRadius: 12,
                  border: '1px solid transparent',
                  '&:hover': {
                    border: '1px solid white'
                  },
                  ...(page.title === 'Vé máy bay' && { backgroundColor: 'white', color: 'black' })
                }}
              >
                {page.icon}
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default AppBarNoLogo
