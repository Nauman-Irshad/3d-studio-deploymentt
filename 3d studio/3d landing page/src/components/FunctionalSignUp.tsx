import SignUp1 from '../pages/SignUp-6-7693';

interface FunctionalSignUpProps {
  onNavigateToLogin: () => void;
  onNavigateToLanding: () => void;
  onSignUp?: () => void;
}

export default function FunctionalSignUp({
  onNavigateToLogin,
  onNavigateToLanding,
  onSignUp,
}: FunctionalSignUpProps) {
  return (
    <SignUp1
      onNavigateToLogin={onNavigateToLogin}
      onNavigateToLanding={onNavigateToLanding}
      onSignUp={onSignUp}
    />
  );
}
