import { useNavigate, useLocation } from 'react-router-dom';
import moneyBagIcon from '../assets/save-moneybag.png';
import coinIcon from '../assets/save-coin.svg';

const P = ({ style, children }) => (
  <p style={{ fontFamily: 'Pretendard, sans-serif', margin: 0, ...style }}>{children}</p>
);

// 바텀시트 top: 427px (페이지 기준), 시트 내 좌표 = 페이지 절대값 - 427
const SHEET_TOP = 427;

export default function SaveConfirmScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const amounts = location.state?.amounts;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

      {/* 딤 오버레이 */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1 }} />

      {/* 바텀시트 */}
      <div style={{
        position: 'absolute', left: 0, top: `${SHEET_TOP}px`,
        width: '375px', height: '385px',
        background: '#fff',
        borderTopLeftRadius: '28.626px', borderTopRightRadius: '28.626px',
        zIndex: 2,
      }}>

        {/* 핸들바 — 페이지 top=440 → 시트 내 top=13 */}
        <div style={{
          position: 'absolute', left: '170.8px', top: '13px',
          width: '34.351px', height: '4.771px',
          background: '#d9d9d9', borderRadius: '95.42px',
        }} />

        {/* 돈봉투 이모지 — 페이지 top=487 → 시트 내 top=60 */}
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          top: '60px', width: '72px', height: '72px',
        }}>
          <img src={moneyBagIcon} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* 코인 아이콘 — 페이지 top=524, left=200 → 시트 내 top=97, left=200 */}
        <div style={{
          position: 'absolute', left: '200px', top: '97px',
          width: '34.5px', height: '34.5px',
        }}>
          <img src={coinIcon} alt="" style={{ width: '100%', height: '100%' }} />
        </div>

        {/* "다음에도 이렇게 나눌까요?" — 페이지 top=585 → 시트 내 top=158 */}
        <P style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          top: '158px', fontSize: '20.356px', fontWeight: 700, color: '#000',
          whiteSpace: 'nowrap', textAlign: 'center', letterSpacing: '-0.0814px',
        }}>
          다음에도 이렇게 나눌까요?
        </P>

        {/* 설명 — 페이지 top=624 → 시트 내 top=197 */}
        <P style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          top: '197px', fontSize: '16px', fontWeight: 400, color: '#666',
          textAlign: 'center', lineHeight: 1.4, letterSpacing: '-0.4771px',
          width: '300px',
        }}>
          지금 설정한 계좌와 금액을 저장하면,<br />
          다음에도 같은 방식으로 나눌 수 있어요.
        </P>

        {/* 버튼 행 — 페이지 top=714 → 시트 내 top=287 */}

        {/* 아니요 */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute', left: '17px', top: '287px',
            width: '132.634px', height: '59.16px',
            background: '#ececec', borderRadius: '13.359px',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{
            fontFamily: 'Pretendard, sans-serif', fontWeight: 500,
            fontSize: '16.221px', color: '#222', letterSpacing: '-0.4771px',
          }}>
            아니요
          </span>
        </button>

        {/* 네, 저장할게요 */}
        <button
          onClick={() => navigate('/split-saved', { state: { amounts } })}
          style={{
            position: 'absolute', left: '159.18px', top: '287px',
            width: '200.382px', height: '59.16px',
            background: '#FFE200', borderRadius: '13.359px',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{
            fontFamily: 'Pretendard, sans-serif', fontWeight: 500,
            fontSize: '16.221px', color: '#222', letterSpacing: '-0.4771px',
            whiteSpace: 'nowrap',
          }}>
            네, 저장할게요
          </span>
        </button>

      </div>
    </div>
  );
}
