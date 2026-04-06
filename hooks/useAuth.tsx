"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SignupData } from "@/lib/types/auth";

export type Role = "admin" | "teacher" | "student";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

type LoginResponse = {
  token: string;
  user: User;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (data: SignupData) => Promise<void>;
  demoLogin: (role: Role) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("auth_token");

    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("auth_token");
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    let data: LoginResponse | any = null;

    try {
      data = await res.json();
    } catch {
      // no json response
    }

    if (!res.ok) {
      throw new Error(data?.message || "Invalid email or password");
    }

    if (!data?.token || !data?.user) {
      throw new Error("Invalid login response from server");
    }

    const token = data.token;
    const user = data.user;

    // normalize role
    user.role = String(user.role).toLowerCase() as Role;

    // allow only admin / teacher / student
    if (!["admin", "teacher", "student"].includes(user.role)) {
      throw new Error("User role is invalid");
    }

    // save auth
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    document.cookie = `auth_token=${token}; path=/; SameSite=Lax`;

    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    setUser(null);
    window.location.href = "/login";
  };

  const signup = async (data: SignupData): Promise<void> => {
    const { confirmPassword, ...body } = data;
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let result: any = null;
    try {
      result = await res.json();
    } catch {}

    if (!res.ok) {
      throw new Error(result?.message || "Registration failed");
    }

    window.location.href = "/login?registered=true";
  };

  const demoLogin = async (role: Role) => {
    const demoUser: User = {
      id: `demo-${role}`,
      name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      email: `demo.${role}@assignbridge.com`,
      role,
    };
    const demoToken = `demo-token-${role}`;

    localStorage.setItem("auth_token", demoToken);
    localStorage.setItem("user", JSON.stringify(demoUser));
    document.cookie = `auth_token=${demoToken}; path=/; SameSite=Lax`;

    setUser(demoUser);

    switch (role) {
      case "admin":
        window.location.href = "/admin";
        break;
      case "teacher":
        window.location.href = "/teacher";
        break;
      case "student":
        window.location.href = "/student";
        break;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        demoLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}