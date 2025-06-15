import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import styles from './CommentItem.module.scss';
import { ICommentItemProps } from './types';

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
}: ICommentItemProps) => {
  return (
    <ListItem className={styles.root}>
      <ListItemAvatar>
        {isLoading ? (
          <Skeleton variant="circular" width={40} height={40} />
        ) : (
          <Avatar src={comment.user.avatarUrl || ''} alt={comment.user.fullName} />
        )}
      </ListItemAvatar>

      {isLoading ? (
        <div className={styles.skeleton}>
          <Skeleton variant="text" height={25} width={120} />
          <Skeleton variant="text" height={20} width={230} />
        </div>
      ) : isEditing ? (
        <div>
          <TextField
            fullWidth
            multiline
            value={editedText}
            onChange={(e) => onChangeText(e.target.value)}
          />
          <div className={styles.editButtons}>
            <Button size="small" onClick={onSaveEdit}>
              Save
            </Button>
            <Button size="small" onClick={onCancelEdit}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.comment}>
          <div>
            <Typography variant="subtitle2">{comment.user.fullName}</Typography>
            <Typography variant="body2">{comment.text}</Typography>
          </div>

          {userId === comment.user.id && (
            <div className={styles.commentButtons}>
              <IconButton onClick={() => onEditClick(comment.id, comment.text)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(comment.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </div>
      )}
    </ListItem>
  );
};
