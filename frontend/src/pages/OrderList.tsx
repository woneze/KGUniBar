import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import './OrderList.css'

function OrderList() {
  const navigate = useNavigate()
  const [tableCount, setTableCount] = useState<number>(8)

  // localStorage에서 테이블 수 불러오기
  useEffect(() => {
    const savedTableCount = localStorage.getItem('tableCount')
    if (savedTableCount) {
      setTableCount(parseInt(savedTableCount, 10))
    }
  }, [])

  // 테이블 수가 변경될 때마다 업데이트 (다른 탭에서 변경했을 경우)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedTableCount = localStorage.getItem('tableCount')
      if (savedTableCount) {
        setTableCount(parseInt(savedTableCount, 10))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    // 같은 탭에서 변경된 경우를 위해 interval로 체크
    const interval = setInterval(() => {
      const savedTableCount = localStorage.getItem('tableCount')
      if (savedTableCount && parseInt(savedTableCount, 10) !== tableCount) {
        setTableCount(parseInt(savedTableCount, 10))
      }
    }, 500)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [tableCount])

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

  // 테이블 데이터 생성 (설정된 테이블 수만큼)
  const tables = Array.from({ length: tableCount }, (_, index) => ({
    id: index + 1,
    name: `${index + 1}번 테이블`,
    menus: [] // 초기에는 주문 없음
  }))

  const handleTableClick = (tableId: number) => {
    navigate(`/order/${tableId}`)
  }

  return (
    <div className="order-list-container">
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

        {/* 주문 목록 컨텐츠 */}
        <div className="order-list-content">
          <h1 className="order-list-title">홀 주문</h1>

          {/* 테이블 그리드 */}
          <div className="tables-grid">
            {tables.map((table) => (
              <div
                key={table.id}
                className="table-card"
                onClick={() => handleTableClick(table.id)}
              >
                <div className="table-card-header">
                  <h3 className="table-name">{table.name}</h3>
                </div>
                <div className="table-card-body">
                  {table.menus.length > 0 ? (
                    table.menus.map((menu, index) => (
                      <div key={index} className="menu-item-text">
                        {menu}
                      </div>
                    ))
                  ) : (
                    <div className="empty-table">주문 없음</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderList

