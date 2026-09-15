import { useNavigate } from 'react-router-dom';

const P = ({ style, children }) => (
  <p style={{ fontFamily: 'Pretendard, sans-serif', margin: 0, ...style }}>{children}</p>
);

// 바텀시트 top: 521px (페이지 기준), 시트 내 좌표 = 페이지 절대값 - 521
const SHEET_TOP = 521;

export default function SavedScreen() {
  const navigate = useNavigate();

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

        {/* 핸들바 — 페이지 top=534 → 시트 내 top=13 */}
        <div style={{
          position: 'absolute', left: '170.8px', top: '13px',
          width: '34.351px', height: '4.771px',
          background: '#d9d9d9', borderRadius: '95.42px',
        }} />

        {/* "저장했어요!" — 페이지 top=589 → 시트 내 top=68 */}
        <P style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          top: '68px', fontSize: '20.356px', fontWeight: 700, color: '#000',
          whiteSpace: 'nowrap', textAlign: 'center', letterSpacing: '-0.0814px',
        }}>
          저장했어요!
        </P>

        {/* 설명 — 페이지 top=628 → 시트 내 top=107 */}
        <P style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          top: '107px', fontSize: '16px', fontWeight: 400, color: '#8c8c8c',
          textAlign: 'center', lineHeight: 1.4, letterSpacing: '-0.4771px',
          width: '300px',
        }}>
          저장된 이체는 '전체 &gt; 내 계좌에 나눠넣기'에서<br />
          언제든 볼 수 있어요.
        </P>

        {/* "확인" 버튼 — 페이지 top=714 → 시트 내 top=193 */}
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'absolute', left: '15px', top: '193px',
            width: '345px', height: '59px',
            background: '#FFE200', borderRadius: '13.359px',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{
            fontFamily: 'Pretendard, sans-serif', fontWeight: 500,
            fontSize: '16.221px', color: '#222', letterSpacing: '-0.4771px',
          }}>
            확인
          </span>
        </button>

      </div>
    </div>
  );
}
