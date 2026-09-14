import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import alKakao from '../assets/al-kakao.svg';
import alTossBg from '../assets/al-toss-bg.svg';
import alTossVector from '../assets/al-toss-vector.png';
import kbIcon from '../assets/kb.svg';

// 피그마 frame 좌표 → 스크롤 top=100 기준 보정
const SCROLL_OFFSET = 100;
function sy(frameY) { return `${frameY - SCROLL_OFFSET}px`; }

const P = ({ style, children }) => (
  <p style={{ fontFamily: 'Pretendard, sans-serif', margin: 0, ...style }}>{children}</p>
);

// 카드 내 계좌 한 줄 (card-relative 좌표)
function AccountRow({ icon, iconExtra, name, info, amount, top }) {
  return (
    <>
      {/* 아이콘 */}
      <div style={{
        position: 'absolute', left: '21px', top: `${top}px`,
        width: '34.51px', height: '34.51px', borderRadius: '50%', overflow: 'hidden',
      }}>
        {typeof icon === 'string'
          ? <img src={icon} alt="" style={{ width: '100%', height: '100%' }} />
          : icon}
      </div>
      {/* Toss 벡터 오버레이 */}
      {iconExtra && (
        <div style={{
          position: 'absolute',
          left: `${21 + 8.39}px`, top: `${top + 8.39}px`,
          width: '17.721px', height: '17.721px',
        }}>
          <img src={iconExtra} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      )}
      {/* 계좌명 */}
      <P style={{
        position: 'absolute', left: '65.77px', top: `${top + 0.93}px`,
        fontSize: '13.99px', fontWeight: 400, color: '#222', whiteSpace: 'nowrap', lineHeight: 1.3,
      }}>{name}</P>
      {/* 계좌번호 */}
      <P style={{
        position: 'absolute', left: '65.77px', top: `${top + 19.59}px`,
        fontSize: '10.359px', fontWeight: 400, color: '#9a9a9a', whiteSpace: 'nowrap', lineHeight: 1.3,
      }}>{info}</P>
      {/* 금액 */}
      <P style={{
        position: 'absolute', right: '23px', top: `${top + 6}px`,
        fontSize: '14.5px', fontWeight: 500, color: '#666', whiteSpace: 'nowrap', textAlign: 'right',
      }}>{amount}</P>
    </>
  );
}

