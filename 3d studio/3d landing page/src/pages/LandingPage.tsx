import svgPaths from "./svg-placeholder";
// Placeholders for missing assets
const imgLogo = "https://via.placeholder.com/150?text=Logo";
const imgSectionRight = "https://via.placeholder.com/800x600?text=Section+Right";
const imgFrame6 = "https://via.placeholder.com/400x600?text=Shalwar+Kameez";
const imgFrame10 = "https://via.placeholder.com/400x600?text=Kurta+Pajama";
const imgFrame9 = "https://via.placeholder.com/400x600?text=Fabric";
const imgFrame11 = "https://via.placeholder.com/400x600?text=Tailor";
const imgFrame13 = "https://via.placeholder.com/400x600?text=Frame13";
const imgFrame14 = "https://via.placeholder.com/400x600?text=Frame14";
const imgBlackKurta = "https://via.placeholder.com/400x600?text=Black+Kurta";
const imgWhiteKurta = "https://via.placeholder.com/400x600?text=White+Kurta";

import { Typewriter } from "../components/Typewriter";
import { motion } from "framer-motion";
import { useCart } from "../components/CartContext";
import { ProductCard } from "../components/ProductCard";
import { ModelViewer } from "../components/ModelViewer";
import ChatWidget from "../components/ChatWidget";

// Props for navigation
interface LandingPageProps {
  onNavigateToSignUp: () => void;
  onNavigateToLogin: () => void;
  onNavigateToCart: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToChat?: () => void;
  onNavigateToDiscovery?: () => void;
  onNavigateToMeasurement?: () => void;
  onNavigateToProduct?: () => void;
}


function Trending() {
  return (
    <div className="relative shrink-0 w-full" data-name="trending">
      <ShalwarKemez />
    </div>
  );
}

