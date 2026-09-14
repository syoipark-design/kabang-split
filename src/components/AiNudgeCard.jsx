import nudgeXIcon from '../assets/nudge-x-icon.svg';
import nudgeRainbowMask from '../assets/nudge-rainbow-mask.svg';
import nudgeRainbowBg from '../assets/nudge-rainbow-bg.svg';

export default function AiNudgeCard({ onClose, visible }) {
  return (
    <div
      className="relative w-[345px] h-[204px] rounded-[24px] bg-white overflow-hidden"
      style={{
        border: '0.6px solid #ffdd01',
        boxShadow:
          '0px 6px 18px 0px rgba(115,184,229,0.1), 0px 4px 16px 0px rgba(229,209,89,0.16)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-12px)',
        transition: visible
          ? 'opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s'
          : 'opacity 0.25s ease-in, transform 0.25s ease-in',
      }}
    >
      {/* 무지개 데코 */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '3px',
          top: '33px',
          width: '336px',
          height: '103px',
          maskImage: `url(${nudgeRainbowMask})`,
          WebkitMaskImage: `url(${nudgeRainbowMask})`,
          maskMode: 'alpha',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
          maskClip: 'no-clip',
          maskRepeat: 'no-repeat',
          maskPosition: '-21px -45px',
          maskSize: '381px 234px',
        }}
      >
        <div className="absolute" style={{ inset: '-97.09% -35.54% -115.92% -29.76%' }}>
          <img alt="" className="block max-w-none size-full" src={nudgeRainbowBg} />
        </div>
      </div>

      {/* 돈다발 아이콘 (node 14:442) */}
      <div className="absolute overflow-hidden" style={{ left: '23px', top: '26px', width: '23px', height: '23px' }}>
        <img alt="" className="absolute max-w-none size-full object-contain" src="/figma/salary-icon.png" />
      </div>

      {/* 제목 */}
      <p
        className="absolute font-sans font-semibold text-[16px] leading-[normal] text-[#222] whitespace-nowrap"
        style={{ left: '62px', top: '28px' }}
      >
        월급이 들어왔어요!
      </p>

      {/* X 버튼 */}
      <button
        onClick={onClose}
        className="absolute"
        style={{ left: '311px', top: '33px', width: '9px', height: '9px' }}
        aria-label="닫기"
      >
        <div className="absolute" style={{ inset: '-6.67%' }}>
          <img alt="" className="block max-w-none size-full" src={nudgeXIcon} />
        </div>
      </button>

      {/* 안내문 — 14px Regular #000 */}
      <p
        className="absolute font-sans font-normal leading-[normal] whitespace-nowrap"
        style={{ left: '23px', top: '63px', fontSize: '14px', color: '#000' }}
      >
        월급을 목적에 맞게 나눠 관리해보세요.
      </p>

      {/* 계좌 선택 박스 — w309, h38, radius 100px, flex 수평 정렬 */}
      <div
        className="absolute bg-white flex items-center justify-between"
        style={{ left: '18px', top: '92px', width: '309px', height: '38px', borderRadius: '100px', paddingLeft: '17px', paddingRight: '17px' }}
      >
        <p className="font-sans font-normal whitespace-nowrap" style={{ fontSize: '13px', color: '#5A6674' }}>
          KB국민ONE통장(123456)
        </p>
        <div className="flex items-center gap-[6px]">
          <p className="font-sans font-normal whitespace-nowrap" style={{ fontSize: '13px', color: '#808080' }}>
            계좌 보기
          </p>
          <div style={{ width: '4px', height: '8px', transform: 'rotate(180deg)', flexShrink: 0 }}>
            <img alt="" className="size-full" src="/figma/arrow-right-chevron.svg" />
          </div>
        </div>
      </div>

      {/* 노란 버튼 — w309, h44, radius 12px, #FFE200, 버튼 끝~카드 하단 18px */}
      <button
        style={{
          position: 'absolute',
          left: '18px',
          top: '142px',
          width: '309px',
          height: '44px',
          background: '#FFE200',
          borderRadius: '12px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 600, fontSize: '15px', lineHeight: 'normal', color: '#26282b', letterSpacing: '-0.2px', whiteSpace: 'nowrap' }}>
          내 계좌에 나눠 넣기
        </span>
      </button>
    </div>
  );
}
