"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function RoleSelectionPage() {
  const router = useRouter();
  const { isLoading, setRoleForGoogleUser } = useAuth();

  const { tempGoogleData } = useAuth();

  useEffect(() => {
    // Se não houver dados temporários do Google, redireciona para a página de registro
    if (!tempGoogleData && !isLoading) {
      router.push("/register");
    }
  }, [tempGoogleData, router, isLoading]);

  const handleRoleSelection = async (role: "client" | "owner") => {
    if (!tempGoogleData) return;

    try {
      await setRoleForGoogleUser(tempGoogleData, role);
      // O redirecionamento será feito dentro da função setRoleForGoogleUser
    } catch (error) {
      console.error("Erro ao definir perfil:", error);
      alert(
        "Ocorreu um erro ao completar seu registro. Por favor, tente novamente."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!tempGoogleData) {
    return null; // Não renderiza nada enquanto redireciona
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
          <h1 className="text-2xl font-bold mb-4 text-center">
            Escolha seu perfil
          </h1>

          <p className="text-gray-300 mb-8 text-center">
            Para finalizar seu cadastro, escolha como você deseja utilizar o
            Agendify:
          </p>

          <div className="flex flex-col space-y-4 mt-6">
            <div
              onClick={() => handleRoleSelection("client")}
              className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg cursor-pointer border-2 border-purple-600 transition-colors"
            >
              <div className="flex flex-col items-center p-4">
                <h3 className="text-xl font-bold text-purple-500 mb-2">
                  Cliente
                </h3>
                <p className="text-gray-300 text-center">
                  Busque e agende serviços de seu interesse
                </p>
              </div>

              <div className="mt-3">
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-2">
                  <li>Encontre serviços por categoria</li>
                  <li>Agende horários facilmente</li>
                  <li>Gerencie seus compromissos</li>
                  <li>Avalie os serviços contratados</li>
                </ul>
              </div>
            </div>

            <div
              onClick={() => handleRoleSelection("owner")}
              className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg cursor-pointer border-2 border-blue-600 transition-colors"
            >
              <div className="flex flex-col items-center p-4">
                <h3 className="text-xl font-bold text-blue-500 mb-2">
                  Proprietário
                </h3>
                <p className="text-gray-300 text-center">
                  Ofereça seus serviços e gerencie sua agenda
                </p>
              </div>

              <div className="mt-3">
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-2">
                  <li>Divulgue seus serviços</li>
                  <li>Controle sua disponibilidade</li>
                  <li>Gerencie agendamentos</li>
                  <li>Visualize análises de desempenho</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
