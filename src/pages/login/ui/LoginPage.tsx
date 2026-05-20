import { theme } from "@/core/styles/theme";
import { useGoogleLogin } from "@/features/auth/model/useGoogleLogin";
import { useLogin } from "@/features/auth/model/useLogin";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

import { router } from "expo-router";
import LottieView from 'lottie-react-native';
import { useState } from "react";
import {
  Alert,
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
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <LottieView
              source={require('../../../../assets/images/animation.json')} 
              autoPlay
              loop
              style={styles.animation}
            />
            <Text style={styles.title}>Bienvenido</Text>
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
                <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
                  Regístrate
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 24 },
  card: { 
    backgroundColor: theme.colors.card, 
    borderRadius: 20,
    overflow: "hidden", 
    ...theme.shadow.card 
  },
  header: { 
    backgroundColor: theme.colors.primary, 
    padding: 32,
    alignItems: "center" 
  },
  animation: {
    width: 150,
    height: 150,
    marginBottom: 12,
  },
  title: { color: "#fff", fontSize: 26, fontWeight: "700", marginBottom: 4 },
  subtitle: { color: "rgba(255,255,255,0.75)", fontSize: 14 },
  form: { padding: 28, gap: 16 },
  link: { color: theme.colors.accent, fontSize: 14 },
  linkMuted: { color: theme.colors.textMuted, fontSize: 14 },
  separatorContainer: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  separatorLine: { flex: 1, height: 1, backgroundColor: "rgba(0,0,0,0.1)" },
  separatorText: { marginHorizontal: 10, color: theme.colors.textMuted, fontSize: 14, fontWeight: "600" },
  googleButton: {
    backgroundColor: "#DB4437",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  googleButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" }
});