import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { worker } from './mocks/browser'
import 'antd/dist/reset.css'

async function enableMocking() {
  await worker.start()
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
  )
})