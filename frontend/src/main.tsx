import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'
import OrderList from './pages/OrderList.tsx'
import OrderDetail from './pages/OrderDetail.tsx'
import Reservation from './pages/Reservation.tsx'
import RemainingOrders from './pages/RemainingOrders.tsx'
import AllOrders from './pages/AllOrders.tsx'
import Setting from './pages/Setting.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/order" element={<OrderList />} />
        <Route path="/order/:tableId" element={<OrderDetail />} />
        <Route path="/remaining-orders" element={<RemainingOrders />} />
        <Route path="/all-orders" element={<AllOrders />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
