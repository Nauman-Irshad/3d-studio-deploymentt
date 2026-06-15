import svgPaths from "./svg-7ctgvhtgci";
import imgAccessoriesAvatar from "@/assets/de4cdb810f8c06f921a7df660cf29a0538105eff.png";
import imgAccessoriesAvatarProfilePic from "@/assets/486f08b5d6a8c011626e177fb9f203dc090b84ab.png";
import imgAccessoriesAvatarProfilePic1 from "@/assets/00a9c95c53a90d96d5c2df2d0191242a8c49c3fa.png";
import imgAccessoriesAvatarProfilePic2 from "@/assets/2f7cbcdf6728561b20531372d0c85dd96625a4ea.png";
import imgAccessoriesAvatarProfilePic3 from "@/assets/30b1612ca844d851f33dbc86e2e1b1a558d05f1f.png";
import { imgAccessoriesAvatarProfilePic4 } from "./svg-11lau";

function AccessoriesAvatar() {
  return (
    <div className="overflow-clip relative rounded-[99999px] shrink-0 size-[49px]" data-name="Accessories / Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAccessoriesAvatar} />
    </div>
  );
}

function AccessoriesList1stRow() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Accessories / List 1st row">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium inset-[0_72.82%_0_0] leading-[20px] text-[#080707] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        SmartfitaO
      </p>
    </div>
  );
}

function AccessoriesList2ndRow() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip right-[68px] top-[-1px]" data-name="Accessories / List 2nd row">
      <p className="absolute font-['Roboto:Regular',sans-serif] font-normal leading-[normal] left-0 text-[#080707] text-[14px] text-nowrap top-[calc(50%-8px)]" style={{ fontVariationSettings: "'wdth' 100" }}>
        The weather will be perfect for th...
      </p>
    </div>
  );
}

function AccessoriesTimestamp() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start right-0 top-1/2 translate-y-[-50%]" data-name="Accessories / Timestamp">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#080707] text-[14px] text-nowrap text-right" style={{ fontVariationSettings: "'wdth' 100" }}>
        9:41 AM
      </p>
    </div>
  );
}

function Component2ndRow() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="2nd row">
      <AccessoriesList2ndRow />
      <AccessoriesTimestamp />
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow h-[44px] items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text">
      <AccessoriesList1stRow />
      <Component2ndRow />
    </div>
  );
}

function Channel() {
  return (
    <div className="bg-[#dbdde1] relative shrink-0 w-full" data-name="Channel">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[11.5px] relative w-full">
          <AccessoriesAvatar />
          <Text />
        </div>
      </div>
    </div>
  );
}

function AccessoriesAvatarProfilePic() {
  return (
    <div className="absolute bottom-0 left-1/2 right-0 rounded-br-full rounded-tr-full top-0" data-name="Accessories / Avatar / Profile pic">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-br-full rounded-tr-full size-full" src={imgAccessoriesAvatarProfilePic} />
    </div>
  );
}

function AccessoriesAvatarProfilePic1() {
  return (
    <div className="absolute bottom-0 left-0 right-1/2 rounded-bl-full rounded-tl-full top-0" data-name="Accessories / Avatar / Profile pic">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-bl-full rounded-tl-full size-full" src={imgAccessoriesAvatar} />
    </div>
  );
}

function AccessoriesAvatar1() {
  return (
    <div className="overflow-clip relative rounded-[99999px] shrink-0 size-[49px]" data-name="Accessories / Avatar">
      <AccessoriesAvatarProfilePic />
      <AccessoriesAvatarProfilePic1 />
    </div>
  );
}

function AccessoriesList1stRow1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Accessories / List 1st row">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium inset-[0_52.96%_0_0] leading-[20px] text-[#080707] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Ali Tanveer (Tailor)
      </p>
    </div>
  );
}

