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
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  setUser: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const { mutate, isPending, isError, error } = useRefreshToken();
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

    console.log(user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext<AuthContextData>(AuthContext);
};