export default function SplitConfirmScreen() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>

      {/* ── 고정 헤더: 상태바 + 내비 ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100px', background: '#fff', zIndex: 10 }}>
        <StatusBar />

        {/* 뒤로가기: Figma left=35, top=70 */}
        <button
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', left: '19px', top: '44px', background: 'none', border: 'none', padding: '26px 16px 12px', cursor: 'pointer' }}
          aria-label="뒤로가기"
        >
          <img src="/figma/split-back-arrow.svg" alt="" style={{ width: '9px', height: '18px', display: 'block' }} />
        </button>

        {/* 헤더 타이틀: Figma top=66 */}
        <P style={{
          position: 'absolute', top: '66px', left: 0, width: '100%',
          textAlign: 'center', fontWeight: 600, fontSize: '16px', color: '#000',
          letterSpacing: '-0.1px', whiteSpace: 'nowrap',
        }}>
          내 계좌에 나눠넣기
        </P>
      </div>

      {/* ── 스크롤 콘텐츠 영역 ── */}
      <div style={{ position: 'absolute', top: '100px', bottom: '114px', left: 0, width: '100%', overflowY: 'auto', scrollbarWidth: 'none' }}>
        <div style={{ position: 'relative', width: '100%', minHeight: '620px' }}>

          {/* "4개 계좌에": Figma top=139 */}
          <P style={{ position: 'absolute', left: '26px', top: sy(139), fontSize: '24px', fontWeight: 600, color: '#222', whiteSpace: 'nowrap', letterSpacing: '-0.16px' }}>
            4개 계좌에
          </P>
          {/* 장식 밑줄: Figma top=171, w=82 */}
          <div style={{ position: 'absolute', left: '26px', top: sy(171), width: '82px', height: '1.5px', background: '#DADADA' }} />

          {/* "2,210,000원을 나눠 넣을게요.": Figma top=193 */}
          <P style={{ position: 'absolute', left: '26px', top: sy(193), fontSize: '24px', fontWeight: 600, whiteSpace: 'nowrap', letterSpacing: '-0.16px' }}>
            <span style={{ color: '#005a96' }}>2,210,000</span>
            <span style={{ color: '#222' }}>원을 나눠 넣을게요.</span>
          </P>
          {/* 장식 밑줄 (파란 숫자 아래): Figma top=225, w=132 */}
          <div style={{ position: 'absolute', left: '26px', top: sy(225), width: '132px', height: '1.5px', background: '#DADADA' }} />

          {/* "221만원": Figma top=238 */}
          <P style={{ position: 'absolute', left: '26px', top: sy(238), fontSize: '16px', fontWeight: 500, color: '#a6a6a6', whiteSpace: 'nowrap', letterSpacing: '-0.1px' }}>
            221만원
          </P>

          {/* ── 흰 카드: Figma top=299, left=20, w=335, h=399 ── */}
          <div style={{
            position: 'absolute', left: '20px', top: sy(299),
            width: '335px', height: '399px',
            background: '#fff', border: '1px solid #d4d5d5', borderRadius: '15px',
          }}>
            {/* "나눠 넣을 계좌": card-rel left=21, top=20 (Figma 319-299) */}
            <P style={{ position: 'absolute', left: '21px', top: '20px', fontSize: '14px', fontWeight: 600, color: '#000', letterSpacing: '-0.1px' }}>
              나눠 넣을 계좌
            </P>

            {/* Row 1: 쏠편한 — card top=62 (Figma 361-299) */}
            <AccountRow
              icon="/figma/split-shinhan-icon.svg"
              name="쏠편한 입출금통장"
              info="신한 110123456789"
              amount="1,000,000원"
              top={62}
            />

            {/* Row 2: 카카오 — card top=115 (Figma 414.16-299) */}
            <AccountRow
              icon={alKakao}
              name="뱅크월렛 카카오통장"
              info="하나 78912345678901"
              amount="1,200,000원"
              top={115}
            />

            {/* Row 3: 토스뱅크 — card top=168 (Figma 467.33-299) */}
            <AccountRow
              icon={alTossBg}
              iconExtra={alTossVector}
              name="토스뱅크 통장"
              info="토스뱅크 100123456789"
              amount="200,000원"
              top={168}
            />

            {/* Row 4: 월간와인회 — card top=221 (Figma 520.46-299) */}
            <AccountRow
              icon="/figma/split-wine-icon.svg"
              name="월간와인회"
              info="카카오뱅크 3333-36-1234567"
              amount="10,000원"
              top={221}
            />

            {/* 구분선: card top=275 (Figma 574-299), left=21, w=291 */}
            <div style={{ position: 'absolute', left: '21px', top: '275px', width: '291px', height: '1px', background: '#e8e8e8' }} />

            {/* "남는 금액": card top=294 (Figma 593-299) */}
            <P style={{ position: 'absolute', left: '21px', top: '294px', fontSize: '14px', fontWeight: 600, color: '#000', letterSpacing: '-0.1px' }}>
              남는 금액
            </P>

            {/* Row 5: KB — card top=332 (Figma 631-299) */}
            <div style={{ position: 'absolute', left: '21px', top: '332px', width: '34.51px', height: '34.51px', borderRadius: '50%', overflow: 'hidden' }}>
              <img src={kbIcon} alt="KB" style={{ width: '100%', height: '100%' }} />
            </div>
            <P style={{ position: 'absolute', left: '65.89px', top: '332.93px', fontSize: '13.99px', fontWeight: 400, color: '#222', whiteSpace: 'nowrap', lineHeight: 1.3 }}>
              KB국민ONE통장
            </P>
            <P style={{ position: 'absolute', left: '65.89px', top: '352.54px', fontSize: '10.359px', fontWeight: 400, color: '#9a9a9a', whiteSpace: 'nowrap', lineHeight: 1.3 }}>
              국민 12345601123456
            </P>
            <P style={{ position: 'absolute', right: '23px', top: '338.54px', fontSize: '14.5px', fontWeight: 500, color: '#666', whiteSpace: 'nowrap', textAlign: 'right' }}>
              590,000원
            </P>
          </div>

        </div>
      </div>

      {/* ── 고정 하단 버튼 영역: Figma top=698, h=114 ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '114px', background: '#fff' }}>
        {/* 노란 버튼: Figma top=718.99 → area-rel top=20.99 */}
        <button
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

    </div>
  );
}
