"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { RegisterCredentials } from "../types/user";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { registerWithEmailAndPassword, isAuthenticated, isLoading } =
    useAuth();

  const defaultRole =
    (searchParams.get("role") as "client" | "owner") || "client";

  const [credentials, setCredentials] = useState<RegisterCredentials>({
    email: "",
    password: "",
    name: "",
    role: defaultRole,
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<
    "fraca" | "média" | "forte" | ""
  >("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (credentials.password) {
      const hasLowerCase = /[a-z]/.test(credentials.password);
      const hasUpperCase = /[A-Z]/.test(credentials.password);
      const hasNumbers = /\d/.test(credentials.password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(credentials.password);
      const isLongEnough = credentials.password.length >= 8;

      const strength = [
        hasLowerCase,
        hasUpperCase,
        hasNumbers,
        hasSpecial,
        isLongEnough,
      ].filter(Boolean).length;

      if (strength <= 2) {
        setPasswordStrength("fraca");
      } else if (strength <= 4) {
        setPasswordStrength("média");
      } else {
        setPasswordStrength("forte");
      }
    } else {
      setPasswordStrength("");
    }
  }, [credentials.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelection = (role: "client" | "owner") => {
    setCredentials((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validações
    if (credentials.password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (credentials.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsSubmitting(true);

    try {
      await registerWithEmailAndPassword(credentials);
    } catch (err: unknown) {
      let errorMessage = "Ocorreu um erro ao criar a conta";

      if (err instanceof Error) {
        if (err.message.includes("auth/email-already-in-use")) {
          errorMessage = "Este email já está em uso";
        } else if (err.message.includes("auth/invalid-email")) {
          errorMessage = "Email inválido";
        } else if (err.message.includes("auth/weak-password")) {
          errorMessage = "Senha muito fraca";
        } else if (err.message) {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full">
      <header className="w-full py-3 flex items-center justify-between px-5">
        <Link href="/">
          <h1 className="text-white text-2xl font-bold cursor-pointer">
            <b className="text-purple-600">Agend</b>ify
          </h1>
        </Link>
      </header>

      <div className="min-h-[calc(100vh-70px)] flex flex-col items-center justify-center p-5">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Criar sua conta
          </h1>

          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-100 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={credentials.name}
                onChange={handleChange}
                required
                placeholder="Seu nome"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                placeholder="seu@email.com"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Senha
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              {passwordStrength && (
                <div className="mt-1">
                  <span className="text-xs">Força da senha: </span>
                  <span
                    className={`text-xs font-medium ${
                      passwordStrength === "fraca"
                        ? "text-red-500"
                        : passwordStrength === "média"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {passwordStrength}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Confirmar senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2">
                Como deseja utilizar o Agendify?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleSelection("client")}
                  className={`p-3 rounded-lg border ${
                    credentials.role === "client"
                      ? "border-purple-600 bg-purple-600 bg-opacity-20"
                      : "border-gray-600 hover:border-purple-600"
                  } transition-colors text-center`}
                >
                  Cliente
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelection("owner")}
                  className={`p-3 rounded-lg border ${
                    credentials.role === "owner"
                      ? "border-blue-600 bg-blue-600 bg-opacity-20"
                      : "border-gray-600 hover:border-blue-600"
                  } transition-colors text-center`}
                >
                  Proprietário
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white py-2 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 ${
                credentials.role === "client"
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">Já tem uma conta?</p>
            <Link href="/login" className="text-purple-500 hover:underline">
              Entre aqui
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
