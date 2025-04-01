import { Comment } from '../components/Comment/Comment';
import { CommentsBlock } from '../components/CommentsBlock';
import { Post } from '../components/Post/Post';

export const FullPost = () => {
  return (
    <>
      <Post
        _id={1}
        title="React"
        imageUrl=""
        user={{
          avatarUrl: '',
          fullName: 'John',
        }}
        createdAt={'01.04.2025'}
        viewsCount={150}
        commentsCount={5}
        tags={['react', 'redux', 'typescript']}
        isFullPost
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </Post>
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
    </>
  );
};
