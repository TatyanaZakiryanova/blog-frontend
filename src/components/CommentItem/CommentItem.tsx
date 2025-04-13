import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { CommentItemProps } from './types';

export const CommentItem = ({
  isLoading,
  isEditing,
  comment,
  userId,
  editedText,
  onEditClick,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onChangeText,
}: CommentItemProps) => {
  return (
    <ListItem alignItems="flex-start" sx={{ alignItems: 'flex-start' }}>
      <ListItemAvatar>
        {isLoading ? (
          <Skeleton variant="circular" width={40} height={40} />
        ) : (
          <Avatar src={comment.user.avatarUrl} alt={comment.user.fullName} />
        )}
      </ListItemAvatar>

      {isLoading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Skeleton variant="text" height={25} width={120} />
          <Skeleton variant="text" height={20} width={230} />
        </Box>
      ) : isEditing ? (
        <Box>
          <TextField
            fullWidth
            multiline
            value={editedText}
            onChange={(e) => onChangeText(e.target.value)}
          />
          <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
            <Button size="small" onClick={onSaveEdit}>
              Сохранить
            </Button>
            <Button size="small" onClick={onCancelEdit}>
              Отмена
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <Box>
            <Typography variant="subtitle2">{comment.user.fullName}</Typography>
            <Typography variant="body2">{comment.text}</Typography>
          </Box>

          {userId === comment.user._id && (
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <IconButton onClick={() => onEditClick(comment._id, comment.text)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(comment._id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      )}
    </ListItem>
  );
};
