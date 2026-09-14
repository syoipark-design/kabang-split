import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import AccountSplitCard from '../components/AccountSplitCard';
import alKakao from '../assets/al-kakao.svg';
import kbIcon from '../assets/kb.svg';
import alTossBg from '../assets/al-toss-bg.svg';
import alTossVector from '../assets/al-toss-vector.png';

// 피그마 frame 좌표 그대로 → 스크롤 영역이 top=100에서 시작하므로 y-100 적용
const SCROLL_OFFSET = 100;

function sy(frameY) {
  return `${frameY - SCROLL_OFFSET}px`;
}

const CARDS = [
  {
    icon: '/figma/split-shinhan-icon.svg',
    accountName: '쏠편한 입출금통장',
    accountInfo: '신한 110123456789',
    badge: { label: '저축', color: '#92d5dd' },
    amount: '1,000,000원',
    amountSub: '100만원',
    aiHintHeight: 63,
    aiHint: [
      { text: '채윤님 또래는 월급의 약 30~40%를 저축하고 있어요. ' },
      { text: '84~112만 원', bold: true },
      { text: ' 정도를 추천해요.' },
    ],
  },
  {
    icon: alKakao,
    accountName: '뱅크월렛 카카오통장',
    accountInfo: '하나 78912345678901',
    badge: { label: '생활', color: '#f6c7cb' },
    amount: '1,200,000원',
    amountSub: '120만원',
    aiHintHeight: 80,
    aiHint: [
      { text: '최근 3개월의 고정지출(통신비·교통비·구독료 등)과 소비 패턴을 살펴보니, 생활비는 ' },
      { text: '120만 원', bold: true },
      { text: ' 정도면 여유로워요.' },
    ],
  },
  {
    icon: alTossBg,
    iconExtra: alTossVector,
    accountName: '토스뱅크 통장',
    accountInfo: '토스뱅크 100123456789',
    badge: { label: '기타', color: '#69c27d' },
    amount: '200,000원',
    amountSub: '20만원',
    aiHintHeight: 62,
    aiHint: [
      { text: '비상금은 한 번에 마련하기보다 조금씩 모아두는 게 좋아요. 이번 달은 ' },
      { text: '20만 원', bold: true },
      { text: '부터 시작해볼까요?' },
    ],
  },
  {
    icon: '/figma/split-wine-icon.svg',
    accountName: '월간와인회',
    accountInfo: '카카오뱅크 3333-36-1234567',
    badge: null,
    amount: '50,000원',
    amountSub: '5만원',
    aiHintHeight: 44,
    aiHint: [
      { text: '매달 ' },
      { text: '5만 원', bold: true },
      { text: '씩 넣고 있는 모임통장이에요.' },
    ],
  },
];

// 카드별 프레임 top 좌표 (피그마 기준)
const CARD_TOPS = [408, 713, 1035, 1339];

// 총 한도
const LIMIT = 2_800_000;

// "1,000,000원" → 1000000
function parseAmount(str) {
  return parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
}

