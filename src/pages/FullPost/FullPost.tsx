import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../../axios';
import { Comment } from '../../components/Comment';
import { CommentsBlock } from '../../components/CommentsBlock';
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
        setFullPost(data);
      } catch (err) {
        console.error('Ошибка загрузки поста', err);
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
        _id={fullPost._id}
        text={fullPost.text}
        title={fullPost.title}
        imageUrl={fullPost.imageUrl}
        user={{
          _id: fullPost.user._id,
          avatarUrl: fullPost.user.avatarUrl || '',
          fullName: fullPost.user.fullName,
        }}
        createdAt={fullPost.createdAt}
        updatedAt={fullPost.updatedAt}
        viewsCount={fullPost.viewsCount}
        commentsCount={fullPost.commentsCount}
        tags={fullPost.tags}
        isFullPost
        isEditable={userData?._id === fullPost.user._id}
      />

      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'User 1',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Test',
          },
          {
            user: {
              fullName: 'User 2',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'Test 2',
          },
        ]}
        isLoading={false}
      >
        <Comment />
      </CommentsBlock>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenAlert(false)} severity="error" sx={{ width: '100%' }}>
          Запись не найдена
        </Alert>
      </Snackbar>
    </>
  );
};
