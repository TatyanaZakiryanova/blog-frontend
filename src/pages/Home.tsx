import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { CommentsBlock } from '../components/CommentsBlock';
import { Post } from '../components/Post';

export const Home = () => {
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>

      <Grid container spacing={4}>
        <Grid size={8}>
          {[...Array(5)].map(() => (
            <Post
              _id={1}
              title="React"
              imageUrl=""
              user={{
                avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                fullName: 'John',
              }}
              createdAt={'01.04.2025'}
              viewsCount={150}
              commentsCount={5}
              tags={['react', 'redux', 'typescript']}
              isFullPost
            />
          ))}
        </Grid>

        <Grid size={4}>
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
