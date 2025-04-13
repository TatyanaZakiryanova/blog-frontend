import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../redux/hooks';
import { fetchDeletePosts } from '../../redux/posts/asyncActions';
import { ConfirmDialog } from '../ConfirmDialog';
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
  isFullPost,
  isEditable,
  user,
  createdAt,
  updatedAt,
}: IPostProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const onClickRemove = () => {
    dispatch(fetchDeletePosts(_id));
    navigate('/');
  };

  return (
    <div className={styles.root}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton color="secondary" onClick={() => setConfirmOpen(true)}>
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

          <div className={styles.content}>
            <ReactMarkdown children={text} />
          </div>

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
              <Link to={`/posts/${_id}`}>
                <div className={styles.commentIcon}>
                  <CommentIcon />
                  <span>{commentsCount}</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          onClickRemove();
          setConfirmOpen(false);
        }}
        confirmButton="Да"
      >
        Вы действительно хотите удалить пост?
      </ConfirmDialog>
    </div>
  );
};
