import React from "react";
import svgPaths from "./svg-roya8f8wfz";
import imgLogo from "@/assets/4e4c69b485dd9b664de85d746a262f9fc0b006fe.png";
import imgImage8 from "@/assets/9379c06f16c5511d543d7bcb80e801f62f63f60c.png";
import imgImage9 from "@/assets/b1d585020c2611905370f18d1e21dfb489aea53f.png";
import imgImage10 from "@/assets/f04a017db094f9a20c2328f54a31b153619784f3.png";
import imgImage11 from "@/assets/b7259db4474aade3a2e4e513f69fbc95eac4b170.png";
import imgImage12 from "@/assets/66e43d2485faec1c82f588b854a2963f3004a73c.png";
import { useCart } from "../components/CartContext";
import type { CartItem } from "../components/CartContext";
import { ModelViewer } from "../components/ModelViewer";
import { createOrderFirestore } from "../firestoreService";

function CartItemRow({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
}) {
  const is3D = typeof item.image === "string" && (item.image.endsWith(".gltf") || item.image.endsWith(".glb"));
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <div className="bg-[#f0eeed] overflow-clip relative rounded-[8.658px] shrink-0 size-[124px] min-w-[124px]">
        {is3D ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden min-h-0">
            <ModelViewer modelPath={item.image} className="min-h-0" />
          </div>
        ) : (
          <img
            alt={item.name}
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={item.image}
          />
        )}
      </div>
      <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0">
        <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black">
            <p className="leading-[normal]">{item.name}</p>
          </div>
          <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-start leading-[normal] not-italic relative shrink-0 text-[14px] text-black">
            <p className="relative shrink-0">
              <span>Size: </span>
              <span className="text-[rgba(0,0,0,0.6)]">{item.size}</span>
            </p>
            {item.color != null && item.color !== "" && (
              <p className="relative shrink-0">Color: {item.color}</p>
            )}
          </div>
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black">
            <p className="leading-[normal]">Rs {(item.price * item.quantity).toLocaleString()}</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col h-[124px] items-end justify-between relative shrink-0 w-[225px]">
          <button type="button" onClick={onRemove} className="relative shrink-0 size-[24px] cursor-pointer border-0 bg-transparent p-0">
            <svg className="block size-full" fill="none" viewBox="0 0 24 24">
              <path d={svgPaths.p36c10400} fill="#FF3333" />
            </svg>
          </button>
          <div className="bg-[#f0f0f0] content-stretch flex gap-[20px] items-center justify-center overflow-clip px-[20px] py-[12px] relative rounded-[62px] shrink-0">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              className="relative shrink-0 size-[20px] cursor-pointer border-0 bg-transparent p-0 flex items-center justify-center"
            >
              <svg className="block size-full" fill="none" viewBox="0 0 20 20">
                <path d={svgPaths.pdeced80} fill="black" />
              </svg>
            </button>
            <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
              {item.quantity}
            </p>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="relative shrink-0 size-[20px] cursor-pointer border-0 bg-transparent p-0 flex items-center justify-center"
            >
              <svg className="block size-full" fill="none" viewBox="0 0 20 20">
                <path d={svgPaths.p3a904d00} fill="black" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Company() {
  return (
    <div className="content-stretch flex gap-[8.431px] h-[42.156px] items-center relative shrink-0 w-[176px]" data-name="Company">
      <div className="relative shrink-0 size-[42.156px]" data-name="Logo">
        <img alt="Logomark" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLogo} />
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b4f3f] text-[25.293px] text-nowrap tracking-[-0.5059px]">
        <p className="leading-[1.45]">Smartfitao</p>
      </div>
    </div>
  );
}

function PrimaryButton() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Primary button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-nowrap tracking-[-0.09px]">
        <p className="leading-[1.45]">Home</p>
      </div>
    </div>
  );
}

function PrimaryButton1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Primary button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center text-nowrap tracking-[-0.09px]">
        <p className="leading-[1.45]">Products</p>
      </div>
    </div>
  );
}

