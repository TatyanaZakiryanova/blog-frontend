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
import { SideBlock } from '../UI/SideBlock';
import { ICommentsProps, ICommentUser } from './types';

export const Comments = ({ postId }: ICommentsProps) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>('');
  const { items, status } = useAppSelector((state) => state.comments);
  const userData = useAppSelector((state) => state.auth.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [postId]);

  const handleRemoveComment = async (commentId: number) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      dispatch(removeComment(commentId));
    } catch (err) {
      console.error('Error deleting comment', err);
    }
  };

  const handleEditClick = (commentId: number, currentText: string) => {
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
      console.error('Error editing comment', err);
    }
  };

  return (
    <SideBlock title="Comments">
      <List>
        {(status === Status.LOADING ? [...Array(5)] : items).map(
          (obj: ICommentUser, index: number) => (
            <React.Fragment key={obj?.id || `skeleton-${index}`}>
              <CommentItem
                isLoading={status === Status.LOADING}
                isEditing={editingCommentId === obj?.id}
                comment={obj}
                userId={userData?.id ?? null}
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
