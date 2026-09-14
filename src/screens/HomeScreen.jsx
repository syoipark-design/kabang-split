import { useState, useEffect } from 'react';
import AccountCard from '../components/AccountCard';
import AccountList from '../components/AccountList';
import AiNudgeCard from '../components/AiNudgeCard';
import topNoticeIcon from '../assets/top-notice-icon.svg';
import topBell from '../assets/top-bell.svg';
import bottomTabBar from '../assets/bottom-tab-bar.png';
import bottomAiCircle from '../assets/bottom-ai-circle.svg';
import bottomAiIcon from '../assets/bottom-ai-icon.png';
import StatusBar from '../components/StatusBar';

export default function HomeScreen() {
  const [nudgeShow, setNudgeShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setNudgeShow(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="relative w-[375px] h-[812px] bg-white overflow-hidden flex-shrink-0">

      {/* ① 상태바 */}
      <StatusBar />

      {/* ② 스크롤 콘텐츠 (72px~bottom 77px) — 배너·카드 모두 스크롤됨 */}
      <div
        className="absolute left-0 w-full overflow-y-hidden"
        style={{ top: '72px', bottom: '77px' }}
      >
        {/* 배너 영역 (높이 52px = 124-72): 배너/벨이 카드 위에서 스크롤되어 사라짐 */}
        <div className="relative h-[52px]">
          {/* 알림 배너: 원본 top=72px frame → scroll-content top=0px */}
          <div
            className="absolute left-[15px] top-0 bg-[#feffff] flex gap-[8px] items-center px-[13px] py-[10px] rounded-[27px]"
            style={{ filter: 'drop-shadow(0px 0px 6.25px rgba(199,201,205,0.42))' }}
          >
            <img src={topNoticeIcon} alt="" className="size-[14px] shrink-0" />
            <span className="font-sans font-semibold text-[13px] leading-[normal] text-[#222] whitespace-nowrap">
              추석 민생지원금, 나도 해당될까요?
            </span>
          </div>
          {/* 벨 아이콘: 원본 top=81px frame → scroll-content top=9px */}
          <div className="absolute w-[15px] h-[19px]" style={{ left: '332px', top: '9px' }}>
            <div className="absolute" style={{ inset: '-4.53% -5.73% 0 -5.73%' }}>
              <img src={topBell} alt="" className="block max-w-none size-full" />
            </div>
          </div>
        </div>

        {/* 카드 영역 */}
        <div className="px-[15px] pb-[28px] flex flex-col">
          <AccountCard />

          {/* 8px 고정 갭 (AccountCard 아래) */}
          <div className="h-[8px] shrink-0" />

          {/* AI 넛지 카드 — max-height으로 정확한 픽셀 보간 (fr 단위 버그 회피)
              212px = 카드 204px + 하단 갭 8px */}
          <div
            style={{
              maxHeight: nudgeShow ? '212px' : '0px',
              overflow: 'hidden',
              transition: nudgeShow
                ? 'max-height 0.7s cubic-bezier(0.16,1,0.3,1)'
                : 'max-height 0.4s cubic-bezier(0.4,0,1,1) 0.1s',
            }}
          >
            <div style={{ paddingBottom: '8px' }}>
              <AiNudgeCard
                visible={nudgeShow}
                onClose={() => setNudgeShow(false)}
              />
            </div>
          </div>

          <AccountList />
        </div>
      </div>

      {/* ③ 하단 탭바 — 컨테이너 기준 absolute bottom, 고정 유지 */}

      {/* 메인 탭바 네비 pill: left=20.24, bottom=20.01, 269.714×57.183 */}
      <div
        className="absolute overflow-hidden rounded-[29.545px]"
        style={{
          left: '20.24px',
          bottom: '20.01px',
          width: '269.714px',
          height: '57.183px',
          boxShadow: '0px 0px 46.318px 1.906px rgba(205,205,205,0.65)',
        }}
      >
        <img
          src={bottomTabBar}
          alt=""
          style={{
            position: 'absolute',
            height: '1424.06%',
            left: '-7.42%',
            top: '-1288.69%',
            width: '138.87%',
            maxWidth: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* AI 플로팅 버튼 배경 pill: left=297, bottom=19.82, 56.23×57.183 */}
      <div
        className="absolute overflow-hidden rounded-[29.545px]"
        style={{
          left: '297px',
          bottom: '19.82px',
          width: '56.23px',
          height: '57.183px',
          boxShadow: '0px 0px 46.318px 1.906px rgba(205,205,205,0.65)',
        }}
      >
        <img
          src={bottomTabBar}
          alt=""
          style={{
            position: 'absolute',
            height: '1424.06%',
            left: '-531.08%',
            top: '-1288.69%',
            width: '666.1%',
            maxWidth: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* AI 버튼 원형: left=311, bottom=35(=812-750-27) */}
      <div className="absolute left-[311px] size-[27px]" style={{ bottom: '35px' }}>
        <img src={bottomAiCircle} alt="" className="absolute inset-0 size-full" />
      </div>

      {/* AI 버튼 아이콘: center at calc(50%+137px), bottom=37(=812-752-23) */}
      <div
        className="absolute size-[23px]"
        style={{ left: 'calc(50% + 137px)', transform: 'translateX(-50%)', bottom: '37px' }}
      >
        <img src={bottomAiIcon} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
      </div>

    </div>
  );
}