function PrimaryButton2() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Primary button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center text-nowrap tracking-[-0.09px]">
        <p className="leading-[1.45]">{`Tailor `}</p>
      </div>
    </div>
  );
}

function PrimaryButton3() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Primary button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center text-nowrap tracking-[-0.09px]">
        <p className="leading-[1.45]">How It Works</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <PrimaryButton />
      <PrimaryButton1 />
      <PrimaryButton2 />
      <PrimaryButton3 />
    </div>
  );
}

function Buttons() {
  return (
    <nav className="content-center flex flex-wrap gap-[24px] items-center justify-center p-0 relative shrink-0" data-name="Buttons">
      <Frame1 />
    </nav>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p261dfb00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M7 11H17" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M7 15H13" id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M7 7H15" id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p27acb400} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p28c65188} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p33c1b680} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pd438b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2fb16300} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame />
      <Frame2 />
      <Frame4 />
    </div>
  );
}

function Header() {
  return (
    <header className="absolute content-stretch flex items-center justify-between left-[-22px] pl-[64px] pr-[42px] py-[24px] top-[15px] w-[1450px]" data-name="Header 2">
      <Company />
      <Buttons />
      <Frame61 />
    </header>
  );
}

function Frame5() {
  return (
    <div className="relative size-[16px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p31365e00} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.6)] text-nowrap">Home</p>
      <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[63px] top-[159px]">
      <Frame7 />
      <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap">Cart</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-[#f0eeed] overflow-clip relative rounded-[8.658px] shrink-0 size-[124px]">
      <div className="absolute h-[187px] left-[-1px] top-[-30.5px] w-[125px]" data-name="image 8">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage8} />
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black text-nowrap">
        <p className="leading-[normal]">CHAIRMAN- Luxury Cotton Latha</p>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-start leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
      <p className="relative shrink-0">
        <span>{`Size: `}</span>
        <span className="text-[rgba(0,0,0,0.6)]">Medium</span>
      </p>
      <p className="relative shrink-0">Color: Biscuti</p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame31 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <Frame32 />
      <Frame42 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black text-nowrap">
        <p className="leading-[normal]">Rs 2,500</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p36c10400} fill="var(--fill-0, #FF3333)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.pdeced80} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p3a904d00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex gap-[20px] items-center justify-center overflow-clip px-[20px] py-[12px] relative rounded-[62px] shrink-0">
      <Frame8 />
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap">1</p>
      <Frame10 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col h-[124px] items-end justify-between relative shrink-0 w-[225px]">
      <Frame6 />
      <Frame17 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0">
      <Frame30 />
      <Frame34 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Frame25 />
      <Frame33 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-[#f0eeed] overflow-clip relative rounded-[8.658px] shrink-0 size-[124px]">
      <div className="absolute h-[187px] left-[-1px] top-[-30.5px] w-[125px]" data-name="image 8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-[-25.6%] max-w-none top-[22.48%] w-[149.6%]" src={imgImage9} />
        </div>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-start leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
      <p className="relative shrink-0">Order name: CHAIRMAN- Luxury Cotton Latha</p>
      <p className="relative shrink-0">Order ID: 1233123</p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black text-nowrap">
        <p className="leading-[normal]">Ahmed Stich house</p>
      </div>
      <Frame43 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col h-[118px] items-start justify-between relative shrink-0">
      <Frame44 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black text-nowrap">
        <p className="leading-[normal]">Rs 1,000</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p36c10400} fill="var(--fill-0, #FF3333)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col h-[124px] items-end justify-between relative shrink-0 w-[225px]">
      <Frame11 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0">
      <Frame45 />
      <Frame46 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex gap-[16px] h-[124px] items-center relative shrink-0 w-[667px]">
      <Frame26 />
      <Frame47 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[#f0eeed] overflow-clip relative rounded-[8.658px] shrink-0 size-[124px]">
      <div className="absolute h-[187px] left-[-1px] top-[-30.5px] w-[125px]" data-name="image 8">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgImage10} />
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[100.27%] left-[-0.26%] max-w-none top-[15.13%] w-full" src={imgImage11} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
      <p className="leading-[normal] relative shrink-0">
        <span>{`Size: `}</span>
        <span className="font-['Inter:Regular',sans-serif] not-italic text-[rgba(0,0,0,0.6)]">Medium</span>
      </p>
      <p className="leading-[normal] relative shrink-0">
        <span>{`Color: `}</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal not-italic text-[rgba(0,0,0,0.6)]">Red</span>
      </p>
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black text-nowrap">
        <p className="leading-[normal]">Red Shalwar kameez</p>
      </div>
      <Frame49 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex flex-col h-[118px] items-start justify-between relative shrink-0">
      <Frame50 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black text-nowrap">
        <p className="leading-[normal]">Rs 1,800</p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p36c10400} fill="var(--fill-0, #FF3333)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.pdeced80} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p3a904d00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex gap-[20px] items-center justify-center overflow-clip px-[20px] py-[12px] relative rounded-[62px] shrink-0">
      <Frame13 />
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap">1</p>
      <Frame15 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-col h-[124px] items-end justify-between relative shrink-0 w-[225px]">
      <Frame12 />
      <Frame18 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0">
      <Frame51 />
      <Frame52 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Frame27 />
      <Frame53 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-[#f0eeed] overflow-clip relative rounded-[8.658px] shrink-0 size-[124px]">
      <div className="absolute h-[153px] left-[11px] top-[calc(50%+0.5px)] translate-y-[-50%] w-[102px]" data-name="image 9">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage12} />
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-start leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
      <p className="font-['Satoshi:Regular',sans-serif] relative shrink-0">
        <span>{`Size: `}</span>
        <span className="text-[rgba(0,0,0,0.6)]">Large</span>
      </p>
      <p className="relative shrink-0">Color: Black</p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Bold','Noto_Sans:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black text-nowrap">
        <p className="leading-[normal]">{` Coal Black Schiffli Kurta Pajama`}</p>
      </div>
      <Frame55 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-col h-[118px] items-start justify-between relative shrink-0">
      <Frame56 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black text-nowrap">
        <p className="leading-[normal]">Rs 2,800</p>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p36c10400} fill="var(--fill-0, #FF3333)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.pdeced80} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p3a904d00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex gap-[20px] items-center justify-center overflow-clip px-[20px] py-[12px] relative rounded-[62px] shrink-0">
      <Frame19 />
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap">1</p>
      <Frame20 />
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-col h-[124px] items-end justify-between relative shrink-0 w-[225px]">
      <Frame16 />
      <Frame21 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0">
      <Frame57 />
      <Frame58 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Frame28 />
      <Frame59 />
    </div>
  );
}

