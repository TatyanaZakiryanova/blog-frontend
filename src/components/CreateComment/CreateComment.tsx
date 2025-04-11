import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import axios from '../../axios';
import { addComment } from '../../redux/comments/commentsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import styles from './CreateComment.module.scss';

export const CreateComment = ({ postId }: { postId: string }) => {
  const [newComment, setNewComment] = useState<string>('');
  const userData = useAppSelector((state) => state.auth.data);
  const dispatch = useAppDispatch();

  const handleAddComment = async () => {
    try {
      const { data } = await axios.post(`posts/${postId}/comments`, {
        text: newComment,
      });
      dispatch(addComment({ ...data, user: userData }));
      setNewComment('');
    } catch (err) {
      console.log('Ошибка при создании комментария', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <div className={styles.root}>
      <Avatar
        classes={{ root: styles.avatar }}
        src={userData?.avatarUrl || 'https://mui.com/static/images/avatar/1.jpg'}
      />
      <div className={styles.form}>
        <TextField
          label="Написать комментарий"
          variant="outlined"
          maxRows={10}
          multiline
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button variant="contained" onClick={handleAddComment} disabled={!newComment}>
          Отправить
        </Button>
      </div>
    </div>
  );
};
