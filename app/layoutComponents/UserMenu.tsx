import { AuthState, logout } from '@/store/authSlice';
import { RootState } from '@/store/store';
import { removeAuthCookie } from '@/utils/cookieManager';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const settings = [
  { name: 'Profile', path: 'profile' },
  { name: 'Logout', path: '/' },
];

const loginSettings = [
  { name: 'Login', path: 'login' },
  { name: 'Signup', path: 'signup' },
];

const UserMenu = () => {
  const user = useSelector((state: RootState) => state.auth) as AuthState;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.user ? user.user.fullName : undefined} src={user.user?.pfp && user.user.pfp} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {!user.user
          ? loginSettings.map((setting) => (
              <Link key={setting.name} href={setting.path}>
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" color={'black'}>
                    {setting.name}
                  </Typography>
                </MenuItem>
              </Link>
            ))
          : settings.map((setting) => (
              <Link key={setting.name} href={setting.path}>
                <MenuItem
                  key={setting.name}
                  onClick={(e) => {
                    if (setting.name === 'Logout') {
                      removeAuthCookie();
                      dispatch(logout());
                      handleCloseUserMenu();
                    } else {
                      handleCloseUserMenu();
                    }
                  }}
                >
                  <Typography textAlign="center" color={'black'}>
                    {setting.name}
                  </Typography>
                </MenuItem>
              </Link>
            ))}
      </Menu>
    </Box>
  );
};

export default UserMenu;