function AccessoriesList2ndRow1() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip right-[49px] top-[-1px]" data-name="Accessories / List 2nd row">
      <p className="absolute font-['Roboto:Regular',sans-serif] font-normal leading-[normal] left-0 text-[#747881] text-[14px] text-nowrap top-[calc(50%-8px)]" style={{ fontVariationSettings: "'wdth' 100" }}>
        bhi mai pasy kam ker dydta hon
      </p>
    </div>
  );
}

function AccessoriesTimestamp1() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start right-0 top-1/2 translate-y-[-50%]" data-name="Accessories / Timestamp">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#747881] text-[14px] text-nowrap text-right" style={{ fontVariationSettings: "'wdth' 100" }}>
        9:16 AM
      </p>
    </div>
  );
}

function AccessoriesNotificationBadge() {
  return (
    <div className="bg-[#ff3742] content-stretch flex flex-col items-start p-[7.5px] relative rounded-[999px] shrink-0" data-name="Accessories / Notification badge">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[7px] relative shrink-0 text-[12px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        80
      </p>
    </div>
  );
}

function Component1stRowRightAccessories() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-start justify-end right-[-1px] top-[calc(50%-27px)] translate-y-[-50%]" data-name="1st row Right accessories">
      <AccessoriesNotificationBadge />
    </div>
  );
}

function BadgeContainer() {
  return (
    <div className="absolute bottom-0 right-px top-0 w-0" data-name="Badge container">
      <Component1stRowRightAccessories />
    </div>
  );
}

function Component2ndRow1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="2nd row">
      <AccessoriesList2ndRow1 />
      <AccessoriesTimestamp1 />
      <BadgeContainer />
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow h-[44px] items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text">
      <AccessoriesList1stRow1 />
      <Component2ndRow1 />
    </div>
  );
}

function Channel1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Channel">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[11.5px] relative w-full">
          <AccessoriesAvatar1 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function AccessoriesAvatarProfilePic2() {
  return (
    <div className="absolute bottom-0 left-1/2 right-0 rounded-br-full top-1/2" data-name="Accessories / Avatar / Profile pic">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-br-full size-full" src={imgAccessoriesAvatarProfilePic1} />
    </div>
  );
}

function AccessoriesAvatarProfilePic3() {
  return (
    <div className="absolute bottom-1/2 left-1/2 right-0 rounded-tr-full top-0" data-name="Accessories / Avatar / Profile pic">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tr-full size-full" src={imgAccessoriesAvatarProfilePic2} />
    </div>
  );
}

function AccessoriesAvatarProfilePic4() {
  return (
    <div className="absolute bottom-0 left-0 right-1/2 rounded-bl-full rounded-tl-full top-0" data-name="Accessories / Avatar / Profile pic">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-bl-full rounded-tl-full size-full" src={imgAccessoriesAvatarProfilePic3} />
    </div>
  );
}

function AccessoriesAvatar2() {
  return (
    <div className="overflow-clip relative rounded-[99999px] shrink-0 size-[49px]" data-name="Accessories / Avatar">
      <AccessoriesAvatarProfilePic2 />
      <AccessoriesAvatarProfilePic3 />
      <AccessoriesAvatarProfilePic4 />
    </div>
  );
}

function AccessoriesList1stRow2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Accessories / List 1st row">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium inset-[0_48.78%_0_0] leading-[20px] text-[#747881] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Usman Khan (Seller)
      </p>
    </div>
  );
}

function AccessoriesList2ndRow2() {
  return (
    <div className="absolute h-[18px] left-0 overflow-clip right-[49px] top-[-1px]" data-name="Accessories / List 2nd row">
      <p className="absolute font-['Roboto:Regular',sans-serif] font-normal leading-[normal] left-0 text-[#747881] text-[14px] text-nowrap top-[calc(50%-8px)]" style={{ fontVariationSettings: "'wdth' 100" }}>
        You: Store is out of stock
      </p>
    </div>
  );
}

