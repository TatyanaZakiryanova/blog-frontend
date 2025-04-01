import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';

interface IPostAuthor {
  avatarUrl?: string;
  fullName: string;
}

interface IPostProps {
  _id: number;
  title: string;
  createdAt: string;
  imageUrl: string;
  user: IPostAuthor;
  viewsCount: number;
  commentsCount: number;
  tags: string[];
  children: React.ReactNode;
  isFullPost: any;
  isLoading?: boolean;
  isEditable?: boolean;
}

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
}: IPostProps) => {
  const onClickRemove = () => {};

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <a href={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </a>
          <IconButton onClick={onClickRemove} color="secondary">
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
