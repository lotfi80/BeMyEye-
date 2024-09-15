import React from 'react';
import { Box, DropDown, DropDownItem, DropDownTrigger, Button, DropDownMenu, Icon } from '@adminjs/design-system';
const RecentPosts = () => {
  return (
    <>
      <Box height="200px">
        <DropDown stick="left">
          <DropDownTrigger>
            <Button>Resent Posts</Button>
          </DropDownTrigger>
          <DropDownMenu>
            <DropDownItem onClick={function noRefCheck() {}}>
              <Icon icon="Paperclip" />
              Some menu item
            </DropDownItem>
          </DropDownMenu>
        </DropDown>
      </Box>
    </>
  );
};
export default RecentPosts;