function Frame23({
  cartItems,
  removeFromCart,
  updateQuantity,
}: {
  cartItems: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}) {
  return (
    <div className="absolute left-[42px] rounded-[20px] top-[270px] w-[715px]">
      <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip px-[24px] py-[20px] relative rounded-[inherit] w-full">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 w-full text-[rgba(0,0,0,0.6)] font-['Inter:Regular',sans-serif] text-[18px]">
            <p className="leading-[normal]">Your cart is empty</p>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <CartItemRow
                item={item}
                onRemove={() => removeFromCart(item.id)}
                onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
              />
              {index < cartItems.length - 1 && (
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 667 1">
                      <line id="Line 5" stroke="var(--stroke-0, black)" strokeOpacity="0.1" x2="667" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Frame35({ amount }: { amount: number }) {
  return (
    <div className="content-stretch flex items-center justify-between leading-[0] not-italic relative shrink-0 text-[20px] text-nowrap w-full">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[rgba(0,0,0,0.6)]">
        <p className="leading-[normal] text-nowrap">Subtotal</p>
      </div>
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center relative shrink-0 text-black text-right">
        <p className="leading-[normal] text-nowrap">Rs {amount.toLocaleString()}</p>
      </div>
    </div>
  );
}

function Frame37({ amount }: { amount: number }) {
  return (
    <div className="content-stretch flex items-center justify-between leading-[0] not-italic relative shrink-0 text-[20px] text-nowrap w-full">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[rgba(0,0,0,0.6)]">
        <p className="leading-[normal] text-nowrap">Delivery Fee</p>
      </div>
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center relative shrink-0 text-black text-right">
        <p className="leading-[normal] text-nowrap">Rs {amount.toLocaleString()}</p>
      </div>
    </div>
  );
}

function Frame38({ amount }: { amount: number }) {
  return (
    <div className="content-stretch flex items-center justify-between leading-[0] relative shrink-0 text-black text-nowrap w-full">
      <div className="flex flex-col font-['Satoshi:Regular',sans-serif] justify-center not-italic relative shrink-0 text-[20px]">
        <p className="leading-[normal] text-nowrap">Total</p>
      </div>
      <div className="flex flex-col font-['Roboto_Slab:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[24px] text-right">
        <p className="leading-[normal] text-nowrap">Rs {amount.toLocaleString()}</p>
      </div>
    </div>
  );
}

function Frame41({ subtotal, deliveryFee, total }: { subtotal: number; deliveryFee: number; total: number }) {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame35 amount={subtotal} />
      <Frame37 amount={deliveryFee} />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 457 1">
            <line id="Line 6" stroke="var(--stroke-0, black)" strokeOpacity="0.1" x2="457" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame38 amount={total} />
    </div>
  );
}

function Frame22() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p22141602} fill="var(--fill-0, black)" fillOpacity="0.4" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="basis-0 bg-[#f0f0f0] grow min-h-px min-w-px relative rounded-[62px] shrink-0">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-start px-[16px] py-[12px] relative w-full">
          <Frame22 />
          <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.4)] text-nowrap">Add promo code</p>
        </div>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="bg-[#494949] content-stretch flex h-full items-center justify-center overflow-clip px-[16px] py-[12px] relative rounded-[62px] shrink-0 w-[119px]">
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Apply</p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 w-full">
      <Frame3 />
      <div className="flex flex-row items-center self-stretch">
        <Frame39 />
      </div>
    </div>
  );
}

