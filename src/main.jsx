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
import DashboardHome from './pages/Dashboard/home/index.jsx'
import DashboardForm from './pages/Dashboard/form/index.jsx'
import RegisPage from './pages/reg/index.jsx'
import DashboardData from './pages/Dashboard/data/index.jsx'

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
    path: '/produkView/:id',
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
  {
    path: '/re',
    element: <RegisPage />
  },
  {
    path: '/dashboard/home',
    element: <DashboardHome />
  },
  {
    path: '/dashboard/form',
    element: <DashboardForm />
  },
  {
    path: '/dashboard/edit/:id',
    element: <DashboardForm />
  },
  {
    path: '/dashboard/data',
    element: <DashboardData />
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
