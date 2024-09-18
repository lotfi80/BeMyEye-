import React, { useEffect, useState } from 'react';
import { Box, ValueGroup, H1, Button, Text, CardTitle, Section, MessageBox, Avatar } from '@adminjs/design-system';
import { getPostByID } from '../../http/api.js';
import { useLocation } from 'react-router-dom';
import { IPost } from 'models/Post.js';
import { styled } from '@adminjs/design-system/styled-components';

const PostPage = () => {
  const location = useLocation();
  const postID = location.state?.postID;
  const [currentPost, setCurrentPost] = useState<IPost>();

  //   function postImage(post: any): string {
  //     const postImage = post?.profileimage?.includes('http')
  //       ? post?.postimage
  //       : `http://localhost:5000/${post?.profileimage}`;
  //     return postImage;
  //   }

  function formatDate(dateString: any): string {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE');
  }

  useEffect(() => {
    if (!postID) {
      console.log('No postID found in state');
      return;
    }

    const getPostData = async () => {
      try {
        const response = await getPostByID(postID);
        setCurrentPost(response);
      } catch (error) {
        console.log(error);
      }
    };
    getPostData();
  }, [postID]);

  if (!postID) {
    return <p>No postID provided</p>;
  }

  const booleanMapping = {
    true: 'Yes',
    false: 'No',
  };

  const renderComments = () => {
    if (!currentPost?.postcomments || currentPost.postcomments.length === 0) {
      return 'No comments available';
    }

    return currentPost.postcomments
      .slice(0, 3)
      .map((comment, index) => <ValueGroup key={index} label={`Comment ${index + 1}`} value={comment.content} />);
  };

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
          <ValueGroup label="id" value={postID} />
          <Box display="flex" flexDirection="column" pb="0">
            <ValueGroup label="created by" value={currentPost?.userid._id.toString()} />
            <ValueGroup label="" value={currentPost?.userid.username} />
          </Box>
          <ValueGroup label="created at" value={formatDate(currentPost?.postDate)} />
        </Card>
        <hr />
        <ValueGroup label="title" value={currentPost?.title} />
        <ValueGroup label="Content" value={currentPost?.description} />
        <hr />
        <Card>
          <ValueGroup label="street" value={currentPost?.street} />
          <ValueGroup label="city" value={currentPost?.city} />
          <ValueGroup label="country" value={formatDate(currentPost?.country)} />
        </Card>
        <Card>
          <Box display="flex" flexDirection="column" pb="0">
            <ValueGroup label="image" value={currentPost?.postimage[0]?.image} />
            <img src={`http://localhost:5000/${currentPost?.postimage[0]?.image}`} alt="" />
          </Box>
          <ValueGroup label="category" value={currentPost?.category.name} />
          <Box>{renderComments()}</Box>
        </Card>
      </Box>
    </Box>
  );
};

export default PostPage;

const Card = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  margin-top: 10px;
  padding-bottom: 10px;
  font-size: 10px;
  cursor: pointer;
`;
