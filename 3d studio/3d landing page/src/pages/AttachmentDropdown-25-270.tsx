import svgPaths from "./svg-08h0xo01tn";

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2fedb580} id="Vector" stroke="var(--stroke-0, #636E72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 18.3333V10" id="Vector_2" stroke="var(--stroke-0, #636E72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2eca8c80} id="Vector_3" stroke="var(--stroke-0, #636E72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.25 3.55832L13.75 7.84999" id="Vector_4" stroke="var(--stroke-0, #636E72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[109.775px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Bold',sans-serif] leading-[24px] left-0 not-italic text-[#2d3436] text-[16px] text-nowrap top-[-2.2px]">Attach Content</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[24px] relative shrink-0 w-[137.775px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon />
        <Text />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
            <path d={svgPaths.p48af40} id="Vector" stroke="var(--stroke-0, #636E72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
            <path d={svgPaths.p30908200} id="Vector" stroke="var(--stroke-0, #636E72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[4px] px-[4px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[48.8px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[0px_0px_0.8px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[0.8px] pt-0 px-[16px] relative size-full">
          <Container />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_14_10442)" id="Icon">
          <path d={svgPaths.p33837400} id="Vector" stroke="var(--stroke-0, #3498DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M12.0833 10.4167L13.75 8.75" id="Vector_2" stroke="var(--stroke-0, #3498DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M9.58333 7.91667L11.25 6.25" id="Vector_3" stroke="var(--stroke-0, #3498DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M7.08333 5.41667L8.75 3.75" id="Vector_4" stroke="var(--stroke-0, #3498DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M14.5833 12.9167L16.25 11.25" id="Vector_5" stroke="var(--stroke-0, #3498DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_14_10442">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[110.175px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#2d3436] text-[16px] text-nowrap top-[-2.2px]">{`Send Size Chart    >`}</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] pr-0 py-0 relative size-full">
          <Icon2 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1b43e7f0} id="Vector" stroke="var(--stroke-0, #FF6B00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 18.3333V10" id="Vector_2" stroke="var(--stroke-0, #FF6B00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2eca8c80} id="Vector_3" stroke="var(--stroke-0, #FF6B00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.25 3.55835L13.75 7.85002" id="Vector_4" stroke="var(--stroke-0, #FF6B00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[153.663px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#2d3436] text-[16px] text-nowrap top-[-2.2px]">{`Send Product Preview  >`}</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] pr-0 py-0 relative size-full">
          <Icon3 />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[104px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

export default function AttachmentDropdown() {
  return (
    <div className="bg-white relative rounded-[10px] size-full" data-name="AttachmentDropdown">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.8px] relative rounded-[inherit] size-full">
        <Container1 />
        <Container2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}