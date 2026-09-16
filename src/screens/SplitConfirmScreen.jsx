import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import alKakao from '../assets/al-kakao.svg';
import alTossBg from '../assets/al-toss-bg.svg';
import alTossVector from '../assets/al-toss-vector.png';
import kbIcon from '../assets/kb.svg';

const SCROLL_OFFSET = 100;
function sy(frameY) { return `${frameY - SCROLL_OFFSET}px`; }

const P = ({ style, children }) => (
  <p style={{ fontFamily: 'Pretendard, sans-serif', margin: 0, ...style }}>{children}</p>
);

// AccountRow: 53px height 블록(flow), 내부는 row-relative absolute
// rowHeight: KB처럼 마지막 행은 아이콘 높이(34.51px)만 차지
function AccountRow({ icon, iconExtra, name, info, amount, rowHeight = 53 }) {
  return (
    <div style={{ position: 'relative', height: `${rowHeight}px`, flexShrink: 0 }}>
      <div style={{
        position: 'absolute', left: '21px', top: 0,
        width: '34.51px', height: '34.51px', borderRadius: '50%', overflow: 'hidden',
      }}>
        {typeof icon === 'string'
          ? <img src={icon} alt="" style={{ width: '100%', height: '100%' }} />
          : icon}
      </div>
      {iconExtra && (
        <div style={{
          position: 'absolute',
          left: `${21 + 8.39}px`, top: `${8.39}px`,
          width: '17.721px', height: '17.721px',
        }}>
          <img src={iconExtra} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      )}
      <P style={{
        position: 'absolute', left: '65.77px', top: `${0.93}px`,
        fontSize: '13.99px', fontWeight: 400, color: '#222', whiteSpace: 'nowrap', lineHeight: 1.3,
      }}>{name}</P>
      <P style={{
        position: 'absolute', left: '65.77px', top: `${19.59}px`,
        fontSize: '10.359px', fontWeight: 400, color: '#9a9a9a', whiteSpace: 'nowrap', lineHeight: 1.3,
      }}>{info}</P>
      <P style={{
        position: 'absolute', right: '23px', top: `${6}px`,
        fontSize: '14.5px', fontWeight: 500, color: '#666', whiteSpace: 'nowrap', textAlign: 'right',
      }}>{amount.toLocaleString('en-US')}원</P>
    </div>
  );
}

function formatKoreanAmount(n) {
  if (n === 0) return '0원';
  const uk  = Math.floor(n / 100_000_000);
  const man = Math.floor((n % 100_000_000) / 10_000);
  const rem = n % 10_000;
  let result = '';
  if (uk  > 0) result += uk.toLocaleString('en-US')  + '억 ';
  if (man > 0) result += man.toLocaleString('en-US') + '만 ';
  if (rem > 0) result += rem.toLocaleString('en-US') + '원';
  else         result  = result.trimEnd() + '원';
  return result;
}

const LIMIT = 2_800_000;

const ACCOUNT_DEFS = [
  { icon: '/figma/split-shinhan-icon.svg', name: '쏠편한 입출금통장',  info: '신한 110123456789' },
  { icon: alKakao,                          name: '뱅크월렛 카카오통장', info: '하나 78912345678901' },
  { icon: alTossBg, iconExtra: alTossVector, name: '토스뱅크 통장',     info: '토스뱅크 100123456789' },
  { icon: '/figma/split-wine-icon.svg',      name: '월간와인회',         info: '카카오뱅크 3333-36-1234567' },
];

