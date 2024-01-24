import { SessionDto } from "@/lib/dto/auth/session.dto";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "@/lib/axios";
import { useRefreshToken } from "@/features/auth";

interface AuthContextData {
  session: SessionDto | null;
  setSession: Dispatch<SetStateAction<SessionDto | null>>;
  isLoading?: boolean;
}

const AuthContext = createContext<AuthContextData>({
  session: null,
  setSession: () => {},
  isLoading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const { mutate, isPending } = useRefreshToken();
  const [session, setSession] = useState<SessionDto | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!session) {
      mutate(
        {},
        {
          onSuccess: (value) => {
            setSession(value);
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    } else {
      axios.interceptors.request.use(
        (config) => {
          if (!config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${session.accessToken}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      setIsLoading(false);
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        session: session,
        setSession: setSession,
        isLoading: isLoading || isPending,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext<AuthContextData>(AuthContext);
};
