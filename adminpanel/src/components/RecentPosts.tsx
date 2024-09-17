import React, { useEffect } from 'react';

import { IPost } from '../models/Post.js';
import { Box, H6, Badge } from '@adminjs/design-system';

interface recentPostsProps {
  allPosts: IPost[];
  filteredPosts: IPost[];
  isFiltered: boolean;
}
const RecentPosts: React.FC<recentPostsProps> = ({ allPosts, filteredPosts, isFiltered }) => {
  type postBoxType = {
    title: string;
    description: string;
    date: string;
    author: string;
    img: string;
    category: string;
    address: string;
  };

  function formatDate(dateString: any): string {
    if (!dateString) {
      return '';
    }

    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE');
  }
  const arrayVorMap = isFiltered ? filteredPosts : allPosts;
  return (
    <Box p="lg">
      {arrayVorMap.map((post: IPost, index: number) => {
        const postBox: postBoxType = {
          title: post.title,
          description: post.description,
          date: formatDate(post.postDate),
          author: post.userid?.username ? post.userid.username : 'No username',
          img: post.postimage[0]?.image ? (post.postimage[0].image as string) : '',
          category: post.category.name,
          address: post.address,
        };
        return (
          <Box
            key={index}
            borderBottom="1px solid darkgrey"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 2fr',
              gridTemplateRows: '3fr 2fr 2fr 2fr',
              gridTemplateAreas: `
              "title title ."
              "image date content"
              "image user content"
              "image city content"
              "category . content"
            `,
              columnGap: '20px',
              marginTop: '10px',
              fontSize: '10px',
            }}
          >
            <H6 style={{ gridArea: 'title', marginTop: '0', lineHeight: '16 px' }}>{postBox.title}</H6>
            <p
              style={{
                gridArea: 'content',
                overflowWrap: 'break-word',
                borderLeft: '2px solid grey',
                height: 'fit-content',
                paddingLeft: '5px',
              }}
            >
              {postBox.description}
            </p>
            <p style={{ gridArea: 'date', fontWeight: 'bold' }}>{postBox.date}</p>
            <p style={{ gridArea: 'user', fontWeight: 'bold', fontSize: '1.2em' }}>{postBox.author}</p>
            <Badge size="sm" variant="success" style={{ gridArea: 'category' }} width="fit-content">
              {postBox.category}
            </Badge>
            <p style={{ gridArea: 'city' }}>{postBox.address}</p>
            <Box style={{ gridArea: 'image' }}>
              <img src={`http://localhost:5000/${postBox.img}`} alt={`Image`} width={70} />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
export default RecentPosts;
