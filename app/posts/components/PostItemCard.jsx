import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, TextField, IconButton, Box, Avatar } from '@mui/material';
import { ThumbUp, Comment, Send } from '@mui/icons-material';
import Image from 'next/image';

const PostItemCard = ({ id, userName, name, avatarUrl, time, mediaUrl, mediaType, title, description }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [reaction, setReaction] = useState(null);

  const handleComment = () => {
    console.log(`Comment on post ${id}:`, comment);
    setComment('');
    setShowCommentBox(false);
  };

  const handleReaction = (reactionType) => {
    setReaction(reactionType);
    console.log(`Reacted to post ${id} with ${reactionType}`);
  };

  return (
    <Card sx={{ marginBottom: '20px' }}>
      {/* User Avatar and Name */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: '16px' }}>
        <Avatar src={avatarUrl} alt={name} />
        <Box>
          <Typography variant="h6">{userName}</Typography>
          <Typography variant="body2" color="textSecondary">
            {time}
          </Typography>
        </Box>
      </Box>

      {/* Media Content */}
      {mediaType === 'image' ? (
        <Box sx={{ maxHeight: '400px', overflow: 'hidden' }}>
          <Image
            layout="responsive"
            objectFit="cover"
            quality={100}
            src={mediaUrl}
            alt={title}
            width={200}
            height={300}
          />
        </Box>
      ) : (
        <CardMedia component="video" height="400" controls src={mediaUrl} />
      )}

      {/* Post Content */}
      <CardContent>
        <Typography variant="h5" sx={{ marginTop: '10px' }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          {description}
        </Typography>

        {/* Reaction and Comment Buttons */}
        <Box sx={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <IconButton onClick={() => handleReaction('like')}>
            <ThumbUp color={reaction === 'like' ? 'primary' : 'inherit'} />
          </IconButton>
          <Button
            variant="outlined"
            startIcon={<Comment />}
            onClick={() => setShowCommentBox(!showCommentBox)}
          >
            Comment
          </Button>
        </Box>

        {/* Comment Box */}
        {showCommentBox && (
          <Box sx={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              multiline
            />
            <IconButton color="primary" onClick={handleComment}>
              <Send />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PostItemCard;