"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import axiosClient from "../config/axiosClient";
import {
  User,
  LoginCredentials,
  RegisterCredentials,
  GoogleAuthData,
} from "../types/user";

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  tempGoogleData: GoogleAuthData | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmailAndPassword: (credentials: LoginCredentials) => Promise<void>;
  registerWithEmailAndPassword: (
    credentials: RegisterCredentials
  ) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  setRoleForGoogleUser: (
    userData: GoogleAuthData,
    role: "client" | "owner"
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [tempGoogleData, setTempGoogleData] = useState<GoogleAuthData | null>(
    null
  );

  const isAuthenticated = !!user;

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const idToken = localStorage.getItem("idToken");
        const firebaseUid = localStorage.getItem("firebaseUid");

        if (!idToken || !firebaseUid) {
          setIsLoading(false);
          setIsInitialized(true);
          return;
        }

        const response = await axiosClient.get("/auth/me", {
          headers: { Authorization: `Bearer ${idToken}` },
        });

        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        localStorage.removeItem("idToken");
        localStorage.removeItem("firebaseUid");
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    checkAuthStatus();
  }, []);

  const loginWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const firebaseUid = result.user.uid;
      const email = result.user.email;
      const name = result.user.displayName;
      const imageUrl = result.user.photoURL;

      const googleData = { idToken, firebaseUid, email, name, imageUrl };

      try {
        const response = await axiosClient.post(
          "/auth/google-login",
          googleData
        );

        if (response.status === 200 && response.data.user) {
          localStorage.setItem("idToken", idToken);
          localStorage.setItem("firebaseUid", firebaseUid);
          setUser(response.data.user);
          router.push("/");
        }
      } catch (error: unknown) {
        const axiosError = error as { response?: { status: number } };
        if (axiosError.response && axiosError.response.status === 404) {
          setTempGoogleData(googleData);
          router.push("/register/role-selection");
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error("Erro no login com Google:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const setRoleForGoogleUser = async (
    userData: GoogleAuthData,
    role: "client" | "owner"
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await axiosClient.post("/auth/google-login", {
        ...userData,
        role,
      });

      if (response.status === 200 && response.data.user) {
        localStorage.setItem("idToken", userData.idToken);
        localStorage.setItem("firebaseUid", userData.firebaseUid);
        setUser(response.data.user);
        setTempGoogleData(null);
        router.push("/");
      }
    } catch (error) {
      console.error("Erro ao definir role para usuário Google:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithEmailAndPassword = async (
    credentials: LoginCredentials
  ): Promise<void> => {
    setIsLoading(true);
    try {
      // Firebase authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const idToken = await userCredential.user.getIdToken();
      const firebaseUid = userCredential.user.uid;

      // Backend authentication
      const response = await axiosClient.post("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      if (response.status === 200) {
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("firebaseUid", firebaseUid);
        setUser(response.data.user);
        router.push("/");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerWithEmailAndPassword = async (
    credentials: RegisterCredentials
  ): Promise<void> => {
    setIsLoading(true);
    try {
      // Firebase registration
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const idToken = await userCredential.user.getIdToken();
      const firebaseUid = userCredential.user.uid;

      // Backend registration
      const response = await axiosClient.post("/auth/register", {
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
        role: credentials.role,
        firebaseUid,
      });

      if (response.status === 201) {
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("firebaseUid", firebaseUid);
        setUser(response.data.user);
        router.push("/");
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem("idToken");
        localStorage.removeItem("firebaseUid");
        setUser(null);
        router.push("/login");
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
      });
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        tempGoogleData,
        loginWithGoogle,
        loginWithEmailAndPassword,
        registerWithEmailAndPassword,
        logout,
        updateUser,
        setRoleForGoogleUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
