import DeleteIcon from '@mui/icons-material/Clear';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';

import axios from '../../axios';
import { fetchComments } from '../../redux/comments/asyncActions';
import { removeComment } from '../../redux/comments/commentsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Status } from '../../redux/posts/types';
import { CreateComment } from '../CreateComment';
import { SideBlock } from '../SideBlock';
import { ICommentsBlockProps, ICommentUser } from './types';

export const CommentsBlock = ({ postId }: ICommentsBlockProps) => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.comments);
  const userData = useAppSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [postId]);

  const handleRemoveComment = async (commentId: string) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      dispatch(removeComment(commentId));
    } catch (err) {
      console.log('Ошибка при удалении комментария', err);
    }
  };

  return (
    <SideBlock title="Комментарии">
      <List>
        {(status === Status.LOADING ? [...Array(5)] : items).map(
          (obj: ICommentUser, index: number) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start" sx={{ alignItems: 'flex-start' }}>
                <ListItemAvatar>
                  {status === Status.LOADING ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                  )}
                </ListItemAvatar>

                {status === Status.LOADING ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant="text" height={25} width={120} />
                    <Skeleton variant="text" height={20} width={230} />
                  </Box>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        width: '100%',
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2">{obj.user.fullName}</Typography>
                        <Typography variant="body2">{obj.text}</Typography>
                      </Box>

                      {userData?._id === obj.user._id && (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleRemoveComment(obj._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                  </>
                )}
              </ListItem>

              <Divider variant="inset" component="li" />
            </React.Fragment>
          ),
        )}
      </List>
      <CreateComment postId={postId} />
    </SideBlock>
  );
};
