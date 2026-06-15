import svgPaths from "./svg-snkopjr46z";
import imgAuth01 from "@/assets/54369a03d8c325acf457527aed157ee096383f82.png";

// Props for navigation
interface SignUpProps {
  onNavigateToLogin: () => void;
  onNavigateToLanding: () => void;
  onSignUp?: () => void;
}

export default function SignUp1({ onNavigateToLogin, onNavigateToLanding, onSignUp }: SignUpProps) {
  const handleGetStarted = () => {
    if (onSignUp) {
      onSignUp();
    }
  };

  return (
    <div className="bg-white content-stretch flex flex-col items-center relative size-full" data-name="sign up" onClick={(e) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button');

      if (button) {
        const text = button.textContent?.trim().toLowerCase();
        if (text === 'get started') {
          e.preventDefault();
          handleGetStarted();
        }
      }
    }}>
      <SignUp onNavigateToLogin={onNavigateToLogin} />
      <Section1 />
    </div>
  );
}

function Logo() {
  return <div className="content-stretch flex items-start shrink-0" data-name="Logo" />;
}

function HeaderNavigation() {
  return (
    <div className="h-[96px] relative shrink-0 w-full" data-name="Header navigation">
      <div className="content-stretch flex items-start p-[32px] relative size-full">
        <Logo />
      </div>
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text and supporting text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[38px] not-italic relative shrink-0 text-[#181d27] text-[30px] w-full">Sign up</p>
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#717680] text-[16px]">Enter your name</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative w-full">
          <Content />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] text-nowrap">Name*</p>
      <Input />
    </div>
  );
}

function InputFieldBase() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="_Input field base">
      <InputWithLabel />
    </div>
  );
}

function InputField() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Input field">
      <InputFieldBase />
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#717680] text-[16px]">Enter your email</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative w-full">
          <Content1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function InputWithLabel1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] text-nowrap">Email*</p>
      <Input1 />
    </div>
  );
}

function InputFieldBase1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="_Input field base">
      <InputWithLabel1 />
    </div>
  );
}

function InputField1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Input field">
      <InputFieldBase1 />
    </div>
  );
}

function Content2() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#717680] text-[16px]">Create a password</p>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative w-full">
          <Content2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function InputWithLabel2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] text-nowrap">Password*</p>
      <Input2 />
    </div>
  );
}

function InputFieldBase2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="_Input field base">
      <InputWithLabel2 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px] w-full">Must be at least 8 characters.</p>
    </div>
  );
}

function InputField2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Input field">
      <InputFieldBase2 />
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Form">
      <InputField />
      <InputField1 />
      <InputField2 />
    </div>
  );
}

function ButtonBase() {
  return (
    <div className="basis-0 bg-[#03162a] grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="_Button base">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[18px] py-[10px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Create account</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#7f56d9] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <ButtonBase />
    </div>
  );
}

function SocialIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Social icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_6_6088)" id="Social icon">
          <path d={svgPaths.p7776880} fill="var(--fill-0, #4285F4)" id="Vector" />
          <path d={svgPaths.p2d84f580} fill="var(--fill-0, #34A853)" id="Vector_2" />
          <path d={svgPaths.p380d1d80} fill="var(--fill-0, #FBBC04)" id="Vector_3" />
          <path d={svgPaths.p1ebd4080} fill="var(--fill-0, #EA4335)" id="Vector_4" />
        </g>
        <defs>
          <clipPath id="clip0_6_6088">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SocialButton() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Social button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[10px] relative w-full">
          <SocialIcon />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#414651] text-[16px] text-nowrap">Sign up with Google</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function SocialButtonGroups() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 w-full" data-name="Social button groups">
      <SocialButton />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Actions">
      <Button />
      <SocialButtonGroups />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative rounded-[12px] shrink-0 w-full" data-name="Content">
      <Form />
      <Actions />
    </div>
  );
}

function ButtonBase1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="_Button base">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.87)] text-nowrap">Log in</p>
    </div>
  );
}

function Button1({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch cursor-pointer flex items-start relative shrink-0" data-name="Button">
      <ButtonBase1 />
    </button>
  );
}

function Row({ onNavigateToLogin }: { onNavigateToLogin?: () => void }) {
  return (
    <div className="content-stretch flex gap-[4px] items-start justify-center relative shrink-0 w-full" data-name="Row">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px] text-nowrap">Already have an account?</p>
      <Button1 onClick={onNavigateToLogin} />
    </div>
  );
}

function Content4({ onNavigateToLogin }: { onNavigateToLogin?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-[360px]" data-name="Content">
      <TextAndSupportingText />
      <Content3 />
      <Row onNavigateToLogin={onNavigateToLogin} />
    </div>
  );
}

function Container({ onNavigateToLogin }: { onNavigateToLogin?: () => void }) {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[32px] py-0 relative w-full">
          <Content4 onNavigateToLogin={onNavigateToLogin} />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="h-[96px] relative shrink-0 w-full" data-name="Footer">
      <div className="flex flex-row items-end size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Section({ onNavigateToLogin }: { onNavigateToLogin?: () => void }) {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-center justify-between min-h-px min-w-px relative shrink-0" data-name="Section">
      <HeaderNavigation />
      <Container onNavigateToLogin={onNavigateToLogin} />
      <Footer />
    </div>
  );
}

function Content5() {
  return <div className="absolute bottom-[56px] h-[38px] left-[56px] right-[56px]" data-name="Content" />;
}

function Section1() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative rounded-bl-[80px] rounded-tl-[80px] shrink-0" data-name="Section">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-bl-[80px] rounded-tl-[80px]">
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-bl-[80px] rounded-tl-[80px] size-full" src={imgSection} />
        <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] inset-0 rounded-bl-[80px] rounded-tl-[80px] to-[79.24%] to-[rgba(0,0,0,0.1)]" />
      </div>
      <Content5 />
    </div>
  );
}

function SignUp({ onNavigateToLogin }: { onNavigateToLogin?: () => void }) {
  return (
    <div className="bg-white content-stretch flex h-[960px] items-center relative shrink-0 w-full" data-name="Sign up">
      <Section onNavigateToLogin={onNavigateToLogin} />
      <Section1 />
    </div>
  );
}