export default function SplitScreen() {
  const navigate = useNavigate();

  // 4개 계좌 금액을 배열로 관리 (초기값은 CARDS의 amount 문자열에서 파싱)
  const [amounts, setAmounts] = useState(() => CARDS.map(c => parseAmount(c.amount)));
  // 초과 시 에러/흔들림 표시할 카드 인덱스 (null = 없음)
  const [errorIdx, setErrorIdx]   = useState(null);
  const [shakingIdx, setShakingIdx] = useState(null);
  const shakeTimer = useRef(null);
  const errorTimer = useRef(null);

  function handleAmountChange(idx, newAmount) {
    // 이 계좌가 가질 수 있는 최대값 = LIMIT − 나머지 계좌 합
    const otherTotal = amounts.reduce((s, a, i) => i === idx ? s : s + a, 0);
    const maxAllowed = LIMIT - otherTotal;
    const clamped = Math.min(Math.max(0, newAmount), maxAllowed);

    // 항상 clamp된 값으로 업데이트 (직접형 — clamped와 동일한 amounts 기준 보장)
    setAmounts(amounts.map((a, i) => i === idx ? clamped : a));

    // 실제로 잘라낸 경우에만 흔들림 (clamped < newAmount)
    if (clamped < newAmount) {
      clearTimeout(shakeTimer.current);
      clearTimeout(errorTimer.current);
      setErrorIdx(idx);
      setShakingIdx(null);
      requestAnimationFrame(() => {
        setShakingIdx(idx);
        shakeTimer.current = setTimeout(() => setShakingIdx(null), 400);
        errorTimer.current = setTimeout(() => setErrorIdx(null),   500);
      });
    }
  }

  // 비율 바 계산 (render마다 파생)
  const BAR_W = 287;
  const total     = amounts.reduce((s, a) => s + a, 0);
  const remaining = Math.max(0, LIMIT - total);
  const R = '100px';
  const segDefs = [
    { color: '#92d5dd', amount: amounts[0] },
    { color: '#f6c7cb', amount: amounts[1] },
    { color: '#69c27d', amount: amounts[2] },
    { color: '#efd610', amount: amounts[3] },
    { color: '#e0e0e0', amount: remaining },
  ];
  let cumPx = 0;
  const barSegments = segDefs
    .map(s => {
      const w = (s.amount / LIMIT) * BAR_W;
      const seg = { color: s.color, width: w, leftPx: 44 + cumPx };
      cumPx += w;
      return seg;
    })
    .filter(s => s.width > 0);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#f7f7f7', overflow: 'hidden' }}>

      {/* ── 고정 영역: 상태바 + 헤더 (스크롤 안 됨) ── */}
      <div
        className="absolute left-0 w-full bg-[#f7f7f7]"
        style={{ top: 0, height: '100px', zIndex: 10 }}
      >
        <StatusBar />

        {/* 네비 행: StatusBar(44px) 아래부터 끝까지 flex 수직 중앙 정렬 */}
        <div style={{ position: 'absolute', top: '44px', left: 0, right: 0, height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            onClick={() => navigate(-1)}
            style={{ position: 'absolute', left: '19px', background: 'none', border: 'none', cursor: 'pointer', padding: '12px 16px' }}
            aria-label="뒤로가기"
          >
            <img src="/figma/split-back-arrow.svg" alt="" style={{ width: '9px', height: '18px', display: 'block' }} />
          </button>
          <p style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 600, fontSize: '16px', color: '#000', letterSpacing: '-0.1px', whiteSpace: 'nowrap', margin: 0 }}>
            내 계좌에 나눠넣기
          </p>
        </div>
      </div>

      {/* ── 스크롤 영역 (top=100px, 나머지 전체) ── */}
      <div
        className="absolute left-0 w-full"
        style={{ top: '100px', bottom: 0, overflowY: 'auto', scrollbarWidth: 'none' }}
      >
        {/* 캔버스: 피그마 y 좌표에서 SCROLL_OFFSET=100 뺀 값 사용 */}
        <div className="relative w-full" style={{ minHeight: '1755px' }}>

          {/* ── KB통장 카드 배경: Figma top=118 → sy=18 ── */}
          <div
            className="absolute rounded-tl-[25px] rounded-tr-[25px] rounded-bl-[22px] rounded-br-[22px]"
            style={{ left: '15px', top: sy(118), width: '345px', height: '220px', background: '#5a6674' }}
          />

          {/* KB 아이콘: Figma top=142 → sy=42 */}
          <div className="absolute" style={{ left: '35px', top: sy(142), width: '34.51px', height: '34.51px' }}>
            <img src={kbIcon} alt="KB" style={{ width: '100%', height: '100%' }} />
          </div>

          {/* KB국민ONE통장: Figma top=151 → sy=51 */}
          <p
            className="absolute"
            style={{ left: '80px', top: sy(151), fontFamily: 'Pretendard, sans-serif', fontWeight: 400, fontSize: '16px', color: '#fff', whiteSpace: 'nowrap', lineHeight: 1 }}
          >
            KB국민ONE통장
          </p>

          {/* 계좌번호: Figma top=153 → sy=53 */}
          <p
            className="absolute"
            style={{ left: '198px', top: sy(153), fontFamily: 'Pretendard, sans-serif', fontWeight: 400, fontSize: '13px', color: '#bcc1c8', whiteSpace: 'nowrap', lineHeight: 1, textDecoration: 'underline' }}
          >
            12345601123456
          </p>

          {/* 2,800,000원: Figma top=187 → sy=87 */}
          <p
            className="absolute"
            style={{ left: '35px', top: sy(187), fontFamily: 'Pretendard, sans-serif', fontWeight: 600, fontSize: '18px', color: '#fff', whiteSpace: 'nowrap', lineHeight: 1.3 }}
          >
            2,800,000원
          </p>

          {/* 280만원: Figma top=210 → sy=110 */}
          <p
            className="absolute"
            style={{ left: '35px', top: sy(210), fontFamily: 'Pretendard, sans-serif', fontWeight: 500, fontSize: '13px', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', lineHeight: 1.3 }}
          >
            280만원
          </p>

          {/* ── 흰 박스 (배분 비율): Figma top=244 → sy=144 ── */}
          <div
            className="absolute bg-white rounded-[10px]"
            style={{ left: '33px', top: sy(244), width: '309px', height: '75px' }}
          />

          {/* 배분 비율: Figma top=259 → sy=159 */}
          <p
            className="absolute"
            style={{ left: '45px', top: sy(259), fontFamily: 'Pretendard, sans-serif', fontWeight: 500, fontSize: '13px', color: '#4f4f4f', whiteSpace: 'nowrap' }}
          >
            배분 비율
          </p>

          {/* 590,000원 남음: Figma top=261 → sy=161 */}
          <p
            className="absolute"
            style={{ right: '50px', top: sy(261), fontFamily: 'Pretendard, sans-serif', fontWeight: 500, fontSize: '11px', color: 'rgba(79,79,79,0.73)', whiteSpace: 'nowrap' }}
          >
            {remaining.toLocaleString('en-US')}원 남음
          </p>

          {/* ── 배분 비율 바: 동적 렌더 ── */}
          {barSegments.map((seg, i) => {
            const isFirst = i === 0;
            const isLast  = i === barSegments.length - 1;
            const borderRadius = [
              isFirst ? R : '0',
              isLast  ? R : '0',
              isLast  ? R : '0',
              isFirst ? R : '0',
            ].join(' ');
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${seg.leftPx}px`,
                  top: sy(288),
                  width: `${seg.width}px`,
                  height: '15px',
                  background: seg.color,
                  borderRadius,
                }}
              />
            );
          })}

          {/* ── "내 계좌 4개" 라벨: Figma top=370 → sy=270 ── */}
          <p
            className="absolute"
            style={{ left: '23px', top: sy(370), fontFamily: 'Pretendard, sans-serif', fontWeight: 600, fontSize: '15px', color: '#000', whiteSpace: 'nowrap', letterSpacing: '-0.1px' }}
          >
            내 계좌 4개
          </p>

          {/* ── 계좌 카드 4개 ── */}
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: '15px', top: sy(CARD_TOPS[i]) }}
            >
              <AccountSplitCard
                {...card}
                amount={amounts[i]}
                onAmountChange={(v) => handleAmountChange(i, v)}
                isError={errorIdx === i}
                isShaking={shakingIdx === i}
              />
            </div>
          ))}

          {/* ── + 계좌 추가 버튼: Figma top=1625 → sy=1525 ── */}
          <button
            className="absolute bg-white"
            style={{
              left: '15px',
              top: sy(1625),
              width: '345px',
              height: '56px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src="/figma/split-plus-icon.svg" alt="계좌 추가" style={{ width: '19px', height: '19px' }} />
          </button>

          {/* ── 다음 버튼: Figma top=1754 → sy=1654 ── */}
          <button
            onClick={() => navigate('/split-confirm')}
            style={{
              position: 'absolute',
              left: '8px',
              top: sy(1754),
              width: '359px',
              height: '62px',
              background: '#FFE200',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontWeight: 500,
                fontSize: '17px',
                color: '#222',
                letterSpacing: '-0.5px',
                whiteSpace: 'nowrap',
              }}
            >
              다음
            </span>
          </button>

        </div>
      </div>
    </div>
  );
}
