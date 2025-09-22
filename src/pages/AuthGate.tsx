import { useAuth } from "@/contexts/AuthContext";
import Login from "./Login";

interface AuthGateProps {
  children: React.ReactNode;
}

const AuthGate = ({ children }: AuthGateProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return <>{children}</>;
};

export default AuthGate;