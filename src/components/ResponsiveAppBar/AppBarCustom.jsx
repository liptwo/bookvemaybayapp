import React, { useState } from 'react'
import ResponsiveAppBar from './ResponsiveAppBar'
import { AppBar, Container, Divider, Toolbar } from '@mui/material'
import AppBarNoLogo from './AppBarNoLogo'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const AppBarCustom = ({ textColor, justResponeAppBar = false }) => {
  const [scrolled, setScrolled] = React.useState(false)
  const [justResponeAppBarBG, setJustResponeAppBarBG] =
    useState(justResponeAppBar)
  const [textColorBG, setTextColorBG] = useState(textColor || '')
  const [hidden, setHidden] = useState(true)
  const localation = useLocation()
  useEffect(() => {
    if (localation.pathname === '/') {
      setJustResponeAppBarBG(false)
      setTextColorBG('')
    } else {
      setJustResponeAppBarBG(true)
      setTextColorBG('black')
    }
    if (location.pathname === '/login' || location.pathname === '/register' || location.pathname.includes('/flight/seat') ) {
      setHidden(false)
    } else {
      setHidden(true)
    }
    setScrolled(false)
  }, [localation])

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 35) // scroll xuống 50px là đổi màu
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <>
      {hidden && (
        <AppBar
          position='fixed'
          sx={{
            zIndex: 99,
            transition: 'background-color 0.3s',
            // backgroundColor:'transparent'
            // transition: 'background-color 0.3s',
            backgroundColor:
              scrolled || textColor === 'black'
                ? 'rgba(255, 255, 255, 0.9)'
                : 'transparent',
            boxShadow: 'none',
            backdropFilter:
              scrolled || textColor === 'black' ? 'blur(6px)' : 'none'
          }}
        >
          <Container maxWidth='lg'>
            <Toolbar disableGutters className=''>
              <ResponsiveAppBar textColor={textColorBG} scrolled={scrolled} />
              {/* <Divider
            sx={{
              borderBottomWidth: '2px',
              opacity: 1,
              borderColor: 'black'
            }}
          /> */}
            </Toolbar>
          </Container>
          <Divider
            sx={{
              // borderBottomWidth: '0.5px',
              opacity: 0.15,
              borderColor: 'gray'
            }}
          />
          {!justResponeAppBarBG && (
            <>
              <Container maxWidth='lg'>
                <Toolbar disableGutters className=' flex flex-col'>
                  <AppBarNoLogo textColor={textColorBG} scrolled={scrolled} />
                </Toolbar>
              </Container>
              <Divider
                sx={{
                  // borderBottomWidth: '0.5px',
                  opacity: 0.15,
                  borderColor: 'gray'
                }}
              />
            </>
          )}
        </AppBar>
      )}
    </>
  )
}

export default AppBarCustom
