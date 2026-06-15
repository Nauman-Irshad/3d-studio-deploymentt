import svgPaths from "./svg-fl1iu3b3n6";
import imgCreditCard from "@/assets/65e93a671c4e0b15732d813a77a0655093c39ec3.png";

function Button() {
  return (
    <div className="absolute bg-[#03162a] content-stretch flex items-start left-[444px] px-[44px] py-[8px] rounded-[4px] top-[1099px]" data-name="button">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[20.645px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Pay now</p>
      </div>
    </div>
  );
}

function InputBig() {
  return (
    <div className="absolute h-[40px] left-[165px] top-[760px] w-[445px]" data-name="input/big">
      <div className="absolute bg-white border-[#898989] border-[0.5px] border-solid inset-0" data-name="bg" />
      <p className="absolute font-['Helvetica:Regular',sans-serif] inset-[17.5%_3.82%] leading-[25.6px] not-italic text-[#616161] text-[14px]">{`VAT number  (optional)`}</p>
    </div>
  );
}

function InputBig1() {
  return (
    <div className="absolute h-[40px] left-[165px] top-[812px] w-[445px]" data-name="input/big">
      <div className="absolute bg-white border-[#898989] border-[0.5px] border-solid inset-0" data-name="bg" />
      <p className="absolute font-['Helvetica:Regular',sans-serif] inset-[17.5%_3.82%] leading-[25.6px] not-italic text-[#616161] text-[14px]">PEC (optional)</p>
    </div>
  );
}

function Taxinfo() {
  return (
    <div className="absolute contents left-[165px] top-[711px]" data-name="taxinfo">
      <InputBig />
      <InputBig1 />
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium h-[26px] leading-[25.6px] left-[165px] text-[#272727] text-[20px] top-[711px] tracking-[-0.9px] w-[160px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Tax Informations
      </p>
    </div>
  );
}

function Billing() {
  return (
    <div className="absolute contents left-[165px] top-[941px]" data-name="billing">
      <div className="absolute border border-[#e5e5e5] border-solid h-[116px] left-[165px] rounded-[7px] top-[941px] w-[445px]" data-name="bg" />
      <p className="absolute font-['Helvetica:Regular',sans-serif] h-[16px] leading-[15.6px] left-[223px] not-italic text-[#272727] text-[14px] top-[1021px] w-[292px]">Use a different address for billing</p>
      <div className="absolute left-[184px] size-[16px] top-[1020px]" data-name="round-checkbox">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <circle cx="8" cy="8" fill="var(--fill-0, white)" fillOpacity="0.5" id="round-checkbox" r="6.5" stroke="var(--stroke-0, #DBDBDB)" strokeWidth="3" />
        </svg>
      </div>
      <div className="absolute flex h-px items-center justify-center left-[182px] top-[999px] w-[410px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.14deg]">
          <div className="h-0 relative w-[410.001px]">
            <div className="absolute inset-[-0.25px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 410.001 0.25">
                <line id="Line 1" stroke="var(--stroke-0, #818181)" strokeWidth="0.25" x2="410.001" y1="0.125" y2="0.125" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="absolute font-['Helvetica:Regular',sans-serif] h-[16px] leading-[15.6px] left-[223px] not-italic text-[#272727] text-[14px] top-[963px] w-[292px]">Same as the shipping address</p>
      <div className="absolute left-[184px] size-[16px] top-[962px]" data-name="round-checkbox">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <circle cx="8" cy="8" fill="var(--fill-0, #03162A)" id="round-checkbox" r="6.5" stroke="var(--stroke-0, #DBDBDB)" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
}

function BillingAddress() {
  return (
    <div className="absolute contents left-[165px] top-[892px]" data-name="billing-address">
      <Billing />
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium h-[26px] leading-[25.6px] left-[165px] text-[#272727] text-[20px] top-[892px] tracking-[-0.9px] w-[160px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Billing address
      </p>
    </div>
  );
}

function InfoSquareFill() {
  return (
    <div className="absolute inset-[27.5%_6.09%_27.5%_84.77%]" data-name="InfoSquareFill">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_11_1005)" id="InfoSquareFill">
          <path clipRule="evenodd" d={svgPaths.p1f4a3980} fill="var(--fill-0, #616161)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_11_1005">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InputPaySmall() {
  return (
    <div className="absolute h-[40px] left-[394px] top-[601px] w-[197px]" data-name="input-pay/small">
      <div className="absolute bg-white border-[#898989] border-[0.5px] border-solid inset-0" data-name="bg" />
      <InfoSquareFill />
      <p className="absolute font-['Helvetica:Regular',sans-serif] inset-[17.5%_37.88%_17.5%_8.59%] leading-[25.6px] not-italic text-[#616161] text-[14px]">CVV</p>
    </div>
  );
}

function InputPaySmall1() {
  return (
    <div className="absolute h-[40px] left-[183px] top-[601px] w-[197px]" data-name="input-pay/small">
      <div className="absolute bg-white border-[#898989] border-[0.5px] border-solid inset-0" data-name="bg" />
      <p className="absolute font-['Helvetica:Regular',sans-serif] inset-[17.5%_27.92%_17.5%_8.63%] leading-[25.6px] not-italic text-[#616161] text-[14px]">Expiration (MM/YY)</p>
    </div>
  );
}

function InputPayBig() {
  return (
    <div className="absolute h-[40px] left-[183px] top-[549px] w-[408px]" data-name="input-pay/big">
      <div className="absolute bg-white border-[#898989] border-[0.5px] border-solid inset-0" data-name="bg" />
      <p className="absolute font-['Helvetica:Regular',sans-serif] inset-[17.5%_2.45%_17.5%_4.17%] leading-[25.6px] not-italic text-[#616161] text-[14px]">Holder Name</p>
    </div>
  );
}

function LockFill() {
  return (
    <div className="absolute inset-[27.5%_3.68%_27.5%_91.91%]" data-name="LockFill">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="LockFill">
          <path d={svgPaths.p4f01a80} fill="var(--fill-0, #616161)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p35c14080} fill="var(--fill-0, #616161)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function InputPayBig1() {
  return (
    <div className="absolute h-[40px] left-[183px] top-[497px] w-[408px]" data-name="input-pay/big">
      <div className="absolute bg-white border-[#898989] border-[0.5px] border-solid inset-0" data-name="bg" />
      <p className="absolute font-['Helvetica:Regular',sans-serif] inset-[17.5%_2.45%_17.5%_4.17%] leading-[25.6px] not-italic text-[#616161] text-[14px]">Card Number</p>
      <LockFill />
    </div>
  );
}

function CreditCardFill() {
  return (
    <div className="absolute left-[186px] size-[31px] top-[429px]" data-name="CreditCardFill">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 31">
        <g id="CreditCardFill">
          <path d={svgPaths.p3c6e05f0} fill="var(--fill-0, #03162A)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.pfecf900} fill="var(--fill-0, #03162A)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function CardHeading() {
  return (
    <div className="absolute contents left-[165px] top-[415px]" data-name="card-heading">
      <div className="absolute h-[58px] left-[165px] top-[415px] w-[445px]" data-name="bg">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 445 58">
          <path d={svgPaths.p5f2200} fill="url(#paint0_linear_11_1003)" id="bg" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_11_1003" x1="8.3445e-08" x2="436" y1="32.5" y2="35">
              <stop stopColor="#F3F3F3" />
              <stop offset="1" stopColor="#F3F3F3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Roboto:Bold',sans-serif] font-bold h-[16px] leading-[15.6px] left-[240px] text-[16px] text-[rgba(0,0,0,0.6)] top-[436px] tracking-[-0.9px] w-[197px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Credit Card
      </p>
      <CreditCardFill />
    </div>
  );
}

function CreditCard() {
  return (
    <div className="absolute contents left-[165px] top-[366px]" data-name="credit-card">
      <div className="absolute border border-[#e5e5e5] border-solid h-[256px] left-[165px] rounded-[7px] top-[415px] w-[445px]" data-name="bg" />
      <InputPaySmall />
      <InputPaySmall1 />
      <InputPayBig />
      <InputPayBig1 />
      <CardHeading />
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium h-[26px] leading-[25.6px] left-[168px] text-[#272727] text-[20px] top-[366px] tracking-[-0.9px] w-[160px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Payment method
      </p>
    </div>
  );
}

function Method() {
  return (
    <div className="absolute contents leading-[15.6px] left-[193px] not-italic text-[14px] top-[290px] tracking-[-0.6px]" data-name="method">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal left-[577.5px] text-[rgba(3,22,42,0.3)] text-center top-[290px] translate-x-[-50%] w-[33px]">Edit</p>
      <p className="absolute font-['Roboto:Regular',sans-serif] font-normal left-[246px] text-[#272727] top-[290px] w-[280px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span className="font-['Helvetica:Regular',sans-serif]">{`Standard Shipping - `}</span>
        <span className="font-['Helvetica:Light',sans-serif]">FREE</span>
      </p>
      <p className="absolute font-['Helvetica:Regular',sans-serif] left-[193px] text-[#818181] text-nowrap top-[290px]">Method</p>
    </div>
  );
}

function ShipTo() {
  return (
    <div className="absolute contents leading-[15.6px] left-[193px] not-italic text-[14px] top-[231px] tracking-[-0.6px]" data-name="shipTo">
      <p className="absolute font-['Helvetica:Regular',sans-serif] left-[193px] text-[#818181] text-nowrap top-[231px]">Ship to</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal left-[577.5px] text-[rgba(3,22,42,0.3)] text-center top-[231px] translate-x-[-50%] w-[33px]">Edit</p>
      <p className="absolute font-['Helvetica:Regular',sans-serif] left-[246px] text-[#272727] text-nowrap top-[231px]">{`Via Firenze 23, 92023, Campobello di  Licata AG, Italia`}</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="absolute contents leading-[15.6px] left-[193px] not-italic text-[14px] top-[172px] tracking-[-0.6px]" data-name="contact">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal left-[577.5px] text-[rgba(3,22,42,0.3)] text-center top-[172px] translate-x-[-50%] w-[33px]">Edit</p>
      <p className="absolute font-['Helvetica:Regular',sans-serif] left-[246px] text-[#272727] top-[172px] w-[280px]">joe.spagnuolo@uxbly.com</p>
      <p className="absolute font-['Helvetica:Regular',sans-serif] left-[193px] text-[#818181] text-nowrap top-[172px]">Contact</p>
    </div>
  );
}

function SummaryInfo() {
  return (
    <div className="absolute contents left-[165px] top-[151px]" data-name="summary-info">
      <div className="absolute border border-[rgba(86,178,128,0.2)] border-solid h-[175px] left-[165px] rounded-[7px] top-[151px] w-[445px]" data-name="bg" />
      <Method />
      <div className="absolute flex h-px items-center justify-center left-[186px] top-[268px] w-[410px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.14deg]">
          <div className="h-0 relative w-[410.001px]" data-name="Line">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 410.001 1">
                <line id="Line" stroke="var(--stroke-0, #56B280)" strokeOpacity="0.2" x2="410.001" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <ShipTo />
      <div className="absolute flex h-px items-center justify-center left-[186px] top-[209px] w-[410px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.14deg]">
          <div className="h-0 relative w-[410.001px]" data-name="Line">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 410.001 1">
                <line id="Line" stroke="var(--stroke-0, #56B280)" strokeOpacity="0.2" x2="410.001" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="absolute left-[203px] size-[10px] top-[86px]" data-name="ChevronRight">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="ChevronRight">
          <path clipRule="evenodd" d={svgPaths.pdee9e00} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ChevronRight1() {
  return (
    <div className="absolute left-[278px] size-[10px] top-[86px]" data-name="ChevronRight">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="ChevronRight">
          <path clipRule="evenodd" d={svgPaths.pdee9e00} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ChevronRight2() {
  return (
    <div className="absolute left-[365px] size-[10px] top-[86px]" data-name="ChevronRight">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="ChevronRight">
          <path clipRule="evenodd" d={svgPaths.pdee9e00} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Steps() {
  return (
    <div className="absolute contents left-[165px] top-[77px]" data-name="steps">
      <ChevronRight />
      <ChevronRight1 />
      <ChevronRight2 />
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[25.6px] left-[385px] text-[#272727] text-[16px] text-nowrap top-[78px] tracking-[-0.9px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Payment
      </p>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[25.6px] left-[298px] text-[16px] text-[rgba(3,22,42,0.3)] text-nowrap top-[77px] tracking-[-0.9px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Shipping
      </p>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[25.6px] left-[223px] text-[16px] text-[rgba(3,22,42,0.3)] text-nowrap top-[78px] tracking-[-0.9px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Details
      </p>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[25.6px] left-[165px] text-[16px] text-[rgba(3,22,42,0.3)] text-nowrap top-[78px] tracking-[-0.9px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Cart
      </p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[876px] top-[144px]">
      <div className="absolute h-[78px] left-[876px] top-[144px] w-[498px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 498 78">
          <path d={svgPaths.p21750f40} fill="var(--fill-0, #A6A6A6)" id="Rectangle 3397" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] left-[901px] not-italic text-[20px] text-nowrap text-white top-[181px] translate-y-[-50%]">
        <p className="leading-[normal]">Cart Details</p>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[876px] top-[144px]">
      <div className="absolute bg-[#f9f9f9] border border-[#dedfe1] border-solid h-[601px] left-[876px] rounded-[10px] top-[144px] w-[498px]" />
      <Group />
      <p className="absolute capitalize font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[1271px] not-italic text-[#3d3d3d] text-[16px] text-nowrap top-[252px]">SUBTOTAL</p>
      <p className="absolute capitalize font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[901px] not-italic text-[#3d3d3d] text-[16px] text-nowrap top-[252px]">PRODUCT</p>
      <p className="absolute capitalize font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[901px] not-italic text-[#3d3d3d] text-[16px] text-nowrap top-[499px]">SUBTOTAL</p>
      <p className="absolute capitalize font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[901px] not-italic text-[#3d3d3d] text-[16px] text-nowrap top-[576px]">SHIPPING</p>
      <p className="absolute capitalize font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[901px] not-italic text-[#3d3d3d] text-[16px] text-nowrap top-[678px]">Total</p>
      <p className="absolute capitalize font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[1146px] not-italic text-[#3d3d3d] text-[16px] text-nowrap top-[252px]">Quantity</p>
      <div className="absolute h-0 left-[876px] top-[310px] w-[498px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" height="1" src={imgLine8} width="498" />
        </div>
      </div>
      <div className="absolute h-0 left-[876px] top-[482px] w-[498px]">
        <div className="absolute inset-[-0.5px_0]">
          <img alt="" className="block max-w-none size-full" height="1" src={imgLine8} width="498" />
        </div>
      </div>
      <div className="absolute h-0 left-[876px] top-[545px] w-[498px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" height="1" src={imgLine8} width="498" />
        </div>
      </div>
      <div className="absolute h-0 left-[876px] top-[628px] w-[498px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" className="block max-w-none size-full" height="1" src={imgLine8} width="498" />
        </div>
      </div>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[1349px] not-italic text-[#949494] text-[16px] text-nowrap text-right top-[335px] translate-x-[-100%]">Rs 2,500</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[1187px] not-italic text-[#949494] text-[16px] text-nowrap text-right top-[335px] translate-x-[-100%]">01</p>
      <p className="absolute capitalize font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[897px] not-italic text-[#949494] text-[16px] text-nowrap top-[335px]">CHAIRMAN- Luxury Cotton</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[1347px] not-italic text-[#949494] text-[16px] text-nowrap text-right top-[411px] translate-x-[-100%]">Rs 1,800</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[1185px] not-italic text-[#949494] text-[16px] text-nowrap text-right top-[408px] translate-x-[-100%]">01</p>
      <p className="absolute capitalize font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[899px] not-italic text-[#949494] text-[16px] text-nowrap top-[408px]">Red Shalwar kameez</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[1349px] not-italic text-[#949494] text-[16px] text-nowrap text-right top-[443px] translate-x-[-100%]">Rs 2,800</p>
      <p className="absolute capitalize font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[1279px] not-italic text-[#949494] text-[16px] text-nowrap top-[499px]">Rs 9,340</p>
      <p className="absolute capitalize font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[1283px] not-italic text-[#949494] text-[16px] text-nowrap top-[572px]">Rs 1,500</p>
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[1286px] not-italic text-[#949494] text-[16px] text-nowrap top-[674px]">Rs 10,500</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[1185px] not-italic text-[#949494] text-[16px] text-nowrap text-right top-[444px] translate-x-[-100%]">01</p>
      <p className="absolute capitalize font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[901px] not-italic text-[#949494] text-[16px] text-nowrap top-[440px]">Black Schiffli Kurta Pajama</p>
      <p className="absolute capitalize font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[897px] not-italic text-[#949494] text-[16px] text-nowrap top-[370px]">Ahmed Stich house-service</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[1352px] not-italic text-[#949494] text-[16px] text-nowrap text-right top-[374px] translate-x-[-100%]">Rs 1,000</p>
    </div>
  );
}

export default function DesktopPayment() {
  return (
    <div className="bg-white relative size-full" data-name="Desktop/Payment">
      <Button />
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] absolute decoration-solid font-['Roboto:Regular',sans-serif] font-normal h-[26px] leading-[25.6px] left-[165px] text-[18px] text-[rgba(0,0,0,0.6)] top-[1097px] tracking-[-0.9px] underline w-[160px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Back to shipping
      </p>
      <Taxinfo />
      <BillingAddress />
      <CreditCard />
      <SummaryInfo />
      <Steps />
      <Group1 />
    </div>
  );
}