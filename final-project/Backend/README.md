# Backend Setup

## 1. Install packages

```bash
npm install
```

## 2. Create environment file

Create a `.env` file and copy:

```env
MONGO_URI=mongodb://localhost:27017/hitk
PORT=5600
JWT_SECRET=your_jwt_secret_key
```

## 3. Start backend

```bash
npm start
```

## API routes

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/pro`
- POST `/api/pro/add`
- PUT `/api/pro/:id`
- DELETE `/api/pro/:id`
