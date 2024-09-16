import React, { useEffect } from 'react';

import { IPost } from '../models/Post.js';
import { Box } from '@adminjs/design-system';
import SelectTimePeriod from './SelectTimePeriod.js';

interface recentPostsProps {
  allPosts: IPost[];
}
const RecentPosts: React.FC<recentPostsProps> = ({ allPosts }) => {
  type postBoxType = {
    title: string;
    description: string;
    date: string;
    author: string;
    img: string;
    category: string;
  };

  function formatDate(dateString: any): string {
    if (!dateString) {
      return '';
    }

    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  return (
    <Box p="lg">
      <SelectTimePeriod />
      {allPosts.map((post: IPost, index: number) => {
        console.log('Post:', post.postDate);
        const postBox: postBoxType = {
          title: post.title,
          description: post.description,
          date: formatDate(post.postDate),
          author: post.userid?.username ? post.userid.username : 'No username',
          img: post.postimage[0]?.image ? (post.postimage[0].image as string) : '',
          category: post.category.name,
        };
        return (
          <Box
            key={index}
            borderBottom="1px solid darkgrey"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 4fr',
              gridTemplateRows: '1fr 1fr 1fr',
              gridTemplateAreas: `
              "image title content"
              "image date content"
              "image category content"
              "image user content"
            `,
              colGap: '10px',
              marginTop: '10px',
              fontSize: '10px',
            }}
          >
            <h2 style={{ gridArea: 'title' }}>{postBox.title}</h2>
            <p style={{ gridArea: 'content', overflowWrap: 'break-word' }}>{postBox.description}</p>
            <p style={{ gridArea: 'date' }}>Date: {postBox.date}</p>
            <p style={{ gridArea: 'user' }}>Author: {postBox.author}</p>
            <p style={{ gridArea: 'category' }}>Category: {postBox.category}</p>
            <Box style={{ gridArea: 'image' }}>
              <img src={`http://localhost:5000/${postBox.img}`} alt={`Image`} width={50} />
            </Box>
          </Box>
        );
      })}
      ;
    </Box>
  );
};
export default RecentPosts;
