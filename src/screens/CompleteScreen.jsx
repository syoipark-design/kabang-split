import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import checkIcon from '../assets/result-check-icon.svg';
import chevronIcon from '../assets/result-chevron.svg';
import moneyBagIcon from '../assets/save-moneybag.png';
import coinIcon from '../assets/save-coin.svg';

const ACCOUNT_DEFS = [
  { info: '신한 110123456789' },
  { info: '하나 78912345678901' },
  { info: '토스뱅크 100123456789' },
  { info: '카카오뱅크 3333-36-1234567' },
];

const P = ({ style, children }) => (
  <p style={{ fontFamily: 'Pretendard, sans-serif', margin: 0, ...style }}>{children}</p>
);

// 두 시트 높이 (Figma 기준)
const SHEET_H = { confirm: 385, saved: 291 };
// 슬라이드 애니메이션 duration (ms)
const SLIDE_MS = 380;

export default function CompleteScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const amounts = location.state?.amounts ?? [1_000_000, 1_200_000, 200_000, 10_000];

  // 'confirm' | 'saved'
  const [sheet, setSheet] = useState('confirm');
  // 시트 슬라이드인 여부
  const [sheetIn, setSheetIn] = useState(false);
  // 딤드는 시트와 독립 — 스위칭 중에도 유지
  const [dimIn, setDimIn] = useState(false);

  const activeRows = ACCOUNT_DEFS.filter((_, i) => amounts[i] > 0);
  const dropdownH = 57 + activeRows.length * 34 + 18;

  // 마운트 후 딤드 + 시트 슬라이드인
  useEffect(() => {
    const t = setTimeout(() => {
      setDimIn(true);
      setSheetIn(true);
    }, 80);
    return () => clearTimeout(t);
  }, []);

  // "네, 저장할게요": 시트 교체 (딤드는 유지)
  const handleSave = () => {
    setSheetIn(false); // 슬라이드 아웃
    setTimeout(() => {
      setSheet('saved'); // 오프스크린 중 높이·내용 교체
      setSheetIn(true);  // 슬라이드 인
    }, SLIDE_MS);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
      <StatusBar />

      {/* ── 배경: 나누기 완료 화면 ── */}

      {/* 초록 체크 아이콘 (Figma: left 164, top 161, 48×48) */}
      <div style={{ position: 'absolute', left: '164px', top: '161px', width: '48px', height: '48px' }}>
        <img src={checkIcon} alt="" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* 나누기 완료! (Figma: top 256, 21.3px Bold) */}
      <P style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        top: '256px',
        fontSize: '21.333px', fontWeight: 700, color: '#000',
        whiteSpace: 'nowrap', textAlign: 'center', letterSpacing: '-0.0853px',
      }}>
        나누기 완료!
      </P>

      {/* 나눠 넣은 계좌 확인하기 박스 (Figma: left 34, top 332, 307×211, r15) */}
      <div style={{
        position: 'absolute', left: '34px', top: '332px',
        width: '307px', height: `${dropdownH}px`,
        background: '#f7f7f7', borderRadius: '15px',
        overflow: 'hidden',
      }}>
        {/* 헤더 */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '57px' }}>
          <P style={{
            position: 'absolute', left: '25px', top: '19px',
            fontSize: '15px', fontWeight: 500, color: '#333', whiteSpace: 'nowrap',
          }}>
            나눠 넣은 계좌 확인하기
          </P>
          <div style={{
            position: 'absolute', right: '17px', top: '24px',
            width: '5px', height: '9px',
            transform: 'rotate(90deg)', // 열린 상태 (∧)
          }}>
            <img src={chevronIcon} alt="" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>

        {/* 계좌 rows */}
        {activeRows.map((row, i) => (
          <div key={i} style={{
            position: 'absolute', left: '25px', right: '17px',
            top: `${57 + i * 34}px`, height: '34px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
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

      {/* ── 딤드 오버레이 (시트 스위칭 중에도 유지) ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 10,
        opacity: dimIn ? 1 : 0,
        transition: 'opacity 0.28s ease',
        pointerEvents: dimIn ? 'auto' : 'none',
      }} />

      {/* ── 바텀시트 (두 상태 공용 컨테이너) ── */}
      <div style={{
        position: 'absolute', left: 0, bottom: 0,
        width: '375px',
        height: `${SHEET_H[sheet]}px`,   // 오프스크린 중 교체되므로 transition 없음
        background: '#fff',
        borderTopLeftRadius: '28.626px', borderTopRightRadius: '28.626px',
        zIndex: 20,
        transform: sheetIn ? 'translateY(0)' : 'translateY(100%)',
        transition: `transform ${SLIDE_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`,
      }}>
        {/* 핸들바 (공통) */}
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          top: '13px',
          width: '34.351px', height: '4.771px',
          background: '#d9d9d9', borderRadius: '95.42px',
        }} />

        {/* ── 시트 1: "다음에도 이렇게 나눌까요?" (node 35:280) ── */}
        {sheet === 'confirm' && (
          <>
            {/* 돈주머니 (72×72, Figma: top 60, 가운데) */}
            <div style={{
              position: 'absolute', left: '50%', transform: 'translateX(-50%)',
              top: '60px', width: '72px', height: '72px',
            }}>
              <img src={moneyBagIcon} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* 코인 아이콘 (Figma: left 200, top 97) */}
            <div style={{
              position: 'absolute', left: '200px', top: '97px',
              width: '34.5px', height: '34.5px',
            }}>
              <img src={coinIcon} alt="" style={{ width: '100%', height: '100%' }} />
            </div>

            {/* 타이틀 (Figma: top 158, 20.36px Bold) */}
            <P style={{
              position: 'absolute', left: '50%', transform: 'translateX(-50%)',
              top: '158px',
              fontSize: '20.356px', fontWeight: 700, color: '#000',
              whiteSpace: 'nowrap', textAlign: 'center', letterSpacing: '-0.0814px',
            }}>
              다음에도 이렇게 나눌까요?
            </P>

            {/* 설명 (Figma: top 197, 16px #666, 2줄) */}
            <P style={{
              position: 'absolute', left: '50%', transform: 'translateX(-50%)',
              top: '197px',
              fontSize: '16px', fontWeight: 400, color: '#666',
              textAlign: 'center', lineHeight: 1.4, letterSpacing: '-0.4771px',
              width: '300px',
            }}>
              지금 설정한 계좌와 금액을 저장하면,<br />
              다음에도 같은 방식으로 나눌 수 있어요.
            </P>

            {/* 아니요 (Figma: left 17, top 287, 132.6×59.16, r13.4) */}
            <button
              onClick={() => navigate('/')}
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

            {/* 네, 저장할게요 (Figma: left 159.18, top 287, 200.4×59.16, r13.4) */}
            <button
              onClick={handleSave}
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
          </>
        )}

        {/* ── 시트 2: "저장했어요!" (node 35:335) ── */}
        {sheet === 'saved' && (
          <>
            {/* 저장했어요! (sheet-rel top 68 = frame 589) */}
            <P style={{
              position: 'absolute', left: '50%', transform: 'translateX(-50%)',
              top: '68px',
              fontSize: '20px', fontWeight: 700, color: '#000',
              whiteSpace: 'nowrap', textAlign: 'center', letterSpacing: '-0.0814px',
            }}>
              저장했어요!
            </P>

            {/* 저장된 이체는... (sheet-rel ~101) */}
            <P style={{
              position: 'absolute', left: '50%', transform: 'translateX(-50%)',
              top: '101px',
              fontSize: '16px', fontWeight: 400, color: '#8c8c8c',
              textAlign: 'center', lineHeight: 1.45, letterSpacing: '-0.4px',
              width: '305px',
            }}>
              저장된 이체는 &apos;전체 &gt; 내 계좌에 나눠넣기&apos;에서<br />
              언제든 볼 수 있어요.
            </P>

            {/* 다음에도 같은 방식으로... (sheet-rel ~157) */}
            <P style={{
              position: 'absolute', left: '50%', transform: 'translateX(-50%)',
              top: '157px',
              fontSize: '15px', fontWeight: 400, color: '#666',
              whiteSpace: 'nowrap', textAlign: 'center', letterSpacing: '-0.4771px',
            }}>
              다음에도 같은 방식으로 나눌 수 있어요.
            </P>

            {/* 확인 버튼 (Figma: top 714 → sheet-rel 193, 345×59) */}
            <button
              onClick={() => navigate('/')}
              style={{
                position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                top: '193px',
                width: '345px', height: '59px',
                background: '#FFE200', borderRadius: '13.4px',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span style={{
                fontFamily: 'Pretendard, sans-serif',
                fontWeight: 500, fontSize: '16px', color: '#222',
                letterSpacing: '-0.4771px', whiteSpace: 'nowrap',
              }}>
                확인
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
