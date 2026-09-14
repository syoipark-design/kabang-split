import alSavingBg from '../assets/al-saving-bg.svg';
import alSavingImg from '../assets/al-saving-img.png';
import alMmaBadge from '../assets/al-mma-badge.png';
import alChoeae from '../assets/al-choeae.png';
import alKakao from '../assets/al-kakao.svg';
import alTossBg from '../assets/al-toss-bg.svg';
import alTossVector from '../assets/al-toss-vector.png';
import alMoreIcon from '../assets/al-more-icon.svg';
import alMoreArrow from '../assets/al-more-arrow.svg';
import alTabMask from '../assets/al-tab-mask.svg';
import alTabChevron from '../assets/al-tab-chevron.svg';
import alTabPlus from '../assets/al-tab-plus.svg';
import alTabDivider from '../assets/al-tab-divider.svg';
import alCardArrow from '../assets/al-card-arrow.svg';
import alCardImg from '../assets/al-card-img.png';

const CARD_SHADOW = '0px 0px 12.5px 0px rgba(199,201,205,0.42)';

function tabMaskStyle(pos) {
  return {
    maskImage: `url(${alTabMask})`,
    maskMode: 'luminance',
    maskComposite: 'intersect',
    maskClip: 'no-clip',
    maskRepeat: 'no-repeat',
    maskPosition: pos,
    maskSize: '366px 59px',
  };
}

