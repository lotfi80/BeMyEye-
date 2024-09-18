import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../models/user.js';
import { Box, H6, Badge } from '@adminjs/design-system';

interface recentUsersProps {
  sortedUsers: IUser[];
}
const RecentUsers: React.FC<recentUsersProps> = ({ sortedUsers }) => {
  type userBoxType = {
    email: string;
    firstname: string;
    username: string;
    profileimage: string;
    registerDate: string;
    sex: string;
    id: string;
  };
  const navigate = useNavigate();
  const sexMapping = {
    2: 'Male',
    1: 'Female',
    0: 'Other',
  };

  function formatDate(dateString: any): string {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE');
  }

  const arrayVorMap = sortedUsers.slice(0, 40);
  return (
    <Box p="lg">
      {arrayVorMap.map((user: IUser, index: number) => {
        const userBox: userBoxType = {
          username: user.username ? user.username : 'No username',
          email: user.email,
          registerDate: formatDate(user.registerDate),
          firstname: user.firstname ? user.firstname : 'No Name',
          profileimage: user.profileimage ? (user.profileimage as string) : '',
          sex: sexMapping[user.sex],
          id: user._id.toString(),
        };
        return (
          <Box
            key={index}
            onClick={() => {
              if (userBox.id) {
                navigate(`/admin/pages/user`, { state: { userID: userBox.id } });
              }
            }}
            borderBottom="1px solid darkgrey"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 2fr',
              gridTemplateRows: '3fr 2fr 2fr 2fr',
              gridTemplateAreas: `
              "username username ."
              "profileimage registerDate registerDate"
              "profileimage email email"
              "profileimage firstname sex"
            `,
              columnGap: '20px',
              marginTop: '10px',
              paddingBottom: '20px',
              fontSize: '10px',
              cursor: 'pointer',
            }}
          >
            <H6 style={{ gridArea: 'username', marginTop: '0', lineHeight: '16 px', justifySelf: 'start' }}>
              {userBox.username}
            </H6>

            <p style={{ gridArea: 'registerDate', fontWeight: 'bold' }}>{userBox.registerDate}</p>
            <p style={{ gridArea: 'email', fontWeight: 'bold', fontSize: '1.2em' }}>{userBox.email}</p>
            <Badge
              size="sm"
              variant="success"
              style={{
                gridArea: 'sex',
                display: 'inline-block',
                width: 'fit-content',
                justifySelf: 'end',
              }}
            >
              {userBox.sex}
            </Badge>
            <p style={{ gridArea: 'firstname' }}>{userBox.firstname}</p>
            <Box style={{ gridArea: 'profileimage' }}>
              <img src={userImage(user)} alt={`Image`} width={70} />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
export default RecentUsers;

function userImage(user: any): string {
  const userImage = user?.profileimage?.includes('http')
    ? user?.profileimage
    : `http://localhost:5000/${user?.profileimage}`;
  return userImage;
}
