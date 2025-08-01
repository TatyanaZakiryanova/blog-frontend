import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../../axios';
import { Comments } from '../../components/Comments';
import { Post } from '../../components/Post';
import { IPostProps } from '../../components/Post/types';
import { useAppSelector } from '../../redux/hooks';

export const FullPost = () => {
  const [fullPost, setFullPost] = useState<IPostProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userData = useAppSelector((state) => state.auth.data);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/posts/${id}`);
        setFullPost(data.data);
      } catch (err) {
        console.error('Error loading post', err);
        setOpenAlert(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, []);

  if (isLoading || !fullPost) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{ width: '100%', height: '300px', borderRadius: '6px' }}
      />
    );
  }

  return (
    <>
      <Post
        id={fullPost.id}
        text={fullPost.text}
        title={fullPost.title}
        imageUrl={fullPost.imageUrl}
        user={{
          id: fullPost.user.id,
          avatarUrl: fullPost.user.avatarUrl || '',
          fullName: fullPost.user.fullName,
        }}
        createdAt={fullPost.createdAt}
        updatedAt={fullPost.updatedAt}
        viewsCount={fullPost.viewsCount}
        commentsCount={fullPost.commentsCount}
        tags={fullPost.tags}
        isFullPost
        isEditable={userData?.id === fullPost.user.id}
      />

      <Comments postId={fullPost.id} />

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenAlert(false)} severity="error" sx={{ width: '100%' }}>
          Post not found
        </Alert>
      </Snackbar>
    </>
  );
};
