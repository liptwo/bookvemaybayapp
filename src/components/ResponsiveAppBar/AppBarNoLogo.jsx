import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Hotel, Plane, CarTaxiFront, Volleyball } from 'lucide-react';

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
    },
]

function AppBarNoLogo() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 35); // scroll xuống 50px là đổi màu
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    })

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            position=""
            sx={{
                transition: 'background-color 0.3s',
                backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                boxShadow: scrolled ? 2 : 'none',
                backdropFilter: scrolled ? 'blur(6px)' : 'none',
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters className='!h-10 !min-h-10 overflow-hidden'>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page, i) => (
                                <MenuItem key={i} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center', display: 'flex' }}>{page.icon}{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, i) => (
                            <Button
                                key={i}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, padding: 2, color: scrolled ? 'black' : 'white', gap: 0.5, display: 'flex', fontWeight: 700 }}
                            >
                                {page.icon}{page.title}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default AppBarNoLogo;
