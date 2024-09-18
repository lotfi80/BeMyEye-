import React, { useEffect, useState } from 'react';
import { Box, ValueGroup, H1, Button, Text, CardTitle, MessageBox, Avatar } from '@adminjs/design-system';
import { getUserDataByID } from '../../http/api.js';
import { useLocation } from 'react-router-dom';
import { IUser } from 'models/user.js';
import { styled } from '@adminjs/design-system/styled-components';

const UserPage = () => {
  const location = useLocation();
  const userID = location.state?.userID;
  const [currentUser, setCurrentUser] = useState<IUser>();

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
    return date.toLocaleDateString('de-DE');
  }

  useEffect(() => {
    if (!userID) {
      console.log('No userID found in state');
      return;
    }

    const getUserData = async () => {
      try {
        const response = await getUserDataByID(userID);
        setCurrentUser(response);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [userID]);

  if (!userID) {
    return <p>No userID provided</p>;
  }

  const booleanMapping = {
    true: 'Yes',
    false: 'No',
  };
  const sexMapping = {
    2: 'Male',
    1: 'Female',
    0: 'Other',
  };

  <ValueGroup label="has Password?" value={booleanMapping[String(currentUser?.hasPassword)]} />;

  return (
    <Box
      flex
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        p={40}
        style={{
          width: '75%',
          height: '75%',
          overflow: 'auto',
        }}
      >
        <Card>
          <ValueGroup label="email" value={currentUser?.email} />
          <ValueGroup label="id" value={userID} />
          <ValueGroup label="has Password?" value={booleanMapping[String(currentUser?.hasPassword)] || 'false'} />
        </Card>
        <Card>
          <ValueGroup label="register Date" value={formatDate(currentUser?.registerDate)} />
        </Card>
        {!currentUser?.username && <MessageBox message="User has no Profile" size="sm" variant="info" />}
        {currentUser?.username && (
          <>
            <ValueGroup label="User Name" value={currentUser?.username} />
            <Card>
              <ValueGroup label="Last Name" value={currentUser?.lastname} />
              <ValueGroup label="First Name" value={currentUser?.firstname} />
              <ValueGroup label="Birthdate" value={formatDate(currentUser?.birthdate)} />
            </Card>
            <Card>
              <ValueGroup label="Profile Image" value={userImage(currentUser)} />
              <Avatar
                alt="Bubble Avatar"
                src={userImage(currentUser)}
                style={{ justifySelf: 'center', width: '80px', height: '80px' }}
              />
              <ValueGroup label="Sex" value={sexMapping[currentUser.sex]} />
            </Card>

            <Card>
              <ValueGroup label="City" value={currentUser?.city} />
              <ValueGroup label="Street" value={currentUser?.street} />
              <ValueGroup label="Country" value={currentUser?.country} />
            </Card>
          </>
        )}

        <Card>
          <ValueGroup label="Email Privacy" value={booleanMapping[String(currentUser?.privacy.email)]} />
          <ValueGroup label="First Name Privacy" value={booleanMapping[String(currentUser?.privacy.firstname)]} />
          <ValueGroup label="Last Name Privacy" value={booleanMapping[String(currentUser?.privacy.lastname)]} />
          <ValueGroup label="Birthdate Privacy" value={booleanMapping[String(currentUser?.privacy.birthdate)]} />
          <ValueGroup label="Country Privacy" value={booleanMapping[String(currentUser?.privacy.country)]} />
          <ValueGroup label="City Privacy" value={booleanMapping[String(currentUser?.privacy.city)]} />
        </Card>
      </Box>
    </Box>
  );
};

export default UserPage;

const Card = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  margin-top: 10px;
  padding-bottom: 20px;
  font-size: 10px;
  cursor: pointer;
`;
