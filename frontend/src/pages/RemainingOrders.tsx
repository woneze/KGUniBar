import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import './RemainingOrders.css'

interface OrderItem {
  id: number
  name: string
  quantity: number
}

interface TableOrder {
  tableId: number
  tableName: string
  items: OrderItem[]
  completedAt?: string
}

function RemainingOrders() {
  const navigate = useNavigate()
  
  // 홀 주문에서 주문한 내역을 바탕으로 구성 (예시 데이터)
  const [tableOrders, setTableOrders] = useState<TableOrder[]>([
    { 
      tableId: 1, 
      tableName: '1번 테이블', 
      items: [
        { id: 1, name: '메뉴명', quantity: 1 },
        { id: 2, name: '메뉴명', quantity: 1 },
        { id: 3, name: '메뉴명', quantity: 1 },
      ]
    },
    { 
      tableId: 3, 
      tableName: '3번 테이블', 
      items: [
        { id: 4, name: '메뉴명', quantity: 1 },
        { id: 5, name: '메뉴명', quantity: 1 },
      ]
    },
    { 
      tableId: 4, 
      tableName: '4번 테이블', 
      items: [
        { id: 6, name: '메뉴명', quantity: 1 },
        { id: 7, name: '메뉴명', quantity: 1 },
        { id: 8, name: '메뉴명', quantity: 1 },
      ]
    },
  ])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  // 현재 날짜 포맷팅
  const getCurrentDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const weekdays = ['일', '월', '화', '수', '목', '금', '토']
    const weekday = weekdays[today.getDay()]
    return `${year}.${month}.${day} (${weekday})`
  }

  // 현재 시간 포맷팅 (HH:MM)
  const getCurrentTime = () => {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const handleComplete = (tableId: number) => {
    const completedTime = getCurrentTime()
    setTableOrders(tableOrders.map(order => 
      order.tableId === tableId 
        ? { ...order, completedAt: completedTime }
        : order
    ))
  }

  return (
    <div className="remaining-orders-container">
      {/* 좌측 사이드바 */}
      <Sidebar />

      {/* 메인 컨텐츠 */}
      <div className="main-content">
        {/* 상단 헤더 */}
        <div className="top-header">
          <div className="header-date">{getCurrentDate()}</div>
          <div className="header-greeting">000님 안녕하세요 :)</div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* 잔여 주문내역 컨텐츠 */}
        <div className="remaining-orders-content">
          <h1 className="remaining-orders-title">잔여 주문내역</h1>

          {/* 주문 목록 */}
          <div className="orders-list">
            {tableOrders.map((tableOrder) => (
              <div key={tableOrder.tableId} className="order-card">
                <div className="order-card-header">
                  <h3 className="table-name">{tableOrder.tableName}</h3>
                  {tableOrder.completedAt && (
                    <div className="completed-time">
                      조리 완료: {tableOrder.completedAt}
                    </div>
                  )}
                </div>
                <div className="order-items">
                  {tableOrder.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">X {item.quantity}</span>
                    </div>
                  ))}
                </div>
                {!tableOrder.completedAt && (
                  <button 
                    className="complete-button"
                    onClick={() => handleComplete(tableOrder.tableId)}
                  >
                    조리 완료
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemainingOrders

