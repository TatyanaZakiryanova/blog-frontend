import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { SideBlock } from '../SideBlock';
import { useAppSelector } from '../../redux/hooks';
import { Status } from '../../redux/posts/types';

export const TagsBlock = () => {
  const { items, status } = useAppSelector((state) => state.tags);

  return (
    <SideBlock title="Тэги">
      <List>
        {(status === Status.LOADING ? [...Array(5)] : items).map((name, index) => (
          <a
            key={index}
            style={{ textDecoration: 'none', color: 'black' }}
            href={status === Status.LOADING ? '#' : `/tags/${name}`}
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
          </a>
        ))}
      </List>
    </SideBlock>
  );
};
