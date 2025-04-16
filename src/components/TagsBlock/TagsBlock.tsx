import TagIcon from '@mui/icons-material/Tag';
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
import styles from './TagsBlock.module.scss';

export const TagsBlock = () => {
  const { items, status } = useAppSelector((state) => state.tags);

  return (
    <SideBlock title="Теги">
      {status === Status.ERROR && <div className={styles.error}>Ошибка загрузки тегов</div>}
      <List>
        {(status === Status.LOADING ? [...Array(5)] : items).map((name, index) => (
          <Link
            key={index}
            className={styles.link}
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
