import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TeamPage from './pages/TeamPage'
import ErrorPage from './pages/ErrorPage/index.jsx'
import ProdukView from './pages/Produk/ProdukView/index.jsx'
import ProdukShop from './pages/Produk/ProdukShop/index.jsx'
import LoginPage from './pages/LoginPage/index.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/teamPage',
    element: <TeamPage />
  },
  {
    path: '/produkView',
    element: <ProdukView />
  },
  {
    path: '/shop',
    element: <ProdukShop />
  },
  {
    path: '/admin',
    element: <LoginPage />
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
