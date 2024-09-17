import React from 'react';
import { Box, CurrentUserNav } from '@adminjs/design-system';

const CurrentAdmin: React.FC = () => {
  return (
    <Box height="250px">
      <Box border="none" flex flexDirection="row-reverse" height="navbarHeight">
        <CurrentUserNav
          avatarUrl="../utils/pngwing.com.png"
          dropActions={[
            {
              icon: 'User',
              label: 'My Profile',
              onClick: function noRefCheck() {},
            },
            {
              icon: 'LogOut',
              label: 'Log out',
              onClick: function noRefCheck() {},
            },
          ]}
          lineActions={[
            {
              icon: 'Bell',
              label: 'Notification',
              onClick: function noRefCheck() {},
            },
            {
              icon: 'Settings',
              label: 'Settings',
              onClick: function noRefCheck() {},
            },
          ]}
          name="Nath"
          title="Admin"
        />
      </Box>
    </Box>
  );
};
export default CurrentAdmin;
