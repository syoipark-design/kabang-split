// AccountSplitCard — SplitScreen 계좌 카드 (피그마 node 21:734 기준)
// aiHintHeight: AI 힌트 박스 높이 (px). 카드 전체 높이 = 204 + aiHintHeight + 18

export default function AccountSplitCard({
  icon,          // JSX element or img src string
  iconExtra,     // optional second layer (Toss vector overlay)
  accountName,
  accountInfo,
  badge,         // { label, color } | null
  amount,
  amountSub,
  aiHintHeight,
  aiHint,        // array of { text, bold? }
}) {
  const cardHeight = 204 + aiHintHeight + 18;

  return (
    <div
      style={{
        width: '345px',
        height: `${cardHeight}px`,
        background: '#fff',
        borderRadius: '20px',
        position: 'relative',
      }}
    >
      {/* 은행 아이콘 */}
      <div style={{ position: 'absolute', left: '18px', top: '20px', width: '37px', height: '37px', borderRadius: '50%', overflow: 'hidden' }}>
        {typeof icon === 'string' ? (
          <img src={icon} alt="" style={{ width: '100%', height: '100%' }} />
        ) : (
          icon
        )}
        {/* Toss처럼 아이콘 위에 벡터 겹치는 경우 */}
        {iconExtra && (
          <div style={{ position: 'absolute', left: '9px', top: '9px', width: '19px', height: '19px' }}>
            <img src={iconExtra} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        )}
      </div>

      {/* 계좌명 */}
      <p
        style={{
          position: 'absolute',
          left: '66px',
          top: '21px',
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: 500,
          fontSize: '15px',
          color: '#222',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        {accountName}
      </p>

      {/* 은행/계좌번호 */}
      <p
        style={{
          position: 'absolute',
          left: '66px',
          top: '42px',
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: 400,
          fontSize: '11px',
          color: '#9a9a9a',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        {accountInfo}
      </p>

      {/* 배지 (저축/생활/기타) */}
      {badge && (
        <div
          style={{
            position: 'absolute',
            left: '280px',
            top: '26px',
            background: badge.color,
            borderRadius: '100px',
            padding: '5px 9px',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              color: '#333',
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}
          >
            {badge.label}
          </span>
        </div>
      )}

      {/* 금액 입력 박스 */}
      <div
        style={{
          position: 'absolute',
          left: '18px',
          top: '72px',
          width: '309px',
          height: '77px',
          border: '0.5px solid #ccc',
          borderRadius: '7px',
        }}
      >
        {/* 금액 */}
        <p
          style={{
            position: 'absolute',
            left: '19px',
            top: '16px',
            fontFamily: 'Pretendard, sans-serif',
            fontWeight: 600,
            fontSize: '17px',
            color: '#000',
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}
        >
          {amount}
        </p>
        {/* 서브 레이블 */}
        <p
          style={{
            position: 'absolute',
            left: '20px',
            top: '44px',
            fontFamily: 'Pretendard, sans-serif',
            fontWeight: 400,
            fontSize: '13px',
            color: '#9a9a9a',
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}
        >
          {amountSub}
        </p>
        {/* X 버튼 */}
        <button
          style={{
            position: 'absolute',
            right: '14px',
            top: '18px',
            width: '9.5px',
            height: '9.5px',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
          aria-label="지우기"
        >
          <img src="/figma/close-icon.svg" alt="" style={{ width: '100%', height: '100%' }} />
        </button>
      </div>

      {/* 빠른 금액 버튼 */}
      {['+5만', '+10만', '+50만'].map((label, i) => (
        <button
          key={label}
          style={{
            position: 'absolute',
            left: `${18 + i * 58}px`,
            top: '159px',
            width: '50px',
            height: '30px',
            background: '#f1f2f5',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontWeight: 600,
              fontSize: '11.5px',
              color: '#666',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </span>
        </button>
      ))}

      {/* AI 힌트 박스 */}
      <div
        style={{
          position: 'absolute',
          left: '18px',
          top: '204px',
          width: '309px',
          height: `${aiHintHeight}px`,
          background: '#eaf9ff',
          borderRadius: '7px',
          overflow: 'hidden',
        }}
      >
        {/* 스파클 아이콘 */}
        <div style={{ position: 'absolute', left: '13px', top: '14px', width: '14px', height: '14px' }}>
          <img src="/figma/split-sparkle.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        {/* AI 힌트 텍스트 */}
        <p
          style={{
            position: 'absolute',
            left: '35px',
            top: '12px',
            width: '259px',
            fontFamily: 'Pretendard, sans-serif',
            fontWeight: 400,
            fontSize: '13px',
            color: '#3a3a3a',
            lineHeight: 1.5,
          }}
        >
          {aiHint.map((seg, i) =>
            seg.bold
              ? <strong key={i} style={{ fontWeight: 600 }}>{seg.text}</strong>
              : <span key={i}>{seg.text}</span>
          )}
        </p>
      </div>
    </div>
  );
}
