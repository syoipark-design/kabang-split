import kabangAccountIcon from '../assets/kabangaccount-icon.svg';

export default function AccountCard() {
  return (
    <div className="relative w-[345px] h-[134px] rounded-tl-[25px] rounded-tr-[25px] rounded-bl-[22px] rounded-br-[22px] bg-[#bcdeef]">
      <img
        src={kabangAccountIcon}
        alt=""
        className="absolute left-[17px] top-[26px] w-[35px] h-[35px]"
      />
      <p className="absolute left-[64px] top-[24px] font-sans font-bold text-[17px] text-[#222] leading-none">
        170,898원
      </p>
      <p className="absolute left-[64px] top-[48px] font-sans font-normal text-[13px] text-[#555] leading-none">
        이채윤의 통장
      </p>
      <div className="absolute left-[271px] top-[26px] w-[55.5px] h-[35px] bg-[#b3d3e3] rounded-full flex items-center justify-center">
        <span className="font-sans font-bold text-[13px] text-[#222]">이체</span>
      </div>
      <div className="absolute left-[17px] top-[83px] flex items-center justify-center border-[0.5px] border-[#a1bfce] rounded-[100px] px-[13px] py-[9.6px]">
        <span className="font-sans font-normal text-[11.9px] leading-[normal] text-[#222] whitespace-nowrap">
          세이프박스 56,000원
        </span>
      </div>
    </div>
  );
}
