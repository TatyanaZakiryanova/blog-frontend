import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect } from 'react';

import { Post } from '../../components/Post';
import { PostSkeleton } from '../../components/Post/Skeleton';
import { TagsBlock } from '../../components/TagsBlock';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPosts } from '../../redux/posts/asyncActions';
import { Status } from '../../redux/posts/types';
import { fetchTags } from '../../redux/tags/asyncActions';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.posts);
  const userData = useAppSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>

      <Grid container spacing={4}>
        <Grid size={8}>
          {status === Status.LOADING ? (
            [...Array(5)].map((_, index) => <PostSkeleton key={index} />)
          ) : status === Status.SUCCESS ? (
            items.map((item) => (
              <Post
                key={item._id}
                _id={item._id}
                title={item.title}
                text={item.text}
                imageUrl={item.imageUrl || ''}
                user={{
                  _id: item.user._id,
                  avatarUrl: item.user.avatarUrl || 'https://mui.com/static/images/avatar/2.jpg',
                  fullName: item.user.fullName,
                }}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
                viewsCount={item.viewsCount}
                commentsCount={item.commentsCount}
                tags={item.tags}
                isFullPost={false}
                isEditable={userData?._id === item.user._id}
              />
            ))
          ) : (
            <Box>Посты не найдены</Box>
          )}
        </Grid>

        <Grid size={4}>
          <TagsBlock />
        </Grid>
      </Grid>
    </>
  );
};