function ArrowDownBold() {
  return (
    <div className="relative size-[24px]" data-name="arrow-down-bold 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow-down-bold 1">
          <path d={svgPaths.p4601600} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame14({ onCheckout }: { onCheckout?: () => void }) {
  return (
    <button
      type="button"
      onClick={onCheckout}
      className="bg-[#171717] h-[60px] relative rounded-[62px] shrink-0 w-full cursor-pointer border-0"
    >
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-center px-[54px] py-[16px] relative size-full">
          <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Go to Checkout</p>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
            <div className="flex-none rotate-[270deg]">
              <ArrowDownBold />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function Frame24({
  subtotal,
  deliveryFee,
  total,
  onCheckout,
}: {
  subtotal: number;
  deliveryFee: number;
  total: number;
  onCheckout?: () => void;
}) {
  return (
    <div className="absolute h-[458px] left-[calc(58.33%+39px)] rounded-[20px] top-[283px] w-[505px]">
      <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip px-[24px] py-[20px] relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black text-nowrap">
          <p className="leading-[normal]">Order Summary</p>
        </div>
        <Frame41 subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
        <Frame14 onCheckout={onCheckout} />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[36px] left-[52px] top-[2px] w-[115.177px]" data-name="Text">
      <p className="absolute font-['Arial:Bold',sans-serif] leading-[36px] left-0 not-italic text-[#2d5f3f] text-[24px] text-nowrap top-[-2px]">Smartfitao</p>
    </div>
  );
}

function ImageSmartfitaoLogo() {
  return (
    <div className="absolute left-0 size-[40px] top-0" data-name="Image (Smartfitao Logo)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLogo} />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[496px]" data-name="Container">
      <Text />
      <ImageSmartfitaoLogo />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[78px] left-0 top-[56px] w-[448px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[26px] left-0 not-italic text-[#5a6c57] text-[16px] top-[-2px] w-[392px]">Smartfitao — Digital Tailoring for Modern Traditions. Experience authentic craftsmanship meets cutting-edge technology.</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_6_7017)" id="Icon">
          <path d={svgPaths.p4b98700} id="Vector" stroke="var(--stroke-0, #2D5F3F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3162b40} id="Vector_2" stroke="var(--stroke-0, #2D5F3F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M14.5833 5.41667H14.5917" id="Vector_3" stroke="var(--stroke-0, #2D5F3F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_6_7017">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Link() {
  return (
    <div className="bg-white relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 size-[40px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p30c8d680} id="Vector" stroke="var(--stroke-0, #2D5F3F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Link1() {
  return (
    <div className="bg-white relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 size-[40px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_6_7011)" id="Icon">
          <path d={svgPaths.pbd44000} id="Vector" stroke="var(--stroke-0, #2D5F3F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_6_7011">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Link2() {
  return (
    <div className="bg-white relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 size-[40px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-start left-0 top-[158px] w-[496px]" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[210.5px] left-0 top-0 w-[496px]" data-name="Container">
      <Container />
      <Paragraph />
      <Container1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#2d5f3f] text-[16px] text-nowrap top-[-1.67px]">Quick Links</p>
    </div>
  );
}

function Link3() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[2.67px] w-[40.208px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[22.5px] not-italic relative shrink-0 text-[#5a6c57] text-[15px] text-nowrap">Home</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="List Item">
      <Link3 />
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[2.67px] w-[81.563px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[22.5px] not-italic relative shrink-0 text-[#5a6c57] text-[15px] text-nowrap">Marketplace</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="List Item">
      <Link4 />
    </div>
  );
}

function Link5() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[2.67px] w-[41.448px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[22.5px] not-italic relative shrink-0 text-[#5a6c57] text-[15px] text-nowrap">Tailors</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="List Item">
      <Link5 />
    </div>
  );
}

function Link6() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[2.67px] w-[40.865px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[22.5px] not-italic relative shrink-0 text-[#5a6c57] text-[15px] text-nowrap">About</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="List Item">
      <Link6 />
    </div>
  );
}

function Link7() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[2.67px] w-[51.292px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[22.5px] not-italic relative shrink-0 text-[#5a6c57] text-[15px] text-nowrap">Contact</p>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="List Item">
      <Link7 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[170.5px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
      <ListItem4 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[210.5px] items-start left-[544px] top-0 w-[224px]" data-name="Container">
      <Heading />
      <List />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#2d5f3f] text-[16px] text-nowrap top-[-1.67px]">Account</p>
    </div>
  );
}

function Link8() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[2.67px] w-[36.813px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[22.5px] not-italic relative shrink-0 text-[#5a6c57] text-[15px] text-nowrap">Login</p>
    </div>
  );
}

function ListItem5() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="List Item">
      <Link8 />
    </div>
  );
}

function Link9() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[2.67px] w-[52.156px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[22.5px] not-italic relative shrink-0 text-[#5a6c57] text-[15px] text-nowrap">Sign Up</p>
    </div>
  );
}

function ListItem6() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="List Item">
      <Link9 />
    </div>
  );
}

function Link10() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[2.67px] w-[69.625px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[22.5px] not-italic relative shrink-0 text-[#5a6c57] text-[15px] text-nowrap">My Orders</p>
    </div>
  );
}

function ListItem7() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="List Item">
      <Link10 />
    </div>
  );
}

function Link11() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[2.67px] w-[42.219px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[22.5px] not-italic relative shrink-0 text-[#5a6c57] text-[15px] text-nowrap">Profile</p>
    </div>
  );
}

function ListItem8() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="List Item">
      <Link11 />
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[170.5px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem5 />
      <ListItem6 />
      <ListItem7 />
      <ListItem8 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[210.5px] items-start left-[816px] top-0 w-[224px]" data-name="Container">
      <Heading1 />
      <List1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#2d5f3f] text-[16px] text-nowrap top-[-1.67px]">Newsletter</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.5px] left-0 not-italic text-[#5a6c57] text-[15px] top-[-1.33px] w-[174px]">Subscribe for updates and exclusive offers.</p>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="bg-white h-[45.333px] relative rounded-[10px] shrink-0 w-full" data-name="Email Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[10px] relative size-full">
          <p className="font-['Arial:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8a8a8a] text-[16px] text-nowrap">Your email</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#1f2933] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2f8e7e80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17070980} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[68.354px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-[34px] not-italic text-[16px] text-center text-nowrap text-white top-[-1.67px] translate-x-[-50%]">Subscribe</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#2d5f3f] h-[44px] relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center relative size-full">
          <Icon3 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[101.333px] items-start relative shrink-0 w-full" data-name="Container">
      <EmailInput />
      <Button />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[210.5px] items-start left-[1088px] top-0 w-[224px]" data-name="Container">
      <Heading2 />
      <Paragraph1 />
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[210.5px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return <div className="absolute border-[#1f2933] border-[0.667px_0px_0px] border-solid h-[0.667px] left-0 top-[3.67px] w-[1312px]" data-name="Container" />;
}

function Container9() {
  return <div className="absolute h-[8px] left-[608px] rounded-[2.23696e+07px] top-0 w-[96px]" data-name="Container" style={{ backgroundImage: "linear-gradient(rgb(45, 95, 63) 0%, rgb(212, 175, 55) 100%), linear-gradient(90deg, rgb(31, 41, 51) 0%, rgb(31, 41, 51) 100%)" }} />;
}

function Container10() {
  return (
    <div className="h-[8px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[269.125px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#5a6c57] text-[16px] text-nowrap top-[-1.67px]">© 2024 Smartfitao. All rights reserved.</p>
      </div>
    </div>
  );
}

function Link12() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[88.448px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.5px] left-0 not-italic text-[#5a6c57] text-[15px] text-nowrap top-[-1.33px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Link13() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[107.063px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.5px] left-0 not-italic text-[#5a6c57] text-[15px] text-nowrap top-[-1.33px]">Terms of Service</p>
      </div>
    </div>
  );
}

function Link14() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[88.76px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[22.5px] left-0 not-italic text-[#5a6c57] text-[15px] text-nowrap top-[-1.33px]">Shipping Info</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[332.271px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <Link12 />
        <Link13 />
        <Link14 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph2 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[48px] items-center pb-0 pt-[64px] px-[64px] relative w-full">
          <Container7 />
          <Container10 />
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#e8dcc8] content-stretch flex flex-col h-[451.167px] items-start pb-0 pt-[0.667px] px-[5px] relative shrink-0 w-[1450px]" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#d4c8b7] border-[0.667px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container13 />
    </div>
  );
}

function Footer1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="footer">
      <Footer />
    </div>
  );
}

function Footer2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[-10px] top-[1002px] w-[1450px]" data-name="footer">
      <Footer1 />
    </div>
  );
}

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getSubtotal } = useCart();
  const subtotal = getSubtotal();
  const deliveryFee = cartItems.length > 0 ? 1500 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    await createOrderFirestore({
      source: "3d",
      cartItems: cartItems.map(({ id, name, price, quantity, size, image, category, color }) => ({
        id,
        name,
        price,
        quantity,
        size,
        image: typeof image === "string" ? image : "",
        category,
        color,
      })),
      subtotal,
      deliveryFee,
      total,
    });
  };

  return (
    <div className="bg-white relative size-full" data-name="Cart">
      <Header />
      <Frame9 />
      <div className="absolute h-0 left-[100px] top-[134px] w-[1240px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1240 1">
            <line id="Line 4" stroke="var(--stroke-0, black)" strokeOpacity="0.1" x2="1240" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[0] left-[42px] not-italic text-[40px] text-black text-nowrap top-[228px] translate-y-[-50%]">
        <p className="leading-[normal]">Your cart</p>
      </div>
      <Frame23 cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
      <Frame24 subtotal={subtotal} deliveryFee={deliveryFee} total={total} onCheckout={handleCheckout} />
      <Footer2 />
    </div>
  );
}