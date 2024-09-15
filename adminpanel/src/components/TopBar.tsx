import { Box, BoxProps, Icon, cssClass } from '@adminjs/design-system';
import { styled } from '@adminjs/design-system/styled-components';
import React from 'react';
import { useSelector } from 'react-redux';
import CurrentAdmin from './CurrentAdmin.js';
import Logo from '../utils/Logo.js';

const NavBar = styled(Box)<BoxProps>`
  height: ${({ theme }) => theme.sizes.navbarHeight};
  border-bottom: ${({ theme }) => theme.borders.default};
  background: ${({ theme }) => theme.colors.container};
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  align-items: bottom;
  justify-content: space-between;
`;

NavBar.defaultProps = {
  className: cssClass('NavBar'),
};

type Props = {
  toggleSidebar: () => void;
};

const TopBar: React.FC<Props> = (props) => {
  const { toggleSidebar } = props;

  return (
    <NavBar data-css="NavBar" mx="lg" my="lg">
      <Box
        py="lg"
        px={['default', 'lg']}
        onClick={toggleSidebar}
        display={['block', 'block', 'block', 'block', 'none']}
        style={{ cursor: 'pointer' }}
      >
        <Icon icon="Menu" size={24} />
      </Box>

      <Box
        px={['default', 'lg']}
        onClick={toggleSidebar}
        display={['block', 'block', 'block', 'block', 'block']}
        style={{ cursor: 'pointer' }}
      >
        <CurrentAdmin />
      </Box>
    </NavBar>
  );
};

export default TopBar;
