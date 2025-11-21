import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import './AllOrders.css'

interface OrderItem {
  id: number
  name: string
  quantity: number
}

interface Order {
  id: number
  tableId: number
  tableName: string
  items: OrderItem[]
  orderTime: string
}

function AllOrders() {
  const navigate = useNavigate()

  // 모든 주문 내역 (테이블 번호와 관련없이)
  const [orders] = useState<Order[]>([
    { 
      id: 1,
      tableId: 1, 
      tableName: '1번 테이블', 
      items: [
        { id: 1, name: '메뉴명', quantity: 1 },
        { id: 2, name: '메뉴명', quantity: 1 },
      ],
      orderTime: '14:30'
    },
    { 
      id: 2,
      tableId: 3, 
      tableName: '3번 테이블', 
      items: [
        { id: 3, name: '메뉴명', quantity: 2 },
        { id: 4, name: '메뉴명', quantity: 1 },
      ],
      orderTime: '14:45'
    },
    { 
      id: 3,
      tableId: 4, 
      tableName: '4번 테이블', 
      items: [
        { id: 5, name: '메뉴명', quantity: 1 },
        { id: 6, name: '메뉴명', quantity: 3 },
      ],
      orderTime: '15:00'
    },
    { 
      id: 4,
      tableId: 2, 
      tableName: '2번 테이블', 
      items: [
        { id: 7, name: '메뉴명', quantity: 1 },
      ],
      orderTime: '15:15'
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

  return (
    <div className="all-orders-container">
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

        {/* 전체 주문내역 컨텐츠 */}
        <div className="all-orders-content">
          <h1 className="all-orders-title">전체 주문내역</h1>

          {/* 주문 목록 테이블 */}
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>테이블</th>
                  <th>주문 내역</th>
                  <th>주문 시간</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="empty-table-message">
                      주문 내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.tableName}</td>
                      <td>
                        <div className="order-items-list">
                          {order.items.map((item) => (
                            <div key={item.id} className="order-item-row">
                              {item.name} X {item.quantity}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>{order.orderTime}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllOrders

