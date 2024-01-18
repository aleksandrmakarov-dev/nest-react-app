"use client";
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
import { useRefreshToken } from "@/components/features/auth/refresh-token/refreshTokenApi";
import { removeSession, setSession } from "@/session";

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
  session: SessionDto | null;
  children: React.ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const { mutate, isPending } = useRefreshToken();
  const [session, setSession] = useState<SessionDto | null>(props.session);

  // useEffect(() => {
  //   mutate(
  //     {},
  //     {
  //       onSuccess: (value) => {
  //         setUser(value);
  //       },
  //     }
  //   );
  // }, []);

  useEffect(() => {
    if (session) {
      axios.interceptors.request.use(
        (config) => {
          if (!config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${session.accessToken}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );
    } else {
      ("use server");
      removeSession();
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{ session: session, setSession: setSession, isLoading: isPending }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext<AuthContextData>(AuthContext);
};