function Featured() {
  return (
    <div className="relative shrink-0 w-full" data-name="featured">
      <KurtaPajma />
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
    <motion.button
      className="bg-transparent content-stretch cursor-pointer flex items-center justify-center px-[16px] py-[14px] relative rounded-[10px] shrink-0 border-b-2 border-transparent"
      data-name="Primary button"
      whileHover={{
        borderBottomColor: "#111827",
        scale: 1.02
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-[#111827] text-nowrap tracking-[-0.09px]">
        <p className="leading-[1.45]">Home</p>
      </div>
    </motion.button>
  );
}

function PrimaryButton1() {
  return (
    <motion.button
      className="bg-transparent content-stretch cursor-pointer flex items-center justify-center px-[16px] py-[14px] relative rounded-[10px] shrink-0 border-b-2 border-transparent"
      data-name="Primary button"
      whileHover={{
        borderBottomColor: "#111827",
        scale: 1.02
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-[#111827] text-center text-nowrap tracking-[-0.09px]">
        <p className="leading-[1.45]">Products</p>
      </div>
    </motion.button>
  );
}

function PrimaryButton2({ onClick }: { onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="bg-transparent content-stretch cursor-pointer flex items-center justify-center px-[16px] py-[14px] relative rounded-[10px] shrink-0 border-b-2 border-transparent"
      data-name="Primary button"
      whileHover={{
        borderBottomColor: "#111827",
        scale: 1.02
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-[#111827] text-center text-nowrap tracking-[-0.09px]">
        <p className="leading-[1.45]">{`Tailor `}</p>
      </div>
    </motion.button>
  );
}

function PrimaryButton3() {
  return (
    <motion.button
      className="bg-transparent content-stretch cursor-pointer flex items-center justify-center px-[16px] py-[14px] relative rounded-[10px] shrink-0 border-b-2 border-transparent"
      data-name="Primary button"
      whileHover={{
        borderBottomColor: "#111827",
        scale: 1.02
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-[#111827] text-center text-nowrap tracking-[-0.09px]">
        <p className="leading-[1.45]">How It Works</p>
      </div>
    </motion.button>
  );
}

function Frame1({ onNavigateToDiscovery }: { onNavigateToDiscovery?: () => void }) {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <PrimaryButton />
      <PrimaryButton1 />
      <PrimaryButton2 onClick={onNavigateToDiscovery} />
      <PrimaryButton3 />
    </div>
  );
}

function Buttons({ onNavigateToDiscovery }: { onNavigateToDiscovery?: () => void }) {
  return (
    <nav className="content-center flex flex-wrap gap-[24px] items-center justify-center p-0 relative shrink-0" data-name="Buttons">
      <Frame1 onNavigateToDiscovery={onNavigateToDiscovery} />
    </nav>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[24px] text-[#9CA3AF] hover:text-[#111827] transition-colors duration-200" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p261dfb00} id="Vector" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M7 11H17" id="Vector_2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M7 15H13" id="Vector_3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M7 7H15" id="Vector_4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 size-[24px] text-[#9CA3AF] hover:text-[#111827] transition-colors duration-200" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p27acb400} id="Vector" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p28c65188} id="Vector_2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 size-[24px] text-[#9CA3AF] hover:text-[#111827] transition-colors duration-200" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p33c1b680} id="Vector" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pd438b00} id="Vector_2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2fb16300} id="Vector_3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame96({ onNavigateToCart, cartCount, onNavigateToChat }: { onNavigateToCart?: () => void; cartCount: number; onNavigateToChat?: () => void }) {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <motion.button
        onClick={onNavigateToChat}
        className="relative cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Frame />
      </motion.button>
      <Frame2 />
      <motion.button
        onClick={onNavigateToCart}
        className="relative cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Frame3 />
        {cartCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
          >
            {cartCount}
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}

function Header2({ onNavigateToCart, cartCount, onNavigateToChat, onNavigateToDiscovery }: { onNavigateToCart?: () => void; cartCount: number; onNavigateToChat?: () => void; onNavigateToDiscovery?: () => void }) {
  return (
    <header className="relative shrink-0 w-full border-b border-gray-100" data-name="Header 2">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[64px] pr-[42px] py-[32px] relative w-full">
          <Company />
          <Buttons onNavigateToDiscovery={onNavigateToDiscovery} />
          <Frame96 onNavigateToCart={onNavigateToCart} cartCount={cartCount} onNavigateToChat={onNavigateToChat} />
        </div>
      </div>
    </header>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="heading">
      <div className="basis-0 flex flex-col font-['Poppins:Semi_Bold',sans-serif] font-semibold grow justify-end leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#111827] text-[56px]">
        <p className="leading-[68px]">
          <Typewriter text="Pure Linen Unstitched Fabric" speed={80} />
        </p>
      </div>
    </div>
  );
}

function Body() {
  return (
    <motion.div
      className="content-stretch flex items-start relative shrink-0 w-full max-w-[65%]"
      data-name="body"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="basis-0 flex flex-col font-['Poppins:Regular',sans-serif] grow justify-end leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#6b7280] text-[20px]">
        <p className="leading-[30px]">Breathable, premium white linen. Perfect for crafting your custom summer Kurta.</p>
      </div>
    </motion.div>
  );
}

function Frame98() {
  return (
    <motion.div
      className="bg-[rgba(255,51,51,0.1)] content-stretch flex items-center justify-center overflow-clip px-[14px] py-[6px] relative rounded-[62px] shrink-0"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#f33] text-[16px] text-nowrap">-40%</p>
    </motion.div>
  );
}

function Frame12() {
  return (
    <motion.div
      className="content-stretch flex gap-[12px] items-start relative shrink-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="flex flex-col font-['Roboto_Slab:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[32px] text-black text-nowrap">
        <p className="leading-[normal]">Rs 2,600</p>
      </div>
      <div className="flex flex-col font-['Roboto_Slab:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[32px] text-[rgba(0,0,0,0.3)] text-nowrap">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[normal] line-through">Rs 3,000</p>
      </div>
      <Frame98 />
    </motion.div>
  );
}

function Button({ onClick }: { onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="bg-[#111827] content-stretch cursor-pointer flex flex-col items-center justify-center px-[32px] py-[16px] relative rounded-[10px] shrink-0 transition-all duration-300 shadow-sm"
      data-name="button"
      whileHover={{ scale: 1.02, backgroundColor: "#1f2937", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex flex-col font-['Poppins:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white">
        <p className="leading-[24px]">Buy Fabric Now</p>
      </div>
    </motion.button>
  );
}

function Button1({ onClick }: { onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="content-stretch cursor-pointer flex flex-col items-center justify-center px-[32px] py-[16px] relative rounded-[10px] shrink-0 transition-all duration-300 bg-transparent"
      data-name="button"
      whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
      whileTap={{ scale: 0.98 }}
    >
      <div aria-hidden="true" className="absolute border-2 border-[#111827] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-col font-['Poppins:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[18px] text-center text-nowrap">
        <p className="leading-[24px]">{` Get Measured for It`}</p>
      </div>
    </motion.button>
  );
}

function ButtonsWrapper({ onNavigateToSignUp, onNavigateToMeasurement }: { onNavigateToSignUp?: () => void; onNavigateToMeasurement?: () => void }) {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0" data-name="buttons-wrapper">
      <Button onClick={onNavigateToSignUp} />
      <Button1 onClick={onNavigateToMeasurement} />
    </div>
  );
}

function ContentWrapper({ onNavigateToSignUp, onNavigateToMeasurement }: { onNavigateToSignUp?: () => void; onNavigateToMeasurement?: () => void }) {
  return (
    <motion.div
      className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start justify-center min-h-px min-w-px relative shrink-0 w-full"
      data-name="content-wrapper"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Heading />
      <Body />
      <Frame12 />
      <ButtonsWrapper onNavigateToSignUp={onNavigateToSignUp} onNavigateToMeasurement={onNavigateToMeasurement} />
    </motion.div>
  );
}

function SectionLeft({ onNavigateToSignUp, onNavigateToMeasurement }: { onNavigateToSignUp?: () => void; onNavigateToMeasurement?: () => void }) {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-center relative shrink-0 w-[599px]" data-name="section-left">
      <ContentWrapper onNavigateToSignUp={onNavigateToSignUp} onNavigateToMeasurement={onNavigateToMeasurement} />
    </div>
  );
}

function Image() {
  return (
    <div className="aspect-[1920/1080] relative rounded-[24px] shrink-0 w-full" data-name="image">
      <div className="flex flex-col items-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function SectionRight() {
  return (
    <motion.div
      className="basis-0 content-stretch flex flex-col grow h-full items-center justify-center min-h-px min-w-px relative shrink-0"
      data-name="section-right"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="w-full h-full flex items-center justify-center pt-8 pr-12">
        <div className="w-[80%] h-[80%]">
          <ModelViewer modelPath="/models/product5/sample4.gltf" />
        </div>
      </div>
    </motion.div>
  );
}

function HeroSection({ onNavigateToSignUp, onNavigateToMeasurement }: { onNavigateToSignUp?: () => void; onNavigateToMeasurement?: () => void }) {
  return (
    <div className="content-stretch flex gap-[24px] h-[722px] items-center justify-center relative shrink-0 w-full" data-name="hero section">
      <SectionLeft onNavigateToSignUp={onNavigateToSignUp} onNavigateToMeasurement={onNavigateToMeasurement} />
      <SectionRight />
    </div>
  );
}

function Frame97({ onNavigateToSignUp, onNavigateToMeasurement }: { onNavigateToSignUp?: () => void; onNavigateToMeasurement?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[10px] relative shrink-0 w-[1244px]">
      <HeroSection onNavigateToSignUp={onNavigateToSignUp} onNavigateToMeasurement={onNavigateToMeasurement} />
    </div>
  );
}

function HeroSection1({ onNavigateToSignUp, onNavigateToMeasurement }: { onNavigateToSignUp?: () => void; onNavigateToMeasurement?: () => void }) {
  return (
    <section className="relative shrink-0 w-full" data-name="Hero section">
      <div className="content-stretch flex flex-col items-start px-[103px] py-0 relative w-full">
        <Frame97 onNavigateToSignUp={onNavigateToSignUp} onNavigateToMeasurement={onNavigateToMeasurement} />
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center justify-center leading-[0] not-italic relative shrink-0 text-nowrap" data-name="Header">
      <div className="flex flex-col items-center gap-[12px] w-full">
        <div className="flex flex-col font-['Poppins:Semi_Bold',sans-serif] font-semibold justify-center relative shrink-0 text-[#111827] text-[52px] tracking-[-1px]">
          <h2 className="leading-[1.2] text-nowrap">Category</h2>
        </div>
        <div className="h-[2px] w-[80px] bg-[#d1d5db] rounded-full"></div>
      </div>
      <motion.div
        className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[18px] text-[#111827] tracking-[-0.36px]"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="[text-underline-position:from-font] block decoration-solid leading-[1.2] text-nowrap underline cursor-pointer">View all Categories</h3>
      </motion.div>
    </div>
  );
}

function Frame6() {
  return (
    <motion.button
      className="basis-0 grow h-[600px] min-h-px min-w-px relative rounded-[12px] shrink-0 overflow-hidden shadow-sm"
      whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        alt="Shalwar Kameez"
        className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full"
        src={imgFrame6}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      />
      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

      <div className="flex flex-col justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-end px-[32px] py-[32px] relative size-full z-10">
          <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
            <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[44px] text-center text-nowrap text-white tracking-[-0.88px]">
              <h2 className="block leading-[1.1] drop-shadow-lg">Shalwar Kameez</h2>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function Frame10() {
  return (
    <motion.button
      className="basis-0 grow h-[600px] min-h-px min-w-px relative rounded-[12px] shrink-0 overflow-hidden shadow-sm"
      whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        alt="Kurta Pajama"
        className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full"
        src={imgFrame10}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      />
      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

      <div className="flex flex-col justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-end px-[32px] py-[32px] relative size-full z-10">
          <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
            <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[44px] text-center text-nowrap text-white tracking-[-0.88px]">
              <h2 className="block leading-[1.1] drop-shadow-lg">Kurta Pajama</h2>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function Frame9() {
  return (
    <motion.button
      className="basis-0 grow h-[600px] min-h-px min-w-px relative rounded-[12px] shrink-0 overflow-hidden shadow-sm"
      whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        alt="Fabric"
        className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full"
        src={imgFrame9}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      />
      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

      <div className="flex flex-col justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-end px-[32px] py-[32px] relative size-full z-10">
          <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
            <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[44px] text-center text-nowrap text-white tracking-[-0.88px]">
              <h2 className="block leading-[1.1] drop-shadow-lg">Fabric</h2>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function Frame20() {
  return (
    <div className="content-stretch cursor-pointer flex gap-[10px] items-center justify-center relative shrink-0 w-full">
      <Frame6 />
      <Frame10 />
      <Frame9 />
    </div>
  );
}

function Category() {
  return (
    <motion.div
      className="relative shrink-0 w-full"
      data-name="category"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center justify-center px-[64px] py-0 relative w-full">
          <Header />
          <Frame20 />
        </div>
      </div>
    </motion.div>
  );
}

function Hero({ onNavigateToSignUp, onNavigateToMeasurement }: { onNavigateToSignUp?: () => void; onNavigateToMeasurement?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[62px] items-start relative shrink-0 w-full" data-name="hero">
      <HeroSection1 onNavigateToSignUp={onNavigateToSignUp} onNavigateToMeasurement={onNavigateToMeasurement} />
      <Category />
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center justify-center leading-[0] not-italic relative shrink-0 text-nowrap" data-name="Header">
      <div className="flex flex-col items-center gap-[12px] w-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center relative shrink-0 text-[#111827] text-[52px] tracking-[-1px]">
          <h2 className="leading-[1.2] text-nowrap">
            Shalwar kameez
          </h2>
        </div>
        <div className="h-[2px] w-[80px] bg-[#d1d5db] rounded-full"></div>
      </div>
      <motion.div
        className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[18px] text-[#111827] tracking-[-0.36px]"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="[text-underline-position:from-font] block decoration-solid leading-[1.2] text-nowrap underline cursor-pointer">View all Categories</h3>
      </motion.div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center opacity-[0.48] px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">S</h2>
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">M</h2>
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">L</h2>
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-nowrap text-white tracking-[-0.48px]">
          <h2 className="block leading-[1.1]">XL</h2>
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.5)] left-[46.83px] rounded-[12px] top-[374px]">
      <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[16px] py-[24px] relative rounded-[inherit]">
        <Frame15 />
        <Frame16 />
        <Frame17 />
        <Frame18 />
        <div className="absolute left-[317.17px] size-[131px] top-[-86px]">
          <div className="absolute inset-[-34.35%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 221 221">
              <g filter="url(#filter0_f_6_7033)" id="Ellipse 1">
                <circle cx="110.5" cy="110.5" fill="var(--fill-0, white)" r="65.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="221" id="filter0_f_6_7033" width="221" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7033" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute left-[-86.83px] size-[109px] top-[32px]">
          <div className="absolute inset-[-41.28%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 199 199">
              <g filter="url(#filter0_f_6_7051)" id="Ellipse 2">
                <circle cx="99.5" cy="99.5" fill="var(--fill-0, white)" r="54.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="199" id="filter0_f_6_7051" width="199" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7051" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame">
          <path d={svgPaths.p3c552570} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p156bd200} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p3f700600} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center px-0 py-[16px] relative rounded-[12px] shrink-0 w-full">
      <Frame4 />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative text-[32px] text-black text-center text-nowrap tracking-[-0.64px]">
          <h2 className="block leading-[1.1]">Add to cart</h2>
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <Frame14 />
    </div>
  );
}

function Frame116() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Oxygen:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#404040] text-[22px] text-nowrap">Embroidered Silk Shalwar Kameez</p>
    </div>
  );
}

function Frame99() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <p className="capitalize font-['Oxygen:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap">Rs 12,500.00</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1cb7cc00} fill="var(--fill-0, #FFB900)" id="Vector" stroke="var(--stroke-0, #FFB900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.138px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.2px]">4.9</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[20px] relative shrink-0 w-[38.138px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon />
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[80.6px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[0.06px] not-italic text-[#737373] text-[14px] top-[-1.67px] w-[94px]">(127 reviews)</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-[113px]" data-name="Container">
      <Container />
      <Text1 />
    </div>
  );
}

function Frame124() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[259px]">
      <Frame99 />
      <Container1 />
    </div>
  );
}

function Frame100() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full">
      <Frame116 />
      <Frame124 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-[650px] relative rounded-[16px] shrink-0 w-[431px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={imgFrame11} />
      <div className="content-stretch flex flex-col gap-[14px] items-start justify-end overflow-clip px-[24px] py-[22px] relative rounded-[inherit] size-full">
        <Frame13 />
        <Frame19 />
        <Frame100 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c9ccd6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_4px_0px_rgba(201,204,214,0.25)]" />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center opacity-[0.48] px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">S</h2>
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">M</h2>
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">L</h2>
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-nowrap text-white tracking-[-0.48px]">
          <h2 className="block leading-[1.1]">XL</h2>
        </div>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.5)] left-[46.83px] rounded-[12px] top-[374px]">
      <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[16px] py-[24px] relative rounded-[inherit]">
        <Frame21 />
        <Frame22 />
        <Frame23 />
        <Frame24 />
        <div className="absolute left-[317.17px] size-[131px] top-[-86px]">
          <div className="absolute inset-[-34.35%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 221 221">
              <g filter="url(#filter0_f_6_7033)" id="Ellipse 1">
                <circle cx="110.5" cy="110.5" fill="var(--fill-0, white)" r="65.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="221" id="filter0_f_6_7033" width="221" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7033" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute left-[-86.83px] size-[109px] top-[32px]">
          <div className="absolute inset-[-41.28%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 199 199">
              <g filter="url(#filter0_f_6_7051)" id="Ellipse 2">
                <circle cx="99.5" cy="99.5" fill="var(--fill-0, white)" r="54.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="199" id="filter0_f_6_7051" width="199" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7051" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame">
          <path d={svgPaths.p3c552570} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p156bd200} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p3f700600} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center px-0 py-[16px] relative rounded-[12px] shrink-0 w-full">
      <Frame5 />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative text-[32px] text-black text-center text-nowrap tracking-[-0.64px]">
          <h2 className="block leading-[1.1]">Add to cart</h2>
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <Frame26 />
    </div>
  );
}

function Frame117() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Oxygen:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#404040] text-[22px] text-nowrap">Embroidered Silk Shalwar Kameez</p>
    </div>
  );
}

function Frame101() {
  return (
    <div className="capitalize content-stretch flex font-['Oxygen:Regular',sans-serif] gap-[4px] items-start leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid line-through relative shrink-0 text-[#404040]">rs2300.00</p>
      <p className="relative shrink-0 text-black">rs2000.00</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1cb7cc00} fill="var(--fill-0, #FFB900)" id="Vector" stroke="var(--stroke-0, #FFB900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.138px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.2px]">4.9</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[38.138px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon1 />
        <Text2 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[80.6px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[0.06px] not-italic text-[#737373] text-[14px] top-[-1.67px] w-[94px]">(127 reviews)</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-[113px]" data-name="Container">
      <Container2 />
      <Text3 />
    </div>
  );
}

function Frame125() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[259px]">
      <Frame101 />
      <Container3 />
    </div>
  );
}

function Frame102() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full">
      <Frame117 />
      <Frame125 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="h-[659px] relative rounded-[16px] shrink-0 w-[401px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <img alt="" className="absolute h-[98.63%] left-[-0.42%] max-w-none top-0 w-[108.06%]" src={imgFrame11} />
      </div>
      <div className="content-stretch flex flex-col gap-[14px] items-start justify-end overflow-clip px-[24px] py-[22px] relative rounded-[inherit] size-full">
        <Frame25 />
        <Frame27 />
        <Frame102 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c9ccd6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_4px_0px_rgba(201,204,214,0.25)]" />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center opacity-[0.48] px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">S</h2>
        </div>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">M</h2>
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">L</h2>
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-nowrap text-white tracking-[-0.48px]">
          <h2 className="block leading-[1.1]">XL</h2>
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.5)] left-[46.83px] rounded-[12px] top-[374px]">
      <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[16px] py-[24px] relative rounded-[inherit]">
        <Frame29 />
        <Frame30 />
        <Frame31 />
        <Frame32 />
        <div className="absolute left-[317.17px] size-[131px] top-[-86px]">
          <div className="absolute inset-[-34.35%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 221 221">
              <g filter="url(#filter0_f_6_7033)" id="Ellipse 1">
                <circle cx="110.5" cy="110.5" fill="var(--fill-0, white)" r="65.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="221" id="filter0_f_6_7033" width="221" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7033" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute left-[-86.83px] size-[109px] top-[32px]">
          <div className="absolute inset-[-41.28%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 199 199">
              <g filter="url(#filter0_f_6_7051)" id="Ellipse 2">
                <circle cx="99.5" cy="99.5" fill="var(--fill-0, white)" r="54.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="199" id="filter0_f_6_7051" width="199" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7051" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame">
          <path d={svgPaths.p3c552570} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p156bd200} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p3f700600} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame34() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center px-0 py-[16px] relative rounded-[12px] shrink-0 w-full">
      <Frame7 />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative text-[32px] text-black text-center text-nowrap tracking-[-0.64px]">
          <h2 className="block leading-[1.1]">Add to cart</h2>
        </div>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <Frame34 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1cb7cc00} fill="var(--fill-0, #FFB900)" id="Vector" stroke="var(--stroke-0, #FFB900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.138px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.2px]">4.9</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[38.138px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon2 />
        <Text4 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[80.6px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[0.06px] not-italic text-[#737373] text-[14px] top-[-1.67px] w-[94px]">(127 reviews)</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-[113px]" data-name="Container">
      <Container4 />
      <Text5 />
    </div>
  );
}

function Frame126() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[259px]">
      <p className="capitalize font-['Oxygen:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-nowrap">Rs 12,500.00</p>
      <Container5 />
    </div>
  );
}

function Frame103() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full">
      <p className="font-['Oxygen:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#404040] text-[22px] text-nowrap">Embroidered Silk Shalwar Kameez</p>
      <Frame126 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="h-[650px] relative rounded-[16px] shrink-0 w-[431px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={imgFrame11} />
      <div className="content-stretch flex flex-col gap-[14px] items-start justify-end overflow-clip px-[24px] py-[22px] relative rounded-[inherit] size-full">
        <Frame33 />
        <Frame35 />
        <Frame103 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c9ccd6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_4px_0px_rgba(201,204,214,0.25)]" />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex gap-[10px] h-[650px] items-start justify-center relative shrink-0 w-full">
      <Frame11 />
      <Frame28 />
      <Frame36 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="bg-[#171717] content-stretch flex items-center justify-center px-[32px] py-[24px] relative rounded-[12px] shrink-0">
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative text-[32px] text-center text-nowrap text-white tracking-[-0.64px]">
          <h2 className="block leading-[1.1]">View all Products</h2>
        </div>
      </div>
    </div>
  );
}

