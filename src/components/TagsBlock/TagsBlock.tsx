import TagIcon from '@mui/icons-material/Tag';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { Status } from '../../redux/posts/types';
import { SideBlock } from '../SideBlock';

export const TagsBlock = () => {
  const { items, status } = useAppSelector((state) => state.tags);

  return (
    <SideBlock title="Теги">
      {status === Status.ERROR && (
        <Box sx={{ padding: 10, textAlign: 'center' }}>Ошибка загрузки тегов</Box>
      )}
      <List>
        {(status === Status.LOADING ? [...Array(5)] : items).map((name, index) => (
          <Link
            key={index}
            style={{ textDecoration: 'none', color: 'black' }}
            to={status === Status.LOADING ? '#' : `/tag/${name}`}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {status === Status.LOADING ? (
                  <Skeleton width={200} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