export default function SplitConfirmScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const amounts     = location.state?.amounts ?? [1_000_000, 1_200_000, 200_000, 10_000];
  const activeCount = amounts.filter(a => a > 0).length;
  const total       = amounts.reduce((s, a) => s + a, 0);
  const remaining   = LIMIT - total;

  // 0원 계좌 제외
  const activeRows = ACCOUNT_DEFS
    .map((def, i) => ({ ...def, amount: amounts[i] }))
    .filter(row => row.amount > 0);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>

      {/* ── 고정 헤더: 상태바 + 내비 ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100px', background: '#fff', zIndex: 10 }}>
        <StatusBar />
        <div style={{ position: 'absolute', top: '44px', left: 0, right: 0, height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            onClick={() => navigate(-1)}
            style={{ position: 'absolute', left: '19px', background: 'none', border: 'none', cursor: 'pointer', padding: '12px 16px' }}
            aria-label="뒤로가기"
          >
            <img src="/figma/split-back-arrow.svg" alt="" style={{ width: '9px', height: '18px', display: 'block' }} />
          </button>
          <P style={{ fontWeight: 600, fontSize: '16px', color: '#000', letterSpacing: '-0.1px', whiteSpace: 'nowrap' }}>
            내 계좌에 나눠넣기
          </P>
        </div>
      </div>

      {/* ── 스크롤 콘텐츠 영역 ── */}
      <div style={{ position: 'absolute', top: '100px', bottom: '114px', left: 0, width: '100%', overflowY: 'auto', scrollbarWidth: 'none' }}>
        <div style={{ position: 'relative', width: '100%', minHeight: '620px' }}>

          {/* "N개 계좌에": Figma top=139 */}
          <P style={{ position: 'absolute', left: '26px', top: sy(139), fontSize: '24px', fontWeight: 600, color: '#222', whiteSpace: 'nowrap', letterSpacing: '-0.16px' }}>
            {activeCount}개 계좌에
          </P>
          {/* 장식 밑줄: Figma top=171 */}
          <div style={{ position: 'absolute', left: '26px', top: sy(171), width: '82px', height: '1.5px', background: '#DADADA' }} />

          {/* 총액원을 나눠 넣을게요: Figma top=193 */}
          <P style={{ position: 'absolute', left: '26px', top: sy(193), fontSize: '24px', fontWeight: 600, whiteSpace: 'nowrap', letterSpacing: '-0.16px' }}>
            <span style={{ color: '#005a96' }}>{total.toLocaleString('en-US')}</span>
            <span style={{ color: '#222' }}>원을 나눠 넣을게요.</span>
          </P>
          {/* 장식 밑줄: Figma top=225 */}
          <div style={{ position: 'absolute', left: '26px', top: sy(225), width: '132px', height: '1.5px', background: '#DADADA' }} />

          {/* 한글 금액: Figma top=238 */}
          <P style={{ position: 'absolute', left: '26px', top: sy(238), fontSize: '16px', fontWeight: 500, color: '#a6a6a6', whiteSpace: 'nowrap', letterSpacing: '-0.1px' }}>
            {formatKoreanAmount(total)}
          </P>

          {/* ── 흰 카드: top 고정, height auto (내용에 따라 늘어남) ── */}
          <div style={{
            position: 'absolute', left: '20px', top: sy(299),
            width: '335px',
            background: '#fff', border: '1px solid #d4d5d5', borderRadius: '15px',
          }}>
            {/* 제목: 항상 card-rel top=20 고정 */}
            <P style={{ position: 'absolute', left: '21px', top: '20px', fontSize: '14px', fontWeight: 600, color: '#000', letterSpacing: '-0.1px' }}>
              나눠 넣을 계좌
            </P>

            {/* flow 영역: 제목 아래(62px)부터 계좌 rows → 남는 금액 섹션 */}
            <div style={{ paddingTop: '62px' }}>

              {/* 0원 제외된 활성 계좌 rows — 각 53px (Figma 행 간격 유지) */}
              {activeRows.map((row, i) => (
                <AccountRow key={i} {...row} />
              ))}

              {/* 구분선: left=21, right=23 (Figma width=291) */}
              <div style={{ marginLeft: '21px', marginRight: '23px', height: '1px', background: '#e8e8e8' }} />

              {/* 남는 금액 섹션 */}
              <div style={{ height: '19px' }} />
              <P style={{ paddingLeft: '21px', fontSize: '14px', fontWeight: 600, color: '#000', letterSpacing: '-0.1px' }}>
                남는 금액
              </P>
              <div style={{ height: '20px' }} />

              {/* KB 행: 마지막 행이므로 rowHeight=34.51px (trailing gap 불필요) */}
              <AccountRow
                icon={kbIcon}
                name="KB국민ONE통장"
                info="국민 12345601123456"
                amount={remaining}
                rowHeight={34.51}
              />

              {/* 카드 하단 패딩 */}
              <div style={{ height: '32px' }} />
            </div>
          </div>

        </div>
      </div>

      {/* ── 고정 하단 버튼 영역: Figma top=698, h=114 ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '114px', background: '#fff' }}>
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => navigate('/complete', { state: { amounts } }), 1200);
          }}
          style={{
            position: 'absolute',
            left: '16.22px',
            top: '21px',
            width: '342.557px',
            height: '55.344px',
            background: '#FFE200',
            borderRadius: '13.359px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 600, fontSize: '16.221px', color: '#222', letterSpacing: '-0.477px', whiteSpace: 'nowrap' }}>
            이대로 나눠 넣기
          </span>
        </button>
      </div>

      {/* ── 로딩 오버레이 ── */}
      {loading && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '40px', height: '40px',
            border: '3px solid rgba(255,255,255,0.25)',
            borderTopColor: '#fff',
            borderRadius: '50%',
            animation: 'spin 0.75s linear infinite',
          }} />
        </div>
      )}

    </div>
  );
}
