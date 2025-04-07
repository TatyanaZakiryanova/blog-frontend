import 'easymde/dist/easymde.min.css';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';

import axios from '../../axios';
import { useAppSelector } from '../../redux/hooks';
import styles from './CreatePost.module.scss';

export const CreatePost = () => {
  const isAuth = useAppSelector((state) => state.auth.data);
  const [text, setText] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChange = useCallback((value: string) => {
    setText(value);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: '',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'post-editor-1',
      },
    }),
    [],
  );

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      setOpenAlert(true);
      setErrorMessage('Ошибка при загрузке файла');
      console.error('Ошибка загрузки файла:', err);
    }
  };

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        text,
        imageUrl,
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      };
      const { data } = await axios.post('/posts/create', fields);
      const id = data._id;
      navigate(`/posts/${id}`);
    } catch (err) {
      setOpenAlert(true);
      setErrorMessage('Ошибка при создании поста');
      console.error(err);
    }
  };

  if (!isAuth && !window.localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Paper sx={{ padding: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {!imageUrl && (
            <>
              <Button
                variant="outlined"
                size="large"
                sx={{ padding: 2 }}
                onClick={() => inputRef.current?.click()}
              >
                Загрузить превью
              </Button>
              <input type="file" ref={inputRef} onChange={handleChangeFile} hidden />
            </>
          )}

          {imageUrl && (
            <>
              <img
                className={styles.image}
                src={`http://localhost:3000${imageUrl}`}
                alt="Uploaded image"
              />
              <Button variant="contained" color="error" onClick={() => setImageUrl('')}>
                Удалить
              </Button>
            </>
          )}

          <TextField
            classes={{ root: styles.title }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="standard"
            placeholder="Заголовок"
            fullWidth
          />
          <TextField
            classes={{ root: styles.tags }}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            variant="standard"
            placeholder="Теги"
            sx={{ marginBottom: 3 }}
            fullWidth
          />
        </Box>

        <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
        <Button onClick={onSubmit} sx={{ marginTop: 2 }} variant="contained">
          Опубликовать
        </Button>
      </Paper>

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenAlert(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
