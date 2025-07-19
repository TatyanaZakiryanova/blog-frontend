# Blog

Frontend for the full-stack blog app built with React, Redux and TypeScript.

⚠️ _Please note: free Render server may take up to 1 minute to wake up on first request._

## 🔗 Project links

[README на русском](./README.ru.md)

[Backend repository](https://github.com/TatyanaZakiryanova/blog-backend-prisma)

## 🌐 Deployment

[Deployment](https://blogaboutit.netlify.app/)

## 🎥 VIDEO DEMO

[demo]

## 🛠️ Technologies

- **Typescript**
- **React**
- **Redux Toolkit**
- **Material UI, Sass**
- **React Hook Form**
- **React-SimpleMDE Editor**
- **ESLint, Prettier**
- **Netlify**

## 💻 Features

- Registration and authentication
- Creating, editing, and deleting posts
- Post creation form with **React-SimpleMDE Editor**
- **Uploading images** for posts and user avatars
- Adding, editing, and deleting comments
- Searching posts by tags

## More details

### Token handling

**Access tokens are stored in localStorage** and attached to each request via an **Axios request interceptor**.

If a request returns a **401 Unauthorized error** (typically due to an expired access token), the Axios response interceptor:

- Sends a request to **/auth/refresh-token**, using the refreshToken stored in a **secure HttpOnly cookie**.
- If the refresh is successful, a new access token is **saved in localStorage**, and the original request is **retried automatically with the new token**.
- `originalRequest._retry = true` allows to avoid repeated token refresh for one request.
- When logging out, a request is sent to **/auth/logout**, which **clears the httpOnly cookie and removes the accessToken**.

### Routing

- Pages:
  - Home
  - Full post (/posts/:id)
  - Registration (/registration)
  - Login (/login)
  - Create post (/posts/create)
  - Edit post (/posts/:id/edit)
  - Search posts by tag (/tag/:tag)

### State management

- **createAsyncThunk** for API requests
- **Redux slices** for auth, posts, comments, and tags

### Loading & error handling

- Skeletons shown while loading posts and tags
- Alerts shown on errors: login, registration, image upload, post creation

### Form validation

- Form validation with **React Hook Form**
- Registration form requires:
  - Name
  - Email (must be valid format)
  - Password (minimum 5 characters)
- All fields are required
- Ability to upload user avatar
- Submit button is disabled if fields are invalid

### Styling and responsiveness

- Fully responsive layout down to 360px screen width

## 📁 Architecture

```bash
public/
src/
├── components/
├── pages/
├── redux/
├── styles/
```

## 🪄 How to start project

clone the repository:

```bash
git clone
```

in the project directory enter:

```bash
npm install
```

and then run in dev mode:

```bash
npm run dev
```

build the project:

```bash
npm run build
```

production mode:

```bash
npm run preview
```
