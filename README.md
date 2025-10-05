# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
## Contact form backend

This project includes a minimal Express server to email contact form submissions.

Setup:

1. Copy `server/.env.example` to `server/.env` and fill your SMTP credentials. The default recipient is `katariyamansi25@gmail.com`.
2. Install and run the server:

```
cd server
npm install
npm run dev
```

3. Start the frontend (Vite proxy forwards `/api` to the server on port 5000):

```
cd ../Portfolio
npm install
npm run dev
```

Environment:
- You can override API base with `VITE_API_BASE` if not using the Vite proxy.
- Server CORS allowed origins default to `http://localhost:5173` (configure `ALLOWED_ORIGINS`).
