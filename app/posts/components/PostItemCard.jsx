import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, TextField, IconButton, Box } from '@mui/material';
import { ThumbUp, Comment, Send } from '@mui/icons-material';

const PostItemCard = ({ id, name, time, mediaUrl, mediaType, title, description }) => {
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
    <Card sx={{ margin: '20px', maxWidth: 500 }}>
      {mediaType === 'image' ? (
        <CardMedia component="img" height="200" image={mediaUrl} alt={title} />
      ) : (
        <CardMedia component="video" height="200" controls src={mediaUrl} />
      )}
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {time}
        </Typography>
        <Typography variant="h5" sx={{ marginTop: '10px' }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          {description}
        </Typography>
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
        {showCommentBox && (
          <Box sx={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
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