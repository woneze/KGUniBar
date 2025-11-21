import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isHallOpen, setIsHallOpen] = useState(false)
  const [isKitchenOpen, setIsKitchenOpen] = useState(false)

  // location.pathname이 변경될 때 메뉴 상태 업데이트
  useEffect(() => {
    const isHallPage = 
      location.pathname === '/order' || 
      location.pathname.startsWith('/order/') || 
      location.pathname === '/reservation'
    
    const isKitchenPage = 
      location.pathname === '/remaining-orders' || 
      location.pathname === '/all-orders'
    
    setIsHallOpen(isHallPage)
    setIsKitchenOpen(isKitchenPage)
  }, [location.pathname])

  const handleLogoClick = () => {
    navigate('/dashboard')
  }

  const handleHallClick = () => {
    setIsHallOpen(!isHallOpen)
  }

  const handleKitchenClick = () => {
    setIsKitchenOpen(!isKitchenOpen)
  }

  const isOrderPage = location.pathname === '/order' || location.pathname.startsWith('/order/')

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          LOGO
        </div>
      </div>
      <div className="sidebar-menu">
        {/* 홀 메뉴 (아코디언) */}
        <div className="menu-group">
          <div className="menu-item menu-parent" onClick={handleHallClick}>
            <span>홀</span>
            <span className="menu-arrow">{isHallOpen ? '▼' : '▶'}</span>
          </div>
          {isHallOpen && (
            <div className="menu-children">
              <div 
                className={`menu-item menu-child ${location.pathname === '/reservation' ? 'active' : ''}`}
                onClick={() => navigate('/reservation')}
              >
                예약
              </div>
              <div 
                className={`menu-item menu-child ${isOrderPage ? 'active' : ''}`}
                onClick={() => navigate('/order')}
              >
                주문
              </div>
            </div>
          )}
        </div>

        {/* 주방 메뉴 (아코디언) */}
        <div className="menu-group">
          <div className="menu-item menu-parent" onClick={handleKitchenClick}>
            <span>주방</span>
            <span className="menu-arrow">{isKitchenOpen ? '▼' : '▶'}</span>
          </div>
          {isKitchenOpen && (
            <div className="menu-children">
              <div 
                className={`menu-item menu-child ${location.pathname === '/remaining-orders' ? 'active' : ''}`}
                onClick={() => navigate('/remaining-orders')}
              >
                잔여 주문 내역
              </div>
              <div 
                className={`menu-item menu-child ${location.pathname === '/all-orders' ? 'active' : ''}`}
                onClick={() => navigate('/all-orders')}
              >
                전체 주문 내역
              </div>
            </div>
          )}
        </div>

        <div className="menu-spacer"></div>
        <div 
          className={`menu-item ${location.pathname === '/setting' ? 'active' : ''}`}
          onClick={() => navigate('/setting')}
        >
          Setting
        </div>
      </div>
    </div>
  )
}

export default Sidebar