function ShalwarKemez({ onPriceClick }: { onPriceClick?: () => void }) {
  return (
    <div className="relative shrink-0 w-full" data-name="shalwar kemez">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[48px] items-center justify-center px-[64px] py-0 relative w-full">
          <Header1 />
          <div className="w-full max-w-[1312px] grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            <ProductCard
              id="shalwar-1"
              name="Embroidered Silk Shalwar Kameez"
              price={12500}
              image={imgFrame11}
              category="Shalwar Kameez"
              description="Luxurious silk fabric with elegant embroidery"
              modelPath="/models/product1/sample1.gltf"
              onClick={onPriceClick}
            />
            <ProductCard
              id="shalwar-2"
              name="Cotton Shalwar Kameez"
              price={8500}
              image={imgFrame13}
              category="Shalwar Kameez"
              description="Comfortable cotton blend perfect for daily wear"
              modelPath="/models/product2/sample1.gltf"
              onClick={onPriceClick}
            />
            <ProductCard
              id="shalwar-3"
              name="Premium Shalwar Kameez"
              price={15000}
              image={imgFrame14}
              category="Shalwar Kameez"
              description="Premium quality with intricate detailing"
              modelPath="/models/product3/sample5.gltf"
              onClick={onPriceClick}
            />
          </div>
          <Frame38 />
        </div>
      </div>
    </div>
  );
}

