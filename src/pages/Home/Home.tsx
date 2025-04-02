import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { CommentsBlock } from '../../components/CommentsBlock';
import { Post } from '../../components/Post';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPosts } from '../../redux/posts/asyncActions';
import { Status } from '../../redux/posts/types';
import { PostSkeleton } from '../../components/Post/Skeleton';
import { fetchTags } from '../../redux/tags/asyncActions';
import { TagsBlock } from '../../components/TagsBlock/TagsBlock';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.posts);

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
                  avatarUrl: item.user.avatarUrl || 'https://mui.com/static/images/avatar/2.jpg',
                  fullName: item.user.fullName,
                }}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
                viewsCount={item.viewsCount}
                commentsCount={5}
                tags={item.tags}
                isFullPost={false}
                isEditable={false}
              />
            ))
          ) : (
            <div>Error</div>
          )}
        </Grid>

        <Grid size={4}>
          <TagsBlock />
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
          />
        </Grid>
      </Grid>
    </>
  );
};
