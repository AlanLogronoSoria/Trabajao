import { supabase } from "@/shared/api/supabase";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Alert } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleLogin = () => {
  const signInWithGoogle = async () => {
    try {
      // 1. URL de tu puente intermedio en Vercel (la lee tu .env automáticamente)
// Dentro de useGoogleLogin.ts, cambia esa línea por esta:
      const vercelRedirectUrl = process.env.EXPO_PUBLIC_WEB_URL || "https://web-iota-seven-56.vercel.app";
      // 2. El Deep Link nativo que el WebBrowser del celular va a escuchar para cerrarse solo
      // Equivale exactamente a: exp://192.168.100.70:8081/--/home
      const appReturnUrl = Linking.createURL("/home");

      // 1. Obtener URL OAuth de Google apuntando hacia el puente de Vercel
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: vercelRedirectUrl, // <-- CORREGIDO: Le avisa a Supabase que use Vercel
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;
      if (!data?.url) {
        throw new Error("No se pudo obtener la URL de autenticación");
      }

      // 2. Abrir navegador seguro esperando que Vercel nos devuelva a nuestro 'appReturnUrl'
      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        appReturnUrl // <-- CORREGIDO: Escucha la redirección nativa de regreso
      );

      // 3. Procesar retorno OAuth cuando el navegador se cierra solo con éxito
      if (result.type === "success") {
        const url = result.url;

        // Extraer parámetros de la URL nativa que inyectó nuestro index.html
        const parsedUrl = Linking.parse(url);
        const code = parsedUrl.queryParams?.code;

        if (!code || typeof code !== "string") {
          throw new Error("No se recibió el código de autenticación legítimo");
        }

        // 4. Intercambiar el código PKCE seguro por la sesión final del usuario
        const { error: sessionError } =
          await supabase.auth.exchangeCodeForSession(code);

        if (sessionError) {
          throw sessionError;
        }

        // Auth exitoso
        Alert.alert("Éxito", "Inicio de sesión correcto");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return { signInWithGoogle };
};