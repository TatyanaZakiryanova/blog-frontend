import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import { SideBlock } from './SideBlock/SideBlock';
import Box from '@mui/material/Box';

interface ICommentUser {
  user: {
    fullName: string;
    avatarUrl?: string;
  };
  text: string;
}

interface ICommentsBlock {
  items: ICommentUser[];
  children: React.ReactNode;
  isLoading: boolean;
}

export const CommentsBlock = ({ items, children, isLoading }: ICommentsBlock) => {
  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj: ICommentUser, index: number) => (
          <React.Fragment key={index}>
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                )}
              </ListItemAvatar>

              {isLoading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={20} width={230} />
                </Box>
              ) : (
                <ListItemText primary={obj.user.fullName} secondary={obj.text} />
              )}
            </ListItem>

            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