export default function AccountList() {
  return (
    <div className="relative w-[345px] h-[518px]">

      {/* ── Card 1: 계좌 리스트 (345×379) ── */}
      <div
        className="absolute top-0 left-0 w-full h-[379px] bg-[#feffff] rounded-[25px] overflow-hidden"
        style={{ boxShadow: CARD_SHADOW }}
      >

        {/* 행 1 — 한달적금 with MMA2026 */}
        <div className="absolute left-[17px] top-[26px] size-[35px] rounded-full overflow-hidden">
          <img alt="" className="absolute inset-0 size-full object-cover" src={alSavingBg} />
        </div>
        <div className="absolute left-[24px] top-[34px] size-[21px] overflow-hidden pointer-events-none">
          <img
            alt=""
            className="absolute max-w-none size-[161.6%] left-[-30.8%] top-[-30.8%]"
            src={alSavingImg}
          />
        </div>
        <p className="absolute left-[64px] top-[24px] font-sans font-bold text-[17.063px] leading-[normal] text-[#222] whitespace-nowrap">
          20,000원
        </p>
        <p className="absolute left-[64px] top-[48px] font-sans font-normal text-[13.033px] leading-[normal] text-[#666] whitespace-nowrap">
          한달적금with MMA2026
        </p>
        <div className="absolute left-[287px] top-[27px] h-[14px] w-[39px]">
          <img alt="" className="absolute inset-0 size-full object-cover" src={alMmaBadge} />
        </div>

        {/* 행 2 — 최애적금 */}
        <div className="absolute left-[17px] top-[87px] size-[35px] rounded-full overflow-hidden">
          <img alt="" className="absolute inset-0 size-full object-cover" src={alChoeae} />
        </div>
        <p className="absolute left-[64px] top-[85px] font-sans font-bold text-[17.063px] leading-[normal] text-[#222] whitespace-nowrap">
          80,000원
        </p>
        <p className="absolute left-[64px] top-[109px] font-sans font-normal text-[13.033px] leading-[normal] text-[#666] whitespace-nowrap">
          최애적금
        </p>
        <div className="absolute left-[114px] top-[108px] flex items-center justify-center bg-white border-[0.5px] border-[#acacac] rounded-[100px] h-[17px] w-[25px] px-[5px] py-[4px]">
          <span className="font-sans font-semibold text-[7px] leading-none text-[#7f7f7f] whitespace-nowrap">8회</span>
        </div>

        {/* 행 3 — 뱅크월렛 카카오통장 */}
        <div className="absolute left-[17px] top-[148px] size-[35px] rounded-full overflow-hidden">
          <img alt="" className="absolute inset-0 size-full object-cover" src={alKakao} />
        </div>
        <p className="absolute left-[64px] top-[146px] font-sans font-bold text-[17.063px] leading-[normal] text-[#222] whitespace-nowrap">
          496,581원
        </p>
        <p className="absolute left-[64px] top-[170px] font-sans font-normal text-[13.033px] leading-[normal] text-[#666] whitespace-nowrap">
          뱅크월렛 카카오통장
        </p>
        <div className="absolute left-[269px] top-[148px] flex items-center justify-center bg-[#f2f2f2] rounded-[100px] h-[35px] w-[57px]">
          <span className="font-sans font-bold text-[13px] leading-[normal] text-[#222]">이체</span>
        </div>

        {/* 행 4 — 토스뱅크 통장 */}
        <div className="absolute left-[17px] top-[209px] size-[35px] rounded-full overflow-hidden">
          <img alt="" className="absolute inset-0 size-full object-cover" src={alTossBg} />
        </div>
        <div className="absolute left-[25.51px] top-[217.51px] size-[17.973px]">
          <img alt="" className="absolute inset-0 size-full" src={alTossVector} />
        </div>
        <p className="absolute left-[64px] top-[207px] font-sans font-bold text-[17.063px] leading-[normal] text-[#222] whitespace-nowrap">
          6,100원
        </p>
        <p className="absolute left-[64px] top-[231px] font-sans font-normal text-[13.033px] leading-[normal] text-[#666] whitespace-nowrap">
          토스뱅크 통장
        </p>
        <div className="absolute left-[269px] top-[209px] flex items-center justify-center bg-[#f2f2f2] rounded-[100px] h-[35px] w-[57px]">
          <span className="font-sans font-bold text-[13px] leading-[normal] text-[#222]">이체</span>
        </div>

        {/* 계좌 더보기 */}
        <div className="absolute left-[17px] top-[268px] size-[35px]">
          <img alt="" className="absolute inset-0 size-full" src={alMoreIcon} />
        </div>
        <p className="absolute left-[64px] top-[276px] font-sans font-bold text-[17.063px] leading-[normal] text-[#222] whitespace-nowrap">
          계좌 더보기
        </p>
        <div className="absolute left-[297px] top-[271px] size-[29px]">
          <img alt="" className="absolute inset-0 size-full" src={alMoreArrow} />
        </div>

        {/* 필터 탭 — 가로 스크롤 */}
        <div
          className="absolute left-0 top-[314px] bottom-0 w-full overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex items-center gap-[8px] h-full pl-[17px] pr-[17px] min-w-max">
            {/* 내 계좌 탭 */}
            <div className="flex shrink-0 gap-[8px] items-center justify-center bg-white border-[0.7px] border-[#dadada] rounded-[100px] pl-[11px] pr-[12px] py-[8.5px]">
              <span className="font-sans font-normal text-[12.004px] leading-[normal] text-[#303030] whitespace-nowrap">내 계좌</span>
              <div className="relative flex items-center justify-center w-[4px] h-[8px] rotate-180">
                <div className="absolute inset-[-7.5%_-15%]">
                  <img alt="" className="size-full" src={alTabChevron} />
                </div>
              </div>
            </div>
            {/* 구분선 */}
            <div className="shrink-0 w-px h-[15px] bg-[#dadada]" />
            {/* 통장 탭 */}
            <div className="flex shrink-0 gap-[8px] items-center justify-center bg-white border-[0.7px] border-[#dadada] rounded-[100px] px-[11px] py-[8.5px]">
              <span className="font-sans font-normal text-[12.004px] leading-[normal] text-[#303030] whitespace-nowrap">통장</span>
              <div className="relative size-[7.5px]">
                <div className="absolute inset-[-8%]">
                  <img alt="" className="size-full" src={alTabPlus} />
                </div>
              </div>
            </div>
            {/* 저축 탭 */}
            <div className="flex shrink-0 gap-[8px] items-center justify-center bg-white border-[0.7px] border-[#dadada] rounded-[100px] px-[11px] py-[8.5px]">
              <span className="font-sans font-normal text-[12.004px] leading-[normal] text-[#303030] whitespace-nowrap">저축</span>
              <div className="relative size-[7.5px]">
                <div className="absolute inset-[-8%]">
                  <img alt="" className="size-full" src={alTabPlus} />
                </div>
              </div>
            </div>
            {/* 대출 탭 */}
            <div className="flex shrink-0 gap-[8px] items-center justify-center bg-white border-[0.7px] border-[#dadada] rounded-[100px] px-[11px] py-[8.5px]">
              <span className="font-sans font-normal text-[12.004px] leading-[normal] text-[#303030] whitespace-nowrap">대출</span>
              <div className="relative size-[7.5px]">
                <div className="absolute inset-[-8%]">
                  <img alt="" className="size-full" src={alTabPlus} />
                </div>
              </div>
            </div>
            {/* 다른 금 탭 */}
            <div className="flex shrink-0 gap-[8px] items-center justify-center bg-white border-[0.7px] border-[#dadada] rounded-[100px] px-[11px] py-[8.5px]">
              <span className="font-sans font-normal text-[12.004px] leading-[normal] text-[#303030] whitespace-nowrap">다른 금</span>
              <div className="relative size-[7.5px]">
                <div className="absolute inset-[-8%]">
                  <img alt="" className="size-full" src={alTabPlus} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Card 2: 카드 섹션 (345×131) ── */}
      <div
        className="absolute top-[387px] left-0 w-full h-[131px] bg-[#feffff] rounded-[25px]"
        style={{ boxShadow: CARD_SHADOW }}
      >
        <p className="absolute left-[17px] top-[27px] font-sans font-bold text-[19px] leading-[normal] text-[#222] whitespace-nowrap">
          카드
        </p>
        <div className="absolute left-[59px] top-[34px] flex items-center justify-center w-[4px] h-[8px] rotate-180">
          <div className="absolute inset-[-7.5%_-15%]">
            <img alt="" className="size-full" src={alCardArrow} />
          </div>
        </div>

        <div className="absolute left-[25px] top-[72px] h-[34px] w-[20.839px] rounded-[2.194px] overflow-hidden">
          <img
            alt=""
            className="absolute max-w-none h-[2630%] w-[1973.68%] left-[-205.26%] top-[-1635.97%]"
            src={alCardImg}
          />
        </div>
        <p className="absolute left-[62.92px] top-[79px] font-sans font-bold text-[17.063px] leading-[normal] text-[#222] whitespace-nowrap">
          보유 카드가 없어요
        </p>
        <div className="absolute left-[246.92px] top-[71px] flex items-center justify-center bg-[#f2f2f2] rounded-[100px] h-[35px] w-[79px]">
          <span className="font-sans font-bold text-[13px] leading-[normal] text-[#222]">발급하기</span>
        </div>
      </div>

    </div>
  );
}
