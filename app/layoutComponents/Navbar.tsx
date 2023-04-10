import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import Link from 'next/link';
import UserMenu from './UserMenu';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AuthState } from '@/store/authSlice';
import Logo from './Logo';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';

const pages = [
  { name: 'Tool-o-Pedia', path: 'wiki' },
  { name: 'The Library', path: 'articles' },
  { name: 'Toolbox', path: 'toolbox' },
  { name: 'Community', path: 'community' },
];

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth) as AuthState;
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href={'/'}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, mr: 2 }}>
              <Logo />
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <RxHamburgerMenu />
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link key={page.name} href={page.path}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" color={'black'}>
                      {page.name}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
              {user.user?.role === 'admin' && (
                <Link href={'/admin'}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" color={'black'}>
                      {'Admin'}
                    </Typography>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <Link href={'/'}>
              <Logo />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.name} href={page.path}>
                <Button key={page.name} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.name}
                </Button>
              </Link>
            ))}
            {user.user?.role === 'admin' && (
              <Link href={'/admin'}>
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                  {'Admin'}
                </Button>
              </Link>
            )}
          </Box>
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
