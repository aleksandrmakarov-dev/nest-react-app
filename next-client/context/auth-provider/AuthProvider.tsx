"use client";
import { UserDataDto } from "@/lib/dto/auth/user-data.dto";
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

interface AuthContextData {
  user: UserDataDto | null;
  setUser: Dispatch<SetStateAction<UserDataDto | null>>;
  isLoading?: boolean;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  setUser: () => {},
  isLoading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const { mutate, isPending } = useRefreshToken();
  const [user, setUser] = useState<UserDataDto | null>(null);

  useEffect(() => {
    mutate(
      {},
      {
        onSuccess: (value) => {
          setUser(value);
        },
      }
    );
  }, []);

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
