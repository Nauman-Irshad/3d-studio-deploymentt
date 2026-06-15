import svgPaths from "./svg-hj5s48zpxa";

// Props for navigation
interface LoginProps {
  onNavigateToSignUp: () => void;
  onNavigateToLanding: () => void;
  onLogin?: () => void;
}

export default function Login({ onNavigateToSignUp, onNavigateToLanding, onLogin }: LoginProps) {
  const handleSignIn = () => {
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="bg-white content-stretch flex flex-col items-center relative size-full" data-name="login" onClick={(e) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button');
      
      if (button) {
        const text = button.textContent?.trim().toLowerCase();
        // Both "Sign in" and "Sign in with Google" use the same OAuth/login sequence
        if (text === 'sign in' || text.includes('sign in')) {
          e.preventDefault();
          handleSignIn();
        }
      }
    }}>
      <LogIn onNavigateToSignUp={onNavigateToSignUp} />
    </div>
  );
}

function Logomark() {
  return <div className="content-stretch flex items-start shrink-0" data-name="Logomark" />;
}

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start not-italic relative shrink-0 text-center w-full" data-name="Text and supporting text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[38px] relative shrink-0 text-[#181d27] text-[30px] w-full">Log in to your account</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#535862] text-[16px] w-full">Welcome back! Please enter your details.</p>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="Header">
      <Logomark />
      <TextAndSupportingText />
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#717680] text-[16px]">Enter your email</p>
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
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] text-nowrap">Email</p>
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
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#717680] text-[16px]">••••••••</p>
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
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] text-nowrap">Password</p>
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

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Form">
      <InputField />
      <InputField1 />
    </div>
  );
}

function CheckboxBase() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[16px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Checkbox">
      <CheckboxBase />
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Checkbox">
      <Checkbox />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] text-nowrap">Remember for 30 days</p>
    </div>
  );
}

function ButtonBase() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="_Button base">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#03162a] text-[14px] text-nowrap">Forgot password</p>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Button">
      <ButtonBase />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Row">
      <Checkbox1 />
      <Button />
    </div>
  );
}

function ButtonBase1() {
  return (
    <div className="basis-0 bg-[#03162a] grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="_Button base">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[18px] py-[10px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">Sign in</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#7f56d9] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex items-start relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <ButtonBase1 />
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
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#414651] text-[16px] text-nowrap">Sign in with Google</p>
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
      <Button1 />
      <SocialButtonGroups />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative rounded-[12px] shrink-0 w-full" data-name="Content">
      <Form />
      <Row />
      <Actions />
    </div>
  );
}

function ButtonBase2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="_Button base">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.56)] text-nowrap">Sign up</p>
    </div>
  );
}

function Button2({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch cursor-pointer flex items-start relative shrink-0" data-name="Button">
      <ButtonBase2 />
    </button>
  );
}

function Row1({ onNavigateToSignUp }: { onNavigateToSignUp?: () => void }) {
  return (
    <div className="content-stretch flex gap-[4px] items-start justify-center relative shrink-0 w-full" data-name="Row">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px] text-nowrap">Don't have an account?</p>
      <Button2 onClick={onNavigateToSignUp} />
    </div>
  );
}

function Content3({ onNavigateToSignUp }: { onNavigateToSignUp?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-[360px]" data-name="Content">
      <Header />
      <Content2 />
      <Row1 onNavigateToSignUp={onNavigateToSignUp} />
    </div>
  );
}

function LogIn({ onNavigateToSignUp }: { onNavigateToSignUp?: () => void }) {
  return (
    <div className="bg-white h-[960px] relative shrink-0 w-full" data-name="Log in">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[48px] pt-[96px] px-[32px] relative size-full">
          <Content3 onNavigateToSignUp={onNavigateToSignUp} />
        </div>
      </div>
    </div>
  );
}