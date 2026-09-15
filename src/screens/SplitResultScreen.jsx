import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import checkIcon from '../assets/result-check-icon.svg';
import chevronIcon from '../assets/result-chevron.svg';

const ACCOUNT_DEFS = [
  { info: '신한 110123456789' },
  { info: '하나 78912345678901' },
  { info: '토스뱅크 100123456789' },
  { info: '카카오뱅크 3333-36-1234567' },
];

const P = ({ style, children }) => (
  <p style={{ fontFamily: 'Pretendard, sans-serif', margin: 0, ...style }}>{children}</p>
);

export default function SplitResultScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const amounts = location.state?.amounts ?? [1_000_000, 1_200_000, 200_000, 10_000];
  const [open, setOpen] = useState(false);

  const activeRows = ACCOUNT_DEFS.filter((_, i) => amounts[i] > 0);
  const expandedH = 57 + activeRows.length * 34 + 18;
  const dropdownH = open ? expandedH : 57;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
      <StatusBar />

      {/* 체크 아이콘 */}
      <div style={{ position: 'absolute', left: '164px', top: '161px', width: '48px', height: '48px' }}>
        <img src={checkIcon} alt="" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* 나누기 완료! */}
      <P style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        top: '256px', fontSize: '21.333px', fontWeight: 700, color: '#000',
        whiteSpace: 'nowrap', textAlign: 'center', letterSpacing: '-0.0853px',
      }}>
        나누기 완료!
      </P>

      {/* 드롭다운 박스 */}
      <div
        style={{
          position: 'absolute',
          left: '34px', top: '332px',
          width: '307px', height: `${dropdownH}px`,
          background: '#f7f7f7', borderRadius: '15px',
          overflow: 'hidden',
          transition: 'height 0.22s ease',
        }}
      >
        {/* 헤더 행 (항상 표시) */}
        <button
          onClick={() => setOpen(prev => !prev)}
          style={{
            position: 'absolute', left: 0, right: 0, top: 0, height: '57px',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}
          aria-label="내역 확인 토글"
        >
          <P style={{
            position: 'absolute', left: '25px', top: '19px',
            fontSize: '15px', fontWeight: 500, color: '#333', whiteSpace: 'nowrap',
          }}>
            나눠 넣은 계좌 확인하기
          </P>
          <div style={{
            position: 'absolute', right: '17px', top: '24px',
            width: '5px', height: '9px',
            transform: open ? 'rotate(90deg)' : 'rotate(-90deg)',
            transition: 'transform 0.22s ease',
          }}>
            <img src={chevronIcon} alt="" style={{ width: '100%', height: '100%' }} />
          </div>
        </button>

        {/* 펼침 내용 */}
        {activeRows.map((row, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', left: '25px', right: '17px',
              top: `${57 + i * 34}px`, height: '34px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <P style={{ fontSize: '13.697px', fontWeight: 400, color: '#666', lineHeight: 1.3, whiteSpace: 'nowrap' }}>
              {row.info}
            </P>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
              <P style={{ fontSize: '13.697px', fontWeight: 400, color: '#737373', whiteSpace: 'nowrap' }}>확인</P>
              <P style={{ fontSize: '19.568px', fontWeight: 300, color: '#737373', lineHeight: 1 }}>↗</P>
            </div>
          </div>
        ))}
      </div>

      {/* 다음에도 같은 방식으로 나눌 수 있어요. */}
      <P style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        top: '602px', fontSize: '15px', fontWeight: 400, color: '#666',
        whiteSpace: 'nowrap', textAlign: 'center', letterSpacing: '-0.4771px',
      }}>
        다음에도 같은 방식으로 나눌 수 있어요.
      </P>

      {/* 이대로 저장하기 CTA */}
      <button
        onClick={() => navigate('/split-save-confirm', { state: { amounts } })}
        style={{
          position: 'absolute', left: '16px', top: '630px',
          width: '342.557px', height: '55.344px',
          background: '#FFE200', borderRadius: '13.359px',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: 600, fontSize: '16.221px', color: '#222',
          letterSpacing: '-0.4771px', whiteSpace: 'nowrap',
        }}>
          이대로 저장하기
        </span>
      </button>

      {/* 닫기 */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          top: '709px', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}
      >
        <span style={{
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: 500, fontSize: '17px', color: '#aaa',
          letterSpacing: '-0.5px', textDecoration: 'underline', whiteSpace: 'nowrap',
        }}>
          닫기
        </span>
      </button>
    </div>
  );
}
