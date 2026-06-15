import Login from '../pages/Login-6-7925';

interface FunctionalLoginProps {
  onNavigateToSignUp: () => void;
  onNavigateToLanding: () => void;
  onLogin?: () => void;
}

export default function FunctionalLogin({
  onNavigateToSignUp,
  onNavigateToLanding,
  onLogin,
}: FunctionalLoginProps) {
  return (
    <Login
      onNavigateToSignUp={onNavigateToSignUp}
      onNavigateToLanding={onNavigateToLanding}
      onLogin={onLogin}
    />
  );
}