function Header3() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center justify-center leading-[0] not-italic relative shrink-0 text-nowrap" data-name="Header">
      <div className="flex flex-col items-center gap-[12px] w-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center relative shrink-0 text-[#111827] text-[52px] tracking-[-1px]">
          <h2 className="leading-[1.2] text-nowrap">Kurta Pajama</h2>
        </div>
        <div className="h-[2px] w-[80px] bg-[#d1d5db] rounded-full"></div>
      </div>
      <motion.div
        className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[18px] text-[#111827] tracking-[-0.36px]"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="[text-underline-position:from-font] block decoration-solid leading-[1.2] text-nowrap underline cursor-pointer">View all Categories</h3>
      </motion.div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center opacity-[0.48] px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">S</h2>
        </div>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">M</h2>
        </div>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">L</h2>
        </div>
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-nowrap text-white tracking-[-0.48px]">
          <h2 className="block leading-[1.1]">XL</h2>
        </div>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.5)] left-[46.83px] rounded-[12px] top-[374px]">
      <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[16px] py-[24px] relative rounded-[inherit]">
        <Frame39 />
        <Frame40 />
        <Frame41 />
        <Frame42 />
        <div className="absolute left-[317.17px] size-[131px] top-[-86px]">
          <div className="absolute inset-[-34.35%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 221 221">
              <g filter="url(#filter0_f_6_7033)" id="Ellipse 1">
                <circle cx="110.5" cy="110.5" fill="var(--fill-0, white)" r="65.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="221" id="filter0_f_6_7033" width="221" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7033" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute left-[-86.83px] size-[109px] top-[32px]">
          <div className="absolute inset-[-41.28%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 199 199">
              <g filter="url(#filter0_f_6_7051)" id="Ellipse 2">
                <circle cx="99.5" cy="99.5" fill="var(--fill-0, white)" r="54.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="199" id="filter0_f_6_7051" width="199" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7051" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame">
          <path d={svgPaths.p3c552570} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p156bd200} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p3f700600} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame44() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center px-0 py-[16px] relative rounded-[12px] shrink-0 w-full">
      <Frame8 />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative text-[32px] text-black text-center text-nowrap tracking-[-0.64px]">
          <h2 className="block leading-[1.1]">Add to cart</h2>
        </div>
      </div>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <Frame44 />
    </div>
  );
}

function Frame118() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Oxygen:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#404040] text-[22px] text-nowrap">Linen Straight Kurta</p>
    </div>
  );
}

function Frame104() {
  return (
    <div className="capitalize content-stretch flex font-['Oxygen:Regular',sans-serif] gap-[4px] items-start leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid line-through relative shrink-0 text-[#404040]">rs 5000.00</p>
      <p className="relative shrink-0 text-black">Rs4,500.00</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1cb7cc00} fill="var(--fill-0, #FFB900)" id="Vector" stroke="var(--stroke-0, #FFB900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.138px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.2px]">4.9</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[38.138px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon3 />
        <Text6 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[80.6px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[0.06px] not-italic text-[#737373] text-[14px] top-[-1.67px] w-[94px]">(127 reviews)</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-[113px]" data-name="Container">
      <Container6 />
      <Text7 />
    </div>
  );
}

function Frame127() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[259px]">
      <Frame104 />
      <Container7 />
    </div>
  );
}

