import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

import { worker } from './mocks/browser'

async function enableMocking() {
  await worker.start({
    onUnhandledRequest(req) {
      if (req.url.includes("localhost:3001")) {
        return;
      }
      console.warn("Unhandled request:", req.url);
    },
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <App />
  )
});