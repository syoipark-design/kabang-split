import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import AccountSplitCard from '../components/AccountSplitCard';
import alKakao from '../assets/al-kakao.svg';
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
      { text: '채윤님 또래는 월급의 약 30~40%를 저축해요. ' },
      { text: '84~112만원', bold: true },
      { text: ' 정도를 추천해요.' },
    ],
  },
  {
    icon: alKakao,
    accountName: '뱅크월렛 카카오통장',
    accountInfo: '카카오뱅크 7979-01-123456',
    badge: { label: '생활', color: '#f6c7cb' },
    amount: '1,200,000원',
    amountSub: '120만원',
    aiHintHeight: 80,
    aiHint: [
      { text: '생활비 통장은 월 지출액 기준으로 넣어두세요. ' },
      { text: '최근 3개월 평균 생활비', bold: true },
      { text: '는 118만원이에요.' },
    ],
  },
  {
    icon: alTossBg,
    iconExtra: alTossVector,
    accountName: '토스뱅크 통장',
    accountInfo: '토스뱅크 1000-1234-5678',
    badge: { label: '기타', color: '#c5e8cc' },
    amount: '200,000원',
    amountSub: '20만원',
    aiHintHeight: 62,
    aiHint: [
      { text: '기타 지출이 많아요. 패턴 분석으로 ' },
      { text: '20만원', bold: true },
      { text: '을 추천해요.' },
    ],
  },
  {
    icon: '/figma/split-wine-icon.svg',
    accountName: '월간와인회',
    accountInfo: '신한카드 0119-1234-5678',
    badge: null,
    amount: '50,000원',
    amountSub: '5만원',
    aiHintHeight: 44,
    aiHint: [
      { text: '정기 구독은 미리 분배해두면 좋아요.' },
    ],
  },
];

// 카드별 프레임 top 좌표 (피그마 기준)
const CARD_TOPS = [408, 713, 1035, 1339];

export default function SplitScreen() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#f7f7f7', overflow: 'hidden' }}>

      {/* ── 고정 영역: 상태바 + 헤더 (스크롤 안 됨) ── */}
      <div
        className="absolute left-0 w-full bg-[#f7f7f7]"
        style={{ top: 0, height: '100px', zIndex: 10 }}
      >
        <StatusBar />

        {/* 뒤로가기 화살표: Figma top=61 */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            left: '35px',
            top: '61px',
            width: '9px',
            height: '18px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
          aria-label="뒤로가기"
        >
          <img src="/figma/split-back-arrow.svg" alt="" style={{ width: '100%', height: '100%' }} />
        </button>

        {/* 타이틀: Figma top=66 */}
        <p
          style={{
            position: 'absolute',
            top: '66px',
            left: 0,
            width: '100%',
            textAlign: 'center',
            fontFamily: 'Pretendard, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            color: '#000',
            letterSpacing: '-0.1px',
            whiteSpace: 'nowrap',
          }}
        >
          내 계좌에 나눠넣기
        </p>
      </div>

      {/* ── 스크롤 영역 (top=100px, 나머지 전체) ── */}
      <div
        className="absolute left-0 w-full"
        style={{ top: '100px', bottom: 0, overflowY: 'auto', scrollbarWidth: 'none' }}
      >
        {/* 캔버스: 피그마 y 좌표에서 SCROLL_OFFSET=100 뺀 값 사용 */}
        <div className="relative w-full" style={{ minHeight: '1700px' }}>

          {/* ── KB통장 카드 배경: Figma top=118 → sy=18 ── */}
          <div
            className="absolute rounded-tl-[25px] rounded-tr-[25px] rounded-bl-[22px] rounded-br-[22px]"
            style={{ left: '15px', top: sy(118), width: '345px', height: '220px', background: '#5a6674' }}
          />

          {/* KB 아이콘: Figma top=142 → sy=42 */}
          <div className="absolute" style={{ left: '35px', top: sy(142), width: '34.51px', height: '34.51px' }}>
            <img src="/figma/split-kb-icon.svg" alt="KB" style={{ width: '100%', height: '100%' }} />
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
            590,000원 남음
          </p>

          {/* ── 배분 비율 바: Figma top=288 → sy=188 ── */}
          <div className="absolute rounded-[100px]" style={{ left: '44px', top: sy(288), width: '287px', height: '15px', background: '#e0e0e0' }} />
          <div className="absolute" style={{ left: '44px', top: sy(288), width: '103px', height: '15px', background: '#92d5dd', borderRadius: '100px 0 0 100px' }} />
          <div className="absolute" style={{ left: '147px', top: sy(288), width: '123px', height: '15px', background: '#f6c7cb' }} />
          <div className="absolute" style={{ left: '270px', top: sy(288), width: '20px', height: '15px', background: '#4bba64', opacity: 0.8 }} />
          <div className="absolute" style={{ left: '290px', top: sy(288), width: '1px', height: '15px', background: '#efd610' }} />

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
              <AccountSplitCard {...card} />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
