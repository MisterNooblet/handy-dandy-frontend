import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { AuthState } from 'store/authSlice';
import Logo from './Logo';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';

const pages = [
  { name: 'Tool-o-Pedia', path: 'wiki' },
  { name: 'The Library', path: 'library/articles' },
  { name: 'Toolbox', path: 'toolbox' },
  // { name: 'Community', path: 'community' },
  // { name: 'Author', path: 'author' },
  { name: 'Favorites', path: 'favorites' },
];

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;
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
          <Link title="Handy Dandy" to={'/'}>
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
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar2"
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
                <Link key={page.name} to={page.path}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" color={'black'}>
                      {page.name}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
              {user && user?.role !== 'user' && (
                <Link to={'/author'}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" color={'black'}>
                      {'Author'}
                    </Typography>
                  </MenuItem>
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link to={'/admin'}>
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
            <Link title="Handy Dandy" to={'/'}>
              <Logo />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.name} to={page.path}>
                <Button key={page.name} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.name}
                </Button>
              </Link>
            ))}
            {user && user?.role !== 'user' && (
              <Link to={'/author'}>
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                  {'Author'}
                </Button>
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to={'/admin'}>
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