function Frame105() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full">
      <Frame118 />
      <Frame127 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="h-[650px] relative rounded-[16px] shrink-0 w-[431px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={imgFrame13} />
      <div className="content-stretch flex flex-col gap-[14px] items-start justify-end overflow-clip px-[24px] py-[22px] relative rounded-[inherit] size-full">
        <Frame43 />
        <Frame45 />
        <Frame105 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c9ccd6] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center opacity-[0.48] px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">S</h2>
        </div>
      </div>
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">M</h2>
        </div>
      </div>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">L</h2>
        </div>
      </div>
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-nowrap text-white tracking-[-0.48px]">
          <h2 className="block leading-[1.1]">XL</h2>
        </div>
      </div>
    </div>
  );
}

function Frame51() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.5)] left-[46.83px] rounded-[12px] top-[374px]">
      <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[16px] py-[24px] relative rounded-[inherit]">
        <Frame47 />
        <Frame48 />
        <Frame49 />
        <Frame50 />
        <div className="absolute left-[317.17px] size-[131px] top-[-86px]">
          <div className="absolute inset-[-34.35%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 221 221">
              <g filter="url(#filter0_f_6_7033)" id="Ellipse 1">
                <circle cx="110.5" cy="110.5" fill="var(--fill-0, white)" r="65.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="221" id="filter0_f_6_7033" width="221" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7033" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute left-[-86.83px] size-[109px] top-[32px]">
          <div className="absolute inset-[-41.28%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 199 199">
              <g filter="url(#filter0_f_6_7051)" id="Ellipse 2">
                <circle cx="99.5" cy="99.5" fill="var(--fill-0, white)" r="54.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="199" id="filter0_f_6_7051" width="199" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7051" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Frame52() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame">
          <path d={svgPaths.p3c552570} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p156bd200} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p3f700600} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame53() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center px-0 py-[16px] relative rounded-[12px] shrink-0 w-full">
      <Frame52 />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative text-[32px] text-black text-center text-nowrap tracking-[-0.64px]">
          <h2 className="block leading-[1.1]">Add to cart</h2>
        </div>
      </div>
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <Frame53 />
    </div>
  );
}

function Frame119() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Oxygen:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#404040] text-[22px] text-nowrap">Chikan Embroidered Kurta</p>
    </div>
  );
}

function Frame106() {
  return (
    <div className="capitalize content-stretch flex font-['Oxygen:Regular',sans-serif] gap-[4px] items-start leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid line-through relative shrink-0 text-[#404040]">rs2300.00</p>
      <p className="relative shrink-0 text-black">rs2000.00</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1cb7cc00} fill="var(--fill-0, #FFB900)" id="Vector" stroke="var(--stroke-0, #FFB900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.138px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.2px]">4.9</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[38.138px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon4 />
        <Text8 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[80.6px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[0.06px] not-italic text-[#737373] text-[14px] top-[-1.67px] w-[94px]">(127 reviews)</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-[113px]" data-name="Container">
      <Container8 />
      <Text9 />
    </div>
  );
}

function Frame128() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[259px]">
      <Frame106 />
      <Container9 />
    </div>
  );
}

function Frame107() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full">
      <Frame119 />
      <Frame128 />
    </div>
  );
}

function Frame55() {
  return (
    <div className="h-[650px] relative rounded-[16px] shrink-0 w-[431px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={imgFrame13} />
      <div className="content-stretch flex flex-col gap-[14px] items-start justify-end overflow-clip px-[24px] py-[22px] relative rounded-[inherit] size-full">
        <Frame51 />
        <Frame54 />
        <Frame107 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c9ccd6] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center opacity-[0.48] px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">S</h2>
        </div>
      </div>
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">M</h2>
        </div>
      </div>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">L</h2>
        </div>
      </div>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-nowrap text-white tracking-[-0.48px]">
          <h2 className="block leading-[1.1]">XL</h2>
        </div>
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.5)] left-[46.83px] rounded-[12px] top-[374px]">
      <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[16px] py-[24px] relative rounded-[inherit]">
        <Frame56 />
        <Frame57 />
        <Frame58 />
        <Frame59 />
        <div className="absolute left-[317.17px] size-[131px] top-[-86px]">
          <div className="absolute inset-[-34.35%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 221 221">
              <g filter="url(#filter0_f_6_7033)" id="Ellipse 1">
                <circle cx="110.5" cy="110.5" fill="var(--fill-0, white)" r="65.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="221" id="filter0_f_6_7033" width="221" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7033" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute left-[-86.83px] size-[109px] top-[32px]">
          <div className="absolute inset-[-41.28%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 199 199">
              <g filter="url(#filter0_f_6_7051)" id="Ellipse 2">
                <circle cx="99.5" cy="99.5" fill="var(--fill-0, white)" r="54.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="199" id="filter0_f_6_7051" width="199" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7051" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Frame61() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame">
          <path d={svgPaths.p3c552570} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p156bd200} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p3f700600} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame62() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center px-0 py-[16px] relative rounded-[12px] shrink-0 w-full">
      <Frame61 />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative text-[32px] text-black text-center text-nowrap tracking-[-0.64px]">
          <h2 className="block leading-[1.1]">Add to cart</h2>
        </div>
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <Frame62 />
    </div>
  );
}

function Frame120() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Oxygen:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#404040] text-[22px] text-nowrap">Pathani Style Kurta</p>
    </div>
  );
}

function Frame108() {
  return (
    <div className="capitalize content-stretch flex font-['Oxygen:Regular',sans-serif] gap-[4px] items-start leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid line-through relative shrink-0 text-[#404040]">rs2300.00</p>
      <p className="relative shrink-0 text-black">rs2000.00</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1cb7cc00} fill="var(--fill-0, #FFB900)" id="Vector" stroke="var(--stroke-0, #FFB900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.138px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.2px]">4.9</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[38.138px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon5 />
        <Text10 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[80.6px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[0.06px] not-italic text-[#737373] text-[14px] top-[-1.67px] w-[94px]">(127 reviews)</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-[113px]" data-name="Container">
      <Container10 />
      <Text11 />
    </div>
  );
}

function Frame129() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[259px]">
      <Frame108 />
      <Container11 />
    </div>
  );
}

function Frame109() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full">
      <Frame120 />
      <Frame129 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="h-[650px] relative rounded-[16px] shrink-0 w-[431px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={imgFrame13} />
      <div className="content-stretch flex flex-col gap-[14px] items-start justify-end overflow-clip px-[24px] py-[22px] relative rounded-[inherit] size-full">
        <Frame60 />
        <Frame63 />
        <Frame109 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c9ccd6] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full">
      <Frame46 />
      <Frame55 />
      <Frame64 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="bg-[#171717] content-stretch flex items-center justify-center px-[32px] py-[24px] relative rounded-[12px] shrink-0">
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative text-[32px] text-center text-nowrap text-white tracking-[-0.64px]">
          <h2 className="block leading-[1.1]">View all Products</h2>
        </div>
      </div>
    </div>
  );
}

function KurtaPajma({ onPriceClick }: { onPriceClick?: () => void }) {
  return (
    <div className="relative shrink-0 w-full" data-name="kurta pajma">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[48px] items-center justify-center px-[64px] py-0 relative w-full">
          <Header3 />
          <div className="w-full max-w-[1312px] grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            <ProductCard
              id="kurta-1"
              name="Coal Black Schiffli Kurta Pajama"
              price={2800}
              originalPrice={3500}
              discount={20}
              image={imgBlackKurta}
              category="Kurta Pajama"
              description="Elegant black kurta with schiffli work"
              modelPath="/models/product3/sample5.gltf"
              onClick={onPriceClick}
            />
            <ProductCard
              id="kurta-2"
              name="White Cotton Kurta Pajama"
              price={2200}
              image={imgWhiteKurta}
              category="Kurta Pajama"
              description="Classic white cotton for everyday comfort"
              modelPath="/models/product4/sample8.gltf"
              onClick={onPriceClick}
            />
            <ProductCard
              id="kurta-3"
              name="Designer Kurta Pajama"
              price={3500}
              image={imgFrame6}
              category="Kurta Pajama"
              description="Premium designer wear for special occasions"
              modelPath="/models/product5/sample4.gltf"
              onClick={onPriceClick}
            />
          </div>
          <Frame66 />
        </div>
      </div>
    </div>
  );
}

