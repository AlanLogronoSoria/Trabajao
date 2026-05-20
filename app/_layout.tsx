import { QueryProvider } from "@/core/providers/QueryProvider";
import { useSession } from "@/features/session/model/useSession";
import { router, Stack, useSegments } from "expo-router";
import { useEffect } from "react";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../tamagui.config";

// Nuevas importaciones para manejar los Deep Links y Supabase
import { supabase } from "@/shared/api/supabase";
import * as Linking from 'expo-linking';

// Componente interno que maneja la redirección.
function AuthGuard() {
  const { isAuthenticated, isLoading } = useSession();
  const segments = useSegments() as string[];

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (
      isAuthenticated &&
      (
        inAuthGroup ||
        segments.length === 0 ||
        segments[0] === "index"
      )
    ) {
      router.replace("/home");
    }
  }, [isAuthenticated, isLoading, segments]);

  return null;
}

export default function RootLayout() {
  // 1. Hook para escuchar cuando la app se abre desde un link externo (Vercel)
  const url = Linking.useURL();

  useEffect(() => {
  if (url) {
    const parsedUrl = Linking.parse(url);
    
    // expo-linking usa únicamente queryParams
    const code = parsedUrl.queryParams?.code;
    
    if (typeof code === 'string') {
      const exchangeCode = async () => {
        try {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          console.log("¡Sesión de Google intercambiada y activada con éxito!");
        } catch (err: any) {
          console.error("Error al validar código de Google:", err.message);
        }
      };
      
      exchangeCode();
    }
  }
}, [url]);

  return (
    <QueryProvider>
      <TamaguiProvider
        config={tamaguiConfig}
        defaultTheme="light"
      >
        <AuthGuard />

        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </TamaguiProvider>
    </QueryProvider>
  );
}