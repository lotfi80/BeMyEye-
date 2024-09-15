import React from 'react';
import { Box, Button, CurrencyInput, H3, H5, Illustration, Text, Theme } from '@adminjs/design-system';
import { styled } from '@adminjs/design-system/styled-components';

// import { useTranslation } from '../../hooks/index.js';
import Logo from '../utils/Logo.js';
import MyDropDown from './Search/MyDropDown.js';

const pageHeaderHeight = 120;
const pageHeaderPaddingY = 20;
const pageHeaderPaddingX = 20;

type BoxType = {
  variant: string;
  title?: string;
  subtitle?: string;
  href: string;
  borderLeft: string;
};

const Card = styled(Box)`
  display: flex;
  color: #404040;
  height: 100%;
  text-decoration: none;
  border-radius: 7px;
  transition: all 0.1s ease-in;

  &:hover {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.primary60};
    box-shadow: ${({ theme }: { theme: Theme }) => theme.shadows.cardHover};
  }

  & .dsc-icon svg,
  .gh-icon svg {
    width: 64px;
    height: 64px;
  }
`;

Card.defaultProps = {
  variant: 'container',
  boxShadow: 'card',
};

export const DashboardHeader: React.FC = () => {
  return (
    <Box
      data-css="default-dashboard"
      display="flex"
      flexDirection="row"
      alignItems="bottom"
      justifyContent="space-between"
      mx="lg"
    >
      <Box opacity={0.9} width="20%">
        <Logo />
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        height={pageHeaderHeight}
        width="70%"
        link="lokalhost:3004/home"
      >
        <Card flex height={pageHeaderHeight} width="100%">
          <Box flex="1 1 auto">
            <H3>BeMyEye</H3>
            <Text>Welcome to Admin Dashboard!</Text>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export const Dashboard: React.FC = () => {
  const boxesSmall = (): Array<BoxType> => [
    {
      variant: 'Photos',
      subtitle: 'Posts amount',
      href: 'https://docs.adminjs.co/ui-customization/dashboard-customization',
      borderLeft: '3px solid #FFC107',
    },
    {
      variant: 'IdentityCard',
      subtitle: 'Users amount',
      href: 'https://docs.adminjs.co/tutorials/adding-role-based-access-control',
      borderLeft: '3px solid #FF5722',
    },
  ];
  const boxesRight = (): Array<BoxType> => [
    {
      variant: 'Photos',
      subtitle: 'Resent Comments',
      href: 'https://docs.adminjs.co/ui-customization/dashboard-customization',
      borderLeft: '3px solid #7ffc26',
    },
    {
      variant: 'IdentityCard',
      subtitle: 'New Users',
      href: 'https://docs.adminjs.co/tutorials/adding-role-based-access-control',
      borderLeft: '3px solid #0606fa',
    },
  ];

  const boxesBottom = (): Array<BoxType> => [
    {
      variant: 'Photos',
      subtitle: 'Recent Posts',
      href: 'https://docs.adminjs.co/ui-customization/dashboard-customization',
      borderLeft: '3px solid #06f602',
    },
  ];

  return (
    <>
      <DashboardHeader />
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end" px="lg" pb="lg">
        <MyDropDown />
      </Box>

      <Box flex flex-row mb="lg">
        <Box display="flex" flexDirection="column">
          <Box flex flex-row>
            {boxesSmall().map((box) => (
              <Box key={box.variant} width={[1, 1, 1 / 2, 1 / 2]} p="lg">
                <Card flex variant={box.variant} as="a" href={box.href} borderLeft={box.borderLeft}>
                  <Box p="lg" flex="1 1 auto">
                    <H5>{box.title}</H5>
                    <Text>{box.subtitle}</Text>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>

          {boxesBottom().map((box) => (
            <Box key={box.variant} width={1} p="lg">
              <Card flex variant={box.variant} as="a" href={box.href} borderLeft={box.borderLeft}>
                <Box p="lg" flex="1 1 auto">
                  <H5>{box.title}</H5>
                  <Text>{box.subtitle}</Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>

        <Box flexGrow="2" flex flex-row>
          {boxesRight().map((box) => (
            <Box key={box.variant} width={1 / 2} p="lg">
              <Card flex variant={box.variant} as="a" href={box.href} borderLeft={box.borderLeft}>
                <Box p="lg" flex="1 1 auto">
                  <H5>{box.title}</H5>
                  <Text>{box.subtitle}</Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
      {/* <Box
          mt="xl"
          mb="xl"
          mx={[0, 0, 0, 'auto']}
          px={['default', 'lg', 'xxl', '0']}
          position="relative"
          flex
          flexDirection="row"
          flexWrap="wrap"
          width={[1, 1, 1, 1024]}
        ></Box> */}
    </>
  );
};

export default Dashboard;