function Header4() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center justify-center leading-[0] not-italic relative shrink-0 text-nowrap" data-name="Header">
      <div className="flex flex-col items-center gap-[12px] w-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center relative shrink-0 text-[#111827] text-[52px] tracking-[-1px]">
          <h2 className="leading-[1.2] text-nowrap">Fabric</h2>
        </div>
        <div className="h-[2px] w-[80px] bg-[#d1d5db] rounded-full"></div>
      </div>
      <motion.div
        className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[18px] text-[#111827] tracking-[-0.36px]"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="[text-underline-position:from-font] block decoration-solid leading-[1.2] text-nowrap underline cursor-pointer">View all Categories</h3>
      </motion.div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center opacity-[0.48] px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">S</h2>
        </div>
      </div>
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">M</h2>
        </div>
      </div>
    </div>
  );
}

function Frame69() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">L</h2>
        </div>
      </div>
    </div>
  );
}

function Frame70() {
  return (
    <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-nowrap text-white tracking-[-0.48px]">
          <h2 className="block leading-[1.1]">XL</h2>
        </div>
      </div>
    </div>
  );
}

function Frame71() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.5)] left-[46.83px] rounded-[12px] top-[374px]">
      <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[16px] py-[24px] relative rounded-[inherit]">
        <Frame67 />
        <Frame68 />
        <Frame69 />
        <Frame70 />
        <div className="absolute left-[317.17px] size-[131px] top-[-86px]">
          <div className="absolute inset-[-34.35%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 221 221">
              <g filter="url(#filter0_f_6_7033)" id="Ellipse 1">
                <circle cx="110.5" cy="110.5" fill="var(--fill-0, white)" r="65.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="221" id="filter0_f_6_7033" width="221" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7033" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute left-[-86.83px] size-[109px] top-[32px]">
          <div className="absolute inset-[-41.28%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 199 199">
              <g filter="url(#filter0_f_6_7051)" id="Ellipse 2">
                <circle cx="99.5" cy="99.5" fill="var(--fill-0, white)" r="54.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="199" id="filter0_f_6_7051" width="199" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7051" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Frame72() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame">
          <path d={svgPaths.p3c552570} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p156bd200} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p3f700600} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame73() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center px-0 py-[16px] relative rounded-[12px] shrink-0 w-full">
      <Frame72 />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative text-[32px] text-black text-center text-nowrap tracking-[-0.64px]">
          <h2 className="block leading-[1.1]">Add to cart</h2>
        </div>
      </div>
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <Frame73 />
    </div>
  );
}

function Frame121() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Oxygen:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#404040] text-[22px] text-nowrap">Pure Banarasi Silk (Gold)</p>
    </div>
  );
}

function Frame110() {
  return (
    <div className="capitalize content-stretch flex font-['Oxygen:Regular',sans-serif] gap-[4px] items-start leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid line-through relative shrink-0 text-[#404040]">rs2300.00</p>
      <p className="relative shrink-0 text-black">rs2000.00</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1cb7cc00} fill="var(--fill-0, #FFB900)" id="Vector" stroke="var(--stroke-0, #FFB900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.138px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.2px]">4.9</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[38.138px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon6 />
        <Text12 />
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[80.6px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[0.06px] not-italic text-[#737373] text-[14px] top-[-1.67px] w-[94px]">(127 reviews)</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-[113px]" data-name="Container">
      <Container12 />
      <Text13 />
    </div>
  );
}

function Frame130() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[259px]">
      <Frame110 />
      <Container13 />
    </div>
  );
}

function Frame111() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full">
      <Frame121 />
      <Frame130 />
    </div>
  );
}

function Frame75() {
  return (
    <div className="h-[650px] relative rounded-[16px] shrink-0 w-[431px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={imgFrame14} />
      <div className="content-stretch flex flex-col gap-[14px] items-start justify-end overflow-clip px-[24px] py-[22px] relative rounded-[inherit] size-full">
        <Frame71 />
        <Frame74 />
        <Frame111 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c9ccd6] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center opacity-[0.48] px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">S</h2>
        </div>
      </div>
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">M</h2>
        </div>
      </div>
    </div>
  );
}

function Frame78() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">L</h2>
        </div>
      </div>
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-nowrap text-white tracking-[-0.48px]">
          <h2 className="block leading-[1.1]">XL</h2>
        </div>
      </div>
    </div>
  );
}

function Frame80() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.5)] left-[46.83px] rounded-[12px] top-[374px]">
      <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[16px] py-[24px] relative rounded-[inherit]">
        <Frame76 />
        <Frame77 />
        <Frame78 />
        <Frame79 />
        <div className="absolute left-[317.17px] size-[131px] top-[-86px]">
          <div className="absolute inset-[-34.35%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 221 221">
              <g filter="url(#filter0_f_6_7033)" id="Ellipse 1">
                <circle cx="110.5" cy="110.5" fill="var(--fill-0, white)" r="65.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="221" id="filter0_f_6_7033" width="221" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7033" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute left-[-86.83px] size-[109px] top-[32px]">
          <div className="absolute inset-[-41.28%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 199 199">
              <g filter="url(#filter0_f_6_7051)" id="Ellipse 2">
                <circle cx="99.5" cy="99.5" fill="var(--fill-0, white)" r="54.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="199" id="filter0_f_6_7051" width="199" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7051" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Frame81() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame">
          <path d={svgPaths.p3c552570} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p156bd200} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p3f700600} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame82() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center px-0 py-[16px] relative rounded-[12px] shrink-0 w-full">
      <Frame81 />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative text-[32px] text-black text-center text-nowrap tracking-[-0.64px]">
          <h2 className="block leading-[1.1]">Add to cart</h2>
        </div>
      </div>
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <Frame82 />
    </div>
  );
}

function Frame122() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Oxygen:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#404040] text-[22px] text-nowrap">Premium Cotton Linen Blend</p>
    </div>
  );
}

function Frame112() {
  return (
    <div className="capitalize content-stretch flex font-['Oxygen:Regular',sans-serif] gap-[4px] items-start leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid line-through relative shrink-0 text-[#404040]">rs2300.00</p>
      <p className="relative shrink-0 text-black">rs2000.00</p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1cb7cc00} fill="var(--fill-0, #FFB900)" id="Vector" stroke="var(--stroke-0, #FFB900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.138px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.2px]">4.9</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[38.138px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon7 />
        <Text14 />
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[80.6px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[0.06px] not-italic text-[#737373] text-[14px] top-[-1.67px] w-[94px]">(127 reviews)</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-[113px]" data-name="Container">
      <Container14 />
      <Text15 />
    </div>
  );
}

function Frame131() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[259px]">
      <Frame112 />
      <Container15 />
    </div>
  );
}

function Frame113() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full">
      <Frame122 />
      <Frame131 />
    </div>
  );
}

function Frame84() {
  return (
    <div className="h-[650px] relative rounded-[16px] shrink-0 w-[431px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={imgFrame14} />
      <div className="content-stretch flex flex-col gap-[14px] items-start justify-end overflow-clip px-[24px] py-[22px] relative rounded-[inherit] size-full">
        <Frame80 />
        <Frame83 />
        <Frame113 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c9ccd6] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame85() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center opacity-[0.48] px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">S</h2>
        </div>
      </div>
    </div>
  );
}

