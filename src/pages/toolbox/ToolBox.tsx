import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ItemInfo from './components/ItemInfo';
import { Box } from '@mui/system';
import { AuthState } from '../../store/authSlice';
import { RootState } from 'store/store';
import { fetchUserExtended } from 'utils/apiAuth';
import { Item, UserExtended } from 'utils/models';
import ItemList from './components/ItemList';
import { Container } from '@mui/material';

const Toolbox = () => {
  const [moreInfo, setMoreInfo] = useState<Item | null>(null);
  const [user, setUser] = useState<UserExtended | null>(null);
  const { user: authUser } = useSelector((state: RootState) => state.auth) as AuthState;
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetchUserExtended();
      setUser(response);
      console.log(response);
    };
    if (authUser) {
      fetchUser();
    }
  }, [authUser]);

  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1, pt: 6, pb: 6 }}>
      {!authUser && <div>Please login to use this feature.</div>}

      {user && user?.toolbox.tools.length === 0 && user.toolbox.materials.length === 0 ? (
        <div>Toolbox empty</div>
      ) : user ? (
        <Box component={'div'} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100%' }}>
          <ItemList user={user} setMoreInfo={setMoreInfo} />
          {moreInfo && <ItemInfo item={moreInfo} />}
        </Box>
      ) : null}
    </Container>
  );
};

export default Toolbox;
