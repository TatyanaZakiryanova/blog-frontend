# Blog

Fullstack блог.

[Backend API](https://github.com/TatyanaZakiryanova/blog-backend)

## Deployment & Live Demo

[Deploy](https://blogaboutit.netlify.app/)

<img src="./public/blogpreview.png" alt="preview" />

## Technologies Used

- Typescript
- React
- Redux Toolkit
- Material UI, Sass
- React Hook Form
- React-SimpleMDE Editor
- ESLint, Prettier

## Features

- Регистрация и авторизация
- Создание, редактирование и удаление постов
- Форма для создания поста - React-SimpleMDE Editor
- Загрузка изображений к постам
- Добавление, редактирование и удаление комментариев к постам
- Поиск постов по тегам

## More details

### Routing

- Страницы:
  - Главная
  - Полный пост (/posts/:id)
  - Регистрация (/registration)
  - Авторизация (/login)
  - Создание поста (/posts/create)
  - Редактирование поста (/posts/:id/edit)
  - Поиск постов по тегу (/tag/:tag)

### State Management

- createAsyncThunk для запросов к API
- slices для состояний авторизации, постов, комментариев, тегов

### Loading & Error Handling

- Скелетоны при загрузке постов и блока тегов
- Alerts при ошибках авторизации, регистрации, загрузки изображений, создания постов

### Form Validation

- Валидация форм регистрации и авторизации с React-Hook-Form
- Регистрация: имя, почта (соответствие формату), пароль (не менее 5 символов)
- Все поля обязательны для заполнения
- Кнопка submit отключена при некорректном заполнении полей

### Styling and Responsiveness

- Адаптивная вёрстка до 360px ширины экрана

## How to start project

in the project directory enter:

```js
npm install
```

and then run in dev mode:

```js
npm run dev
```

build the project:

```js
npm run build
```

production mode:

```js
npm run preview
```