function Frame86() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">M</h2>
        </div>
      </div>
    </div>
  );
}

function Frame87() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-white tracking-[-0.48px] w-full">
          <h2 className="block leading-[1.1]">L</h2>
        </div>
      </div>
    </div>
  );
}

function Frame88() {
  return (
    <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative rounded-[12px] shrink-0">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative text-[24px] text-center text-nowrap text-white tracking-[-0.48px]">
          <h2 className="block leading-[1.1]">XL</h2>
        </div>
      </div>
    </div>
  );
}

function Frame89() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.5)] left-[46.83px] rounded-[12px] top-[374px]">
      <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[16px] py-[24px] relative rounded-[inherit]">
        <Frame85 />
        <Frame86 />
        <Frame87 />
        <Frame88 />
        <div className="absolute left-[317.17px] size-[131px] top-[-86px]">
          <div className="absolute inset-[-34.35%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 221 221">
              <g filter="url(#filter0_f_6_7033)" id="Ellipse 1">
                <circle cx="110.5" cy="110.5" fill="var(--fill-0, white)" r="65.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="221" id="filter0_f_6_7033" width="221" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7033" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute left-[-86.83px] size-[109px] top-[32px]">
          <div className="absolute inset-[-41.28%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 199 199">
              <g filter="url(#filter0_f_6_7051)" id="Ellipse 2">
                <circle cx="99.5" cy="99.5" fill="var(--fill-0, white)" r="54.5" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="199" id="filter0_f_6_7051" width="199" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_6_7051" stdDeviation="22.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Frame90() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame">
          <path d={svgPaths.p3c552570} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p156bd200} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p3f700600} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame91() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center px-0 py-[16px] relative rounded-[12px] shrink-0 w-full">
      <Frame90 />
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative text-[32px] text-black text-center text-nowrap tracking-[-0.64px]">
          <h2 className="block leading-[1.1]">Add to cart</h2>
        </div>
      </div>
    </div>
  );
}

function Frame92() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <Frame91 />
    </div>
  );
}

function Frame123() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Oxygen:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#404040] text-[22px] text-nowrap">Wedding Velvet Fabric</p>
    </div>
  );
}

function Frame114() {
  return (
    <div className="capitalize content-stretch flex font-['Oxygen:Regular',sans-serif] gap-[4px] items-start leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid line-through relative shrink-0 text-[#404040]">rs2300.00</p>
      <p className="relative shrink-0 text-black">rs2000.00</p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1cb7cc00} fill="var(--fill-0, #FFB900)" id="Vector" stroke="var(--stroke-0, #FFB900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.138px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-1.2px]">4.9</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[20px] relative shrink-0 w-[38.138px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon8 />
        <Text16 />
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[20px] relative shrink-0 w-[80.6px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[0.06px] not-italic text-[#737373] text-[14px] top-[-1.67px] w-[94px]">(127 reviews)</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-[113px]" data-name="Container">
      <Container16 />
      <Text17 />
    </div>
  );
}

function Frame132() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[259px]">
      <Frame114 />
      <Container17 />
    </div>
  );
}

function Frame115() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full">
      <Frame123 />
      <Frame132 />
    </div>
  );
}

function Frame93() {
  return (
    <div className="h-[650px] relative rounded-[16px] shrink-0 w-[431px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={imgFrame14} />
      <div className="content-stretch flex flex-col gap-[14px] items-start justify-end overflow-clip px-[24px] py-[22px] relative rounded-[inherit] size-full">
        <Frame89 />
        <Frame92 />
        <Frame115 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c9ccd6] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame94() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full">
      <Frame75 />
      <Frame84 />
      <Frame93 />
    </div>
  );
}

function Frame95() {
  return (
    <div className="bg-[#171717] content-stretch flex items-center justify-center px-[32px] py-[24px] relative rounded-[12px] shrink-0">
      <div className="code-behavior-wrapper flex relative shrink-0 tailwind">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative text-[32px] text-center text-nowrap text-white tracking-[-0.64px]">
          <h2 className="block leading-[1.1]">View all Products</h2>
        </div>
      </div>
    </div>
  );
}

function Fabric({ onPriceClick }: { onPriceClick?: () => void }) {
  return (
    <div className="relative shrink-0 w-full" data-name="fabric">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[48px] items-center justify-center px-[64px] py-0 relative w-full">
          <Header4 />
          <div className="w-full max-w-[1312px] grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            <ProductCard
              id="fabric-1"
              name="Pure Linen Unstitched Fabric"
              price={2600}
              originalPrice={3000}
              discount={40}
              image={imgSectionRight}
              category="Fabric"
              description="Breathable, premium white linen. Perfect for crafting your custom summer Kurta."
              modelPath="/models/product5/sample4.gltf"
              onClick={onPriceClick}
            />
            <ProductCard
              id="fabric-2"
              name="Premium Cotton Fabric"
              price={1800}
              image={imgFrame9}
              category="Fabric"
              description="High-quality cotton fabric for tailoring"
              modelPath="/models/product1/sample1.gltf"
              onClick={onPriceClick}
            />
            <ProductCard
              id="fabric-3"
              name="Silk Blend Fabric"
              price={4500}
              image={imgFrame11}
              category="Fabric"
              description="Luxurious silk blend for special garments"
              modelPath="/models/product2/sample1.gltf"
              onClick={onPriceClick}
            />
          </div>
          <Frame95 />
        </div>
      </div>
    </div>
  );
}

function Frame136() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[40px] shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[40px] size-full" src={imgBlackKurta} />
    </div>
  );
}

function Frame137() {
  return (
    <div className="bg-[#eee] content-stretch flex flex-col h-[496px] items-center justify-center px-[80px] py-[100px] relative rounded-[40px] shrink-0 w-[672px]">
      <Frame136 />
    </div>
  );
}

function Frame134() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-end leading-[0] not-italic relative shrink-0 text-[#6b4f3f] text-[64px] w-[543px]">
        <p className="leading-[72px]">Find Your Perfect Tailor</p>
      </div>
    </div>
  );
}

function Frame135() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame134 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] min-w-full not-italic relative shrink-0 text-[#6b7280] text-[20px] w-[min-content]">
        <p className="leading-[28px]">Connect with skilled local artisans. Get expert alterations or create a custom piece from scratch.</p>
      </div>
    </div>
  );
}

function Button2({ onClick }: { onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="bg-[#171717] content-stretch cursor-pointer flex flex-col items-center justify-center px-[32px] py-[16px] relative rounded-[4px] shrink-0 transition-all duration-300"
      data-name="button"
      whileHover={{ scale: 1.05, backgroundColor: "#2d2d2d" }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white">
        <p className="leading-[24px]">Discover Tailors</p>
      </div>
    </motion.button>
  );
}

function Frame133({ onNavigateToLogin }: { onNavigateToLogin?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start justify-center relative shrink-0">
      <Frame135 />
      <Button2 onClick={onNavigateToLogin} />
    </div>
  );
}

function TailorDiscoveryAndProfilePages({ onNavigateToLogin }: { onNavigateToLogin?: () => void }) {
  return (
    <motion.div
      className="bg-[#f7f8fa] content-stretch flex gap-[97px] h-[748px] items-center overflow-clip px-[64px] py-0 relative shrink-0 w-[1440px]"
      data-name="Tailor Discovery and Profile Pages"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Frame137 />
      <Frame133 onNavigateToLogin={onNavigateToLogin} />
    </motion.div>
  );
}

function Text18() {
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

function Container18() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[496px]" data-name="Container">
      <Text18 />
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

function Icon9() {
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
        <Icon9 />
      </div>
    </div>
  );
}

function Icon10() {
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
        <Icon10 />
      </div>
    </div>
  );
}