function AccessoriesTimestamp2() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start right-0 top-1/2 translate-y-[-50%]" data-name="Accessories / Timestamp">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#747881] text-[14px] text-nowrap text-right" style={{ fontVariationSettings: "'wdth' 100" }}>
        Yesterday
      </p>
    </div>
  );
}

function Component24Mute() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="24 / mute">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_14_6391)" id="24 / mute">
          <g id="Vector"></g>
          <path d={svgPaths.pd70eb00} fill="var(--fill-0, #747881)" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_14_6391">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Component1stRowRightAccessories1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-start justify-end right-[-1px] top-[calc(50%-27px)] translate-y-[-50%]" data-name="1st row Right accessories">
      <Component24Mute />
    </div>
  );
}

function BadgeContainer1() {
  return (
    <div className="absolute bottom-0 right-px top-0 w-0" data-name="Badge container">
      <Component1stRowRightAccessories1 />
    </div>
  );
}

function Component2ndRow2() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="2nd row">
      <AccessoriesList2ndRow2 />
      <AccessoriesTimestamp2 />
      <BadgeContainer1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow h-[44px] items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text">
      <AccessoriesList1stRow2 />
      <Component2ndRow2 />
    </div>
  );
}

function Channel2() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Channel">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[11.5px] relative w-full">
          <AccessoriesAvatar2 />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Channels() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-1/2 top-[60px] translate-x-[-50%] w-[360px]" data-name="Channels">
      <Channel />
      <Channel1 />
      <Channel2 />
    </div>
  );
}

function Pointing() {
  return (
    <div className="absolute contents left-[0.39px] top-[0.41px]" data-name="pointing">
      <div className="absolute h-[15.268px] left-[0.39px] top-[0.41px] w-[14.308px]" data-name="Fill 1">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.3083 15.2681">
          <path clipRule="evenodd" d={svgPaths.p428eb00} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 1" />
        </svg>
      </div>
      <div className="absolute h-[15.268px] left-[0.39px] top-[0.41px] w-[14.308px]" data-name="Stroke 3">
        <div className="absolute inset-[-2.46%_-2.62%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0582 16.0181">
            <path clipRule="evenodd" d={svgPaths.p1538c080} fillRule="evenodd" id="Stroke 3" stroke="var(--stroke-0, #080707)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[3.459px] left-[11.52px] top-[9.2px] w-px" data-name="Stroke 5">
        <div className="absolute inset-[-10.84%_62.5%_-10.84%_-37.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 4.209">
            <path d="M0.375 3.834V0.375" id="Stroke 5" stroke="var(--stroke-0, #080707)" strokeLinecap="round" strokeWidth="0.75" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[3.473px] left-[9.49px] top-[9.2px] w-px" data-name="Stroke 7">
        <div className="absolute inset-[-10.8%_60.9%_-10.8%_-37.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.766 4.223">
            <path d="M0.391 3.848L0.375 0.375" id="Stroke 7" stroke="var(--stroke-0, #080707)" strokeLinecap="round" strokeWidth="0.75" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[3.426px] left-[7.51px] top-[9.23px] w-px" data-name="Stroke 9">
        <div className="absolute inset-[-10.95%_60.4%_-10.95%_-37.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.771 4.176">
            <path d="M0.375 0.375L0.396 3.801" id="Stroke 9" stroke="var(--stroke-0, #080707)" strokeLinecap="round" strokeWidth="0.75" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HandPointing() {
  return (
    <div className="absolute inset-0 shadow-[0px_1px_2.6px_0px_rgba(0,0,0,0.32)]" data-name="hand (pointing)">
      <Pointing />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute h-[17px] left-0 top-[3px] w-[16px]" data-name="Icon">
      <HandPointing />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute inset-[-17.65%_0_-23.53%_0]">
      <div className="absolute left-0 size-[7px] top-0">
        <div className="absolute inset-[-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <circle cx="4" cy="4" fill="var(--fill-0, white)" id="Ellipse 49" r="3.5" stroke="var(--stroke-0, #747881)" strokeDasharray="2 1" />
          </svg>
        </div>
      </div>
      <Icon />
    </div>
  );
}

function HandPointing1() {
  return (
    <div className="absolute h-[17px] left-[200px] top-[522px] w-[16px]" data-name="Hand (pointing)">
      <Frame1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute left-[15px] size-[24px] top-[22px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d="M9 14L4 9L9 4" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p330fbc80} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Component24Search() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="24 / search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="24 / search">
          <path d={svgPaths.p17b62070} fill="var(--fill-0, #747881)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function TextCursor() {
  return (
    <div className="content-stretch flex items-end relative shrink-0" data-name="Text+Cursor">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#747881] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Search
      </p>
    </div>
  );
}

function AccessoriesTextContainer() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start justify-end min-h-px min-w-px relative shrink-0" data-name="Accessories / Text container">
      <TextCursor />
    </div>
  );
}

function MessageInput() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[8px] items-center left-[61px] pl-[16px] pr-[8px] py-[8px] right-[16px] rounded-[20px] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Message Input">
      <div aria-hidden="true" className="absolute border border-[#dbdde1] border-solid inset-[-1px] pointer-events-none rounded-[21px]" />
      <Component24Search />
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <AccessoriesTextContainer />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white h-[55px] left-[calc(50%+10.5px)] top-[3px] translate-x-[-50%] w-[291px]" data-name="Header">
      <MessageInput />
    </div>
  );
}

