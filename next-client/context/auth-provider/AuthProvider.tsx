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
  user: SessionDto | null;
  setUser: Dispatch<SetStateAction<SessionDto | null>>;
  isLoading?: boolean;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  setUser: () => {},
  isLoading: false,
});

interface AuthProviderProps {
  session: SessionDto | null;
  children: React.ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const { mutate, isPending } = useRefreshToken();
  const [user, setUser] = useState<SessionDto | null>(props.session);

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
    if (user) {
      axios.interceptors.request.use(
        (config) => {
          if (!config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${user.accessToken}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );
    } else {
      ("use server");
      removeSession();
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user: user, setUser: setUser, isLoading: isPending }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext<AuthContextData>(AuthContext);
};