function Icon11() {
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
        <Icon11 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-start left-0 top-[158px] w-[496px]" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[210.5px] left-0 top-0 w-[496px]" data-name="Container">
      <Container18 />
      <Paragraph />
      <Container19 />
    </div>
  );
}

function Heading1() {
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
    <button className="absolute content-stretch cursor-pointer flex h-[20px] items-start left-0 p-0 top-[2.67px] w-[81.563px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[22.5px] not-italic relative shrink-0 text-[#5a6c57] text-[15px] text-left text-nowrap">Marketplace</p>
    </button>
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

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[210.5px] items-start left-[544px] top-0 w-[224px]" data-name="Container">
      <Heading1 />
      <List />
    </div>
  );
}

function Heading2() {
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

function Link9({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="absolute content-stretch cursor-pointer flex h-[20px] items-start left-0 top-[2.67px] w-[52.156px]" data-name="Link">
      <p className="font-['Arial:Regular',sans-serif] leading-[22.5px] not-italic relative shrink-0 text-[#5a6c57] text-[15px] text-nowrap hover:underline">Sign Up</p>
    </button>
  );
}

function ListItem6({ onClick }: { onClick?: () => void }) {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="List Item">
      <Link9 onClick={onClick} />
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

function Link11({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="absolute content-stretch flex h-[20px] items-start left-0 top-[2.67px] w-[42.219px] cursor-pointer hover:underline"
      data-name="Link"
      onClick={onClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <p className="font-['Arial:Regular',sans-serif] leading-[22.5px] not-italic relative shrink-0 text-[#5a6c57] text-[15px] text-nowrap">Profile</p>
    </div>
  );
}

function ListItem8({ onNavigateToProfile }: { onNavigateToProfile?: () => void }) {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="List Item">
      <Link11 onClick={onNavigateToProfile} />
    </div>
  );
}

function List1({ onNavigateToSignUp, onNavigateToProfile }: { onNavigateToSignUp?: () => void; onNavigateToProfile?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[170.5px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem5 />
      <ListItem6 onClick={onNavigateToSignUp} />
      <ListItem7 />
      <ListItem8 onNavigateToProfile={onNavigateToProfile} />
    </div>
  );
}

function Container22({ onNavigateToSignUp, onNavigateToProfile }: { onNavigateToSignUp?: () => void; onNavigateToProfile?: () => void }) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[210.5px] items-start left-[816px] top-0 w-[224px]" data-name="Container">
      <Heading2 />
      <List1 onNavigateToSignUp={onNavigateToSignUp} onNavigateToProfile={onNavigateToProfile} />
    </div>
  );
}

function Heading3() {
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

function Icon12() {
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

function Text19() {
  return (
    <div className="h-[24px] relative shrink-0 w-[68.354px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-[34px] not-italic text-[16px] text-center text-nowrap text-white top-[-1.67px] translate-x-[-50%]">Subscribe</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#2d5f3f] h-[44px] relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center relative size-full">
          <Icon12 />
          <Text19 />
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[101.333px] items-start relative shrink-0 w-full" data-name="Container">
      <EmailInput />
      <Button3 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[210.5px] items-start left-[1088px] top-0 w-[224px]" data-name="Container">
      <Heading3 />
      <Paragraph1 />
      <Container23 />
    </div>
  );
}

function Container25({ onNavigateToSignUp, onNavigateToProfile }: { onNavigateToSignUp?: () => void; onNavigateToProfile?: () => void }) {
  return (
    <div className="h-[210.5px] relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container21 />
      <Container22 onNavigateToSignUp={onNavigateToSignUp} onNavigateToProfile={onNavigateToProfile} />
      <Container24 />
    </div>
  );
}

function Container26() {
  return <div className="absolute border-[#1f2933] border-[0.667px_0px_0px] border-solid h-[0.667px] left-0 top-[3.67px] w-[1312px]" data-name="Container" />;
}

function Container27() {
  return <div className="absolute h-[8px] left-[608px] rounded-[2.23696e+07px] top-0 w-[96px]" data-name="Container" style={{ backgroundImage: "linear-gradient(rgb(45, 95, 63) 0%, rgb(212, 175, 55) 100%), linear-gradient(90deg, rgb(31, 41, 51) 0%, rgb(31, 41, 51) 100%)" }} />;
}

function Container28() {
  return (
    <div className="h-[8px] relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <Container27 />
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

function Container29() {
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

function Container30() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph2 />
      <Container29 />
    </div>
  );
}

function Container31({ onNavigateToSignUp, onNavigateToProfile }: { onNavigateToSignUp?: () => void; onNavigateToProfile?: () => void }) {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[48px] items-center pb-0 pt-[64px] px-[64px] relative w-full">
          <Container25 onNavigateToSignUp={onNavigateToSignUp} onNavigateToProfile={onNavigateToProfile} />
          <Container28 />
          <Container30 />
        </div>
      </div>
    </div>
  );
}

function Footer({ onNavigateToSignUp, onNavigateToProfile }: { onNavigateToSignUp?: () => void; onNavigateToProfile?: () => void }) {
  return (
    <div className="bg-[#e8dcc8] content-stretch flex flex-col h-[451.167px] items-start pb-0 pt-[0.667px] px-[5px] relative shrink-0 w-[1450px]" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#d4c8b7] border-[0.667px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container31 onNavigateToSignUp={onNavigateToSignUp} onNavigateToProfile={onNavigateToProfile} />
    </div>
  );
}

function Footer1({ onNavigateToSignUp, onNavigateToProfile }: { onNavigateToSignUp?: () => void; onNavigateToProfile?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="footer">
      <Footer onNavigateToSignUp={onNavigateToSignUp} onNavigateToProfile={onNavigateToProfile} />
    </div>
  );
}

export default function LandingPage({
  onNavigateToSignUp,
  onNavigateToLogin,
  onNavigateToCart,
  onNavigateToProfile,
  onNavigateToChat,
  onNavigateToDiscovery,
  onNavigateToMeasurement,
  onNavigateToProduct
}: LandingPageProps) {

  return (
    <div className="bg-white min-h-screen flex flex-col items-center w-full" data-name="Landing page 6">
      {/* Main content: grows so footer stays at bottom */}
      <div className="flex-grow w-full flex flex-col items-center flex-shrink-0">
        <Hero onNavigateToSignUp={onNavigateToSignUp} onNavigateToMeasurement={onNavigateToMeasurement} />
        <div className="relative shrink-0 w-full" data-name="trending">
          <ShalwarKemez onPriceClick={onNavigateToProduct} />
        </div>
        <div className="relative shrink-0 w-full" data-name="featured">
          <KurtaPajma onPriceClick={onNavigateToProduct} />
        </div>
        <Fabric onPriceClick={onNavigateToProduct} />
        <TailorDiscoveryAndProfilePages onNavigateToLogin={onNavigateToLogin} />
      </div>
      {/* Footer always at bottom below all content */}
      <footer className="w-full shrink-0 mt-auto">
        <Footer1 onNavigateToSignUp={onNavigateToSignUp} onNavigateToProfile={onNavigateToProfile} />
      </footer>
      <ChatWidget />
    </div>
  );
}