function ChannelList() {
  return (
    <div className="bg-white h-full relative shrink-0 w-[360px]" data-name="Channel list">
      <div aria-hidden="true" className="absolute border-[#dbdde1] border-[0px_1px_0px_0px] border-solid inset-[0_-1px_0_0] pointer-events-none" />
      <Header />
      <Channels />
      <HandPointing1 />
      <Frame />
    </div>
  );
}

function Frame2() {
  return <div className="absolute h-[83px] left-[226px] top-[76px] w-[321px]" />;
}

function Frame3() {
  return (
    <div className="absolute bg-[#eee] h-[75px] left-[152px] overflow-clip rounded-[10px] top-[75px] w-[352px]">
      <p className="absolute font-['Roboto:Regular',sans-serif] font-normal h-[37px] leading-[normal] left-[13px] text-[#747881] text-[14px] top-[22px] w-[333px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Messages are gnerated by Smartao AI. Some may be inaccurate.  Click to learn more`}</p>
    </div>
  );
}

function AccessoriesAvatarProfilePic5() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[40px_40px]" data-name="Accessories / Avatar / Profile pic" style={{ maskImage: `url('${imgAccessoriesAvatarProfilePic4}')` }}>
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAccessoriesAvatar} />
    </div>
  );
}

function AvatarMask() {
  return (
    <div className="absolute contents inset-0" data-name="Avatar mask">
      <AccessoriesAvatarProfilePic5 />
    </div>
  );
}

function AccessoriesAvatar3() {
  return (
    <div className="absolute left-[8px] size-[40px] top-1/2 translate-y-[-50%]" data-name="Accessories / Avatar">
      <AvatarMask />
      <div className="absolute inset-[1.79%_1.79%_76.79%_76.79%]" data-name="Online">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.57143 8.57143">
          <path d={svgPaths.p1631a80} fill="var(--fill-0, #20E070)" id="Online" />
        </svg>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="absolute bg-white h-[60px] left-px right-0 top-0" data-name="Header">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[20px] left-[66px] right-[18px] text-[#080707] text-[16px] top-[calc(50%-21px)]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Bill Kuphal
      </p>
      <p className="absolute font-['Roboto:Regular',sans-serif] font-normal leading-[normal] left-[66px] right-[18px] text-[#747881] text-[14px] top-[calc(50%+5px)]" style={{ fontVariationSettings: "'wdth' 100" }}>
        &nbsp;
      </p>
      <AccessoriesAvatar3 />
    </div>
  );
}

function Component24Attach() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="24 / attach">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g clipPath="url(#clip0_14_6321)" id="24 / attach">
          <path d={svgPaths.p1cfbfb00} fill="var(--fill-0, #747881)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_14_6321">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LeftButtons() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center px-0 py-[4px] relative shrink-0" data-name="Left buttons">
      <Component24Attach />
    </div>
  );
}

