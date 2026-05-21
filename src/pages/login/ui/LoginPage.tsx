import { useGoogleLogin } from "@/features/auth/model/useGoogleLogin";
import { useLogin } from "@/features/auth/model/useLogin";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

import { router } from "expo-router";
import LottieView from 'lottie-react-native';
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const login = useLogin();
  // Aquí llamas a tu hook, la lógica de redirección vive adentro de esto
  const { signInWithGoogle } = useGoogleLogin();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Campos requeridos", "Completa email y contraseña.");
      return;
    }
    try {
      await login.mutateAsync({ email, password });
    } catch (err: any) {
      Alert.alert("Error", err.message ?? "Credenciales incorrectas.");
    }
  };

  return (
    /* Contenedor principal con imagen de fondo (puedes cambiar la URL por una foto real del campus) */
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop' }} 
      style={styles.backgroundImage}
    >
      {/* Capa oscura superpuesta para que el texto resalte (mix-blend-multiply simulado) */}
      <View style={styles.overlay} />

      <KeyboardAvoidingView style={styles.container} behavior="height">
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Panel Glassmorphism */}
          <View style={styles.glassCard}>
            
            <View style={styles.header}>
              {/* Contenedor del logo con brillo y borde translúcido */}
              <View style={styles.logoBox}>
                <LottieView
                  source={require('../../../../assets/images/animation.json')} 
                  autoPlay
                  loop
                  style={styles.animation}
                />
              </View>
              <Text style={styles.title}>Acceso Académico</Text>
              <Text style={styles.subtitle}>ESFOT — Inicia sesión</Text>
            </View>

            <View style={styles.form}>
              <Input
                label="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="tu@correo.com"
              />
              <Input
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Tu contraseña"
              />
              <TouchableOpacity
                onPress={() => router.push("/(auth)/forgot-password")}
                style={{ alignSelf: "flex-end" }}
              >
                <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>

              <Button
                onPress={handleLogin}
                isLoading={login.isPending}
                label="Iniciar sesión"
              />

              <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>O</Text>
                <View style={styles.separatorLine} />
              </View>

              {/* Aquí ejecutas la función del hook */}
              <TouchableOpacity 
                style={styles.googleButton} 
                onPress={signInWithGoogle}
              >
                <Text style={styles.googleButtonText}>Continuar con Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/(auth)/register")}
                style={{ alignItems: "center", marginTop: 8 }}
              >
                <Text style={styles.linkMuted}>
                  ¿No tienes cuenta?{" "}
                  <Text style={styles.linkBold}>
                    Regístrate
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(16, 20, 21, 0.75)", // Simula el bg-black/60 y el degradado del HTML
  },
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 24 },
  
  /* --- EFECTO GLASSMORPHISM --- */
  glassCard: { 
    backgroundColor: "rgba(104, 156, 189, 0.55)", // Fondo translúcido oscuro
    borderRadius: 20,
    paddingVertical: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)", // Borde sutil blanco
    // Efecto Glow azul del HTML
  
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  
  header: { 
    alignItems: "center",
    marginBottom: 16,
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    // Sombra del logo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  animation: {
    width: 50,
    height: 50,
  },
  title: { 
    color: "#e3e6ff", // Color on-primary-container del CSS
    fontSize: 26, 
    fontWeight: "700", 
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: { 
    color: "#c3c5d9", // Color on-surface-variant
    fontSize: 14,
    fontWeight: "500"
  },
  
  form: { paddingHorizontal: 28, gap: 16 },
  
  link: { color: "#7df4ff", fontSize: 14, fontWeight: "500" }, // Cian secundario
  linkMuted: { color: "#c3c5d9", fontSize: 14 },
  linkBold: { color: "#b6c4ff", fontWeight: "700" }, // Primary del theme
  
  separatorContainer: { flexDirection: "row", alignItems: "center", marginVertical: 8 },
  separatorLine: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.1)" }, // Línea adaptada a fondo oscuro
  separatorText: { marginHorizontal: 10, color: "#8d90a2", fontSize: 14, fontWeight: "600" },
  
  googleButton: {
    backgroundColor: "#DB4437",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)", // Borde para encajar en el estilo Glass
  },
  googleButtonText: { color: "#FFF", fontSize: 16, fontWeight: "600" }
});