import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { UserInfo } from '../UserInfo';
import styles from './Post.module.scss';
import { IPostProps } from './types';

export const Post = ({
  _id,
  title,
  text,
  imageUrl,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isEditable,
  user,
  createdAt,
  updatedAt,
}: IPostProps) => {
  return (
    <div className={styles.root}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}

      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}

      <div className={styles.wrapper}>
        <UserInfo {...user} createdAt={createdAt} updatedAt={updatedAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
          </h2>

          <div className={styles.content}>{children || text}</div>

          <ul className={styles.tags}>
            {tags.map((name: string) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>

          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
