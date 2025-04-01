import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';

import { UserInfo } from '../UserInfo';
import styles from './Post.module.scss';
import { IPostProps } from './types';

export const Post = ({
  _id,
  title,
  imageUrl,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isEditable,
  user,
  createdAt,
  isLoading,
}: IPostProps) => {
  if (isLoading) {
    <div>Loading...</div>;
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <a href={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </a>
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
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <a href={`/posts/${_id}`}>{title}</a>}
          </h2>

          {children && <div className={styles.content}>{children}</div>}

          <ul className={styles.tags}>
            {tags.map((name: string) => (
              <li key={name}>
                <a href={`/tag/${name}`}>#{name}</a>
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
