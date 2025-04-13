import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';

import axios from '../../axios';
import { fetchComments } from '../../redux/comments/asyncActions';
import { removeComment } from '../../redux/comments/commentsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Status } from '../../redux/posts/types';
import { CommentItem } from '../CommentItem';
import { CreateComment } from '../CreateComment';
import { SideBlock } from '../SideBlock';
import { ICommentsBlockProps, ICommentUser } from './types';

export const CommentsBlock = ({ postId }: ICommentsBlockProps) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>('');
  const { items, status } = useAppSelector((state) => state.comments);
  const userData = useAppSelector((state) => state.auth.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [postId]);

  const handleRemoveComment = async (commentId: string) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      dispatch(removeComment(commentId));
    } catch (err) {
      console.error('Ошибка при удалении комментария', err);
    }
  };

  const handleEditClick = (commentId: string, currentText: string) => {
    setEditingCommentId(commentId);
    setEditedText(currentText);
  };

  const handleSaveEdit = async () => {
    if (!editingCommentId) return;

    try {
      await axios.patch(`/comments/${editingCommentId}`, {
        text: editedText,
      });

      dispatch(fetchComments(postId));
      setEditingCommentId(null);
      setEditedText('');
    } catch (err) {
      console.error('Ошибка при редактировании комментария', err);
    }
  };

  return (
    <SideBlock title="Комментарии">
      <List>
        {(status === Status.LOADING ? [...Array(5)] : items).map(
          (obj: ICommentUser, index: number) => (
            <React.Fragment key={index}>
              <CommentItem
                isLoading={status === Status.LOADING}
                isEditing={editingCommentId === obj?._id}
                comment={obj}
                userId={userData?._id ?? null}
                editedText={editedText}
                onEditClick={handleEditClick}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={() => setEditingCommentId(null)}
                onDelete={handleRemoveComment}
                onChangeText={setEditedText}
              />

              <Divider variant="inset" component="li" />
            </React.Fragment>
          ),
        )}
      </List>
      <CreateComment postId={postId} />
    </SideBlock>
  );
};
