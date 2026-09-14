// AccountSplitCard — amount은 부모(SplitScreen)에서 관리.
// 이 컴포넌트는 표시 + 이벤트 콜백만 담당.
// aiHintHeight: AI 힌트 박스 높이 (px). 카드 전체 높이 = 204 + aiHintHeight + 18

// 한글 금액 변환: 1000000 → "100만원", 123456789 → "1억 2,345만 6,789원"
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

export default function AccountSplitCard({
  icon,
  iconExtra,
  accountName,
  accountInfo,
  badge,
  amount,          // number (controlled by parent)
  onAmountChange,  // (newAmount: number) => void
  isError,         // 한도 초과 시 빨간 테두리/텍스트
  isShaking,       // 한도 초과 시 흔들림 애니메이션
  aiHintHeight,
  aiHint,
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
      {/* 아이콘 + 텍스트 flex 행 (수직 중앙 정렬) */}
      <div style={{ position: 'absolute', left: '18px', top: '20px', width: '262px', height: '37px', display: 'flex', alignItems: 'center', gap: '11px' }}>
        <div style={{ width: '37px', height: '37px', flexShrink: 0, borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
          {typeof icon === 'string' ? (
            <img src={icon} alt="" style={{ width: '100%', height: '100%' }} />
          ) : icon}
          {iconExtra && (
            <div style={{ position: 'absolute', left: '9px', top: '9px', width: '19px', height: '19px' }}>
              <img src={iconExtra} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 500, fontSize: '15px', color: '#222', whiteSpace: 'nowrap', lineHeight: 1, margin: 0 }}>
            {accountName}
          </p>
          <p style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 400, fontSize: '11px', color: '#9a9a9a', whiteSpace: 'nowrap', lineHeight: 1, margin: 0 }}>
            {accountInfo}
          </p>
        </div>
      </div>

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
          <span style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 600, fontSize: '12px', color: '#333', whiteSpace: 'nowrap', lineHeight: 1 }}>
            {badge.label}
          </span>
        </div>
      )}

      {/* 금액 입력 박스 — 항상 고정 스타일, 흔들림/색 없음 */}
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
        {/* 금액 input — 초과 시 텍스트만 빨강 + shake */}
        <input
          inputMode="numeric"
          value={amount === 0 ? '0원' : `${amount.toLocaleString('en-US')}원`}
          onChange={e => {
            const digits = e.target.value.replace(/[^0-9]/g, '');
            onAmountChange(digits === '' ? 0 : parseInt(digits, 10));
          }}
          onFocus={e => e.target.select()}
          style={{
            position: 'absolute',
            left: '19px',
            top: '16px',
            fontFamily: 'Pretendard, sans-serif',
            fontWeight: 600,
            fontSize: '17px',
            color: isError ? '#FF3B30' : '#000',
            whiteSpace: 'nowrap',
            lineHeight: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: 0,
            margin: 0,
            width: '240px',
            animation: isShaking ? 'shake 0.35s ease' : 'none',
          }}
        />

        {/* 서브 레이블 — formatKoreanAmount 자동 변환 */}
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
            margin: 0,
          }}
        >
          {formatKoreanAmount(amount)}
        </p>

        {/* X 버튼 → 금액 0으로 */}
        <button
          onClick={() => onAmountChange(0)}
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

      {/* 빠른 금액 버튼 (+5만 / +10만 / +50만) */}
      {[
        { label: '+5만',  add: 50_000 },
        { label: '+10만', add: 100_000 },
        { label: '+50만', add: 500_000 },
      ].map(({ label, add }, i) => (
        <button
          key={label}
          onClick={() => onAmountChange(amount + add)}
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
          <span style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 600, fontSize: '11.5px', color: '#666', whiteSpace: 'nowrap' }}>
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
        <div style={{ position: 'absolute', left: '13px', top: '14px', width: '14px', height: '14px' }}>
          <img src="/figma/split-sparkle.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
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
            margin: 0,
          }}
        >
          {aiHint.map((seg, idx) =>
            seg.bold
              ? <strong key={idx} style={{ fontWeight: 600 }}>{seg.text}</strong>
              : <span key={idx}>{seg.text}</span>
          )}
        </p>
      </div>
    </div>
  );
}