function TextCursor1() {
  return (
    <div className="content-stretch flex items-end relative shrink-0" data-name="Text+Cursor">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#747881] text-[16px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Type your message
      </p>
    </div>
  );
}

function AccessoriesTextContainer1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start justify-end min-h-px min-w-px relative shrink-0" data-name="Accessories / Text container">
      <TextCursor1 />
    </div>
  );
}

function IconLightningCommandRunner() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon_lightning-command runner">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon_lightning-command runner">
          <path d={svgPaths.p80aaf80} fill="var(--fill-0, #747881)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MessageInput1() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative rounded-[20px] shrink-0" data-name="Message Input">
      <div aria-hidden="true" className="absolute border border-[#dbdde1] border-solid inset-[-1px] pointer-events-none rounded-[21px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[16px] pr-[4px] py-[4px] relative size-full">
          <AccessoriesTextContainer1 />
          <IconLightningCommandRunner />
        </div>
      </div>
    </div>
  );
}

function Component24SendWeb() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="24 / Send_Web">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="24 / Send_Web">
          <path d={svgPaths.p22280b00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function AccessoriesSendButton() {
  return (
    <div className="bg-[#b4b7bb] content-stretch flex items-center justify-center p-[8px] relative rounded-[999px] shrink-0" data-name="Accessories / Send Button">
      <Component24SendWeb />
    </div>
  );
}

function RightButton() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Right button">
      <AccessoriesSendButton />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Container">
      <LeftButtons />
      <div className="basis-0 flex flex-row grow items-end self-stretch shrink-0">
        <MessageInput1 />
      </div>
      <RightButton />
    </div>
  );
}

function MessageComposer() {
  return (
    <div className="absolute bg-white bottom-0 content-stretch flex flex-col items-start left-px p-[8px] right-0" data-name="Message Composer">
      <Container />
    </div>
  );
}

function Component24Down() {
  return (
    <div className="absolute left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="24 / down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="24 / down">
          <path d={svgPaths.pd3be1d2} fill="var(--fill-0, #005FFF)" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function ScrollDown() {
  return (
    <div className="absolute bg-white bottom-[64px] right-[8px] rounded-[20px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] size-[40px]" data-name="Scroll down">
      <Component24Down />
    </div>
  );
}

function MessageListContainer() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Message list container">
      <Header1 />
      <MessageComposer />
      <ScrollDown />
      <Frame2 />
      <Frame3 />
      <div className="absolute bottom-1/2 left-[40.21%] right-[45.48%] top-[39.44%]" data-name="Path (Stroke)">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 95 95">
          <path d={svgPaths.p17c31400} fill="var(--fill-0, #B4B7BB)" id="Path (Stroke)" />
        </svg>
      </div>
      <p className="absolute bottom-[43.44%] font-['Roboto:Medium',sans-serif] font-medium leading-[24px] left-[calc(50%-9px)] text-[#747881] text-[20px] text-center top-[53.89%] translate-x-[-50%] w-[632px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        No chats here yet…
      </p>
    </div>
  );
}

function AppContainer() {
  return (
    <div className="basis-0 bg-white content-stretch flex grow items-center justify-center min-h-px min-w-px overflow-clip relative shrink-0 w-[1024px]" data-name="App Container">
      <ChannelList />
      <MessageListContainer />
    </div>
  );
}

export default function ChannelListDmDropdown() {
  return (
    <div className="bg-[#e0f0ff] content-stretch flex flex-col items-start overflow-clip relative rounded-[16px] size-full" data-name="Channel List - DM dropdown">
      <AppContainer />
    </div>
  );
}