import React, { useEffect, useState } from 'react';
import { useTranslation } from 'adminjs';
import { Box, Button, CurrencyInput, H3, H5, H6, Illustration, Text, Theme } from '@adminjs/design-system';
import { styled } from '@adminjs/design-system/styled-components';

import { getPosts, getUsers } from '../http/api.js';
import { IPost } from '../models/Post.js';
import { IUser } from '../models/user.js';

import Logo from '../utils/Logo.js';
import MyDropDown from './Search/MyDropDown.js';
import PostAmount from './PostAmount.js';
import UsersAmount from './UsersAmount.js';
import RecentPosts from './RecentPosts.js';

const pageHeaderHeight = 120;
const pageHeaderPaddingY = 20;
const pageHeaderPaddingX = 20;

type VariantType = 'Docs' | 'Astronaut' | 'DocumentSearch' | 'Plug' | 'Details';

type BoxType = {
  variant: VariantType;
  title?: string;
  subtitle?: string;
  href: string;
  borderLeft: string;
  component?: React.FC;
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
  const [postAmount, setPostAmount] = useState<number>(0);
  const [userAmount, setUserAmount] = useState<number>(0);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);

  const boxesSmall = (): Array<BoxType> => [
    {
      variant: 'Docs' as any,
      subtitle: 'Posts amount',
      href: 'https://docs.adminjs.co/ui-customization/dashboard-customization',
      borderLeft: '3px solid #FFC107',
      component: () => <PostAmount postAmount={postAmount} />,
    },
    {
      variant: 'Astronaut' as any,
      subtitle: 'Users amount',
      href: 'https://docs.adminjs.co/tutorials/adding-role-based-access-control',
      borderLeft: '3px solid #FF5722',
      component: () => <UsersAmount userAmount={userAmount} />,
    },
  ];
  const boxesRight = (): Array<BoxType> => [
    {
      variant: 'DocumentSearch',
      subtitle: 'Recent Comments',
      href: 'https://docs.adminjs.co/ui-customization/dashboard-customization',
      borderLeft: '3px solid #7ffc26',
    },
    {
      variant: 'Details',
      subtitle: 'Recent Posts',
      href: 'https://docs.adminjs.co/tutorials/adding-role-based-access-control',
      borderLeft: '3px solid #0606fa',
      component: () => <RecentPosts allPosts={allPosts} />,
    },
  ];

  const boxesBottom = (): Array<BoxType> => [
    {
      variant: 'Plug',
      subtitle: 'New Users',
      href: 'https://docs.adminjs.co/ui-customization/dashboard-customization',
      borderLeft: '3px solid #06f602',
    },
  ];

  const sortData = (posts: any) => {
    const sorted = posts.slice().sort((a, b) => {
      const dateA = new Date(a.postDate).getTime();
      const dateB = new Date(b.postDate).getTime();
      return dateB - dateA;
    });
    setAllPosts(sorted);
    console.log('Sorted:', sorted);
    setPostAmount(sorted.length);
  };

  useEffect(() => {
    const getPostAmount = async () => {
      try {
        const response = await getPosts();
        console.log('Posts in Dashboard:', response);
        sortData(response);
      } catch (error) {
        console.log(error);
      }
    };
    getPostAmount();
  }, []);

  useEffect(() => {
    const getUsersAmount = async () => {
      try {
        const response = await getUsers();
        setAllUsers(response);
        setUserAmount(response.length);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersAmount();
  }, []);

  function userImage(user: any): string {
    const userImage = user?.profileimage?.includes('http')
      ? user?.profileimage
      : `http://localhost:5000/${user?.profileimage}`;
    return userImage;
  }

  function formatDate(dateString: any): string {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  return (
    <>
      <DashboardHeader />
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end" px="lg" pb="lg">
        <MyDropDown />
      </Box>

      <Box flex flex-row mb="lg">
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Box flex flex-row pl="lg" pt="lg">
            {boxesSmall().map((box) => (
              <Box key={box.variant} width={[1, 1, 1 / 2, 1 / 2]}>
                <Card flex variant={box.variant} as="a" href={box.href} borderLeft={box.borderLeft}>
                  <Box p="md" flex="1 1 auto" position="relative">
                    <Illustration variant={box.variant} width={50} height={50} />
                    <H6 marginTop="8px">{box.title}</H6>
                    <Text>{box.subtitle}</Text>
                    <Box>{<box.component />}</Box>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>

          {boxesBottom().map((box) => (
            <Box key={box.variant} width={1} pl="lg" pt="lg">
              <Card flex variant={box.variant} as="a" href={box.href} borderLeft={box.borderLeft}>
                <Box p="lg" flex="1 1 auto">
                  <Illustration variant={box.variant} width={50} height={50} />

                  <H5>{box.title}</H5>
                  <Text>{box.subtitle}</Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>

        <Box flex flex-row flexGrow="2">
          {boxesRight().map((box) => (
            <Box key={box.variant} width={1 / 2} pt="lg" pr="lg" pl="lg">
              <Card flex variant={box.variant} as="a" href={box.href} borderLeft={box.borderLeft}>
                <Box flex="1 1 auto">
                  <Illustration variant={box.variant} width={50} height={50} />

                  <H5>{box.title}</H5>
                  <Text>{box.subtitle}</Text>
                  <Box>{box.component && <box.component />}</Box>
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
