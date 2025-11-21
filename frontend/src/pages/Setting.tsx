import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import './Setting.css'

type SettingTab = 'table' | 'menu' | 'qrcode'

function Setting() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<SettingTab>('table')
  const [tableCount, setTableCount] = useState<number>(8)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  // localStorage에서 테이블 수 불러오기
  useEffect(() => {
    const savedTableCount = localStorage.getItem('tableCount')
    if (savedTableCount) {
      setTableCount(parseInt(savedTableCount, 10))
    }
  }, [])

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

  const handleDecrease = () => {
    if (tableCount > 1) {
      setTableCount(tableCount - 1)
    }
  }

  const handleIncrease = () => {
    setTableCount(tableCount + 1)
  }

  const handleSave = () => {
    setIsConfirmModalOpen(true)
  }

  const handleConfirmSave = () => {
    localStorage.setItem('tableCount', tableCount.toString())
    setIsConfirmModalOpen(false)
    // TODO: API 호출로 서버에 저장
  }

  const handleCancelSave = () => {
    setIsConfirmModalOpen(false)
  }

  return (
    <div className="setting-container">
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

        {/* 세팅 컨텐츠 */}
        <div className="setting-content">
          <div className="setting-header">
            <h1 className="setting-title">Setting</h1>
            
            {/* 탭 버튼 */}
            <div className="setting-tabs">
              <button
                className={`setting-tab ${activeTab === 'table' ? 'active' : ''}`}
                onClick={() => setActiveTab('table')}
              >
                테이블 수
              </button>
              <button
                className={`setting-tab ${activeTab === 'menu' ? 'active' : ''}`}
                onClick={() => setActiveTab('menu')}
              >
                메뉴
              </button>
              <button
                className={`setting-tab ${activeTab === 'qrcode' ? 'active' : ''}`}
                onClick={() => setActiveTab('qrcode')}
              >
                QR 코드
              </button>
            </div>
          </div>

          {/* 테이블 수량 화면 */}
          {activeTab === 'table' && (
            <div className="table-count-section">
              <div className="table-count-label">테이블 수량</div>
              <div className="table-count-controls">
                <button className="count-button" onClick={handleDecrease}>
                  -
                </button>
                <span className="count-value">{tableCount}</span>
                <button className="count-button" onClick={handleIncrease}>
                  +
                </button>
                <button className="save-button" onClick={handleSave}>
                  저장
                </button>
              </div>
            </div>
          )}

          {/* 메뉴 화면 (나중에 구현) */}
          {activeTab === 'menu' && (
            <div className="menu-section">
              <div>메뉴 관리 화면 (구현 예정)</div>
            </div>
          )}

          {/* QR 코드 화면 (나중에 구현) */}
          {activeTab === 'qrcode' && (
            <div className="qrcode-section">
              <div>QR 코드 관리 화면 (구현 예정)</div>
            </div>
          )}
        </div>
      </div>

      {/* 확인 팝업 */}
      {isConfirmModalOpen && (
        <div className="confirm-modal-overlay" onClick={handleCancelSave}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="confirm-modal-title">테이블 수 저장</h2>
            <p className="confirm-modal-message">
              테이블 수를 {tableCount}개로 저장하시겠습니까?
            </p>
            <div className="confirm-modal-buttons">
              <button className="confirm-button cancel" onClick={handleCancelSave}>
                취소
              </button>
              <button className="confirm-button confirm" onClick={handleConfirmSave}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Setting

