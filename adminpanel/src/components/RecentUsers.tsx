import React from 'react';
import { Box, DropDown, DropDownItem, DropDownTrigger, Button, DropDownMenu, Icon } from '@adminjs/design-system';
const RecentUsers = () => {
  return (
    <>
      <Box height="200px">
        <DropDown stick="left">
          <DropDownTrigger>
            <Button>Resent Users</Button>
          </DropDownTrigger>
          <DropDownMenu>
            <DropDownItem onClick={function noRefCheck() {}}>
              <Icon icon="User" />
              Some menu item
            </DropDownItem>
          </DropDownMenu>
        </DropDown>
      </Box>
    </>
  );
};
export default RecentUsers;
