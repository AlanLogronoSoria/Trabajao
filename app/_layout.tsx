import { QueryProvider } from "@/core/providers/QueryProvider";
import { useSession } from "@/features/session/model/useSession"; // Verifica que la ruta sea correcta según tu FSD
import { router, Stack, useSegments } from "expo-router";
import { useEffect } from "react";

// Componente interno que maneja la redirección basada en auth.
function AuthGuard() {
  const { isAuthenticated, isLoading } = useSession();
  const segments = useSegments(); // Obtiene la ruta actual (ej: ["(auth)", "login"])
  // useSegments está fuertemente tipado por expo-router; castear a string[]
  // evita errores de comparación con valores dinámicos como "(auth)".
  const segmentsAny = segments as unknown as string[];

  useEffect(() => {
    if (isLoading) return; // Esperar a que se cargue la sesión desde SecureStore

    // Revisamos si el usuario ya está en el grupo de autenticación (login/register)
    const inAuthGroup = segmentsAny[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      // 1. Si NO está autenticado y NO está en el login -> Mandar al Login
      router.replace("/(auth)/login" as any);
    } else if (isAuthenticated && (inAuthGroup || segmentsAny.length === 0 || segmentsAny[0] === "index")) {
      // 2. Si SÍ está autenticado y está en login o en la raíz -> Mandar al Home
      // Nota: Asegúrate de que la ruta sea "/home" o "/(tabs)/home" según tu carpeta app
      router.replace("/home" as any);
    }
  }, [isAuthenticated, isLoading, segments]);

  return null; 
}

export default function RootLayout() {
  return (
    <QueryProvider>
      {/* El AuthGuard debe estar dentro del Provider para usar useSession */}
      <AuthGuard />
      <Stack screenOptions={{ headerShown: false }} />
    </QueryProvider>
  );
}